import Link from 'next/link';
import Image from 'next/image';
import { GameLauncher } from '@/components/GameLauncher';
import { BAND_META, getRecommendations, isValidBand, isValidGrade, isValidSeason } from '@/lib/data';
import type { Band, Grade, Season } from '@/lib/types';

const GRADES: Grade[] = ['K', '1', '2'];
const SEASONS: Season[] = ['BOY', 'MOY', 'EOY'];
const BANDS: Band[] = ['red', 'yellow', 'green', 'blue'];

export function generateStaticParams() {
  return GRADES.flatMap((grade) =>
    SEASONS.flatMap((season) =>
      BANDS.map((band) => ({
        grade,
        season,
        band,
      })),
    ),
  );
}

export default function CompositeBandPage({
  params,
}: {
  params: { grade: string; season: string; band: string };
}) {
  const grade = params.grade.toUpperCase();
  const season = params.season.toUpperCase();
  const band = params.band.toLowerCase();

  if (!isValidGrade(grade) || !isValidSeason(season) || !isValidBand(band)) {
    return (
      <main className="card p-6 mt-4">
        <h1 className="font-display text-2xl text-lincBlue">That page is not available.</h1>
        <p className="mt-2 text-sm">Please choose your grade and band again.</p>
        <Link href="/literacy" className="inline-block mt-3 rounded-lg bg-lincBlue text-white px-4 py-2">Back to start</Link>
      </main>
    );
  }

  const recs = getRecommendations(grade as Grade, season as Season, band as Band);
  const meta = BAND_META[band as Band];

  return (
    <main className="space-y-4 py-4">
      <header className="card overflow-hidden">
        <div className="hero-gradient px-5 py-5 text-white">
          <Link href="/literacy" className="text-xs underline text-blue-100">Back to start</Link>
          <h1 className="font-display text-3xl mt-2">{grade} • {season} • Composite</h1>
          <p className="mt-2 text-sm font-semibold">{meta.label}</p>
          <p className="text-sm text-blue-50">{meta.encouragement}</p>
        </div>
        <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-3 items-center">
          <p className="text-sm text-slate-700">
            Start with one quick game below. Keep it playful and encouraging.
          </p>
          <Image src="/brand/artboard-49-1.png" alt="LINC family illustration" width={170} height={106} className="rounded-xl border" />
        </div>
      </header>

      <GameLauncher band={band as Band} recommendations={recs} />
    </main>
  );
}
