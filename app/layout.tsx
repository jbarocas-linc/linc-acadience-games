import type { Metadata } from 'next';
import Image from 'next/image';
import './globals.css';

export const metadata: Metadata = {
  title: 'LINC Literacy Games',
  description: 'Game-first Acadience guidance for K-2 families',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="linc-pattern" />
        <header className="linc-topbar">
          <div className="container-shell py-3 flex items-center justify-between">
            <Image
              src="/brand/linc-logo-wide.png"
              alt="LINC Literacy in Community"
              width={180}
              height={54}
              priority
            />
            <span className="soft-pill">Family Literacy Games</span>
          </div>
        </header>
        <div className="container-shell">{children}</div>
      </body>
    </html>
  );
}
