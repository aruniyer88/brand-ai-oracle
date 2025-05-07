
export interface BrandEntity {
  id?: string;
  name: string;
  aliases: string[];
  website: string;
  socialLinks: SocialLink[];
  wikiUrl?: string;
  knowledgePanel?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Product {
  id?: string;
  name: string;
  category: string;
  valueProps: string[];
  brandId?: string;
}

export interface Topic {
  id?: string;
  name: string;
  description?: string;
  products?: string[]; // Product IDs
}

export interface Persona {
  id?: string;
  name: string;
  description: string;
  painPoints: string[];
  motivators: string[];
  demographics?: {
    ageRange?: string;
    gender?: string;
    location?: string;
    goals?: string[];
  };
  topicId?: string;
  productId?: string;
}

export interface Question {
  id?: string;
  text: string;
  personaId?: string;
  aiResponses?: AIResponse[];
}

export interface AIResponse {
  modelName: string;
  response: string;
  timestamp: string;
  sentiment?: number;
  topics?: string[];
  hallucinations?: string[];
}
