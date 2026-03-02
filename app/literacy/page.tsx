'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Band, Grade, Season } from '@/lib/types';

const grades: Grade[] = ['K', '1', '2'];
const bands: { id: Band; label: string; className: string }[] = [
  { id: 'red', label: 'Red', className: 'bg-bandRed text-white' },
  { id: 'yellow', label: 'Yellow', className: 'bg-bandYellow text-black' },
  { id: 'green', label: 'Green', className: 'bg-bandGreen text-white' },
  { id: 'blue', label: 'Blue', className: 'bg-bandBlue text-white' },
];

export default function LiteracyLandingPage() {
  const [grade, setGrade] = useState<Grade | null>(null);
  const [season, setSeason] = useState<Season>('MOY');

  const quickLinks = useMemo(() => {
    if (!grade) return [];
    return bands.map((band) => ({
      ...band,
      href: `/${grade}/${season}/composite/${band.id}`,
    }));
  }, [grade, season]);

  return (
    <main className="space-y-6 py-4">
      <header className="card overflow-hidden">
        <div className="hero-gradient px-5 py-5 text-white">
          <p className="font-callout text-base">Families first. Reading joy first.</p>
          <h1 className="font-display text-3xl mt-1">Start a game in 3 taps</h1>
          <p className="text-sm text-blue-50 mt-2">Tap grade, tap color band, then start today&apos;s first game.</p>
        </div>
        <div className="relative p-4 sm:p-[18px] pr-28 sm:pr-32">
          <p className="text-sm text-slate-700 leading-relaxed">
            This tool is designed for busy families. Keep it light, playful, and short: five focused minutes can build strong skills.
          </p>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 h-16 w-20 sm:h-20 sm:w-24 overflow-hidden rounded-xl border border-lincBlue/15 bg-white/70">
            <Image
              src="/brand/linc-characters.png"
              alt="LINC decorative shapes"
              fill
              className="object-cover object-[82%_15%] scale-[1.55]"
            />
          </div>
        </div>
      </header>

      <section className="card p-5">
        <h2 className="font-semibold text-lincBlue text-lg">1. Choose Grade</h2>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={`rounded-xl border py-4 font-bold transition ${grade === g ? 'border-lincBlue bg-lincBlue text-white shadow-md' : 'bg-white hover:border-lincBlue/50'}`}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      {grade && (
        <section className="card p-5 animate-fadeInUp">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-lincBlue text-lg">2. Choose Composite Band</h2>
            <label className="text-xs">
              Season
              <select
                className="ml-2 rounded border px-2 py-1"
                value={season}
                onChange={(e) => setSeason(e.target.value as Season)}
              >
                <option value="BOY">BOY</option>
                <option value="MOY">MOY</option>
                <option value="EOY">EOY</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            {quickLinks.map((band) => (
              <Link key={band.id} href={band.href} className={`rounded-xl py-4 text-center font-bold shadow-sm hover:scale-[1.01] transition ${band.className}`}>
                {band.label}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-600">Tip: choose the same color shown on your child&apos;s report.</p>
        </section>
      )}

      <section className="card p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-4 items-center">
        <div>
          <h3 className="font-semibold text-lincBlue">Playful learning at home</h3>
          <p className="text-sm text-slate-700 mt-1">Short, repeatable games help children build confidence and keep reading practice positive.</p>
        </div>
        <Image src="/brand/families-reading.png" alt="Family reading illustration" width={200} height={125} className="rounded-xl border" />
      </section>
    </main>
  );
}
