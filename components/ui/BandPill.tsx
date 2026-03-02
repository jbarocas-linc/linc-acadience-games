import type { Band } from '@/lib/types';

const COLORS: Record<Band, string> = {
  red: 'bg-bandRed text-white',
  yellow: 'bg-bandYellow text-black',
  green: 'bg-bandGreen text-white',
  blue: 'bg-bandBlue text-white',
};

export function BandPill({ band, label }: { band: Band; label?: string }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${COLORS[band]}`}>{label ?? band.toUpperCase()}</span>;
}
