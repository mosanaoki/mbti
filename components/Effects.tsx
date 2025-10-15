"use client";
import { gsap } from 'gsap';

function ensureRoot() {
  let root = document.getElementById('effects-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'effects-root';
    Object.assign(root.style, {
      position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '9999', overflow: 'hidden',
    });
    document.body.appendChild(root);
  }
  return root;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const COLORS = ['#88ffcc', '#54d6ff', '#ffd166', '#ff6b6b', '#c792ea', '#6aa9ff'];

export function playConfetti(origin?: { x?: number; y?: number }, count = 40) {
  const root = ensureRoot();
  const { innerWidth: w, innerHeight: h } = window;
  const ox = origin?.x ?? w / 2;
  const oy = origin?.y ?? h * 0.35;

  const pieces: HTMLDivElement[] = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const size = rand(6, 12);
    Object.assign(el.style, {
      position: 'absolute',
      left: `${ox}px`,
      top: `${oy}px`,
      width: `${size}px`,
      height: `${size * 0.6}px`,
      background: COLORS[i % COLORS.length],
      borderRadius: `${rand(0, 4)}px`,
      transform: 'translate(-50%, -50%)',
      willChange: 'transform, opacity',
    });
    root.appendChild(el);
    pieces.push(el);

    const dx = rand(-w * 0.4, w * 0.4);
    const dy = rand(h * 0.35, h * 0.75);
    const rot = rand(360, 1440);
    const dur = rand(0.9, 1.6);
    const tl = gsap.timeline({ onComplete: () => el.remove() });
    tl.to(el, { x: dx, y: dy * -0.5, rotation: rot * 0.5, duration: dur * 0.5, ease: 'power2.out' })
      .to(el, { y: dy, rotation: rot, opacity: 0.2, duration: dur * 0.5, ease: 'power3.in' }, 0.5 * dur);
  }
}

export function playExplosion(center?: { x?: number; y?: number }) {
  const root = ensureRoot();
  const { innerWidth: w, innerHeight: h } = window;
  const cx = center?.x ?? w / 2;
  const cy = center?.y ?? h * 0.4;

  // shockwave circle
  const ring = document.createElement('div');
  Object.assign(ring.style, {
    position: 'absolute', left: `${cx}px`, top: `${cy}px`,
    width: '6px', height: '6px', borderRadius: '9999px',
    border: '2px solid #54d6ff', opacity: '0.9',
    transform: 'translate(-50%, -50%)',
  });
  root.appendChild(ring);
  gsap.to(ring, { width: 400, height: 400, borderWidth: 2, opacity: 0, duration: 0.9, ease: 'expo.out', onComplete: () => ring.remove() });

  // rays
  const rays = 12;
  for (let i = 0; i < rays; i++) {
    const ray = document.createElement('div');
    Object.assign(ray.style, {
      position: 'absolute', left: `${cx}px`, top: `${cy}px`,
      width: '2px', height: `${rand(60, 120)}px`, background: '#88ffcc',
      transformOrigin: '50% 100%', transform: `translate(-50%, -100%) rotate(${(360 / rays) * i}deg) scaleY(0.2)`, opacity: '0.9',
      borderRadius: '2px',
    });
    root.appendChild(ray);
    gsap.to(ray, { scaleY: 1, opacity: 0, duration: 0.9, ease: 'power2.out', onComplete: () => ray.remove() });
  }

  // confetti burst
  playConfetti({ x: cx, y: cy }, 80);
}
