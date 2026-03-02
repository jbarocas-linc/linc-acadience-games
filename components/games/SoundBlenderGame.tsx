'use client';

import { useMemo, useState } from 'react';
import { useVoice } from '@/lib/audio/useVoice';

const ROUNDS = [
  { phonemes: ['/d/', '/o/', '/g/'], word: 'dog', choices: ['dog', 'sun', 'bug', 'map'] },
  { phonemes: ['/c/', '/a/', '/t/'], word: 'cat', choices: ['hat', 'cat', 'tree', 'bee'] },
  { phonemes: ['/f/', '/i/', '/sh/'], word: 'fish', choices: ['fish', 'moon', 'cake', 'snake'] },
];

export function SoundBlenderGame({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('Listen and tap the blended word.');
  const { speak } = useVoice();
  const round = ROUNDS[index];

  const choices = useMemo(() => [...round.choices].sort(() => Math.random() - 0.5), [round]);

  const hear = () => {
    const msg = round.phonemes.join(' ... ');
    speak(msg);
  };

  const choose = (word: string) => {
    if (word === round.word) {
      setScore((s) => s + 1);
      setFeedback('Correct blend!');
      setTimeout(() => setIndex((i) => (i + 1) % ROUNDS.length), 500);
      return;
    }
    setFeedback('Try again.');
  };

  return (
    <div className="card p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Sound Blender</h2>
        <button onClick={onClose} className="rounded-lg border px-3 py-1">Close</button>
      </div>
      <p className="mt-2 text-sm">{feedback}</p>
      <p className="text-xs text-slate-600">Round {index + 1} / {ROUNDS.length} • Score {score}</p>
      <div className="mt-4 card p-4">
        <p className="text-lg">{round.phonemes.join(' ')}</p>
        <button onClick={hear} className="mt-2 rounded-lg border px-3 py-1 text-sm">Hear it again</button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {choices.map((choice) => (
          <button key={choice} onClick={() => choose(choice)} className="rounded-xl border bg-white p-4 text-lg font-semibold">{choice}</button>
        ))}
      </div>
    </div>
  );
}
