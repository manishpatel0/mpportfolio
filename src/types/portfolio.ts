export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'fintech' | 'health' | 'travel' | 'ecommerce' | 'open-source';
  image: string;
  metrics: {
    downloads: string;
    rating: string;
    crashFree: string;
  };
  technologies: string[];
  stateManagement: string;
  architecture: string;
  highlights: string[];
  hasLiveDemo: boolean;
  githubUrl?: string;
  storeUrl?: string;
  codeSnippet?: {
    filename: string;
    code: string;
  };
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    years: number;
    description: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  type: 'Full-time' | 'Contract';
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
  content: string;
  relationship: string;
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  color: string;
  purpose: string;
  components: string[];
  codeExample: string;
  bestPractices: string[];
}
