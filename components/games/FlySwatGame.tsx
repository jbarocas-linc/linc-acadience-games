'use client';

import { useMemo, useState } from 'react';
import { useVoice } from '@/lib/audio/useVoice';

const ITEMS = [
  { word: 'cat', phoneme: '/k/' },
  { word: 'sun', phoneme: '/s/' },
  { word: 'map', phoneme: '/m/' },
  { word: 'dog', phoneme: '/d/' },
  { word: 'fan', phoneme: '/f/' },
  { word: 'top', phoneme: '/t/' },
];

export function FlySwatGame({ onClose }: { onClose: () => void }) {
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(ITEMS[0]);
  const [feedback, setFeedback] = useState('Swat the word that starts with the target sound.');
  const { speak } = useVoice();

  const options = useMemo(() => ITEMS.sort(() => Math.random() - 0.5).slice(0, 4), [target]);

  const select = (word: string) => {
    const hit = word[0].toLowerCase() === target.word[0].toLowerCase();
    if (hit) {
      setScore((s) => s + 1);
      setFeedback('Great swat!');
      speak('Great swat');
      setTarget(ITEMS[Math.floor(Math.random() * ITEMS.length)]);
      return;
    }
    setFeedback('Not that one. Try again.');
    speak('Try again');
  };

  return (
    <div className="card p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Fly Swat!</h2>
        <button onClick={onClose} className="rounded-lg border px-3 py-1">Close</button>
      </div>
      <p className="mt-2 text-sm">{feedback}</p>
      <p className="text-xs text-slate-600">Score: {score}</p>
      <div className="mt-4 card p-4 flex items-center justify-between">
        <p className="text-xl font-bold">Target sound: {target.phoneme}</p>
        <button onClick={() => speak(target.word[0], target.phoneme)} className="rounded-lg border px-3 py-1 text-sm">Hear Sound</button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {options.map((o) => (
          <button key={o.word} onClick={() => select(o.word)} className="rounded-xl border bg-white p-4 text-lg font-semibold">{o.word}</button>
        ))}
      </div>
    </div>
  );
}
