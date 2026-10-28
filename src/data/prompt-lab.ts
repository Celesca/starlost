// Shared data for the Prompt Lab section (/prompt-lab).
// Thai UI copy, English prompts.

import type { WikiSidebarItem } from '../lib/wiki-tree';

export type ChecklistKey =
  | 'goal'
  | 'context'
  | 'audience'
  | 'format'
  | 'examples'
  | 'constraints'
  | 'grounding'
  | 'evaluation';

export type ChecklistItem = {
  key: ChecklistKey;
  en: string;
  th: string;
  question: string;
  tip: string;
};

export const checklist: ChecklistItem[] = [
  {
    key: 'goal',
    en: 'Goal',
    th: 'เป้าหมาย',
    question: 'ผลลัพธ์ที่ต้องการคืออะไรกันแน่',
    tip: 'บอกงานที่ต้องการให้ชัดเจนในประโยคแรก เช่น "Write a 300-word introduction..."',
  },
  {
    key: 'context',
    en: 'Context',
    th: 'บริบท',
    question: 'โมเดลต้องรู้อะไรบ้างถึงจะทำงานได้',
    tip: 'ใส่ข้อมูลพื้นหลัง เวอร์ชันของเครื่องมือ error message หรือสิ่งที่คาดหวัง',
  },
  {
    key: 'audience',
    en: 'Audience',
    th: 'ผู้อ่าน',
    question: 'ผลลัพธ์นี้เขียนให้ใครอ่าน',
    tip: 'ระบุผู้อ่านและระดับความรู้ เช่น "for first-year students who have never coded"',
  },
  {
    key: 'format',
    en: 'Format',
    th: 'รูปแบบ',
    question: 'อยากได้หน้าตาแบบไหน (JSON, ตาราง, bullet)',
    tip: 'กำหนดโครงสร้างผลลัพธ์ เช่น JSON schema จำนวน bullet หรือหัวข้อที่ต้องมี',
  },
  {
    key: 'examples',
    en: 'Examples',
    th: 'ตัวอย่าง',
    question: 'ยกตัวอย่างที่ดี 1-3 อันให้ดูได้ไหม',
    tip: 'ใช้ Few-Shot: ใส่ตัวอย่างอินพุตและเอาต์พุตที่ถูกต้อง 1-3 คู่',
  },
  {
    key: 'constraints',
    en: 'Constraints',
    th: 'ข้อจำกัด',
    question: 'ความยาว โทนเสียง ขอบเขต สิ่งที่ต้องเลี่ยง',
    tip: 'บอกความยาว โทน และขอบเขต โดยเน้นบอกสิ่งที่ต้องการ ไม่ใช่แค่สิ่งที่ห้าม',
  },
  {
    key: 'grounding',
    en: 'Grounding',
    th: 'การอ้างอิง',
    question: 'ให้แหล่งข้อมูลแล้วหรือยัง อนุญาตให้ตอบว่าไม่รู้ไหม',
    tip: 'แนบเอกสารในตัวคั่น เช่น <document> และบอกให้ตอบว่า "ไม่รู้" ถ้าไม่มีข้อมูล',
  },
  {
    key: 'evaluation',
    en: 'Evaluation',
    th: 'การประเมิน',
    question: 'จะวัดได้อย่างไรว่า Prompt นี้ใช้ได้ผล',
    tip: 'กำหนดเกณฑ์ที่ตรวจได้ เช่น "Answer on a line starting with Answer:" แล้วทดสอบกับหลายอินพุต',
  },
];

export const labPages = [
  { href: '/prompt-lab', label: 'ภาพรวม: Prompt คืออะไร', slug: 'overview' },
  { href: '/prompt-lab/quiz', label: 'ส่วนที่ 1: เลือก Prompt ที่ดีกว่า', slug: 'quiz' },
  { href: '/prompt-lab/playground', label: 'ส่วนที่ 2: สนามทดลอง Prompt', slug: 'playground' },
] as const;

export type LabSlug = (typeof labPages)[number]['slug'];

export function labSidebarItems(current: LabSlug): WikiSidebarItem[] {
  return labPages.map((page) => ({
    key: `lab:${page.slug}`,
    depth: 0,
    label: page.label,
    href: page.href,
    kind: 'page',
    active: page.slug === current,
    branchActive: page.slug === current,
  }));
}
