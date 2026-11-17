// ─────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT — edit this file to update the site.
//  New certificate / experience? Add one object to JOURNEY.
//  Entries are sorted by date automatically (newest first).
// ─────────────────────────────────────────────────────────────

window.PROFILE = {
  name: 'Utkarsh Kumar',
  roles: ['B.Tech AI & ML Student', 'Aspiring Software Developer', 'Technology Entrepreneur'],
  location: 'Bengaluru, Karnataka',
  intro:
    'I build practical technology for real businesses — from ERP systems and business platforms to AI-enabled tools. Founder of SATH (सहायता), helping small businesses grow in the digital age.',
  email: 'utkarshaa.kr@gmail.com',
  github: 'https://github.com/maiutkarsh',
  linkedin: '', // add your LinkedIn URL here
  languages: ['English', 'Hindi'],
};

window.SKILLS = [
  { group: 'Programming', items: ['Python', 'JavaScript'] },
  { group: 'Databases', items: ['MongoDB', 'SQL'] },
  { group: 'AI-assisted development', items: ['Claude Code', 'OpenAI Codex', 'Ollama', 'GitHub'] },
  { group: 'Interests', items: ['AI / ML', 'Software Development', 'Android Apps', 'ERP Systems', 'FinTech', 'Business Automation'] },
];

window.PROJECTS = [
  {
    name: 'InfraPulse',
    tagline: 'Predict. Connect. Prevent.',
    period: 'Nov 2026',
    kind: 'Smart City · Decision Support',
    text:
      'An interactive prototype that simulates how a failure in one city system — electricity, water, telecom or roads — cascades into others. It scores the risk to every node and recommends coordinated recovery actions.',
    points: ['Dependency graph with live cascade highlighting', 'What-if failure simulator with backup timers', 'Infrastructure Survival Score + Smart Recovery Engine'],
    tags: ['React', 'TypeScript', 'React Flow', 'Simulation'],
    image: 'assets/shots/infrapulse-command.jpg',
    demo: 'infrapulse/?scenario=blackout-z04',
    demoLabel: 'Run the blackout demo',
    accent: '#22D3EE',
    featured: true,
  },
  {
    name: 'Bill Deport ERP',
    tagline: 'Your entire business, one platform',
    period: 'May – Jul 2026',
    kind: 'ERP · Billing & Inventory',
    text:
      'An ERP product for small and medium businesses covering GST billing, inventory, customers, payments and reports — designed to keep working on a phone even without internet, then sync when back online.',
    points: ['GST invoicing, inventory & payment tracking', 'Offline-first edition — the demo runs fully in your browser', 'Android app build'],
    tags: ['ERP', 'Offline-first', 'SQLite', 'Android'],
    image: 'assets/shots/bill-deport.jpg',
    demo: 'demos/bill-deport/',
    demoLabel: 'Open live demo',
    demoNote: 'Demo login: admin@demo.local / Password@123',
    accent: '#818CF8',
  },
  {
    name: 'SATH सहायता Website',
    tagline: 'Company website for my venture',
    period: 'Jun 2026',
    kind: 'Web · Brand & Marketing',
    text:
      'A bilingual (English / हिन्दी) company website with dark & light themes, an animated particle hero, service pages and a validated contact form — built with plain HTML, CSS and JavaScript.',
    points: ['Responsive, bilingual design', 'SEO-ready with Open Graph & sitemap', 'No framework, no build step'],
    tags: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    image: 'assets/shots/sath.jpg',
    demo: 'demos/sath/',
    demoLabel: 'Visit website',
    accent: '#F5B942',
  },
  {
    name: 'Religiosum Healthcare',
    tagline: 'B2B pharma ordering & management platform',
    period: 'Jul – Aug 2026',
    kind: 'Healthcare · B2B Platform',
    text:
      'A business platform for a pharmaceutical distributor: retailer management, product catalogue, order placement, sales reporting and role-based admin workflows — plus a content-managed company website.',
    points: ['Retailer ordering portal & catalogue', 'Role-based access for admin teams', 'Sales reports and GST invoice PDFs'],
    tags: ['B2B', 'Healthcare', 'RBAC', 'CMS'],
    status: 'Client project · demo on request',
    accent: '#34D399',
    icon: 'cross',
  },
  {
    name: 'PocketOMR',
    tagline: 'OMR evaluation on an Android phone',
    period: 'Oct 2026',
    kind: 'Android · Computer Vision',
    text:
      'Exploring an Android workflow that scans OMR answer sheets with the camera, recognises answers and student IDs, evaluates them and generates results.',
    points: ['Image processing with OpenCV', 'Answer & student-ID recognition', 'Automatic evaluation and results'],
    tags: ['Kotlin', 'OpenCV', 'Android'],
    status: 'In progress',
    accent: '#C084FC',
    icon: 'scan',
  },
];

