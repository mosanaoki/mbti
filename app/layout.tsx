import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI診断（簡易版）',
  description: '5問でサクッとMBTIタイプを判定する簡易診断。',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#111827',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}

