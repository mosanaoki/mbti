import Link from 'next/link';

export default function Home() {
  return (
    <div className="stack center">
      <h1 className="title">MBTI診断（簡易版）</h1>
      <p className="muted">5問に答えるだけ。1分でタイプをチェック。</p>
      <Link href="/quiz" className="btn primary">診断をはじめる</Link>
    </div>
  );
}

