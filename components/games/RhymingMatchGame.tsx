'use client';

import { useMemo, useState } from 'react';
import { useVoice } from '@/lib/audio/useVoice';

const PAIRS = [
  ['cat', 'hat'],
  ['bee', 'tree'],
  ['moon', 'spoon'],
  ['snake', 'cake'],
];

export function RhymingMatchGame({ onClose }: { onClose: () => void }) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('Tap a word, then tap its rhyme.');
  const { speak } = useVoice();

  const rightWords = useMemo(() => PAIRS.map(([, right]) => right).sort(() => Math.random() - 0.5), []);

  const onPickRight = (word: string) => {
    if (!selectedLeft) return;
    const isMatch = PAIRS.some(([left, right]) => left === selectedLeft && right === word);
    if (isMatch) {
      setMatched((prev) => [...prev, selectedLeft, word]);
      setFeedback('Correct! Great rhyme.');
      speak('Correct');
    } else {
      setFeedback('Try again.');
      speak('Try again');
    }
    setSelectedLeft(null);
  };

  return (
    <div className="card p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Rhyming Match</h2>
        <button onClick={onClose} className="rounded-lg border px-3 py-1">Close</button>
      </div>
      <p className="mt-2 text-sm">{feedback}</p>
      <p className="text-xs text-slate-600">Score: {matched.length / 2} / {PAIRS.length}</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {PAIRS.map(([left]) => (
            <button
              key={left}
              onClick={() => {
                setSelectedLeft(left);
                speak(left);
              }}
              className={`w-full rounded-xl border p-3 text-left ${selectedLeft === left ? 'border-lincGreen bg-lincGreen/10' : ''}`}
              disabled={matched.includes(left)}
            >
              {left}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {rightWords.map((right) => (
            <button
              key={right}
              onClick={() => onPickRight(right)}
              className="w-full rounded-xl border p-3 text-left"
              disabled={matched.includes(right)}
            >
              {right}
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => { setMatched([]); setSelectedLeft(null); }} className="mt-4 rounded-xl bg-lincBlue text-white px-4 py-2">Reset</button>
    </div>
  );
}
