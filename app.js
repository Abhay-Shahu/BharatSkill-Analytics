/**
 * BharatSkill Analytics - Executive Dashboard Application Logic
 * Dual Theme (True Black / Clean Light), Universal Filter Options, and Live Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentLang = 'en';
  let activeTab = 'overview';
  let selectedState = 'ALL';
  let selectedDistrict = 'ALL';
  let selectedSector = 'ALL';
  let selectedSeverity = 'ALL';
  let searchQuery = '';

  // Simulation controls state
  let simDistrict = 'MH-PUN';
  let simFromTrade = 'TRD-CAP-02'; // Conventional Lathe
  let simToTrade = 'TRD-EV-01';   // EV Battery Assembly
  let simSeats = 2500;

  // Initialize UI components
  initNavigation();
  initSidebarMobile();
  initLanguage();
  initTheme();
  populateDropdowns();
  bindFilterEvents();
  initSimulation();
  renderAllViews();

  // 1. Navigation Tabs handler
  function initNavigation() {
    const tabs = document.querySelectorAll('.nav-item');
    const breadcrumb = document.getElementById('activeViewBreadcrumb');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTab = tab.getAttribute('data-tab');

        // Update breadcrumb text
        if (breadcrumb) {
          const tabLabel = tab.querySelector('span')?.textContent || activeTab;
          breadcrumb.textContent = tabLabel;
        }

        // Show corresponding panel
        document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
        const activePanel = document.getElementById(`view-${activeTab}`);
        if (activePanel) {
          activePanel.classList.add('active');
        }

        // Close mobile sidebar if open
        const sidebar = document.getElementById('appSidebar');
        if (sidebar && sidebar.classList.contains('mobile-open')) {
          sidebar.classList.remove('mobile-open');
        }
      });
    });
  }

  // Mobile sidebar toggle
  function initSidebarMobile() {
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebar = document.getElementById('appSidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }
  }

  // 2. Dual Theme Engine (True Pitch Black vs High-Contrast Clean Light)
  function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeLabel = document.getElementById('themeLabel');
    const themeIcon = document.getElementById('themeIcon');

    // Retrieve saved theme or default to pitch black
    const savedTheme = localStorage.getItem('bharat_theme') || 'dark';
    if (savedTheme === 'light') {
      applyLightTheme();
    } else {
      applyDarkTheme();
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isCurrentlyLight = document.body.classList.contains('light-theme');
        if (isCurrentlyLight) {
          applyDarkTheme();
          localStorage.setItem('bharat_theme', 'dark');
        } else {
          applyLightTheme();
          localStorage.setItem('bharat_theme', 'light');
        }
      });
    }

    function applyDarkTheme() {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
      if (themeBtn) themeBtn.classList.add('dark-active');
      if (themeLabel) themeLabel.textContent = 'Dark Mode';
      if (themeIcon) {
        themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
      }
    }

    function applyLightTheme() {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
      if (themeBtn) themeBtn.classList.remove('dark-active');
      if (themeLabel) themeLabel.textContent = 'Light Mode';
      if (themeIcon) {
        themeIcon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
      }
    }
  }

  // 3. Language switcher
  function initLanguage() {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        applyLanguageStrings();
      });
    }
  }

  function applyLanguageStrings() {
    const strings = BHARAT_DATA.languages[currentLang] || BHARAT_DATA.languages.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (strings[key]) {
        el.textContent = strings[key];
      }
    });

    const searchInput = document.getElementById('tradeSearchInput');
    if (searchInput && strings.searchPlaceholder) {
      searchInput.placeholder = strings.searchPlaceholder;
    }
  }

  // 4. Dropdown populations
  function populateDropdowns() {
    const stateSelect = document.getElementById('stateFilter');
    const districtSelect = document.getElementById('districtFilter');
    const sectorSelect = document.getElementById('sectorFilter');

    if (stateSelect) {
      stateSelect.innerHTML = `<option value="ALL">All Pilot States (5)</option>` + 
        BHARAT_DATA.states.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    }

    if (sectorSelect) {
      sectorSelect.innerHTML = `<option value="ALL">All Sectors (8)</option>` + 
        BHARAT_DATA.sectors.map(sec => `<option value="${sec.id}">${sec.name}</option>`).join('');
    }

    updateDistrictDropdown();
  }

  function updateDistrictDropdown() {
    const districtSelect = document.getElementById('districtFilter');
    if (!districtSelect) return;

    let availableDistricts = [];
    if (selectedState === 'ALL') {
      BHARAT_DATA.states.forEach(s => availableDistricts.push(...s.districts));
    } else {
      const stateObj = BHARAT_DATA.states.find(s => s.id === selectedState);
      if (stateObj) availableDistricts = stateObj.districts;
    }

    districtSelect.innerHTML = `<option value="ALL">All Districts (${availableDistricts.length})</option>` + 
      availableDistricts.map(d => `<option value="${d.id}" ${d.id === selectedDistrict ? 'selected' : ''}>${d.name}</option>`).join('');
    
    districtSelect.value = selectedDistrict;
  }

  function bindFilterEvents() {
    const stateSelect = document.getElementById('stateFilter');
    const districtSelect = document.getElementById('districtFilter');
    const sectorSelect = document.getElementById('sectorFilter');
    const severitySelect = document.getElementById('severityFilter');
    const searchInput = document.getElementById('tradeSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const resetAllBtn = document.getElementById('resetAllFiltersBtn');

    if (stateSelect) {
      stateSelect.addEventListener('change', (e) => {
        selectedState = e.target.value;
        selectedDistrict = 'ALL';
        updateDistrictDropdown();
        clearActiveDemoPills();
        renderFilteredViews();
      });
    }

    if (districtSelect) {
      districtSelect.addEventListener('change', (e) => {
        selectedDistrict = e.target.value;
        
        // Auto-sync State if a specific district is picked
        if (selectedDistrict !== 'ALL') {
          for (const st of BHARAT_DATA.states) {
            const hasDist = st.districts.some(d => d.id === selectedDistrict);
            if (hasDist) {
              selectedState = st.id;
              if (stateSelect) stateSelect.value = st.id;
              break;
            }
          }
        }
        clearActiveDemoPills();
        renderFilteredViews();
      });
    }

    if (sectorSelect) {
      sectorSelect.addEventListener('change', (e) => {
        selectedSector = e.target.value;
        clearActiveDemoPills();
        renderFilteredViews();
      });
    }

    if (severitySelect) {
      severitySelect.addEventListener('change', (e) => {
        selectedSeverity = e.target.value;
        clearActiveDemoPills();
        renderFilteredViews();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        if (clearSearchBtn) {
          clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
        }
        clearActiveDemoPills();
        renderFilteredViews();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchQuery = '';
          clearSearchBtn.style.display = 'none';
          renderFilteredViews();
        }
      });
    }

    // Reset All Filters button
    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', () => {
        resetAllFilters();
      });
    }

    // Quick Interactive Demo Scenario Pills
    document.querySelectorAll('.demo-preset-pill[data-demo]').forEach(pill => {
      pill.addEventListener('click', () => {
        const demo = pill.getAttribute('data-demo');
        applyDemoScenario(demo, pill);
      });
    });

    // Modal Export listeners
    const exportDapBtn = document.getElementById('btnExportDAP');
    const exportSipBtn = document.getElementById('btnExportSIP');
    if (exportDapBtn) exportDapBtn.addEventListener('click', () => openExportModal('DAP'));
    if (exportSipBtn) exportSipBtn.addEventListener('click', () => openExportModal('SIP'));

    const modalClose = document.getElementById('modalCloseBtn');
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        document.getElementById('exportModal').classList.remove('active');
      });
    }
  }

  function clearActiveDemoPills() {
    document.querySelectorAll('.demo-preset-pill').forEach(p => p.classList.remove('active'));
  }

  function resetAllFilters() {
    selectedState = 'ALL';
    selectedDistrict = 'ALL';
    selectedSector = 'ALL';
    selectedSeverity = 'ALL';
    searchQuery = '';

    const stateSelect = document.getElementById('stateFilter');
    const sectorSelect = document.getElementById('sectorFilter');
    const severitySelect = document.getElementById('severityFilter');
    const searchInput = document.getElementById('tradeSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (stateSelect) stateSelect.value = 'ALL';
    if (sectorSelect) sectorSelect.value = 'ALL';
    if (severitySelect) severitySelect.value = 'ALL';
    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';

    updateDistrictDropdown();
    clearActiveDemoPills();
    renderFilteredViews();
  }

  function applyDemoScenario(demoKey, activePill) {
    clearActiveDemoPills();
    if (activePill) activePill.classList.add('active');

    const stateSelect = document.getElementById('stateFilter');
    const sectorSelect = document.getElementById('sectorFilter');
    const severitySelect = document.getElementById('severityFilter');
    const searchInput = document.getElementById('tradeSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (searchInput) searchInput.value = '';
    searchQuery = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';

    if (demoKey === 'ev-pune') {
      selectedState = 'MH';
      selectedDistrict = 'MH-PUN';
      selectedSector = 'EV';
      selectedSeverity = 'ALL';
    } else if (demoKey === 'esdm-noida') {
      selectedState = 'UP';
      selectedDistrict = 'UP-NOI';
      selectedSector = 'ESDM';
      selectedSeverity = 'ALL';
    } else if (demoKey === 'lathe-up') {
      selectedState = 'UP';
      selectedDistrict = 'ALL';
      selectedSector = 'CAP';
      selectedSeverity = 'chronic';
    } else if (demoKey === 'health-metro') {
      selectedState = 'ALL';
      selectedDistrict = 'ALL';
      selectedSector = 'HLTH';
      selectedSeverity = 'acute';
    } else if (demoKey === 'nagpur') {
      selectedState = 'MH';
      selectedDistrict = 'MH-NAG';
      selectedSector = 'ALL';
      selectedSeverity = 'ALL';
    }

    if (stateSelect) stateSelect.value = selectedState;
    updateDistrictDropdown();
    const districtSelect = document.getElementById('districtFilter');
    if (districtSelect) districtSelect.value = selectedDistrict;
    if (sectorSelect) sectorSelect.value = selectedSector;
    if (severitySelect) severitySelect.value = selectedSeverity;

    renderFilteredViews();
  }

  // Filter Trades Logic
  function getFilteredTrades() {
    return BHARAT_DATA.trades.filter(t => {
      // Sector filter
      if (selectedSector !== 'ALL' && t.sectorId !== selectedSector) return false;

      // Severity filter
      if (selectedSeverity !== 'ALL' && t.gapType !== selectedSeverity) return false;

      // District filter
      if (selectedDistrict !== 'ALL' && !t.pilotDistricts.includes(selectedDistrict)) return false;

      // State filter check
      if (selectedState !== 'ALL' && selectedDistrict === 'ALL') {
        const stateDistricts = (BHARAT_DATA.states.find(s => s.id === selectedState)?.districts || []).map(d => d.id);
        const hasMatch = t.pilotDistricts.some(pd => stateDistricts.includes(pd));
        if (!hasMatch) return false;
      }

      // Search query
      if (searchQuery) {
        const matchTitle = t.tradeName.toLowerCase().includes(searchQuery);
        const matchNco = t.ncoCode.toLowerCase().includes(searchQuery);
        const matchNsqf = `nsqf ${t.nsqfLevel}`.toLowerCase().includes(searchQuery);
        if (!matchTitle && !matchNco && !matchNsqf) return false;
      }

      return true;
    });
  }

  // Render All Views
  function renderAllViews() {
    renderFilteredViews();
    renderQuadrantMatrix();
    renderPipelineSteps();
    renderApiEndpoints();
  }

  function renderFilteredViews() {
    const filtered = getFilteredTrades();

    // 1. DYNAMICALLY RECALCULATE AND ANIMATE TOP KPIS (IMAGE 1 FIX)
    renderDynamicKPIs(filtered);

    // Update filter badge text
    const badge = document.getElementById('activeFilterBadge');
    if (badge) {
      let filterContext = 'All States';
      if (selectedDistrict !== 'ALL') {
        let distName = selectedDistrict;
        for (const s of BHARAT_DATA.states) {
          const d = s.districts.find(x => x.id === selectedDistrict);
          if (d) { distName = d.name; break; }
        }
        filterContext = distName;
      } else if (selectedState !== 'ALL') {
        filterContext = BHARAT_DATA.states.find(s => s.id === selectedState)?.name || selectedState;
      }
      if (selectedSector !== 'ALL') {
        const sec = BHARAT_DATA.sectors.find(s => s.id === selectedSector)?.name;
        filterContext += ` • ${sec}`;
      }
      badge.textContent = `Showing ${filtered.length} of ${BHARAT_DATA.trades.length} Trades (${filterContext})`;
    }

    renderTradesTable(filtered);
    renderStateCards();
    renderSectorBreakdownChart();
    renderEarlyWarningAlerts();
  }

  // 1. DYNAMIC & REACTIVE TOP KPI CARDS
  function renderDynamicKPIs(filteredTrades) {
    let pipelineCount = 0;
    let demandCount = 0;
    let misalignmentRate = 0;
    let reallocationCount = 0;

    let subPipeline = "PMKVY, DGT & SSDM";
    let subDemand = "Portals + NCS + e-Shram";
    let subMisalign = "National Labour Gap";
    let subRealloc = "Actionable Seat Quota";

    if (selectedDistrict !== 'ALL') {
      let distObj = null;
      let stateName = '';
      for (const st of BHARAT_DATA.states) {
        const found = st.districts.find(d => d.id === selectedDistrict);
        if (found) { distObj = found; stateName = st.name; break; }
      }
      if (distObj) {
        pipelineCount = distObj.enrolled;
        demandCount = distObj.demand;
        misalignmentRate = (100 - distObj.alignment).toFixed(1);
        reallocationCount = Math.round(distObj.enrolled * 0.18);

        subPipeline = `District Capacity (${distObj.name})`;
        subDemand = `Local Vacancies (${distObj.name})`;
        subMisalign = `${distObj.name} Mismatch Index`;
        subRealloc = `District Reallocation Target`;
      }
    } else if (selectedState !== 'ALL') {
      const stObj = BHARAT_DATA.states.find(s => s.id === selectedState);
      if (stObj) {
        pipelineCount = stObj.enrolled;
        demandCount = stObj.demand;
        misalignmentRate = (100 - stObj.alignment).toFixed(1);
        reallocationCount = Math.round(stObj.enrolled * 0.16);

        subPipeline = `State Capacity (${stObj.name})`;
        subDemand = `State Demand (${stObj.name})`;
        subMisalign = `${stObj.name} Misalignment`;
        subRealloc = `Reallocable in ${stObj.name}`;
      }
    } else if (selectedSector !== 'ALL') {
      const secObj = BHARAT_DATA.sectors.find(s => s.id === selectedSector);
      const secTrades = BHARAT_DATA.trades.filter(t => t.sectorId === selectedSector);
      pipelineCount = secTrades.reduce((acc, t) => acc + t.currentCapacity, 0);
      demandCount = secTrades.reduce((acc, t) => acc + t.industryDemand, 0);
      const gap = Math.abs(demandCount - pipelineCount);
      misalignmentRate = ((gap / Math.max(demandCount, pipelineCount, 1)) * 100).toFixed(1);
      reallocationCount = secTrades.filter(t => t.gapType === 'chronic' || t.gapType === 'saturation').reduce((acc, t) => acc + t.currentCapacity, 0);
      if (reallocationCount === 0) reallocationCount = Math.round(pipelineCount * 0.15);

      subPipeline = `Sector Capacity (${secObj?.name || selectedSector})`;
      subDemand = `Sector Demand (${secObj?.name || selectedSector})`;
      subMisalign = `Sector Gap Severity`;
      subRealloc = `Reallocable in Sector`;
    } else if (filteredTrades && filteredTrades.length < BHARAT_DATA.trades.length && filteredTrades.length > 0) {
      pipelineCount = filteredTrades.reduce((acc, t) => acc + t.currentCapacity, 0);
      demandCount = filteredTrades.reduce((acc, t) => acc + t.industryDemand, 0);
      const gap = Math.abs(demandCount - pipelineCount);
      misalignmentRate = ((gap / Math.max(demandCount, pipelineCount, 1)) * 100).toFixed(1);
      reallocationCount = filteredTrades.filter(t => t.gapType === 'chronic' || t.gapType === 'saturation').reduce((acc, t) => acc + t.currentCapacity, 0);

      subPipeline = `Filtered Pipeline (${filteredTrades.length} Trades)`;
      subDemand = `Filtered Industry Demand`;
      subMisalign = `Filtered Cohort Mismatch`;
      subRealloc = `Filtered Quota Shift`;
    } else {
      // National Baseline
      pipelineCount = BHARAT_DATA.nationalStats.totalEnrolled;
      demandCount = BHARAT_DATA.nationalStats.activeVacancies;
      misalignmentRate = BHARAT_DATA.nationalStats.misalignmentIndex;
      reallocationCount = BHARAT_DATA.nationalStats.reallocationPotential;

      subPipeline = "National Baseline (PMKVY / DGT)";
      subDemand = "Portals + NCS + e-Shram";
      subMisalign = "National Labour Gap";
      subRealloc = "Reallocable Seat Quota";
    }

    // Format & Animate Values
    formatAndAnimateKPI('kpiPipelineVal', pipelineCount);
    formatAndAnimateKPI('kpiDemandVal', demandCount);
    
    const misalignEl = document.getElementById('kpiMisalignVal');
    if (misalignEl) misalignEl.textContent = `${misalignmentRate}%`;

    formatAndAnimateKPI('kpiReallocVal', reallocationCount);

    // Update dynamic subtext labels
    const pSub = document.getElementById('kpiPipelineSub');
    const dSub = document.getElementById('kpiDemandSub');
    const mSub = document.getElementById('kpiMisalignSub');
    const rSub = document.getElementById('kpiReallocSub');

    if (pSub) pSub.textContent = subPipeline;
    if (dSub) dSub.textContent = subDemand;
    if (mSub) mSub.textContent = subMisalign;
    if (rSub) rSub.textContent = subRealloc;
  }

  function formatAndAnimateKPI(elementId, value) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let formattedText = '';
    if (value >= 100000) {
      formattedText = (value / 100000).toFixed(1) + ' Lakh';
    } else if (value >= 1000) {
      formattedText = (value / 1000).toFixed(1) + 'k';
    } else {
      formattedText = value.toLocaleString('en-IN');
    }

    // Smooth subtle pulse animation on value change
    el.textContent = formattedText;
    el.style.transform = 'scale(1.04)';
    setTimeout(() => {
      el.style.transform = 'scale(1)';
    }, 180);
  }

  // 2. Render Trades Table
  function renderTradesTable(trades) {
    const tableBody = document.getElementById('tradesTableBody');
    if (!tableBody) return;

    if (!trades || trades.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding: 48px 20px;">
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">
              No trades match this filter criteria
            </div>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 16px; max-width: 500px; margin-left: auto; margin-right: auto;">
              ${searchQuery ? `Search query "<strong>${searchQuery}</strong>" returned 0 matches.` : 'No trades found with the current State, District, and Sector combination.'}
            </p>
            <div style="display:flex; justify-content:center; gap: 10px; flex-wrap: wrap;">
              ${searchQuery ? `<button class="ctrl-btn" onclick="document.getElementById('clearSearchBtn').click();">Clear Search "${searchQuery}"</button>` : ''}
              <button class="ctrl-btn btn-primary" onclick="document.getElementById('resetAllFiltersBtn').click();">Reset All Filters</button>
              <button class="ctrl-btn btn-saffron" onclick="document.querySelector('.demo-preset-pill[data-demo=\\'ev-pune\\']').click();">⚡ Try Demo: EV in Pune</button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = trades.map(t => {
      const sector = BHARAT_DATA.sectors.find(s => s.id === t.sectorId);
      const ratio = t.demandSupplyRatio;
      let badgeClass = 'balanced';
      let badgeLabel = 'Matched (1.0x)';

      if (t.gapType === 'acute') {
        badgeClass = 'acute';
        badgeLabel = `Acute Shortage (${ratio}x)`;
      } else if (t.gapType === 'growth') {
        badgeClass = 'growth';
        badgeLabel = `High Growth (${ratio}x)`;
      } else if (t.gapType === 'saturation') {
        badgeClass = 'saturation';
        badgeLabel = `Saturation (${ratio}x)`;
      } else if (t.gapType === 'chronic') {
        badgeClass = 'chronic';
        badgeLabel = `Chronic Oversupply (${ratio}x)`;
      }

      const demandFmt = Number(t.industryDemand).toLocaleString('en-IN');
      const capacityFmt = Number(t.currentCapacity).toLocaleString('en-IN');
      const gapSeats = t.industryDemand - t.currentCapacity;
      const gapSign = gapSeats > 0 ? `+${Number(gapSeats).toLocaleString('en-IN')}` : `${Number(gapSeats).toLocaleString('en-IN')}`;

      return `
        <tr>
          <td>
            <span class="trade-title">${t.tradeName}</span>
            <div class="trade-meta">
              <span class="meta-pill">${t.ncoCode}</span>
              <span>•</span>
              <span style="color: ${sector?.color || '#3b82f6'}; font-weight: 600;">${sector?.name || t.sectorId}</span>
              <span>•</span>
              <span class="meta-pill">NSQF L${t.nsqfLevel}</span>
            </div>
          </td>
          <td><strong style="color: var(--blue);">${demandFmt}</strong> <span style="font-size:0.72rem; color:var(--text-muted);">openings</span></td>
          <td><strong>${capacityFmt}</strong> <span style="font-size:0.72rem; color:var(--text-muted);">seats</span></td>
          <td>
            <strong style="color: ${gapSeats > 0 ? 'var(--green)' : 'var(--red)'}">${gapSign}</strong>
          </td>
          <td><span class="badge-status ${badgeClass}">${badgeLabel}</span></td>
          <td>
            <span style="font-weight: 700; color: var(--text-main);">${t.wageAvg}</span>
            <span style="font-size: 0.72rem; color: ${t.growthYoY.startsWith('+') ? 'var(--green)' : 'var(--red)'}; display: block; font-weight: 600;">${t.growthYoY} YoY</span>
          </td>
          <td>
            <button class="ctrl-btn view-rec-btn" data-id="${t.id}" style="padding: 4px 10px; font-size: 0.74rem; height: 30px;">
              Directives
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach click listeners for policy recommendation details
    document.querySelectorAll('.view-rec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const trade = BHARAT_DATA.trades.find(x => x.id === id);
        if (trade) {
          showTradeDetailModal(trade);
        }
      });
    });
  }

  // 3. Render State Performance Summary
  function renderStateCards() {
    const container = document.getElementById('stateSummaryCards');
    if (!container) return;

    let displayStates = BHARAT_DATA.states;
    if (selectedState !== 'ALL') {
      displayStates = BHARAT_DATA.states.filter(s => s.id === selectedState);
    }

    container.innerHTML = displayStates.map(st => {
      const alignColor = st.alignment >= 65 ? 'var(--green)' : (st.alignment >= 55 ? 'var(--amber)' : 'var(--red)');
      return `
        <div style="background:var(--bg-card-subtle); border: 1px solid var(--border-color); border-left: 4px solid ${alignColor}; border-radius: var(--radius-sm); padding: 14px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 6px;">
            <div>
              <h4 style="font-size: 0.95rem; font-weight:700; color:var(--text-main);">${st.name}</h4>
              <p style="font-size: 0.72rem; color: var(--text-muted);">${st.districts.length} Monitored Pilot Districts</p>
            </div>
            <span class="trend-badge ${st.alignment >= 65 ? 'up' : 'warn'}">
              ${st.alignment}% Alignment
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.78rem; margin-top: 8px;">
            <div>
              <span style="color:var(--text-muted); display:block; font-size:0.68rem;">Training Seats</span>
              <strong>${(st.enrolled / 1000).toFixed(1)}k candidates</strong>
            </div>
            <div>
              <span style="color:var(--text-muted); display:block; font-size:0.68rem;">Industry Demand</span>
              <strong style="color: var(--blue);">${(st.demand / 1000).toFixed(1)}k openings</strong>
            </div>
          </div>
          <div style="margin-top: 10px; font-size: 0.74rem; border-top: 1px solid var(--border-color); padding-top: 6px; display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Key Deficit: Tech & EV</span>
            <a href="#view-explorer" class="state-drill-link" data-state="${st.id}" style="color: var(--saffron); text-decoration:none; font-weight:700;">Filter Table →</a>
          </div>
        </div>
      `;
    }).join('');

    // Attach drilldown click
    document.querySelectorAll('.state-drill-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const stId = link.getAttribute('data-state');
        document.getElementById('stateFilter').value = stId;
        selectedState = stId;
        updateDistrictDropdown();
        selectedDistrict = 'ALL';
        renderFilteredViews();
        // Switch to explorer tab
        document.querySelector('[data-tab="explorer"]').click();
      });
    });
  }

  // 4. Render Sector Breakdown Visualizer
  function renderSectorBreakdownChart() {
    const chartContainer = document.getElementById('sectorChartContainer');
    if (!chartContainer) return;

    // Aggregate demand and capacity by sector
    const sectorStats = BHARAT_DATA.sectors.map(sec => {
      const trades = BHARAT_DATA.trades.filter(t => t.sectorId === sec.id);
      const totalDemand = trades.reduce((acc, t) => acc + t.industryDemand, 0);
      const totalCapacity = trades.reduce((acc, t) => acc + t.currentCapacity, 0);
      return {
        ...sec,
        demand: totalDemand,
        capacity: totalCapacity,
        gap: totalDemand - totalCapacity
      };
    });

    const maxVal = Math.max(...sectorStats.map(s => Math.max(s.demand, s.capacity)), 100000);

    let barsHtml = sectorStats.map(s => {
      const demandPct = Math.min(100, (s.demand / maxVal) * 100);
      const capPct = Math.min(100, (s.capacity / maxVal) * 100);

      return `
        <div style="margin-bottom: 12px;">
          <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600; margin-bottom: 3px;">
            <span style="color: var(--text-main); display:flex; align-items:center; gap:6px;">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${s.color};"></span>
              ${s.name}
            </span>
            <span style="color:var(--text-muted); font-size:0.72rem;">
              Demand: <strong style="color:var(--blue);">${(s.demand/1000).toFixed(0)}k</strong> | Seats: <strong>${(s.capacity/1000).toFixed(0)}k</strong>
            </span>
          </div>
          <div style="background: var(--bg-pill); height: 14px; border-radius: 6px; overflow:hidden; position:relative; display:flex;">
            <!-- Demand Bar -->
            <div style="width: ${demandPct}%; background: #2563eb; height:100%; border-radius:6px;" title="Industry Demand: ${s.demand}"></div>
          </div>
          <div style="background: var(--bg-pill); height: 5px; border-radius: 3px; overflow:hidden; margin-top: 3px;">
            <!-- Capacity Bar -->
            <div style="width: ${capPct}%; background: var(--saffron); height:100%; border-radius:3px;" title="Training Capacity: ${s.capacity}"></div>
          </div>
        </div>
      `;
    }).join('');

    chartContainer.innerHTML = `
      <div style="display:flex; gap: 14px; font-size:0.72rem; color:var(--text-muted); margin-bottom: 10px; justify-content: flex-end;">
        <span style="display:flex; align-items:center; gap:4px;"><span style="width:10px; height:8px; background:#2563eb; border-radius:2px;"></span> Industry Demand</span>
        <span style="display:flex; align-items:center; gap:4px;"><span style="width:10px; height:4px; background:var(--saffron); border-radius:2px;"></span> Sanctioned Seats</span>
      </div>
      ${barsHtml}
    `;
  }

  // 5. Quadrant Matrix Visualizer
  function renderQuadrantMatrix() {
    const qAcute = document.getElementById('quadAcuteList');
    const qGrowth = document.getElementById('quadGrowthList');
    const qChronic = document.getElementById('quadChronicList');
    const qStable = document.getElementById('quadStableList');

    if (!qAcute || !qGrowth || !qChronic || !qStable) return;

    const acuteTrades = BHARAT_DATA.trades.filter(t => t.gapType === 'acute');
    const growthTrades = BHARAT_DATA.trades.filter(t => t.gapType === 'growth');
    const chronicTrades = BHARAT_DATA.trades.filter(t => t.gapType === 'chronic');
    const stableTrades = BHARAT_DATA.trades.filter(t => t.gapType === 'balanced' || t.gapType === 'saturation');

    const renderChip = (t) => `
      <div class="quad-chip" data-id="${t.id}" title="${t.actionRecommendation}">
        <span style="font-weight:600; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width: 180px;">${t.tradeName}</span>
        <span style="color:var(--text-muted); font-size:0.7rem; font-weight:700;">${t.demandSupplyRatio}x</span>
      </div>
    `;

    qAcute.innerHTML = acuteTrades.map(renderChip).join('');
    qGrowth.innerHTML = growthTrades.map(renderChip).join('');
    qChronic.innerHTML = chronicTrades.map(renderChip).join('');
    qStable.innerHTML = stableTrades.map(renderChip).join('');

    document.querySelectorAll('.quad-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.getAttribute('data-id');
        const trade = BHARAT_DATA.trades.find(x => x.id === id);
        if (trade) showTradeDetailModal(trade);
      });
    });
  }

  // 6. Early-Warning Alerts
  function renderEarlyWarningAlerts() {
    const container = document.getElementById('earlyWarningCards');
    if (!container) return;

    const criticalTrades = BHARAT_DATA.trades.filter(t => t.gapType === 'acute' || t.gapType === 'chronic');

    container.innerHTML = criticalTrades.map(t => {
      const isShortage = t.gapType === 'acute';
      const borderColor = isShortage ? 'var(--red)' : 'var(--purple)';
      const badgeText = isShortage ? 'CRITICAL UNDERSUPPLY' : 'CHRONIC SATURATION';

      return `
        <div style="background:var(--bg-card-subtle); border: 1px solid var(--border-color); border-left: 4px solid ${borderColor}; border-radius: var(--radius-sm); margin-bottom: 10px; padding: 12px 14px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span style="font-size:0.65rem; font-weight:800; color:${borderColor}; letter-spacing:0.06em;">${badgeText}</span>
              <h4 style="font-size: 0.9rem; font-weight:700; margin: 2px 0; color:var(--text-main);">${t.tradeName}</h4>
              <p style="font-size: 0.72rem; color:var(--text-muted);">${t.ncoCode} • NSQF Level ${t.nsqfLevel}</p>
            </div>
            <div style="text-align:right;">
              <span style="font-size: 1.05rem; font-weight:800; color: ${isShortage ? 'var(--red)' : 'var(--purple)'};">${t.demandSupplyRatio}x</span>
              <span style="font-size:0.65rem; color:var(--text-muted); display:block;">Demand / Supply Ratio</span>
            </div>
          </div>
          <div class="recommendation-banner" style="margin-top: 8px; padding: 8px 10px;">
            <p style="font-size: 0.78rem; line-height: 1.35;">${t.actionRecommendation}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // 7. Interactive Simulation Engine
  function initSimulation() {
    const simDistrictSelect = document.getElementById('simDistrictSelect');
    const simFromSelect = document.getElementById('simFromTradeSelect');
    const simToSelect = document.getElementById('simToTradeSelect');
    const seatSlider = document.getElementById('seatReallocSlider');
    const seatValBadge = document.getElementById('seatValBadge');

    if (!simDistrictSelect || !simFromSelect || !simToSelect || !seatSlider) return;

    // Populate simulation districts
    const allDistricts = [];
    BHARAT_DATA.states.forEach(s => allDistricts.push(...s.districts));
    simDistrictSelect.innerHTML = allDistricts.map(d => `<option value="${d.id}" ${d.id === 'MH-PUN' ? 'selected' : ''}>${d.name}</option>`).join('');

    // Populate trade options (Oversupplied vs Shortage)
    const oversuppliedTrades = BHARAT_DATA.trades.filter(t => t.gapType === 'chronic' || t.gapType === 'saturation');
    const shortageTrades = BHARAT_DATA.trades.filter(t => t.gapType === 'acute' || t.gapType === 'growth');

    simFromSelect.innerHTML = oversuppliedTrades.map(t => `<option value="${t.id}" ${t.id === 'TRD-CAP-02' ? 'selected' : ''}>${t.tradeName} (${t.currentCapacity} seats)</option>`).join('');
    simToSelect.innerHTML = shortageTrades.map(t => `<option value="${t.id}" ${t.id === 'TRD-EV-01' ? 'selected' : ''}>${t.tradeName} (${t.demandSupplyRatio}x shortage)</option>`).join('');

    simDistrictSelect.addEventListener('change', (e) => {
      simDistrict = e.target.value;
      computeSimulationResults();
    });

    simFromSelect.addEventListener('change', (e) => {
      simFromTrade = e.target.value;
      computeSimulationResults();
    });

    simToSelect.addEventListener('change', (e) => {
      simToTrade = e.target.value;
      computeSimulationResults();
    });

    seatSlider.addEventListener('input', (e) => {
      simSeats = parseInt(e.target.value, 10);
      seatValBadge.textContent = `${Number(simSeats).toLocaleString('en-IN')} Seats`;
      computeSimulationResults();
    });

    computeSimulationResults();
  }

  function computeSimulationResults() {
    const fromTradeObj = BHARAT_DATA.trades.find(t => t.id === simFromTrade) || BHARAT_DATA.trades[0];
    const toTradeObj = BHARAT_DATA.trades.find(t => t.id === simToTrade) || BHARAT_DATA.trades[1];

    const baselinePlacement = 52.4;
    const placementUplift = Math.min(34.2, (simSeats / 5000) * 18.5 + (toTradeObj.demandSupplyRatio * 2.2));
    const simulatedPlacement = (baselinePlacement + placementUplift).toFixed(1);

    const fromWage = parseInt(fromTradeObj.wageAvg.replace(/[^0-9]/g, '')) || 12000;
    const toWage = parseInt(toTradeObj.wageAvg.replace(/[^0-9]/g, '')) || 24000;
    const wageDeltaPct = (((toWage - fromWage) / fromWage) * 100).toFixed(0);

    const subsidySavingsCrores = ((simSeats * 0.42 * 28000) / 10000000).toFixed(2);

    document.getElementById('simPlacementVal').textContent = `${simulatedPlacement}%`;
    document.getElementById('simPlacementDelta').textContent = `+${placementUplift.toFixed(1)}% vs baseline`;

    document.getElementById('simWageVal').textContent = toTradeObj.wageAvg;
    document.getElementById('simWageDelta').textContent = `+${wageDeltaPct}% salary premium`;

    document.getElementById('simSavingsVal').textContent = `₹${subsidySavingsCrores} Cr`;
  }

  // 8. Methodology Pipeline Rendering
  function renderPipelineSteps() {
    const container = document.getElementById('pipelineStepsContainer');
    if (!container) return;

    container.innerHTML = BHARAT_DATA.methodology.stages.map(st => `
      <div class="pipeline-step">
        <div class="step-num">${st.step}</div>
        <div class="step-info">
          <h4>${st.title}</h4>
          <p>${st.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // 9. API Spec Render
  function renderApiEndpoints() {
    const container = document.getElementById('apiEndpointsList');
    if (!container) return;

    container.innerHTML = BHARAT_DATA.apiEndpoints.map(api => `
      <div class="api-spec-card">
        <div class="api-endpoint-header">
          <div style="display:flex; align-items:center; gap: 8px;">
            <span style="font-weight:800; font-size:0.7rem; padding:2px 8px; border-radius:4px; background:var(--blue-soft); color:var(--blue);">${api.method}</span>
            <span style="font-family:var(--font-mono); font-size:0.8rem; font-weight:700; color:var(--text-main);">${api.path}</span>
          </div>
          <span style="font-size:0.72rem; color:var(--text-muted);">${api.summary}</span>
        </div>
        <div style="padding: 8px 14px; font-size:0.75rem; background:var(--bg-card); border-bottom:1px solid var(--border-color); color:var(--text-secondary);">
          <strong>Parameters:</strong> <code>${api.params}</code>
        </div>
        <pre class="api-json-pre"><code>${JSON.stringify(api.responseExample, null, 2)}</code></pre>
      </div>
    `).join('');
  }

  // Trade Details Modal
  function showTradeDetailModal(trade) {
    const modal = document.getElementById('exportModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalTitle || !modalBody) return;

    modalTitle.textContent = `${trade.tradeName} (Policy Dossier)`;
    modalBody.innerHTML = `
      <div style="margin-bottom: 16px;">
        <span class="badge-status ${trade.gapType}" style="margin-bottom: 8px;">Gap Status: ${trade.gapType.toUpperCase()}</span>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 12px 0; font-size: 0.82rem;">
          <div style="background:var(--bg-card-subtle); padding: 10px; border-radius: 6px; border:1px solid var(--border-color);">
            <span style="color:var(--text-muted); font-size:0.68rem; display:block;">NCO-2015 Classification</span>
            <strong style="color:var(--text-main);">${trade.ncoCode}</strong>
          </div>
          <div style="background:var(--bg-card-subtle); padding: 10px; border-radius: 6px; border:1px solid var(--border-color);">
            <span style="color:var(--text-muted); font-size:0.68rem; display:block;">NSQF Qualification Level</span>
            <strong style="color:var(--text-main);">Level ${trade.nsqfLevel}</strong>
          </div>
          <div style="background:var(--bg-card-subtle); padding: 10px; border-radius: 6px; border:1px solid var(--border-color);">
            <span style="color:var(--text-muted); font-size:0.68rem; display:block;">Active Industry Vacancies</span>
            <strong style="color: var(--blue);">${trade.industryDemand.toLocaleString('en-IN')}</strong>
          </div>
          <div style="background:var(--bg-card-subtle); padding: 10px; border-radius: 6px; border:1px solid var(--border-color);">
            <span style="color:var(--text-muted); font-size:0.68rem; display:block;">Current Sanctioned Seats</span>
            <strong style="color:var(--text-main);">${trade.currentCapacity.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <h4 style="font-size:0.82rem; font-weight:700; color:var(--text-secondary); margin: 14px 0 6px;">Heterogeneous Signal Breakdown:</h4>
        <div style="background:var(--bg-app); border:1px solid var(--border-color); padding: 10px; border-radius: 6px; font-size: 0.78rem; font-family:var(--font-mono); color:var(--text-main);">
          <div>• Job Portals (Naukri/Indeed/LinkedIn): ${trade.signals.jobPortals.toLocaleString('en-IN')} postings</div>
          <div>• National Career Service (NCS): ${trade.signals.ncsPortal.toLocaleString('en-IN')} vacancies</div>
          <div>• e-Shram Worker Mobility: ${trade.signals.eShramRegistrations.toLocaleString('en-IN')} registrations</div>
          <div>• PLFS Trainee Absorption: ${trade.signals.plfsAbsorptionRate}</div>
        </div>

        <div class="recommendation-banner" style="margin-top: 14px;">
          <h5>MSDE / NCVET Action Directive</h5>
          <p>${trade.actionRecommendation}</p>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap: 8px;">
        <button class="ctrl-btn" onclick="document.getElementById('exportModal').classList.remove('active');">Close</button>
        <button class="ctrl-btn btn-saffron" onclick="alert('Directive transmitted to State Skill Mission.');">Transmit Directive</button>
      </div>
    `;

    modal.classList.add('active');
  }

  // Export Plan Modal
  function openExportModal(type) {
    const modal = document.getElementById('exportModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalTitle || !modalBody) return;

    if (type === 'DAP') {
      modalTitle.textContent = "District Skilling Plan (DSP) - Executive Brief";
      modalBody.innerHTML = `
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
          Official synthesized skilling forecast ready for submission to the District Skill Committee (DSC) chaired by the District Magistrate.
        </p>
        <div style="background: var(--bg-app); border:1px solid var(--border-color); padding: 14px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.76rem; color: var(--blue); max-height: 260px; overflow-y: auto;">
============================================================
GOVERNMENT OF INDIA - MINISTRY OF SKILL DEVELOPMENT (MSDE)
DISTRICT SKILLING PLAN FORECAST (2026-2027)
GEOGRAPHY: Maharashtra / Pune Cluster (CENSUS CODE: 521)
============================================================
1. CAPACITY MISALIGNMENT INDEX: 43.6% (FLAGGED FOR REVISION)
2. CRITICAL SEAT REALLOCATION TARGET: 22,500 SEATS

3. PRIORITY CAPACITY EXPANSIONS:
   - EV Battery Assembly & BMS Technician (NSQF 4): +22,100 seats
   - Solar PV Rooftop Microgrid Specialist (NSQF 4): +14,200 seats
   - Automated Warehouse & WMS Executive (NSQF 4): +12,500 seats

4. PRIORITY SEAT FREEZES / RETIRALS:
   - Conventional Lathe Turner (NSQF 3): -24,500 seats (Deprecate)
   - General Data Entry Operator (NSQF 3): -45,000 seats (Sunset)

5. PROJECTED BUDGET EFFICIENCY: ₹14.85 Cr
6. PROJECTED FORMAL ABSORPTION RATE: 78.4% (vs 56.4% prior)
============================================================
        </div>
        <div style="display:flex; justify-content:flex-end; gap: 8px; margin-top: 14px;">
          <button class="ctrl-btn" onclick="document.getElementById('exportModal').classList.remove('active');">Close</button>
          <button class="ctrl-btn btn-primary" onclick="window.print()">Print / Save PDF</button>
        </div>
      `;
    } else {
      modalTitle.textContent = "Export for Skill India Digital (SIP)";
      modalBody.innerHTML = `
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
          Direct target import payload schema for MSDE Skill India Digital Portal (SIP) Target Allocation API.
        </p>
        <pre class="api-json-pre" style="max-height: 260px; overflow-y: auto;"><code>{
  "batchYear": "2026-2027",
  "approvalCycle": "CYCLE_A_ANNUAL",
  "sanctioningBody": "MSDE_NCVET",
  "targetAllocations": [
    {
      "qpCode": "ASC/Q1423",
      "tradeName": "EV Battery Assembly & BMS Technician",
      "stateCode": "MH",
      "districtCode": "MH-PUN",
      "targetSeats": 28500,
      "previousAllocated": 6400,
      "variancePct": "+345%"
    },
    {
      "qpCode": "CSC/Q0110",
      "tradeName": "Conventional Lathe Turner",
      "stateCode": "MH",
      "districtCode": "MH-PUN",
      "targetSeats": 8500,
      "previousAllocated": 33000,
      "action": "CAP_AND_CONVERT"
    }
  ]
}</code></pre>
        <div style="display:flex; justify-content:flex-end; gap: 8px; margin-top: 14px;">
          <button class="ctrl-btn" onclick="document.getElementById('exportModal').classList.remove('active');">Close</button>
          <button class="ctrl-btn btn-saffron" onclick="navigator.clipboard.writeText(JSON.stringify(BHARAT_DATA.trades, null, 2)); alert('JSON payload copied to clipboard!');">Copy JSON Payload</button>
        </div>
      `;
    }

    modal.classList.add('active');
  }
});
