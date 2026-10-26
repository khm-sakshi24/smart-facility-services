export interface ServiceDetail {
  slug: string;
  title: string;
  category: "Core Facility Operations" | "Technical & Electrical" | "Water & Environmental" | "Specialized Maintenance";
  status: "active" | "proposed";
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  typicalUseCases: string[];
  scopeOfWork: string[];
  benefits: string[];
  complianceNotes?: string;
  faqs: { question: string; answer: string }[];
}

export const servicesCatalogue: ServiceDetail[] = [
  {
    slug: "housekeeping-cleaning-services",
    title: "Housekeeping and Cleaning Services",
    category: "Core Facility Operations",
    status: "active",
    iconName: "Sparkles",
    shortDescription: "Systematic cleaning, sanitation, and hygiene upkeep for residential corridors, clubhouses, common washrooms, and corporate premises.",
    fullDescription: "Our housekeeping management delivers structured cleaning protocols tailored for residential communities, apartment associations, and commercial properties. We focus on common area hygiene, lobby maintenance, stairwells, basements, and waste segregation support.",
    typicalUseCases: [
      "Residential apartment lobbies, corridors, and clubhouses",
      "Corporate office common areas and commercial buildings",
      "Gated community recreational amenities and gymnasiums",
      "Basement parking and paved community walkways"
    ],
    scopeOfWork: [
      "Daily sweeping, damp mopping, and vacuuming of designated common corridors",
      "Sanitization of lift cabins, handrails, door handles, and high-touch points",
      "Deep cleaning of common restrooms, washrooms, and community halls",
      "Common trash clearance and designated dry/wet garbage handling",
      "Glass pane cleaning and window washing up to accessible heights"
    ],
    benefits: [
      "Consistent property presentation and improved resident hygiene",
      "Standardized daily checklists and supervisor log reviews",
      "Use of eco-friendly, non-hazardous cleaning materials",
      "Trained and disciplined on-site cleaning staff"
    ],
    faqs: [
      {
        question: "How are housekeeping shifts structured for residential complexes?",
        answer: "Schedules are configured based on community footfall and association preferences, typically operating daily morning shifts with dedicated supervisory oversight."
      },
      {
        question: "Are cleaning consumables included?",
        answer: "We offer both consumable-inclusive contracts and labor-only operational models depending on the property's procurement guidelines."
      }
    ]
  },
  {
    slug: "electrical-maintenance",
    title: "Electrical Maintenance",
    category: "Technical & Electrical",
    status: "active",
    iconName: "Zap",
    shortDescription: "Preventive and breakdown maintenance for power distribution boards, backup generators, lighting, and electrical panels.",
    fullDescription: "Reliable electrical operations are vital for property safety and continuous power. We provide scheduled inspections, load monitoring, panel servicing, and rapid troubleshooting for common area electrical installations.",
    typicalUseCases: [
      "Apartment association power backup (DG set) changeovers and panel boards",
      "Common area lighting circuits, timers, and surge protectors",
      "Commercial building main LT panels and sub-distribution units",
      "Elevator power feeding points and pump control panels"
    ],
    scopeOfWork: [
      "Routine inspection and tightening of electrical panel connections and busbars",
      "Monitoring phase load balance and voltage stability",
      "Testing of circuit breakers (MCBs, MCCBs, ELCBs) for proper trip mechanisms",
      "Inspection of common area backup diesel generators and fuel level logging",
      "Prompt rectification of corridor lighting failures and faulty fixtures"
    ],
    benefits: [
      "Minimizes unexpected power outages and critical equipment downtime",
      "Reduces electrical fire hazards through visual and thermal inspection",
      "Maintains compliant logs for electrical audits and insurance records",
      "Skilled technicians adhering to strict safety protocols"
    ],
    faqs: [
      {
        question: "Do technicians handle emergency breakdown electrical calls?",
        answer: "Yes, dedicated on-site or on-call electrical maintenance support is structured to handle urgent common area power issues."
      }
    ]
  },
  {
    slug: "plumbing-services",
    title: "Plumbing Services",
    category: "Technical & Electrical",
    status: "active",
    iconName: "Wrench",
    shortDescription: "Comprehensive maintenance of water supply networks, hydro-pneumatic pumping systems, valves, and drainage piping.",
    fullDescription: "Smart Facility Services ensures seamless water distribution and wastewater discharge across residential towers and commercial establishments. We manage pump rooms, pressure tanks, header lines, and drainage sumps.",
    typicalUseCases: [
      "Hydro-pneumatic booster pump systems for high-rise apartment water pressure",
      "Overhead tank (OHT) and underground sump (UGS) water distribution networks",
      "Rainwater harvesting collection lines and storm water drainage",
      "Submersible pump operations for dewatering and basement drainage"
    ],
    scopeOfWork: [
      "Daily inspection of water pump operation, pressure gauges, and float switches",
      "Servicing and greasing of gate valves, non-return valves (NRVs), and strainers",
      "Leak detection and rectification across external riser pipes and manifolds",
      "Preventive desilting and clearing of rainwater drains prior to monsoons",
      "Water level monitoring and automatic controller calibration"
    ],
    benefits: [
      "Prevents water shortages and basement flooding incidents",
      "Extends pump motor lifespan through vibration and alignment monitoring",
      "Conserves water by identifying hidden pipe seepage early",
      "Systematic maintenance logs for society facility committees"
    ],
    faqs: [
      {
        question: "Can you manage multi-stage hydro-pneumatic pumping systems?",
        answer: "Yes, our technicians are trained in variable frequency drive (VFD) booster setups, mechanical seals, and diaphragm pressure vessel checks."
      }
    ]
  },
  {
    slug: "hvac-air-conditioning-maintenance",
    title: "HVAC and Air-Conditioning Maintenance",
    category: "Technical & Electrical",
    status: "active",
    iconName: "Fan",
    shortDescription: "Operation, filter servicing, and seasonal maintenance for ventilation systems, VRF units, split ACs, and chillers.",
    fullDescription: "From basement ventilation exhaust fans to VRF air conditioning in clubhouses and commercial floors, we provide systematic maintenance to maintain air circulation, thermal comfort, and energy efficiency.",
    typicalUseCases: [
      "Commercial office VRF / VRV heating and cooling units",
      "Residential clubhouse gym and multi-purpose hall split/ducted systems",
      "Basement jet-fan and stairwell pressurization systems",
      "Kitchen exhaust ducts and fresh air intake units"
    ],
    scopeOfWork: [
      "Filter cleaning, coil washing, and condenser fin inspection",
      "Refrigerant pressure checks and leak testing",
      "Blower motor bearing lubrication and belt tensioning",
      "Thermostat calibration and electrical contactor inspection",
      "Operational testing of smoke exhaust and basement ventilation fans"
    ],
    benefits: [
      "Optimal indoor air quality and temperature consistency",
      "Reduced electricity consumption from clogged coils and dirty filters",
      "Compliance with local building ventilation standards"
    ],
    faqs: [
      {
        question: "Do you service both commercial central HVAC and split units?",
        answer: "Yes, we handle residential community clubhouses as well as light-to-medium commercial HVAC installations."
      }
    ]
  },
  {
    slug: "security-staffing",
    title: "Security Staffing",
    category: "Core Facility Operations",
    status: "proposed",
    iconName: "Shield",
    shortDescription: "Gated entry management, visitor validation, perimeter surveillance, and parking regulation.",
    fullDescription: "Security is foundational to peace of mind. We propose regulated security staffing tailored to apartment societies and commercial buildings, featuring structured visitor validation, perimeter rounds, and emergency response.",
    typicalUseCases: [
      "Main gate boom barrier and visitor log management",
      "Clubhouse, pool area, and playground safety monitoring",
      "Commercial office reception access control",
      "Basement parking regulation and vehicle movement tracking"
    ],
    scopeOfWork: [
      "24/7 entry and exit monitoring with digital visitor logging verification",
      "Scheduled perimeter patrols with night watch verification points",
      "Material inward/outward gate pass monitoring",
      "Traffic regulation in driveways and drop-off points",
      "First-response coordination during emergencies"
    ],
    benefits: [
      "Controlled property access and prevention of unauthorized entry",
      "Well-disciplined, verified, and groomed security personnel",
      "Strict enforcement of community safety bylaws"
    ],
    complianceNotes: "Regulatory Notice: Security staffing services are subject to the Private Security Agencies (Regulation) Act (PSARA). Operational deployment occurs only upon complete regulatory licensing confirmation.",
    faqs: [
      {
        question: "Is security staffing currently active?",
        answer: "This service is in the proposed catalogue and is arranged strictly in compliance with applicable state PSARA regulations."
      }
    ]
  },
  {
    slug: "general-building-maintenance",
    title: "General Maintenance",
    category: "Core Facility Operations",
    status: "active",
    iconName: "Hammer",
    shortDescription: "On-site multi-skilled handyman support for carpentry, masonry touch-ups, door hardware, tile fixes, and general property upkeep.",
    fullDescription: "Properties require ongoing minor repairs to keep infrastructure safe and visually appealing. Our general building maintenance support attends to door hinges, tile repairs, signage, locks, and plastering touch-ups across common property areas.",
    typicalUseCases: [
      "Apartment association common walkways, pavers, and benches",
      "Door closers, fire exit hardware, and panic bar repairs",
      "Minor masonry repairs around storm water grates and curbs",
      "Signage installation and safety marking maintenance",
      "Routine fixture repairs and miscellaneous property upkeep"
    ],
    scopeOfWork: [
      "Repair and alignment of heavy wooden and metal doors",
      "Patch plastering and repainting of chipped perimeter walls",
      "Replacement of broken floor pavers, kerb stones, and drain covers",
      "Installation of safety mirrors, speed bumps, and caution boards",
      "Carpentry repairs for clubhouse furniture and fittings"
    ],
    benefits: [
      "Prompt resolution of cosmetic and structural wear-and-tear",
      "Avoids costly major rebuilds by fixing minor damage early",
      "Single point of contact for miscellaneous repair tasks"
    ],
    faqs: [
      {
        question: "Can associations request a dedicated on-site handyman?",
        answer: "Yes, both full-time dedicated technician deployments and visit-based maintenance plans can be arranged."
      }
    ]
  },
  {
    slug: "water-tank-cleaning",
    title: "Water Tank Cleaning",
    category: "Water & Environmental",
    status: "active",
    iconName: "Droplets",
    shortDescription: "Mechanized, hygienic de-sludging, scrubbing, and UV disinfection for overhead tanks (OHT) and underground sumps (UGS).",
    fullDescription: "Clean potable water is essential for resident health. Our systematic water tank cleaning service removes accumulated silt, algae, and bacterial biofilms from underground sumps and overhead tanks using pressurized de-watering, anti-bacterial scrubbing, and UV disinfection.",
    typicalUseCases: [
      "Residential apartment underground potable water sumps",
      "Overhead water distribution tanks on building rooftops",
      "Commercial building domestic water storage chambers",
      "Clubhouse and restaurant dedicated water reservoirs"
    ],
    scopeOfWork: [
      "Complete de-watering and sediment sludge extraction",
      "High-pressure hydraulic rotary scrubbing of floor, ceiling, and walls",
      "Vacuum suction of residual slurry and suspended particles",
      "Application of certified non-toxic anti-bacterial disinfectant spray",
      "Ultraviolet (UV) microbial radiation treatment prior to refilling"
    ],
    benefits: [
      "Eliminates water contamination, odor, and sediment in tap lines",
      "Certified safe for human consumption with non-hazardous agents",
      "Accompanied by before-and-after photographic documentation"
    ],
    faqs: [
      {
        question: "How often should apartment water tanks be cleaned?",
        answer: "Health authorities and water standards recommend cleaning domestic sumps and overhead tanks at least once every 6 months."
      }
    ]
  },
  {
    slug: "consultancy-engineering",
    title: "Consultancy and Engineering",
    category: "Specialized Maintenance",
    status: "proposed",
    iconName: "Cpu",
    shortDescription: "Technical audits, energy optimization surveys, water balance studies, and MEP infrastructure evaluations.",
    fullDescription: "Our technical advisory services help property owners, developers, and management committees assess the health, efficiency, and compliance of their mechanical, electrical, and plumbing (MEP) installations.",
    typicalUseCases: [
      "Handover audits from builder to Apartment Owners Association (AOA)",
      "Energy conservation studies for common lighting and pump consumption",
      "Sewage treatment plant efficiency and compliance review",
      "Preventive maintenance lifecycle planning for major assets"
    ],
    scopeOfWork: [
      "Thorough site inspection of MEP assets and equipment logs",
      "Thermal imaging and load analysis of main LT panels",
      "Verification of pump capacities against building hydraulic design",
      "Comprehensive diagnostic report with prioritized actionable recommendations"
    ],
    benefits: [
      "Transparent engineering assessment independent of vendors",
      "Identifies hidden power and water wastage saving operational costs",
      "Empowers associations with data during builder handover reviews"
    ],
    faqs: [
      {
        question: "When should an association conduct a technical handover audit?",
        answer: "Ideally before formally taking over common amenities and mechanical infrastructure from the property developer."
      }
    ]
  },
  {
    slug: "stp-etp-wtp-maintenance",
    title: "STP, ETP and WTP Operation and Maintenance",
    category: "Water & Environmental",
    status: "active",
    iconName: "Droplets",
    shortDescription: "Expert operation and compliance management for Sewage, Effluent, and Water Treatment Plants.",
    fullDescription: "Environmental compliance and water sustainability are critical for residential and commercial complexes in Bengaluru. We manage biological treatment plants (MBBR, SBR, MBR), sand/carbon filtration, and reverse osmosis units to meet KSPCB standards.",
    typicalUseCases: [
      "Residential apartment STPs generating treated water for flushing and gardening",
      "Commercial office ETPs and wet waste processing facilities",
      "Water Treatment Plants (WTP) handling borewell and municipal water purification",
      "Dual-plumbing treated water redistribution networks"
    ],
    scopeOfWork: [
      "Daily chemical dosing (coagulants, chlorine, bio-cultures) and pH monitoring",
      "Backwashing and operational cycling of Multi-Grade Sand and Activated Carbon filters",
      "Aeration blower operation, dissolved oxygen (DO) testing, and MLSS management",
      "Sludge dewatering via filter press or centrifuge systems",
      "Routine sample testing for BOD, COD, TSS, and residual chlorine"
    ],
    benefits: [
      "Ensures continuous compliance with Karnataka State Pollution Control Board (KSPCB) norms",
      "Guarantees odor-free, clear water for landscape irrigation and toilet flushing",
      "Reduces reliance on expensive tanker water through optimal water reclamation",
      "Daily logbooks and standardized operator procedures maintained on site"
    ],
    faqs: [
      {
        question: "Do you supply the required treatment chemicals and bio-enzymes?",
        answer: "Yes, we can provide all consumables, bacterial cultures, and dosing chemicals under an all-inclusive O&M plan."
      },
      {
        question: "Can your team revive a sluggish or odor-emitting STP?",
        answer: "Yes, our environmental specialists perform sludge re-seeding, aeration adjustments, and system balancing to restore healthy biological digestion."
      }
    ]
  },
  {
    slug: "sewage-tank-cleaning-work",
    title: "Sewage Tank Cleaning Work",
    category: "Water & Environmental",
    status: "active",
    iconName: "Trash2",
    shortDescription: "Mechanized de-sludging, sediment removal, and disinfection of collection sumps and septic chambers.",
    fullDescription: "Accumulated sludge, grit, and hardened fat deposits reduce sump capacity and cause severe blockages. We use mechanized vacuum pumping, high-pressure jetting, and non-entry safety equipment to clean sewage tanks safely.",
    typicalUseCases: [
      "Residential raw sewage collection sumps and equalization tanks",
      "Sludge holding tanks and drying beds",
      "Commercial kitchen oil & grease interceptor traps",
      "Stormwater silt traps and road gully chambers"
    ],
    scopeOfWork: [
      "Gas detection and confined space forced ventilation prior to tank opening",
      "Heavy slurry suction using mechanized vacuum tankers",
      "High-pressure hydraulic jetting to scrub encrusted tank walls and base",
      "Application of eco-friendly disinfecting solutions",
      "Safe and compliant off-site disposal of collected residues"
    ],
    benefits: [
      "Eliminates foul odor emissions and sewer gas build-up",
      "Prevents unexpected pump burnouts caused by heavy grit ingestion",
      "Strict compliance with non-manual scavenging and safety regulations"
    ],
    faqs: [
      {
        question: "Is human entry into sewage tanks practiced?",
        answer: "No. In strict accordance with national safety and anti-manual-scavenging directives, we deploy mechanized vacuum suction and hydraulic jetting solutions."
      }
    ]
  },
  {
    slug: "swimming-pool-maintenance-chemicals",
    title: "Swimming Pool Maintenance with Chemicals",
    category: "Specialized Maintenance",
    status: "active",
    iconName: "LifeBuoy",
    shortDescription: "Water balance testing, vacuuming, chlorination, and filtration management for sparkling clean pools.",
    fullDescription: "A hygienic pool requires precise chemistry and disciplined mechanical filtration. We manage chlorine, pH balance, alkalinity, and algicide dosing, alongside daily underwater vacuuming and skimmer basket clearing.",
    typicalUseCases: [
      "Apartment community main swimming pools and toddler plunge pools",
      "Clubhouse indoor temperature-controlled aquatic facilities",
      "Infinity pools and rooftop water bodies in luxury layouts"
    ],
    scopeOfWork: [
      "Twice-daily water testing for Free Chlorine, Total Chlorine, and pH levels",
      "Manual and robotic underwater vacuum suction of floor sediments",
      "Skimmer basket clearance and surface leaf netting",
      "Backwashing and media inspection of swimming pool sand filters",
      "Chemical dosing for water clarity, flocculation, and algae prevention"
    ],
    benefits: [
      "Crystal clear water safe from skin, eye, and ear infections",
      "Balanced water chemistry preventing tile erosion and scale deposits",
      "Transparent chemical logbook posted at poolside for residents"
    ],
    faqs: [
      {
        question: "How often is pool water chemistry tested?",
        answer: "Our technicians conduct tests at least twice daily with results recorded on site."
      }
    ]
  },
  {
    slug: "swimming-pool-rework",
    title: "Swimming Pool Rework",
    category: "Specialized Maintenance",
    status: "proposed",
    iconName: "Layers",
    shortDescription: "Tile re-grouting, epoxy repair, waterproofing restoration, and filtration pump upgrades.",
    fullDescription: "Over time, pools suffer from loose mosaic tiles, deteriorating grouts, structural leaks, or outdated filtration. Our pool refurbishment team restores structural integrity, waterproofing, and aesthetics.",
    typicalUseCases: [
      "Aged residential community pools with cracking or faded mosaic tiles",
      "Basement seepage originating from swimming pool containment",
      "Outdated piping and energy-inefficient pool pump replacements"
    ],
    scopeOfWork: [
      "Complete drainage and high-pressure surface decontamination",
      "Removal of damaged mosaic tiles and defective mortar",
      "Application of underwater-grade elastomeric waterproofing membranes",
      "Re-tiling with premium glass mosaic and chemical-resistant epoxy grout",
      "Testing of underwater LED lighting and replacement of safety railings"
    ],
    benefits: [
      "Eliminates water loss from structural micro-cracks",
      "Improves safety by removing sharp, broken tile edges",
      "Restores the aesthetic and market appeal of the clubhouse facility"
    ],
    faqs: [
      {
        question: "How long does a full pool re-grouting and rework take?",
        answer: "A standard residential pool refurbishment typically requires 10 to 18 operational days depending on curing times and waterproofing requirements."
      }
    ]
  },
  {
    slug: "erection-commissioning-installation",
    title: "Erection, Commissioning and Installation Maintenance",
    category: "Specialized Maintenance",
    status: "proposed",
    iconName: "Settings",
    shortDescription: "Turnkey installation, alignment, testing, and preventative commissioning of MEP plant machinery.",
    fullDescription: "When properties upgrade pumps, aerators, backup power panels, or water purification plants, precision installation is critical. We oversee mechanical leveling, electrical tie-ins, dry/wet testing, and handover documentation.",
    typicalUseCases: [
      "Replacement of aging STP aeration roots blowers or submersible diffusers",
      "Installation of new booster pump sets and variable frequency drive panels",
      "Solar rooftop common lighting inverter and panel integration",
      "Sewage lift station pump retrofits"
    ],
    scopeOfWork: [
      "Rigging, foundation placement, and vibration isolator pad installation",
      "Precision laser alignment of motor and pump shafts",
      "Electrical terminations, earthing continuity tests, and insulation resistance checks",
      "No-load and full-load trial runs with performance curve verification",
      "Preparation of comprehensive Standard Operating Procedures (SOPs) and manuals"
    ],
    benefits: [
      "Guarantees warranty compliance through certified installation protocols",
      "Eliminates excessive vibration and premature mechanical failure",
      "Seamless integration with existing facility automation"
    ],
    faqs: [
      {
        question: "Do you supply manufacturer warranties for newly commissioned equipment?",
        answer: "Yes, all newly procured machinery comes with full manufacturer warranties, backed by our installation certification."
      }
    ]
  }
];
