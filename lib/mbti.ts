export type Axis = 'EI' | 'SN' | 'TF' | 'JP';

export type Choice =
  | { axis: 'EI'; value: 'E' | 'I' }
  | { axis: 'SN'; value: 'S' | 'N' }
  | { axis: 'TF'; value: 'T' | 'F' }
  | { axis: 'JP'; value: 'J' | 'P' };

export type Question = {
  id: string;
  text: string;
  choices: Array<{ label: string; pick: Choice }>;
};

export const questions: Question[] = [
  {
    id: 'q1',
    text: '週末の過ごし方はどちらが近い？',
    choices: [
      { label: '友達とアクティブに過ごす', pick: { axis: 'EI', value: 'E' } },
      { label: 'ひとりで静かに充電する', pick: { axis: 'EI', value: 'I' } },
    ],
  },
  {
    id: 'q2',
    text: '情報を理解するとき、より重視するのは？',
    choices: [
      { label: '事実や実体験の積み上げ', pick: { axis: 'SN', value: 'S' } },
      { label: 'ひらめきや可能性のイメージ', pick: { axis: 'SN', value: 'N' } },
    ],
  },
  {
    id: 'q3',
    text: '決断でより頼りにするのは？',
    choices: [
      { label: '論理・一貫性・合理性', pick: { axis: 'TF', value: 'T' } },
      { label: '人の気持ち・共感・調和', pick: { axis: 'TF', value: 'F' } },
    ],
  },
  {
    id: 'q4',
    text: '仕事や課題の進め方は？',
    choices: [
      { label: '計画を立ててその通りに進める', pick: { axis: 'JP', value: 'J' } },
      { label: '状況に合わせて柔軟に変える', pick: { axis: 'JP', value: 'P' } },
    ],
  },
  {
    id: 'q5',
    text: '会議の場での振る舞いは？',
    choices: [
      { label: '思いついたらすぐ共有する', pick: { axis: 'EI', value: 'E' } },
      { label: 'まず考えてから発言する', pick: { axis: 'EI', value: 'I' } },
    ],
  },
];

export function computeMbti(answers: Choice[]): string {
  const count = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 } as const;
  const tally: Record<keyof typeof count, number> = { ...count } as any;
  for (const a of answers) tally[a.value] += 1;
  const ei = tally.E >= tally.I ? 'E' : 'I';
  const sn = tally.S >= tally.N ? 'S' : 'N';
  const tf = tally.T >= tally.F ? 'T' : 'F';
  const jp = tally.J >= tally.P ? 'J' : 'P';
  return `${ei}${sn}${tf}${jp}`;
}

export const typeBrief: Record<string, string> = {
  INTJ: '戦略家タイプ。長期的な視点で物事を設計するのが得意。',
  INTP: '論理探求タイプ。原理の理解や仕組みに興味津々。',
  ENTJ: '指揮官タイプ。目標達成に向けて力強く牽引。',
  ENTP: '討論者タイプ。新規アイデアと柔軟な発想が強み。',
  INFJ: '提唱者タイプ。価値観を大切に静かに情熱的。',
  INFP: '仲介者タイプ。思いやりがあり理想を追求。',
  ENFJ: '主人公タイプ。周囲を励まし導くリーダー。',
  ENFP: '広報運動家タイプ。エネルギッシュで創造的。',
  ISTJ: '管理者タイプ。責任感が強く着実に実行。',
  ISFJ: '擁護者タイプ。献身的で気配り上手。',
  ESTJ: '幹部タイプ。組織を整え効率化を推進。',
  ESFJ: '領事タイプ。協調的でコミュニティ志向。',
  ISTP: '巨匠タイプ。実践的で問題解決に強い。',
  ISFP: '冒険家タイプ。感性豊かで柔らかい個性。',
  ESTP: '起業家タイプ。行動力があり現場に強い。',
  ESFP: 'エンターテイナータイプ。明るく場を盛り上げる。',
};

