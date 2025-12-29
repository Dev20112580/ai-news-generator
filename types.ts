
export enum Language {
  Hindi = 'Hindi',
  English = 'English',
  Hinglish = 'Hinglish'
}

export enum Tone {
  Professional = 'Professional',
  Urgent = 'Urgent',
  Casual = 'Casual',
  Formal = 'Formal'
}

export interface PhotoData {
  fileName: string;
  mimeType: string;
  data: string; // Base64 string without prefix
  preview: string; // Data URL for display
  size: number;
}

export interface NewsFormData {
  topic: string;
  facts: string;
  location: string;
  date: string;
  sources: string;
  language: Language;
  tone: Tone;
  wordCount: number;
  email: string;
  photo: PhotoData | null;
}

export interface HistoryItem {
  id: string;
  topic: string;
  article: string;
  generatedAt: string;
  language: string;
  photoBase64?: string;
  photoFilename?: string;
  wordCount: number;
}

export interface APIResponse {
  success: boolean;
  message: string;
  data?: {
    article: string;
    wordCount: number;
    language: string;
    photoBase64?: string;
    photoFilename?: string;
    generatedAt: string;
    topic: string;
  };
  error?: string;
}
