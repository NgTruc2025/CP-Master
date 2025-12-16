export interface SubTopic {
  id: string;
  name: string;
  description?: string;
  details?: string;      // Detailed explanation of the algorithm
  codeSnippet?: string;  // C++ sample code
  links?: { title: string; url: string }[];
}

export interface TopicCategory {
  title: string;
  items: SubTopic[];
}

export interface Stage {
  id: number;
  title: string;
  duration: string;
  description: string;
  categories: TopicCategory[];
}

export interface Tip {
  title: string;
  content: string;
  icon: string;
}

export interface ResourceLink {
  name: string;
  url: string;
  description: string;
  category: 'Judge' | 'Book' | 'Community';
}