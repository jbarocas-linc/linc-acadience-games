'use client';

import { useMemo, useState } from 'react';
import type { Band, Recommendation } from '@/lib/types';
import { QuickStartCard } from '@/components/ui/QuickStartCard';
import { RhymingMatchGame } from '@/components/games/RhymingMatchGame';
import { RhymingMemoryGame } from '@/components/games/RhymingMemoryGame';
import { SyllableMatchGame } from '@/components/games/SyllableMatchGame';
import { FlySwatGame } from '@/components/games/FlySwatGame';
import { SoundBlenderGame } from '@/components/games/SoundBlenderGame';

function gameIdToLabel(id: string) {
  const map: Record<string, string> = {
    'rhyming-match': 'Rhyming Match',
    'rhyming-memory': 'Rhyming Memory',
    'syllable-match': 'Syllable Match',
    'fly-swat': 'Fly Swat!',
    'sound-blender': 'Sound Blender',
    'letter-sound-match': 'Letter Sound Match',
    'word-build-race': 'Word Build Race',
    'sight-word-snap': 'Sight Word Snap',
    'speed-read-sprint': 'Speed Read Sprint',
    'story-question-quest': 'Story Question Quest',
  };
  return map[id] ?? id;
}

function renderGame(game: string, onClose: () => void) {
  switch (game) {
    case 'rhyming-match':
      return <RhymingMatchGame onClose={onClose} />;
    case 'rhyming-memory':
      return <RhymingMemoryGame onClose={onClose} />;
    case 'syllable-match':
      return <SyllableMatchGame onClose={onClose} />;
    case 'fly-swat':
      return <FlySwatGame onClose={onClose} />;
    case 'sound-blender':
      return <SoundBlenderGame onClose={onClose} />;
    default:
      return <div className="card p-5">This game is coming soon.</div>;
  }
}

export function GameLauncher({
  band,
  recommendations,
}: {
  band: Band;
  recommendations: Recommendation[];
}) {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const groupedMap = new Map<string, string[]>();
    for (const rec of recommendations) {
      groupedMap.set(rec.recommendedSkillArea, rec.games);
    }
    return groupedMap;
  }, [recommendations]);

  const first = recommendations[0];
  const firstGame = first?.games[0];

  return (
    <div className="space-y-4">
      <QuickStartCard
        band={band}
        recommendation={first}
        onPlay={() => firstGame && setActiveGame(firstGame)}
      />

      <section className="card p-5 animate-fadeInUp bg-gradient-to-r from-blue-50 to-green-50">
        <p className="text-sm text-slate-800">
          These activities are selected from your child&apos;s current composite band. Keep it simple: one game, one short round.
        </p>
      </section>

      <section className="space-y-4">
        {[...grouped.entries()].map(([skill, games]) => (
          <div key={skill} className="card p-4 animate-fadeInUp">
            <h3 className="font-semibold text-lincBlue text-lg">{skill}</h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {games.map((game) => (
                <button
                  key={game}
                  onClick={() => setActiveGame(game)}
                  className="text-left rounded-xl border px-3 py-3 hover:border-lincBlue hover:bg-blue-50 transition"
                >
                  <p className="font-semibold">{gameIdToLabel(game)}</p>
                  <p className="text-xs text-slate-600">Play interactive activity</p>
                </button>
              ))}
            </div>
          </div>
        ))}
        {recommendations.length === 0 && (
          <div className="card p-4">
            <p className="text-sm text-slate-700">We are still adding mapped activities for this combination. Please try another season or band for now.</p>
          </div>
        )}
      </section>

      <details className="card p-4">
        <summary className="cursor-pointer text-sm font-semibold">Optional: More about these recommendations</summary>
        <p className="mt-2 text-sm text-slate-700">
          Recommendations are mapped from grade, season, and composite benchmark band. Future updates can add subtest routing without changing page paths.
        </p>
      </details>

      {activeGame && (
        <div className="fixed inset-0 bg-black/55 z-50 p-2 sm:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">{renderGame(activeGame, () => setActiveGame(null))}</div>
        </div>
      )}
    </div>
  );
}
