"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { questions, type Choice, computeMbti } from '@/lib/mbti';
import { playConfetti } from '@/components/Effects';

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Choice[]>([]);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const prevStep = useRef(step);

  const total = questions.length;
  const q = questions[step];

  // animate in on mount and on step change
  useEffect(() => {
    if (!cardRef.current) return;
    const previous = prevStep.current;
    const direction = step > previous ? 1 : step < previous ? -1 : 0;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.set(cardRef.current, { transformOrigin: 'center center' });
      tl.fromTo(
        cardRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      if (direction > 0) {
        tl.to(
          cardRef.current,
          {
            keyframes: [
              { x: -6, rotation: -1.5, duration: 0.045 },
              { x: 6, rotation: 1.5, duration: 0.045 },
              { x: -4, rotation: -1, duration: 0.045 },
              { x: 4, rotation: 1, duration: 0.045 },
              { x: 0, rotation: 0, duration: 0.045 },
            ],
            ease: 'power1.inOut',
          },
          '-=0.1'
        );
      } else if (direction < 0) {
        tl.to(
          cardRef.current,
          { x: 0, rotation: 0, duration: 0.2, ease: 'power1.out' },
          '-=0.2'
        );
      }
    }, cardRef);
    prevStep.current = step;
    return () => ctx.revert();
  }, [step]);

  // progress bar animation
  useEffect(() => {
    if (!barRef.current) return;
    const progress = (step / total) * 100;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.set(barRef.current, { transformOrigin: 'left center' });
      tl.to(barRef.current, { width: `${progress}%`, duration: 0.4, ease: 'power2.out' });
      tl.fromTo(
        barRef.current,
        { scaleY: 0.9 },
        { scaleY: 1, duration: 0.2, ease: 'power1.out' },
        '<'
      );
    }, barRef);
    return () => ctx.revert();
  }, [step, total]);

  const onPick = (choice: Choice, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    // confetti from click origin
    try {
      const rect = (e?.currentTarget as HTMLElement | undefined)?.getBoundingClientRect();
      if (rect) playConfetti({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      else playConfetti();
    } catch {}
    // animate out then advance
    gsap.to(cardRef.current, {
      y: -12,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setAnswers((prev) => [...prev, choice]);
        if (step + 1 < total) {
          setStep((s) => s + 1);
        } else {
          const type = computeMbti([...answers, choice]);
          router.push(`/result?type=${type}`);
        }
      },
    });
  };

  const canBack = step > 0;
  const onBack = () => {
    if (!canBack) return;
    setAnswers((prev) => prev.slice(0, -1));
    setStep((s) => s - 1);
  };

  const stepLabel = useMemo(() => `Q${step + 1} / ${total}`, [step, total]);

  return (
    <div className="stack" style={{ width: '100%' }}>
      <div className="progress" aria-label="progress">
        <span ref={barRef} />
      </div>
      <div ref={cardRef} className="panel stack-lg" aria-live="polite">
        <div className="muted" style={{ fontWeight: 600 }}>{stepLabel}</div>
        <h2 style={{ margin: 0 }}>{q.text}</h2>
        <div className="options">
          {q.choices.map((c, i) => (
            <button key={i} className="option" onClick={(e) => onPick(c.pick, e)}>
              <strong>{i === 0 ? 'A' : 'B'}</strong>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
        <div className="footer-actions">
          <button className="btn ghost" onClick={onBack} disabled={!canBack} aria-disabled={!canBack}>戻る</button>
        </div>
      </div>
    </div>
  );
}
