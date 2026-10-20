export type Project = {
  id: string
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
  visual: 'trading' | 'config' | 'credentials' | 'vendor'
}

export const projects: Project[] = [
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
