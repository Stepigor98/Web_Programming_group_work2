export interface Annotation {
  term: string;
  definition: string;
  context: string;
}

export interface PoemLine {
  lineNum: number;
  text: string;
  annotations?: Annotation[];
}

export interface Anthology {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  poemIds: string[];
  notes?: string;
  themeColor?: string;
}

export type ReadingTheme = 'parchment' | 'light' | 'nocturne';
export type FontStyleChoice = 'garamond' | 'newsreader' | 'sans';
export type FontSizeChoice = 'normal' | 'large' | 'scholarly';

export interface ReadingPreferences {
  theme: ReadingTheme;
  fontStyle: FontStyleChoice;
  fontSize: FontSizeChoice;
  showLineNumbers: boolean;
  showGlossaryHints: boolean;
  lineSpacing: 'comfortable' | 'spacious' | 'compact';
}
