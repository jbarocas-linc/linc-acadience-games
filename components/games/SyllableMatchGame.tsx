'use client';

import { useState } from 'react';
import { useVoice } from '@/lib/audio/useVoice';

const WORDS = [
  { word: 'cat', count: 1 },
  { word: 'monkey', count: 2 },
  { word: 'umbrella', count: 3 },
  { word: 'caterpillar', count: 4 },
];

export function SyllableMatchGame({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('Listen and choose the syllable count.');
  const { speak } = useVoice();
  const current = WORDS[index];

  const choose = (count: number) => {
    if (count === current.count) {
      setScore((s) => s + 1);
      setFeedback('Correct!');
      speak('Correct');
      setTimeout(() => setIndex((i) => (i + 1) % WORDS.length), 400);
      return;
    }
    setFeedback('Try again.');
    speak('Try again');
  };

  return (
    <div className="card p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Syllable Match</h2>
        <button onClick={onClose} className="rounded-lg border px-3 py-1">Close</button>
      </div>
      <p className="mt-2 text-sm">{feedback}</p>
      <p className="text-xs text-slate-600">Score: {score}</p>
      <div className="mt-4 card p-4">
        <p className="text-lg font-semibold">{current.word}</p>
        <button onClick={() => speak(current.word)} className="mt-2 rounded-lg border px-3 py-1 text-sm">Hear Word</button>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((c) => (
          <button key={c} onClick={() => choose(c)} className="rounded-xl bg-lincBlue text-white py-3">{c}</button>
        ))}
      </div>
    </div>
  );
}
