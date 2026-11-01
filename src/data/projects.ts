export type ProjectId =
  | 'ai-developer-copilot'
  | 'algoninja'
  | 'broker-config'
  | 'credential-management'
  | 'vendor-management'

export type Project = {
  id: ProjectId
  name: string
  subtitle: string
  category: string[]
  company: string
  type: string
  technologies: string[]
  features: string[]
  overview: string
  problem: string
  contributions: string[]
  challenges: string[]
  visual: 'trading' | 'config' | 'credentials' | 'vendor' | 'copilot'
  github?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'ai-developer-copilot',
    name: 'AI Developer Copilot',
    subtitle: 'Local-First AI-Powered Developer Assistant',
    category: ['AI', 'Full Stack'],
    company: 'Independent Project',
    type: 'Local AI Developer Platform',
    featured: true,
    github: 'https://github.com/Shanjaiss/ai_developer_copilot',
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'Ollama',
      'Qwen2.5-Coder',
      'TanStack Query',
      'Vitest',
      'Pytest',
    ],
    features: [
      '12-phase full-stack development roadmap',
      '10 integrated developer productivity modules',
      'Local AI inference using Ollama & Qwen2.5-Coder',
      'Read-only repository intelligence with AST analysis',
      'Privacy-conscious source-code processing (0 cloud API calls)',
      'Responsive application interface',
      'Automated testing (190 backend pytest, 125 frontend vitest)',
      'AI-powered code explanation & asymptotic complexity calculation',
      'Security-minded code review & defect inspection',
      'Performance optimization with side-by-side diffs',
      'Automated unit test generation for pytest and vitest',
      'Conversational coding assistant with bounded context',
      'Contextual bug detection & stack trace diagnosis',
      'Advisory code refactoring & code smell detection',
      'Automated documentation generation (README & docstrings)',
    ],
    overview:
      'Built a full-stack AI developer productivity platform using React, TypeScript, FastAPI, Python, and Ollama. The application supports AI-powered code explanation, review, optimization, unit test generation, debugging, refactoring, documentation, repository intelligence, conversational coding assistance, and developer productivity analytics.',
    problem:
      'Mainstream AI assistants transmit proprietary source code to cloud APIs, introducing intellectual property leakage risks, recurring token expenses, and network dependency. This project executes complete AI developer intelligence 100% locally on Apple Silicon Mac hardware with zero external API calls.',
    contributions: [
      'Architected a 12-phase full-stack development roadmap and delivered 10 integrated productivity modules.',
      'Configured local LLM inference via Ollama (qwen2.5-coder:1.5b), tuned for Apple Silicon M1 within an 8 GB memory envelope.',
      'Implemented read-only repository intelligence utilizing Python AST parsing and polyglot symbol extraction.',
      'Enforced privacy-conscious source code processing with strict path containment and zero external data transmission.',
      'Engineered an accessible, responsive interface using React 19, TypeScript, and TanStack Query.',
      'Maintained verified test suites with 190 backend pytest tests and 125 frontend vitest tests (315 total passing tests).',
    ],
    challenges: [
      'Operating local LLM inference under 2.5 GB memory footprint without swap pressure or token starvation on 8 GB machines.',
      'Guaranteeing structured, schema-compliant JSON outputs from a 1.5B parameter local model via resilient parsing.',
      'Safeguarding repository traversal with canonical path validation to prevent path traversal and arbitrary code execution.',
    ],
    visual: 'copilot',
  },
  {
    id: 'algoninja',
    name: 'Algoninja',
    subtitle: 'Algorithmic Trading Terminal',
    category: ['FinTech', 'Full Stack', 'SaaS'],
    company: 'Finolab Technologies',
    type: 'FinTech / Multi-Tenant SaaS',
    technologies: ['AngularJS', 'Node.js', 'Express.js', 'MySQL', 'REST APIs'],
    features: [
      'Multi-broker integration workflows',
      'Automated strategy execution workflows',
      'Order management, watchlists, and position management',
      'Real-time trade monitoring',
      'Subscription and account-management workflows',
      'Trade logs and audit trails',
    ],
    overview:
      'A multi-tenant algorithmic trading platform supporting broker-connected trading workflows.',
    problem:
      'The product brings broker integrations, trading operations, and account administration together in a single SaaS platform.',
    contributions: [
      'Contributed to automated trading workflows and broker integration features.',
      'Worked across order placement, positions, watchlists, and trade monitoring.',
      'Integrated frontend modules with backend REST APIs.',
    ],
    challenges: [
      'Supporting broker-specific workflows within a multi-tenant product.',
      'Connecting operational interfaces to backend trading and account APIs.',
    ],
    visual: 'trading',
  },
  {
    id: 'broker-config',
    name: 'Broker Configuration',
    subtitle: 'Configuration & Static IP Management',
    category: ['FinTech', 'Full Stack'],
    company: 'Finolab Technologies',
    type: 'Broker administration',
    technologies: ['React.js', 'AngularJS', 'Express.js', 'MySQL'],
    features: [
      'Broker-specific configuration',
      'Static IP management',
      'Configuration validation',
      'User and broker workflows',
      'REST API integration',
      'Conditional UI rendering',
    ],
    overview:
      'Administration interfaces for broker-specific settings and static IP management.',
    problem:
      'Broker operations require configuration screens that reflect the selected broker and validate user-entered settings.',
    contributions: [
      'Developed broker configuration and static IP management interfaces.',
      'Integrated frontend workflows with REST APIs.',
      'Implemented conditional rendering for broker and user workflows.',
    ],
    challenges: [
      'Keeping configuration forms adaptable to broker-specific requirements.',
      'Representing validation and configuration state clearly in the UI.',
    ],
    visual: 'config',
  },
  {
    id: 'credential-management',
    name: 'Broker API Credentials',
    subtitle: 'Credential Management Workflows',
    category: ['FinTech', 'Frontend'],
    company: 'Finolab Technologies',
    type: 'Secure administration UI',
    technologies: ['React.js', 'Ant Design', 'REST APIs'],
    features: [
      'API credential workflows',
      'Form validation',
      'Conditional rendering',
      'Authentication API integrations',
      'Reusable UI components',
    ],
    overview:
      'Responsive interfaces for managing broker API credential workflows and related authentication integrations.',
    problem:
      'Broker setup calls for a structured UI to guide users through credential and authentication workflows.',
    contributions: [
      'Built responsive broker API credential-management interfaces.',
      'Integrated authentication APIs and added conditional UI behavior.',
      'Used reusable components and form validation.',
    ],
    challenges: [
      'Making credential workflows understandable without exposing sensitive information.',
      'Handling conditional states across broker authentication flows.',
    ],
    visual: 'credentials',
  },
  {
    id: 'vendor-management',
    name: 'Vendor Relationship Management',
    subtitle: 'Vendor Onboarding & Management',
    category: ['Frontend', 'SaaS'],
    company: 'Sailboat Technologies',
    type: 'Vendor management',
    technologies: [
      'React.js',
      'TypeScript',
      'Recoil',
      'TanStack Query',
      'REST APIs',
      'Ruby',
    ],
    features: [
      'Vendor onboarding',
      'Vendor data management',
      'API data fetching and caching',
      'Shared state management',
      'Form validation',
      'Internationalization',
      'Reusable frontend architecture',
    ],
    overview:
      'Frontend workflows for vendor onboarding and management, built with reusable React and TypeScript components.',
    problem:
      'Vendor workflows require accessible forms and consistent API-backed data across the application.',
    contributions: [
      'Developed reusable React and TypeScript components.',
      'Built vendor onboarding and vendor management workflows.',
      'Integrated REST APIs with TanStack Query and managed shared state with Recoil.',
      'Implemented i18next localization.',
    ],
    challenges: [
      'Coordinating API data fetching, caching, and shared state across workflows.',
      'Supporting localization while keeping components reusable.',
    ],
    visual: 'vendor',
  },
]
