/**
 * BharatSkill Analytics - Comprehensive Labour Market Intelligence (LMIS) Dataset
 * Real-world mapped codes: NCO-2015, NSQF Levels, e-Shram, NCS, PLFS, PMKVY/ITI Capacities
 */

const BHARAT_DATA = {
  nationalStats: {
    totalEnrolled: 4280450,
    activeVacancies: 3845200,
    placementRate: 58.4,
    misalignmentIndex: 43.6, // % of seats in non-demand trades
    criticalDistricts: 142,
    chronicOverSupplyTrades: 34,
    acuteShortageTrades: 48,
    reallocationPotential: 782000
  },

  languages: {
    en: {
      tagline: "National Labour Market Intelligence & Predictive Skilling System",
      brand: "BharatSkill Analytics",
      dept: "Ministry of Skill Development & Entrepreneurship (MSDE) | Govt. of India",
      navOverview: "Executive LMIS",
      navExplorer: "District & Trade Drilldown",
      navEarlyWarning: "Early-Warning Radar",
      navSimulator: "Target Reallocation Lab",
      navMethodology: "LDI Harmonization Engine",
      navApi: "API & Data Exports",
      kpiPipeline: "Annual Skilling Pipeline",
      kpiDemand: "Active Industry Demand",
      kpiMisalignment: "Capacity Misalignment",
      kpiReallocation: "Reallocation Potential",
      filterState: "Select State / UT",
      filterDistrict: "Select District",
      filterSector: "Select Sector",
      filterStatus: "Gap Severity",
      searchPlaceholder: "Search by Trade, NCO-2015 code, or NSQF level...",
      exportDAP: "Export District Skilling Plan",
      exportSIP: "Export for Skill India Digital (SIP)",
      simulateBtn: "Run Reallocation Simulation",
      recommendationTitle: "MSDE Actionable Recommendation",
      statusAcute: "Acute Shortage",
      statusGrowth: "High Growth",
      statusBalanced: "Demand Matched",
      statusSaturation: "Approaching Saturation",
      statusChronic: "Chronic Oversupply"
    },
    hi: {
      tagline: "राष्ट्रीय श्रम बाजार आसूचना एवं भविष्योन्मुखी कौशल नियोजन प्रणाली",
      brand: "भारतस्किल एनालिटिक्स",
      dept: "कौशल विकास एवं उद्यमिता मंत्रालय (MSDE) | भारत सरकार",
      navOverview: "कार्यकारी डैशबोर्ड",
      navExplorer: "जिला एवं ट्रेड विवरण",
      navEarlyWarning: "पूर्व चेतावनी रडार",
      navSimulator: "लक्ष्य पुनरावंटन लैब",
      navMethodology: "एलडीआई सामंजस्य पद्धति",
      navApi: "एपीआई व डेटा निर्यात",
      kpiPipeline: "वार्षिक प्रशिक्षण पाइपलाइन",
      kpiDemand: "सक्रिय उद्योग मांग",
      kpiMisalignment: "क्षमता असंतुलन",
      kpiReallocation: "पुनरावंटन योग्य सीटें",
      filterState: "राज्य / केंद्रशासित प्रदेश",
      filterDistrict: "जिला चुनें",
      filterSector: "क्षेत्र (सेक्टर) चुनें",
      filterStatus: "गैप गंभीरता",
      searchPlaceholder: "ट्रेड, एनसीओ कोड या एनएसक्यूएफ स्तर खोजें...",
      exportDAP: "जिला कौशल योजना निर्यात करें",
      exportSIP: "स्किल इंडिया पोर्टल (SIP) हेतु निर्यात",
      simulateBtn: "पुनरावंटन सिमुलेशन चलाएं",
      recommendationTitle: "मंत्रालय हेतु नीतिगत अनुशंसा",
      statusAcute: "गंभीर कमी",
      statusGrowth: "उच्च वृद्धि",
      statusBalanced: "संतुलित मांग",
      statusSaturation: "संतृप्ति निकट",
      statusChronic: "गंभीर अधिशेष"
    },
    mr: {
      tagline: "राष्ट्रीय कामगार बाजार गुप्तवार्ता व कौशल्य नियोजन प्रणाली",
      brand: "भारतस्किल अ‍ॅनालिटिक्स",
      dept: "कौशल्य विकास आणि उद्योजकता मंत्रालय (MSDE) | भारत सरकार",
      navOverview: "कार्यकारी डॅशबोर्ड",
      navExplorer: "जिल्हा व व्यवसाय तपशील",
      navEarlyWarning: "पूर्वसूचना रडार",
      navSimulator: "लक्ष्य पुनर्वितरण लॅब",
      navMethodology: "एलडीआय पद्धत",
      navApi: "एपीआय व निर्यात",
      kpiPipeline: "वार्षिक प्रशिक्षण क्षमता",
      kpiDemand: "सक्रिय उद्योग मागणी",
      kpiMisalignment: "क्षमता तफावत",
      kpiReallocation: "पुनर्वितरण जागा",
      filterState: "राज्य निवडा",
      filterDistrict: "जिल्हा निवडा",
      filterSector: "क्षेत्र निवडा",
      filterStatus: "गंभीरता",
      searchPlaceholder: "व्यवसाय किंवा NCO कोड शोधा...",
      exportDAP: "जिल्हा आराखडा डाउनलोड करा",
      exportSIP: "SIP साठी निर्यात करा",
      simulateBtn: "सिम्युलेशन चालवा",
      recommendationTitle: "धोरणात्मक शिफारस",
      statusAcute: "तीव्र तुटवडा",
      statusGrowth: "वाढती मागणी",
      statusBalanced: "संतुलित",
      statusSaturation: "संतृप्ततेकडे",
      statusChronic: "तीव्र अतिरिक्त पुरवठा"
    },
    ta: {
      tagline: "தேசிய தொழிலாளர் சந்தை நுண்ணறிவு மற்றும் திறன் திட்டமிடல் தளம்",
      brand: "பாரத்கில் அனலிட்டிக்ஸ்",
      dept: "திறன் மேம்பாடு மற்றும் தொழில்முனைவோர் அமைச்சகம் (MSDE) | இந்திய அரசு",
      navOverview: "முதன்மை பலகை",
      navExplorer: "மாவட்டம் & தொழில் பகுப்பாய்வு",
      navEarlyWarning: "முன்னெச்சரிக்கை ரேடார்",
      navSimulator: "இலக்கு மறுஒதுக்கீட்டு ஆய்வகம்",
      navMethodology: "LDI ஒருங்கிணைப்பு முறை",
      navApi: "API & தரவு ஏற்றுமதி",
      kpiPipeline: "ஆண்டு பயிற்சி இடங்கள்",
      kpiDemand: "தொழில்துறை தேவை",
      kpiMisalignment: "சமநிலையின்மை குறியீடு",
      kpiReallocation: "மறுஒதுக்கீட்டு சாத்தியம்",
      filterState: "மாநிலம்",
      filterDistrict: "மாவட்டம்",
      filterSector: "துறை",
      filterStatus: "இடைவெளி நிலை",
      searchPlaceholder: "தொழில் அல்லது NCO குறியீட்டைத் தேடுக...",
      exportDAP: "மாவட்ட திட்டத்தை பதிவிறக்கு",
      exportSIP: "SIP-க்கு ஏற்றுமதி செய்க",
      simulateBtn: "உருவகப்படுத்துதல் இயக்கு",
      recommendationTitle: "கொள்கை பரிந்துரை",
      statusAcute: "கடுமையான பற்றாக்குறை",
      statusGrowth: "உயர் வளர்ச்சி",
      statusBalanced: "சமச்சீர்",
      statusSaturation: "நிறைவு நிலை",
      statusChronic: "அதிகப்படியான சப்ளை"
    }
  },

  states: [
    {
      id: "MH",
      name: "Maharashtra",
      capital: "Mumbai",
      enrolled: 485000,
      demand: 520000,
      alignment: 62.1,
      districts: [
        { id: "MH-PUN", name: "Pune", zone: "Western", enrolled: 68500, demand: 94200, alignment: 56.4 },
        { id: "MH-NAG", name: "Nagpur", zone: "Vidarbha", enrolled: 42100, demand: 31500, alignment: 68.2 },
        { id: "MH-NAS", name: "Nashik", zone: "North MH", enrolled: 38400, demand: 41200, alignment: 64.0 },
        { id: "MH-MUM", name: "Mumbai Suburban", zone: "Konkan", enrolled: 89000, demand: 132000, alignment: 59.8 },
        { id: "MH-AUR", name: "Chhatrapati Sambhaji Nagar", zone: "Marathwada", enrolled: 31200, demand: 28900, alignment: 71.5 }
      ]
    },
    {
      id: "UP",
      name: "Uttar Pradesh",
      capital: "Lucknow",
      enrolled: 742000,
      demand: 510000,
      alignment: 48.9,
      districts: [
        { id: "UP-NOI", name: "Gautam Buddha Nagar (Noida)", zone: "Western UP", enrolled: 62000, demand: 98000, alignment: 51.2 },
        { id: "UP-LKO", name: "Lucknow", zone: "Central UP", enrolled: 54000, demand: 43200, alignment: 62.4 },
        { id: "UP-KAN", name: "Kanpur Nagar", zone: "Central UP", enrolled: 49500, demand: 32100, alignment: 54.0 },
        { id: "UP-VAR", name: "Varanasi", zone: "Eastern UP", enrolled: 41200, demand: 29400, alignment: 58.7 },
        { id: "UP-AGR", name: "Agra", zone: "Western UP", enrolled: 38900, demand: 26500, alignment: 53.1 }
      ]
    },
    {
      id: "KA",
      name: "Karnataka",
      capital: "Bengaluru",
      enrolled: 395000,
      demand: 540000,
      alignment: 65.3,
      districts: [
        { id: "KA-BLR", name: "Bengaluru Urban", zone: "South KA", enrolled: 112000, demand: 185000, alignment: 54.8 },
        { id: "KA-MYS", name: "Mysuru", zone: "South KA", enrolled: 34200, demand: 39800, alignment: 72.1 },
        { id: "KA-DHW", name: "Dharwad / Hubballi", zone: "North KA", enrolled: 29800, demand: 24500, alignment: 69.4 },
        { id: "KA-BEL", name: "Belagavi", zone: "North KA", enrolled: 31400, demand: 26800, alignment: 66.8 }
      ]
    },
    {
      id: "GJ",
      name: "Gujarat",
      capital: "Gandhinagar",
      enrolled: 340000,
      demand: 410000,
      alignment: 67.8,
      districts: [
        { id: "GJ-AHM", name: "Ahmedabad", zone: "Central GJ", enrolled: 76000, demand: 98000, alignment: 68.4 },
        { id: "GJ-SUR", name: "Surat", zone: "South GJ", enrolled: 68500, demand: 81200, alignment: 70.2 },
        { id: "GJ-VAD", name: "Vadodara", zone: "Central GJ", enrolled: 44200, demand: 52400, alignment: 65.9 },
        { id: "GJ-BHA", name: "Bharuch (Chemical Hub)", zone: "South GJ", enrolled: 28400, demand: 41500, alignment: 58.2 }
      ]
    },
    {
      id: "TN",
      name: "Tamil Nadu",
      capital: "Chennai",
      enrolled: 420000,
      demand: 495000,
      alignment: 69.2,
      districts: [
        { id: "TN-CHE", name: "Chennai", zone: "North TN", enrolled: 92000, demand: 124000, alignment: 66.3 },
        { id: "TN-CBE", name: "Coimbatore", zone: "West TN", enrolled: 58000, demand: 76000, alignment: 71.8 },
        { id: "TN-KAN", name: "Sriperumbudur (Kanchipuram)", zone: "North TN", enrolled: 44000, demand: 68000, alignment: 53.4 },
        { id: "TN-TPR", name: "Tiruppur", zone: "West TN", enrolled: 39500, demand: 42000, alignment: 76.5 }
      ]
    }
  ],

  sectors: [
    { id: "EV", name: "Electric Mobility & Green Energy", icon: "zap", color: "#10b981" },
    { id: "ESDM", name: "Electronics & Semiconductor Mfg", icon: "cpu", color: "#3b82f6" },
    { id: "HLTH", name: "Healthcare & Emergency Care", icon: "activity", color: "#ec4899" },
    { id: "ITAI", name: "AI, Cloud & Data Annotation", icon: "terminal", color: "#8b5cf6" },
    { id: "LOG", name: "Logistics, Warehousing & Supply Chain", icon: "truck", color: "#f59e0b" },
    { id: "CAP", name: "Capital Goods & Precision Machining", icon: "settings", color: "#64748b" },
    { id: "APP", name: "Apparel & Technical Textiles", icon: "scissors", color: "#06b6d4" },
    { id: "CNST", name: "Green Construction & Prefab", icon: "home", color: "#84cc16" }
  ],

  // Granular trades with cross-referenced labour signals
  trades: [
    {
      id: "TRD-EV-01",
      tradeName: "EV Battery Assembly & BMS Technician",
      sectorId: "EV",
      ncoCode: "NCO-2015: 7412.0201",
      nsqfLevel: 4,
      currentCapacity: 6400,
      industryDemand: 28500,
      demandSupplyRatio: 4.45,
      gapType: "acute", // acute shortage
      wageAvg: "₹24,500/m",
      growthYoY: "+114%",
      signals: {
        jobPortals: 19400,
        ncsPortal: 5600,
        eShramRegistrations: 1200,
        plfsAbsorptionRate: "94.2%"
      },
      pilotDistricts: ["MH-PUN", "MH-NAG", "TN-KAN", "KA-BLR", "GJ-AHM", "UP-NOI"],
      actionRecommendation: "Immediately sanction 40 new PMKK batches; convert legacy Automobile Repair seats; notify NSQF QP ASC/Q1423 in ITIs."
    },
    {
      id: "TRD-EV-02",
      tradeName: "Solar PV Rooftop Microgrid Specialist",
      sectorId: "EV",
      ncoCode: "NCO-2015: 7421.0302",
      nsqfLevel: 4,
      currentCapacity: 11200,
      industryDemand: 34800,
      demandSupplyRatio: 3.10,
      gapType: "acute",
      wageAvg: "₹21,000/m",
      growthYoY: "+88%",
      signals: {
        jobPortals: 21500,
        ncsPortal: 8900,
        eShramRegistrations: 4400,
        plfsAbsorptionRate: "89.6%"
      },
      pilotDistricts: ["GJ-AHM", "UP-NOI", "MH-NAG", "MH-PUN", "KA-BLR", "TN-CHE"],
      actionRecommendation: "Tie-up with PM Surya Ghar Muft Bijli Yojana; deploy 100 mobile training labs across tier-2/3 districts."
    },
    {
      id: "TRD-ESDM-01",
      tradeName: "SMT Surface Mount Pick-and-Place Operator",
      sectorId: "ESDM",
      ncoCode: "NCO-2015: 8212.0101",
      nsqfLevel: 3,
      currentCapacity: 8900,
      industryDemand: 31200,
      demandSupplyRatio: 3.50,
      gapType: "acute",
      wageAvg: "₹19,800/m",
      growthYoY: "+96%",
      signals: {
        jobPortals: 23100,
        ncsPortal: 6200,
        eShramRegistrations: 1900,
        plfsAbsorptionRate: "91.5%"
      },
      pilotDistricts: ["UP-NOI", "TN-KAN", "KA-BLR", "MH-PUN", "MH-NAG", "GJ-AHM"],
      actionRecommendation: "Direct tie-in with electronics PLI industrial corridors (Noida-Greater Noida & Sriperumbudur); dual-skilling apprenticeship mandated."
    },
    {
      id: "TRD-ESDM-02",
      tradeName: "PCB Assembly & AOI Inspector",
      sectorId: "ESDM",
      ncoCode: "NCO-2015: 7421.0401",
      nsqfLevel: 4,
      currentCapacity: 14200,
      industryDemand: 24800,
      demandSupplyRatio: 1.74,
      gapType: "growth", // high growth
      wageAvg: "₹22,000/m",
      growthYoY: "+52%",
      signals: {
        jobPortals: 16800,
        ncsPortal: 5900,
        eShramRegistrations: 2100,
        plfsAbsorptionRate: "85.2%"
      },
      pilotDistricts: ["UP-NOI", "TN-KAN", "GJ-AHM", "KA-BLR", "MH-NAG", "TN-CHE"],
      actionRecommendation: "Expand NSQF level 4 intake by 40% in upcoming Q3 cycle across electronics cluster districts."
    },
    {
      id: "TRD-HLTH-01",
      tradeName: "Emergency Medical Technician (Advanced)",
      sectorId: "HLTH",
      ncoCode: "NCO-2015: 3258.0101",
      nsqfLevel: 5,
      currentCapacity: 9200,
      industryDemand: 27900,
      demandSupplyRatio: 3.03,
      gapType: "acute",
      wageAvg: "₹26,000/m",
      growthYoY: "+74%",
      signals: {
        jobPortals: 18900,
        ncsPortal: 7100,
        eShramRegistrations: 1800,
        plfsAbsorptionRate: "96.1%"
      },
      pilotDistricts: ["MH-MUM", "UP-LKO", "KA-BLR", "TN-CHE"],
      actionRecommendation: "District hospital on-the-job training MoU with State Health Missions; subsidize certification fees for female candidates."
    },
    {
      id: "TRD-HLTH-02",
      tradeName: "Geriatric & Palliative Care Attendant",
      sectorId: "HLTH",
      ncoCode: "NCO-2015: 5321.0201",
      nsqfLevel: 4,
      currentCapacity: 12400,
      industryDemand: 22100,
      demandSupplyRatio: 1.78,
      gapType: "growth",
      wageAvg: "₹20,500/m",
      growthYoY: "+48%",
      signals: {
        jobPortals: 14200,
        ncsPortal: 6100,
        eShramRegistrations: 1800,
        plfsAbsorptionRate: "82.4%"
      },
      pilotDistricts: ["TN-CHE", "MH-MUM", "KA-BLR", "UP-LKO"],
      actionRecommendation: "Scale up intake in metro satellite districts; link with overseas mobility pathways (Japan TITP / Germany nurse-assistant)."
    },
    {
      id: "TRD-ITAI-01",
      tradeName: "Computer Vision & LLM Data Annotator",
      sectorId: "ITAI",
      ncoCode: "NCO-2015: 4132.0301",
      nsqfLevel: 4,
      currentCapacity: 18500,
      industryDemand: 52000,
      demandSupplyRatio: 2.81,
      gapType: "acute",
      wageAvg: "₹23,000/m",
      growthYoY: "+140%",
      signals: {
        jobPortals: 39500,
        ncsPortal: 9800,
        eShramRegistrations: 2700,
        plfsAbsorptionRate: "88.9%"
      },
      pilotDistricts: ["KA-BLR", "MH-PUN", "UP-NOI", "UP-VAR"],
      actionRecommendation: "Roll out hybrid digital training nodes in Tier 2/3 districts (Varanasi, Hubballi); target non-STEM degree holders."
    },
    {
      id: "TRD-ITAI-02",
      tradeName: "Cloud Infrastructure Support Associate",
      sectorId: "ITAI",
      ncoCode: "NCO-2015: 3513.0101",
      nsqfLevel: 5,
      currentCapacity: 28000,
      industryDemand: 34000,
      demandSupplyRatio: 1.21,
      gapType: "balanced",
      wageAvg: "₹28,000/m",
      growthYoY: "+22%",
      signals: {
        jobPortals: 26000,
        ncsPortal: 6500,
        eShramRegistrations: 1500,
        plfsAbsorptionRate: "79.0%"
      },
      pilotDistricts: ["KA-BLR", "MH-PUN", "UP-NOI", "TN-CHE"],
      actionRecommendation: "Maintain current target baselines; update syllabus with DevOps & Kubeflow micro-modules."
    },
    {
      id: "TRD-LOG-01",
      tradeName: "Automated Warehouse & WMS Executive",
      sectorId: "LOG",
      ncoCode: "NCO-2015: 4321.0301",
      nsqfLevel: 4,
      currentCapacity: 16400,
      industryDemand: 38900,
      demandSupplyRatio: 2.37,
      gapType: "acute",
      wageAvg: "₹18,500/m",
      growthYoY: "+65%",
      signals: {
        jobPortals: 27100,
        ncsPortal: 8900,
        eShramRegistrations: 2900,
        plfsAbsorptionRate: "86.4%"
      },
      pilotDistricts: ["MH-PUN", "UP-NOI", "GJ-AHM", "KA-BLR"],
      actionRecommendation: "Establish simulator-equipped training hubs in e-commerce logistics clusters (Chakan-Pune, Bhiwandi, Greater Noida)."
    },
    {
      id: "TRD-LOG-02",
      tradeName: "Cold-Chain Logistics Controller",
      sectorId: "LOG",
      ncoCode: "NCO-2015: 8343.0101",
      nsqfLevel: 4,
      currentCapacity: 7200,
      industryDemand: 16500,
      demandSupplyRatio: 2.29,
      gapType: "growth",
      wageAvg: "₹21,500/m",
      growthYoY: "+42%",
      signals: {
        jobPortals: 11400,
        ncsPortal: 3800,
        eShramRegistrations: 1300,
        plfsAbsorptionRate: "84.1%"
      },
      pilotDistricts: ["MH-NAS", "GJ-SUR", "UP-AGR", "TN-CBE"],
      actionRecommendation: "Focus on agri-export corridors (Nashik grapes, Surat aquaculture, Agra food processing) with NHM joint certifications."
    },
    {
      id: "TRD-CAP-01",
      tradeName: "CNC Programmer & 5-Axis Milling Setter",
      sectorId: "CAP",
      ncoCode: "NCO-2015: 7223.0102",
      nsqfLevel: 5,
      currentCapacity: 21000,
      industryDemand: 36500,
      demandSupplyRatio: 1.73,
      gapType: "growth",
      wageAvg: "₹25,000/m",
      growthYoY: "+38%",
      signals: {
        jobPortals: 26100,
        ncsPortal: 8100,
        eShramRegistrations: 2300,
        plfsAbsorptionRate: "87.3%"
      },
      pilotDistricts: ["MH-PUN", "TN-CBE", "GJ-VAD", "KA-BEL"],
      actionRecommendation: "Upgrade legacy 3-axis CNC training machines at ITIs to multi-axis CAD/CAM simulation workstations."
    },
    {
      id: "TRD-CAP-02",
      tradeName: "Conventional Lathe & Manual Shaper Turner",
      sectorId: "CAP",
      ncoCode: "NCO-2015: 7223.0201",
      nsqfLevel: 3,
      currentCapacity: 64000,
      industryDemand: 19500,
      demandSupplyRatio: 0.30,
      gapType: "chronic", // chronic oversupply
      wageAvg: "₹12,800/m",
      growthYoY: "-24%",
      signals: {
        jobPortals: 11200,
        ncsPortal: 6500,
        eShramRegistrations: 1800,
        plfsAbsorptionRate: "39.2%"
      },
      pilotDistricts: ["UP-KAN", "MH-NAG", "GJ-VAD", "TN-CBE"],
      actionRecommendation: "CRITICAL: Freeze 45% annual intake targets. Repurpose machine shop infrastructure into CNC and Robotic Welding bays."
    },
    {
      id: "TRD-APP-01",
      tradeName: "Basic Sewing Machine Operator (Conventional)",
      sectorId: "APP",
      ncoCode: "NCO-2015: 8153.0101",
      nsqfLevel: 2,
      currentCapacity: 92000,
      industryDemand: 31000,
      demandSupplyRatio: 0.33,
      gapType: "chronic",
      wageAvg: "₹11,500/m",
      growthYoY: "-18%",
      signals: {
        jobPortals: 16500,
        ncsPortal: 12000,
        eShramRegistrations: 2500,
        plfsAbsorptionRate: "36.8%"
      },
      pilotDistricts: ["UP-VAR", "UP-KAN", "TN-TPR", "GJ-SUR"],
      actionRecommendation: "CHRONIC OVERSUPPLY: Reallocate 55% seat quota immediately to CAD Pattern Making & Automated Embroidery."
    },
    {
      id: "TRD-APP-02",
      tradeName: "Technical Textile & Protective Fabric Specialist",
      sectorId: "APP",
      ncoCode: "NCO-2015: 7318.0401",
      nsqfLevel: 4,
      currentCapacity: 4800,
      industryDemand: 18400,
      demandSupplyRatio: 3.83,
      gapType: "acute",
      wageAvg: "₹23,000/m",
      growthYoY: "+79%",
      signals: {
        jobPortals: 13200,
        ncsPortal: 4100,
        eShramRegistrations: 1100,
        plfsAbsorptionRate: "93.4%"
      },
      pilotDistricts: ["TN-TPR", "GJ-SUR", "MH-NAS", "UP-VAR"],
      actionRecommendation: "Establish 8 dedicated Centers of Excellence (CoE) under National Technical Textiles Mission (NTTM)."
    },
    {
      id: "TRD-ITAI-03",
      tradeName: "General Data Entry Operator (DEO)",
      sectorId: "ITAI",
      ncoCode: "NCO-2015: 4132.0101",
      nsqfLevel: 3,
      currentCapacity: 88000,
      industryDemand: 21500,
      demandSupplyRatio: 0.24,
      gapType: "chronic",
      wageAvg: "₹10,500/m",
      growthYoY: "-35%",
      signals: {
        jobPortals: 9800,
        ncsPortal: 9900,
        eShramRegistrations: 1800,
        plfsAbsorptionRate: "28.5%"
      },
      pilotDistricts: ["UP-LKO", "UP-VAR", "MH-NAG", "GJ-AHM", "KA-BLR"],
      actionRecommendation: "DEPRECATION NOTICE: Market absorption below 30%. Sunset standalone DEO qualification; roll skills into Prompt Engineering / AI Data Ops."
    },
    {
      id: "TRD-CNST-01",
      tradeName: "BIM Modeler & Prefabricated Structural Drafter",
      sectorId: "CNST",
      ncoCode: "NCO-2015: 3118.0302",
      nsqfLevel: 5,
      currentCapacity: 6200,
      industryDemand: 22800,
      demandSupplyRatio: 3.67,
      gapType: "acute",
      wageAvg: "₹27,500/m",
      growthYoY: "+84%",
      signals: {
        jobPortals: 16900,
        ncsPortal: 4800,
        eShramRegistrations: 1100,
        plfsAbsorptionRate: "92.0%"
      },
      pilotDistricts: ["MH-MUM", "KA-BLR", "UP-NOI", "TN-CHE"],
      actionRecommendation: "Infuse licensed BIM software in state polytechnics & ITIs; mandate green building carbon-accounting modules."
    },
    {
      id: "TRD-CNST-02",
      tradeName: "Manual Bar Bender & Steel Fixer",
      sectorId: "CNST",
      ncoCode: "NCO-2015: 7114.0101",
      nsqfLevel: 3,
      currentCapacity: 45000,
      industryDemand: 36000,
      demandSupplyRatio: 0.80,
      gapType: "saturation", // approaching saturation
      wageAvg: "₹14,500/m",
      growthYoY: "-8%",
      signals: {
        jobPortals: 21000,
        ncsPortal: 12500,
        eShramRegistrations: 2500,
        plfsAbsorptionRate: "62.0%"
      },
      pilotDistricts: ["UP-KAN", "MH-PUN", "TN-CHE", "GJ-SUR"],
      actionRecommendation: "Transition curriculum to automated hydraulic bar bending and precast assembly."
    }
  ],

  // Methodology formulation weights for the composite Labour Demand Index (LDI)
  methodology: {
    formula: "LDI_t = \\alpha \\cdot S_{portal} + \\beta \\cdot S_{ncs} + \\gamma \\cdot \\Delta_{eShram} + \\delta \\cdot \\Omega_{plfs}",
    weights: {
      jobPortals: { weight: 0.40, name: "Formal Job Portals & Hiring Signal API", sources: "Naukri, LinkedIn, Indeed (NCO-coded)" },
      ncsPortal: { weight: 0.25, name: "National Career Service (NCS) & Rozgar Melas", sources: "Ministry of Labour & Employment" },
      eShram: { weight: 0.20, name: "e-Shram Worker Mobility & Demand Pulses", sources: "Unorganized workforce migration & skill claims" },
      plfs: { weight: 0.15, name: "Periodic Labour Force Survey (PLFS) & SSC Quarterly", sources: "MoSPI official macroeconomic absorption" }
    },
    stages: [
      { step: 1, title: "Raw Ingestion & Deduplication", desc: "Collects 4.8M monthly job postings, 850k NCS openings, and 2.1M e-Shram worker queries with de-duping algorithms." },
      { step: 2, title: "Taxonomy Harmonization", desc: "Maps proprietary job titles to standard NCO-2015 (National Classification of Occupations) and NSQF (National Skills Qualification Framework) Levels 1-8 via NLP classifier." },
      { step: 3, title: "District-Level Spatial Disaggregation", desc: "Allocates national/state hiring signals to census district polygons using postal codes, industrial clusters, and EPFO establishment codes." },
      { step: 4, title: "Supply Triangulation", desc: "Cross-checks against PMKVY 4.0, DGT (ITI intake), PMKK, Apprenticeship Portal (NAPS), and State Mission (SSDM) sanctions." },
      { step: 5, title: "Gap Forecasting & Policy Flagging", desc: "Computes 12-month forward predictive gap ratio (LDI / TCI) to flag Acute Shortages (>2.0x) and Chronic Oversupply (<0.5x)." }
    ]
  },

  // Mock API endpoints for planners
  apiEndpoints: [
    {
      method: "GET",
      path: "/api/v1/forecast/district/{district_id}",
      summary: "Get district-level 12-month labour demand vs training capacity forecasts",
      params: "district_id (e.g. MH-PUN, UP-NOI)",
      responseExample: {
        district: "Pune (MH-PUN)",
        state: "Maharashtra",
        forecastPeriod: "2026-Q4 to 2027-Q3",
        overallAlignment: "56.4%",
        criticalTrades: [
          { trade: "EV Battery Assembly & BMS Technician", gapRatio: 4.45, severity: "ACUTE_SHORTAGE", deltaSeats: "+22,100" },
          { trade: "Automated Warehouse & WMS Executive", gapRatio: 2.37, severity: "ACUTE_SHORTAGE", deltaSeats: "+22,500" },
          { trade: "Conventional Lathe Turner", gapRatio: 0.30, severity: "CHRONIC_OVERSUPPLY", deltaSeats: "-44,500" }
        ]
      }
    },
    {
      method: "GET",
      path: "/api/v1/trades/early-warnings?severity=acute",
      summary: "Query trades requiring urgent scheme target sanctions or course revisions",
      params: "severity (acute | chronic | growth), sector_id",
      responseExample: {
        status: "success",
        totalFlagged: 48,
        priorityActionTrades: [
          { trade: "EV Battery Assembly", nco: "7412.0201", demand: 28500, seats: 6400, gap: "+345%" },
          { trade: "BIM Modeler", nco: "3118.0302", demand: 22800, seats: 6200, gap: "+267%" }
        ]
      }
    },
    {
      method: "POST",
      path: "/api/v1/targets/reallocate-simulation",
      summary: "Simulate seat reallocation and estimate placement rate & budgetary ROI",
      params: "district_id, shiftFromTradeId, shiftToTradeId, seatCount",
      responseExample: {
        districtId: "MH-PUN",
        reallocatedSeats: 2500,
        baselinePlacementRate: "56.4%",
        simulatedPlacementRate: "73.8%",
        budgetSavingsCrores: "₹6.82 Cr",
        industryHiringFulfillmentDays: 45
      }
    }
  ]
};
