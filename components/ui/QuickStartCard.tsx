import Image from 'next/image';
import type { Recommendation } from '@/lib/types';
import { BandPill } from '@/components/ui/BandPill';

export function QuickStartCard({
  band,
  recommendation,
  onPlay,
}: {
  band: 'red' | 'yellow' | 'green' | 'blue';
  recommendation: Recommendation | undefined;
  onPlay: () => void;
}) {
  const cards = [
    {
      id: 'play',
      title: 'Play now',
      subtitle: 'Start the first recommended game.',
      image: '/brand/linc-characters.png',
      href: null as string | null,
    },
    {
      id: 'instructions',
      title: 'Printable instructions',
      subtitle: 'Open the activity instructions PDF.',
      image: '/brand/artboard-49-1.png',
      href: recommendation?.resources.instructionPdf ?? '#',
    },
    {
      id: 'cards',
      title: 'Printable Cards',
      subtitle: 'Open and print the activity cards.',
      image: '/brand/families-reading.png',
      href: recommendation?.resources.cardsPdf ?? '#',
    },
  ];

  return (
    <section className="card p-5 border-2 border-lincGreen/30 animate-fadeInUp">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl text-lincBlue">Quick Start</h2>
        <BandPill band={band} />
      </div>
      <p className="mt-2 text-sm text-slate-700">Start with this game and play for 5 minutes today.</p>
      <p className="mt-3 font-semibold text-xl text-lincBlue">{recommendation?.games[0] ?? 'No game mapped yet'}</p>

      <div className="mt-4 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
        {cards.map((card) => (
          <article key={card.id} className="snap-start min-w-[82%] sm:min-w-[31%] rounded-2xl border border-lincBlue/20 bg-white overflow-hidden shadow-sm">
            <div className="relative h-36 bg-slate-100">
              <Image src={card.image} alt={card.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <p className="font-bold text-lincBlue">{card.title}</p>
              <p className="text-xs text-slate-600 mt-1">{card.subtitle}</p>
              {card.id === 'play' ? (
                <button
                  onClick={onPlay}
                  className="mt-3 w-full rounded-xl bg-lincGreen text-white py-2.5 text-sm font-bold shadow-sm hover:brightness-110"
                >
                  Play now
                </button>
              ) : (
                <a
                  href={card.href ?? '#'}
                  className="mt-3 block w-full rounded-xl border border-lincBlue bg-white py-2.5 text-center text-sm font-bold hover:bg-blue-50"
                >
                  {card.title}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
