"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import { typeBrief } from '@/lib/mbti';
import { playExplosion } from '@/components/Effects';

export default function ResultPage({ searchParams }: { searchParams: { type?: string } }) {
  const type = (searchParams?.type || '').toUpperCase();
  const brief = typeBrief[type] ?? 'タイプの簡易説明は準備中です。';
  useEffect(() => {
    // fire celebratory explosion on entry
    try { playExplosion(); } catch {}
  }, []);
  return (
    <div className="stack center" style={{ width: '100%' }}>
      <div className="panel stack" style={{ alignItems: 'center' }}>
        <div className="muted">診断結果</div>
        <h1 className="title">あなたのMBTIは {type || '???'} です</h1>
        <p className="muted" style={{ margin: 0 }}>{brief}</p>
      </div>
      <div className="stack" style={{ gap: 12 }}>
        <Link href="/quiz" className="btn primary">もう一度診断する</Link>
        <Link href="/" className="btn">トップに戻る</Link>
      </div>
    </div>
  );
}
