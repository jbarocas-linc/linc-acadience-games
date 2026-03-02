import type { Band, Grade, Recommendation, RecommendationData, Season } from '@/lib/types';
import payload from '@/data/generated/recommendations.json';

export const recommendationData = payload as RecommendationData;

export function getRecommendations(grade: Grade, season: Season, band: Band): Recommendation[] {
  return recommendationData.recommendations.filter(
    (item) => item.grade === grade && item.season === season && item.band === band,
  );
}

export function isValidGrade(value: string): value is Grade {
  return ['K', '1', '2'].includes(value);
}

export function isValidSeason(value: string): value is Season {
  return ['BOY', 'MOY', 'EOY'].includes(value);
}

export function isValidBand(value: string): value is Band {
  return ['red', 'yellow', 'green', 'blue'].includes(value);
}

export const BAND_META: Record<Band, { label: string; colorClass: string; encouragement: string }> = {
  red: {
    label: 'Red: Well Below Benchmark',
    colorClass: 'bg-bandRed text-white',
    encouragement: 'Play for 5 minutes today.',
  },
  yellow: {
    label: 'Yellow: Below Benchmark',
    colorClass: 'bg-bandYellow text-black',
    encouragement: 'A few short rounds can make a big difference.',
  },
  green: {
    label: 'Green: At Benchmark',
    colorClass: 'bg-bandGreen text-white',
    encouragement: 'Keep momentum going with one quick game.',
  },
  blue: {
    label: 'Blue: Above Benchmark',
    colorClass: 'bg-bandBlue text-white',
    encouragement: 'Try one challenge activity to stretch skills.',
  },
};
