import Link from 'next/link';
import type { Grade, Season } from '@/lib/types';
import { isValidGrade, isValidSeason } from '@/lib/data';

const GRADES: Grade[] = ['K', '1', '2'];
const SEASONS: Season[] = ['BOY', 'MOY', 'EOY'];

export function generateStaticParams() {
  return GRADES.flatMap((grade) => SEASONS.map((season) => ({ grade, season })));
}

export default function GradeSeasonPage({ params }: { params: { grade: string; season: string } }) {
  const grade = params.grade.toUpperCase();
  const season = params.season.toUpperCase();

  if (!isValidGrade(grade) || !isValidSeason(season)) {
    return (
      <main className="card p-6 mt-4">
        <h1 className="font-display text-2xl text-lincBlue">That page is not available.</h1>
        <p className="mt-2 text-sm">Please choose your grade and season again.</p>
        <Link href="/literacy" className="inline-block mt-3 rounded-lg bg-lincBlue text-white px-4 py-2">Back to start</Link>
      </main>
    );
  }

  const fallbackBand = 'yellow';

  return (
    <main className="card p-6 mt-4">
      <h1 className="font-display text-2xl text-lincBlue">{grade} • {season}</h1>
      <p className="mt-2 text-sm text-slate-700">Choose a composite band to continue.</p>
      <Link
        href={`/${grade}/${season}/composite/${fallbackBand}`}
        className="inline-block mt-4 rounded-lg bg-lincGreen text-white px-4 py-2 font-semibold"
      >
        Continue
      </Link>
    </main>
  );
}