// type: 'education' | 'venture' | 'project' | 'achievement' | 'experience' | 'certificate'
// date: 'YYYY-MM' (used for sorting)   label: what is shown
window.JOURNEY = [
  {
    date: '2026-11', label: '03–05 Nov 2026', type: 'achievement',
    title: 'Certificate of Appreciation — National Level Ideathon 2026',
    org: 'New Horizon College of Engineering · AICTE IDEA Lab, Bengaluru',
    text: 'Participated as Team Matrix in the national-level ideathon organised by the Institution’s Innovation Council – Department of R&D, in association with AICTE IDEA Lab.',
    cert: 'assets/certificates/ideathon-2026.pdf',
    image: 'assets/certificates/ideathon-2026.jpg',
    highlight: true,
  },
  {
    date: '2026-11', label: 'Nov 2026', type: 'project',
    title: 'Built InfraPulse',
    org: 'Infrastructure resilience & failure simulation',
    text: 'Decision-support prototype simulating cascading failures across electricity, water, telecom and road systems.',
    link: 'infrapulse/?scenario=blackout-z04', linkText: 'Live demo',
  },
  {
    date: '2026-10', label: 'Oct 2026', type: 'project',
    title: 'PocketOMR',
    org: 'Android-based OMR evaluation',
    text: 'Explored an OMR scanning and evaluation workflow using Kotlin and OpenCV.',
  },
  {
    date: '2026-08', label: '2026 – Present', type: 'education',
    title: 'B.Tech, Artificial Intelligence & Machine Learning',
    org: 'New Horizon College of Engineering, Bengaluru',
  },
  {
    date: '2026-07', label: 'Jul – Aug 2026', type: 'project',
    title: 'Religiosum Healthcare Platform',
    org: 'B2B pharma business management',
    text: 'Retailer management, product catalogue, ordering, sales reporting and role-based admin workflows.',
  },
  {
    date: '2026-06', label: 'Jun 2026', type: 'venture',
    title: 'Founded SATH (सहायता)',
    org: 'Founder & CEO',
    text: 'Technology and business support for small businesses — AI-assisted market research, WhatsApp chatbots, business portfolios, and help with MUDRA / PMEGP scheme applications and DPRs.',
    link: 'demos/sath/', linkText: 'Visit SATH website',
  },
  {
    date: '2026-05', label: 'May – Jul 2026', type: 'project',
    title: 'Bill Deport ERP',
    org: 'ERP & business management software',
    text: 'Billing, inventory, customer management, reporting and subscription workflows for SMBs.',
    link: 'demos/bill-deport/', linkText: 'Live demo',
  },
  {
    date: '2026-03', label: '2026', type: 'education',
    title: 'Class XII — CBSE',
    org: 'EuroSchool North Campus',
  },
  {
    date: '2024-03', label: '2024', type: 'education',
    title: 'Class X — ICSE',
    org: 'Vikas Bharti School, Gorakhpur',
  },
];

window.FOUNDER = {
  company: 'SATH (सहायता)',
  role: 'Founder & CEO',
  photo: 'assets/founder.jpg',
  quote:
    'Good software should feel like an extra pair of hands. I started SATH सहायता to give small and medium businesses the same technology edge that large companies take for granted.',
  text:
    'SATH means “with” and सहायता means “support”. We help small businesses go digital — websites, WhatsApp chatbots, AI-assisted market research and government-scheme support — and stay with them as they grow.',
  site: 'demos/sath/',
};
