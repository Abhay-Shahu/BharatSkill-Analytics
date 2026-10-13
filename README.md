# BharatSkill Analytics (भारत कौशल विश्लेषण)
### National Labour Market Intelligence System (LMIS) & Dynamic Skilling Capacity Allocator

**BharatSkill Analytics** is a decision-ready Labour Market Intelligence System built for the **Ministry of Skill Development & Entrepreneurship (MSDE)**, **National Council for Vocational Education and Training (NCVET)**, and **Sector Skill Councils (SSCs)**.

It resolves India's acute skilling mismatch — where lakhs of candidates are trained in saturated legacy trades while emerging high-growth industries face severe candidate shortages — by synthesizing fragmented labour signals into granular, forward-looking district forecasts *before* annual training targets are locked in.

---

## 1. Key Capabilities & Problem Solved

| Problem in Current System | BharatSkill Analytics Solution |
| :--- | :--- |
| **Fragmented Data**: PLFS is annual/macro, e-Shram is unorganized, NCS and private job portals operate in silos. | **Unified Labour Demand Index (LDI)** harmonizing formal job scrapes (40%), NCS (25%), e-Shram mobility pulses (20%), and PLFS absorption rates (15%). |
| **Delayed Discovery**: Oversupply is discovered only after placement outcomes are reported. | **Forward-Looking Early-Warning Radar** flagging acute shortage (>2.0x) and chronic oversupply (<0.5x) 12 months ahead of target setting. |
| **Coarse Sanctions**: Training seats sanctioned at state or national aggregates, ignoring district-level economic realities. | **District & Trade Drilldown** mapped to **NCO-2015 4-digit codes** and **NSQF Qualification Packs (QPs)**. |
| **Rigid Target Setting**: Planners lack simulation tools to test what happens if seats are reallocated. | **Target Reallocation Lab** simulating placement % uplift, wage growth, and public training subsidy efficiency (₹ Crores saved). |
| **Siloed Systems**: Manual target communication between MSDE, SSDMs, and ITIs. | **API & Interoperability Layer** ready for direct import into **Skill India Digital Portal (SIP)** and District Skilling Plans (DAPs). |

---

## 2. Mathematical Methodology: Labour Demand Index (LDI)

The prototype implements a weighted multi-source harmonization index:

$$LDI_{i,d,t} = \alpha \cdot S^{\text{portals}}_{i,d,t} + \beta \cdot S^{\text{NCS}}_{i,d,t} + \gamma \cdot \Delta^{\text{eShram}}_{i,d,t} + \delta \cdot \Omega^{\text{PLFS}}_{i,t}$$

Where:
- $i$ = Trade / Occupation code (NCO-2015)
- $d$ = District (Census code)
- $t$ = Time window (Rolling 90-day / 12-month forward projection)
- $\alpha = 0.40$: Formal hiring signal volume & wage velocity from job portals (Naukri, LinkedIn, Indeed)
- $\beta = 0.25$: National Career Service (NCS) and Rozgar Mela verified vacancies
- $\gamma = 0.20$: e-Shram worker mobility and micro-entrepreneurial demand pulses
- $\delta = 0.15$: Periodic Labour Force Survey (PLFS) official sector absorption rate

### Gap Severity Classification

$$\text{Demand-Supply Ratio (DSR)} = \frac{\text{LDI (Aggregated Demand)}}{\text{TCI (Sanctioned Training Capacity)}}$$

- **Acute Shortage**: $DSR > 2.0x$ $\rightarrow$ Sanction emergency PMKK batches, approve new NSQF 4/5 curricula.
- **High Growth**: $1.5x \le DSR \le 2.0x$ $\rightarrow$ Scale annual intake by 30-50%.
- **Balanced**: $0.8x \le DSR \le 1.2x$ $\rightarrow$ Maintain baseline quotas.
- **Approaching Saturation**: $0.5x \le DSR < 0.8x$ $\rightarrow$ Restrict new centre accreditations.
- **Chronic Oversupply**: $DSR < 0.5x$ $\rightarrow$ Freeze annual intake, sunset outdated courses, repurpose lab equipment.

