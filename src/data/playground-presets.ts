// Preset prompts for the Prompt Lab playground (/prompt-lab/playground).
// Titles are Thai (UI); prompts are English and self-contained (no attached files),
// short enough to run cheaply on free models.

import type { ChecklistKey } from './prompt-lab';

export type PlaygroundPreset = {
  id: string;
  element: ChecklistKey;
  kind: 'bad' | 'good';
  title: string;
  prompt: string;
};

export const playgroundPresets: PlaygroundPreset[] = [
  // --- Goal -----------------------------------------------------------------
  {
    id: 'goal-bad',
    element: 'goal',
    kind: 'bad',
    title: 'บอกแค่หัวข้อ ไม่บอกงาน',
    prompt: 'Python lists',
  },
  {
    id: 'goal-good',
    element: 'goal',
    kind: 'good',
    title: 'บอกงานและผลลัพธ์ชัดเจน',
    prompt:
      'Explain the difference between a Python list and a tuple so I can decide which one to use for storing fixed GPS coordinates. Give one short code example of each and end with a one-sentence recommendation.',
  },

  // --- Context --------------------------------------------------------------
  {
    id: 'context-bad',
    element: 'context',
    kind: 'bad',
    title: 'โค้ดพัง แต่ไม่ให้ข้อมูลอะไรเลย',
    prompt: 'My code does not work. Fix it.',
  },
  {
    id: 'context-good',
    element: 'context',
    kind: 'good',
    title: 'ให้โค้ด error และสิ่งที่คาดหวัง',
    prompt: `I am learning Python 3.12. This function should return the average of a list of numbers, but it crashes.

\`\`\`python
def average(nums):
    total = 0
    for n in nums:
        total += n
    return total / len(nums)

print(average([]))
\`\`\`

Error:
\`\`\`
ZeroDivisionError: division by zero
\`\`\`

Expected: return 0 for an empty list instead of crashing. Explain the cause in 2 sentences, then show the fixed function.`,
  },

  // --- Audience -------------------------------------------------------------
  {
    id: 'audience-bad',
    element: 'audience',
    kind: 'bad',
    title: 'ไม่บอกว่าเขียนให้ใครอ่าน',
    prompt: 'Explain what an API is.',
  },
  {
    id: 'audience-good',
    element: 'audience',
    kind: 'good',
    title: 'ระบุผู้อ่านและระดับความรู้',
    prompt:
      'Explain what an API is for first-year high-school students who have never written code. Use one everyday analogy (like ordering food at a restaurant), avoid technical jargon, and keep it under 120 words.',
  },

  // --- Format ---------------------------------------------------------------
  {
    id: 'format-bad',
    element: 'format',
    kind: 'bad',
    title: 'ไม่กำหนดหน้าตาผลลัพธ์',
    prompt: 'Tell me about the planets in the solar system.',
  },
  {
    id: 'format-good',
    element: 'format',
    kind: 'good',
    title: 'ขอเป็น JSON ตาม schema',
    prompt: `List the 4 inner planets of the solar system.
Return ONLY a JSON array, no other text. Each item must have exactly these keys:
{"name": string, "order_from_sun": number, "has_moons": boolean, "fun_fact": string (max 15 words)}`,
  },

  // --- Examples -------------------------------------------------------------
  {
    id: 'examples-bad',
    element: 'examples',
    kind: 'bad',
    title: 'ให้จัดหมวดหมู่ แต่ไม่มีตัวอย่าง',
    // Same three reviews as examples-good, so the two runs compare like for like.
    prompt: `Classify these reviews:
"The battery lasts forever, love it."
"Arrived broken and support never replied."
"Comfortable, though the cable is too short."`,
  },
  {
    id: 'examples-good',
    element: 'examples',
    kind: 'good',
    title: 'Few-Shot: ใส่ตัวอย่างอินพุตและเอาต์พุต',
    prompt: `Classify each product review as POSITIVE, NEGATIVE, or MIXED. Answer with the label only, one per line.

Review: "Great sound, but the case feels cheap."
Label: MIXED

Review: "Stopped working after two days."
Label: NEGATIVE

Review: "Best purchase this year!"
Label: POSITIVE

Now classify:
Review: "The battery lasts forever, love it."
Review: "Arrived broken and support never replied."
Review: "Comfortable, though the cable is too short."`,
  },

  // --- Constraints ----------------------------------------------------------
  {
    id: 'constraints-bad',
    element: 'constraints',
    kind: 'bad',
    title: 'ไม่จำกัดความยาวหรือโทน',
    prompt: 'Write a product description for a reusable water bottle.',
  },
  {
    id: 'constraints-good',
    element: 'constraints',
    kind: 'good',
    title: 'กำหนดความยาว โทน และขอบเขต',
    prompt:
      'Write a product description for a 750 ml stainless-steel reusable water bottle for an online shop. Exactly 3 sentences, under 60 words total. Use a friendly, energetic tone for university students. Mention that it keeps drinks cold for 24 hours. Do not use emojis or exclamation marks.',
  },

  // --- Grounding ------------------------------------------------------------
  {
    id: 'grounding-bad',
    element: 'grounding',
    kind: 'bad',
    title: 'ถามเรื่องเฉพาะ โดยไม่ให้แหล่งข้อมูล',
    prompt: "What is StarLost Café's refund policy for online orders, and can I get a refund after 10 days?",
  },
  {
    id: 'grounding-good',
    element: 'grounding',
    kind: 'good',
    title: 'แนบเอกสารในตัวคั่น และอนุญาตให้ตอบว่าไม่รู้',
    prompt: `Answer the customer's questions using ONLY the policy text inside <policy> tags.
If the answer is not in the policy, reply exactly: "Not stated in the policy."

<policy>
StarLost Café online orders can be refunded within 7 days of delivery.
Refunds are paid back to the original payment method within 5 business days.
Opened coffee bean bags cannot be refunded.
</policy>

Questions:
1. Can I get a refund 10 days after delivery?
2. How long does the refund take to arrive?
3. Do you offer free shipping?`,
  },

  // --- Evaluation -----------------------------------------------------------
  {
    id: 'evaluation-bad',
    element: 'evaluation',
    kind: 'bad',
    title: 'โจทย์เลข ไม่มีเกณฑ์ตรวจคำตอบ',
    prompt: 'A shirt costs 400 baht and is 15% off. A member gets an extra 10% off the discounted price. How much does a member pay?',
  },
  {
    id: 'evaluation-good',
    element: 'evaluation',
    kind: 'good',
    title: 'กำหนดรูปแบบคำตอบที่ตรวจได้',
    prompt: `A shirt costs 400 baht and is 15% off. A member gets an extra 10% off the discounted price. How much does a member pay?

Show your calculation in at most 3 short steps.
The last line must be exactly in this form, with a number only: Answer: <amount>
Before answering, check that the final amount is less than 340 baht (the price after only the first discount).`,
  },
];
