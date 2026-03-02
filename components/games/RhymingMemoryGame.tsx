'use client';

import { useMemo, useState } from 'react';

const PAIRS = [['cat', 'hat'], ['bee', 'tree'], ['moon', 'spoon'], ['snake', 'cake']];

export function RhymingMemoryGame({ onClose }: { onClose: () => void }) {
  const cards = useMemo(() => PAIRS.flat().sort(() => Math.random() - 0.5), []);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const flip = (idx: number) => {
    if (flipped.includes(idx) || matched.includes(idx) || flipped.length === 2) return;
    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      const aw = cards[a];
      const bw = cards[b];
      const isPair = PAIRS.some((pair) => pair.includes(aw) && pair.includes(bw));
      if (isPair && aw !== bw) {
        setMatched((m) => [...m, a, b]);
      }
      setTimeout(() => setFlipped([]), 600);
    }
  };

  return (
    <div className="card p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Rhyming Memory</h2>
        <button onClick={onClose} className="rounded-lg border px-3 py-1">Close</button>
      </div>
      <p className="text-sm mt-2">Find pairs that rhyme. Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-2 mt-3">
        {cards.map((card, idx) => {
          const show = flipped.includes(idx) || matched.includes(idx);
          return (
            <button
              key={`${card}-${idx}`}
              onClick={() => flip(idx)}
              className="aspect-square rounded-lg border bg-white text-sm font-semibold"
              aria-label={`Memory card ${idx + 1}`}
            >
              {show ? card : '?'}
            </button>
          );
        })}
      </div>
      <button onClick={() => window.location.reload()} className="mt-4 rounded-xl bg-lincBlue text-white px-4 py-2">New Board</button>
    </div>
  );
}
