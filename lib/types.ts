export type Grade = 'K' | '1' | '2';
export type Season = 'BOY' | 'MOY' | 'EOY';
export type Band = 'red' | 'yellow' | 'green' | 'blue';

export interface Recommendation {
  grade: Grade;
  season: Season;
  measure: 'composite';
  band: Band;
  recommendedSkillArea: string;
  games: string[];
  resources: {
    video: string | null;
    instructionPdf: string | null;
    cardsPdf: string | null;
  };
}

export interface RecommendationData {
  version: string;
  recommendations: Recommendation[];
  conceptMeta: Record<string, {
    concept: string;
    explainer: string | null;
    video: string | null;
    instructionPdf: string | null;
    cardsPdf: string | null;
    games: string[];
  }>;
  missing: string[];
}