---

## 3. Pilot Geographies & Sectors Covered

### Pilot States & Districts:
- **Maharashtra**: Pune (Automotive/EV & IT), Nagpur (Logistics/Machining), Nashik (Cold Chain/Agri-tech), Mumbai Suburban (Healthcare/FinTech), Chhatrapati Sambhaji Nagar.
- **Uttar Pradesh**: Gautam Buddha Nagar / Noida (Electronics ESDM & AI), Lucknow (Healthcare/DEO), Kanpur Nagar (Machining/Apparel), Varanasi (Textiles/IT), Agra.
- **Karnataka**: Bengaluru Urban (IT/AI, EV, Health), Mysuru, Dharwad/Hubballi, Belagavi.
- **Gujarat**: Ahmedabad, Surat (Textiles/Solar), Vadodara, Bharuch (Chemicals & Industrial).
- **Tamil Nadu**: Chennai, Coimbatore (Precision Machining), Sriperumbudur / Kanchipuram (Electronics & EV), Tiruppur (Technical Textiles).

### High-Impact Pilot Sectors:
1. **Electric Mobility & Green Energy (EV)**
2. **Electronics & Semiconductor Manufacturing (ESDM)**
3. **Healthcare & Emergency Care**
4. **AI, Cloud & Data Annotation**
5. **Logistics, Warehousing & Supply Chain**
6. **Capital Goods & Precision Machining**
7. **Apparel & Technical Textiles**
8. **Green Construction & Prefabricated BIM**

---

## 4. Architecture & Features Included

1. **Executive LMIS Dashboard**:
   - Live National KPIs (Annual Training Pipeline, Industry Demand, Misalignment %, Reallocation Potential).
   - Sector comparison bar charts (Vacancies vs Sanctioned Seats).
   - State-wise performance cards with alignment ratings.

2. **District & Trade Drilldown Table**:
   - Interactive multi-parameter filters (State, District, Sector, Gap Severity).
   - Real-time search across NCO-2015 codes, NSQF levels, and job titles.
   - Granular metrics: Demand, Capacity, Gap Delta, Average Monthly Salary, YoY growth, and policy directives.

3. **Early-Warning Radar & 4-Quadrant Mismatch Matrix**:
   - Visual quadrant: *Acute Shortage*, *High Growth*, *Chronic Oversupply*, and *Demand Matched*.
   - Live early-warning feed with directive banners.

4. **Target Reallocation Lab (Interactive Simulator)**:
   - Dynamic slider to test moving seats from saturated trades into shortage trades.
   - Calculates projected placement rate uplift, average starting wage change, and public subsidy efficiency in ₹ Crores.

5. **LDI Harmonization Engine & 5-Stage Ingestion Pipeline**:
   - Documented methodology and interactive mathematical breakdown.
   - 5-stage ingestion: Raw Deduplication $\rightarrow$ Taxonomy Harmonization $\rightarrow$ Spatial Disaggregation $\rightarrow$ Supply Triangulation $\rightarrow$ Gap Forecasting.

6. **API Sandbox & Policy Exports**:
   - Machine-readable REST endpoints (`GET /api/v1/forecast/district/{id}`, `GET /api/v1/trades/early-warnings`, `POST /api/v1/targets/reallocate-simulation`).
   - One-click export of **District Skilling Plans (DSP)** and **Skill India Digital (SIP)** JSON payloads.

7. **Multilingual & Accessible GovTech UI**:
   - English, हिन्दी (Hindi), मराठी (Marathi), and தமிழ் (Tamil).
   - Executive GovTech Dark Mode and Accessible Light Mode.

---

## 5. How to Run Locally

Because the prototype is built with standard modern Web standards (HTML5, Vanilla CSS, and modular ES6 JavaScript), you can view it directly in any modern browser:

### Option 1: Direct File Opening
Double-click `index.html` or open it directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.

### Option 2: Local HTTP Server (PowerShell / Python / Node)
```powershell
# Using Python
python -m http.server 8000

# Or using Node http-server / npx serve
npx -y serve .
```
Navigate to `http://localhost:8000` to interact with the full prototype.
