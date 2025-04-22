
export type DesignCategory = 'clothing' | 'bags' | 'shoes';

export interface DesignPrompt {
  prompt: string;
  negative: string;
  scale: number;
  category: DesignCategory;
}
