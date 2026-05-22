# Dashboard & AI Assistant

หน้าเว็บ static ที่รวม Looker Studio dashboard กับ chatbot ที่ใช้ Gemini API ตอบจากข้อมูลใน Google Sheet พร้อมระบบสลับภาษาไทย/อังกฤษ

## โครงสร้าง

- `index.html` — หน้าหลัก (Looker iframe + chatbot + สลับภาษา)
- `settings.html` — หน้าตั้งค่า (เก็บ override ใน localStorage ของ browser)
- `config.js` — **ค่า default ที่ใช้ร่วมกันทุกเครื่อง** ← แก้ที่นี่ที่เดียว
- `OIP.webp` — โลโก้ที่แสดงบน header

## การตั้งค่า

### ตั้งครั้งเดียวให้ใช้ได้ทุกเครื่อง (แนะนำ)

แก้ค่าใน `config.js` ไฟล์เดียว แล้ว push ขึ้น GitHub Pages → ทุกเครื่อง/ทุก browser ที่เปิดเว็บได้ค่าเดียวกันทันที ไม่ต้องตั้งใหม่

```js
// config.js
window.APP_CONFIG = {
  GEMINI_API_KEY: "AIza...",
  GEMINI_MODEL: "gemini-2.5-flash",
  SHEET_CSV_URL: "https://docs.google.com/spreadsheets/d/e/.../pub?output=csv",
  LOOKER_URL: "https://lookerstudio.google.com/embed/reporting/REPORT_ID/page/PAGE_ID",
  MAX_KNOWLEDGE_CHARS: 12000,
};
```

### Override เฉพาะเครื่อง (optional)

ถ้า user คนใดอยากใช้ค่าต่าง (เช่น key ตัวเอง) คลิกปุ่ม ⚙️ บนเว็บ → กรอกค่า → บันทึก ค่าจะเก็บใน localStorage ของ browser นั้นและทับค่าจาก `config.js` เฉพาะเครื่องนั้น กดปุ่ม "รีเซ็ตค่าเริ่มต้น" เพื่อกลับไปใช้ค่าจาก `config.js`

### ที่มาของแต่ละค่า

| ค่า | ที่มา |
|---|---|
| `LOOKER_URL` | Looker Studio → `File > Embed report` คัด URL จาก iframe src |
| `SHEET_CSV_URL` | Google Sheet → `File > Share > Publish to web` → เลือก sheet + CSV → Publish |
| `GEMINI_API_KEY` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| `GEMINI_MODEL` | `gemini-2.5-flash` (เร็ว/ถูก), `gemini-2.5-pro` (ฉลาดกว่า), `gemini-2.5-flash-lite` (เร็วสุด) |

> **คำเตือนเรื่องความปลอดภัย:** `config.js` อยู่ฝั่ง frontend — ใครเปิดเว็บก็เห็น API key ได้ ต้องตั้ง restriction ใน Google Cloud Console:
> - **HTTP referrers**: จำกัดเฉพาะโดเมน GitHub Pages ของคุณ (เช่น `https://USERNAME.github.io/REPO/*`) — สำคัญที่สุด ต่อให้ key หลุดก็เรียกจากที่อื่นไม่ได้
> - **API restrictions**: เปิดเฉพาะ Generative Language API
> - ตั้ง quota / budget alert
>
> ถ้า key เคยถูก commit ขึ้น repo public แล้ว ให้ถือว่ารั่ว — revoke แล้วสร้างใหม่ที่ AI Studio

## Deploy ขึ้น GitHub Pages

```bash
git init
git add index.html settings.html config.js OIP.webp README.md
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

จากนั้นใน GitHub repo → `Settings > Pages` → Source: `main` branch / `(root)` → Save

URL จะอยู่ที่ `https://USERNAME.github.io/REPO/`

## การปรับแต่ง

- **เปลี่ยนโมเดล Gemini:** แก้ `CONFIG.GEMINI_MODEL` (เช่น `gemini-2.5-flash`, `gemini-2.5-pro`)
- **เพิ่ม/แก้คำแปล:** แก้ object `I18N` ใน `<script>`
- **ปรับขนาด knowledge ที่ส่งให้ Gemini:** แก้ `CONFIG.MAX_KNOWLEDGE_CHARS` (ถ้า sheet ใหญ่มาก ลดลงเพื่อประหยัด token)
- **ปรับ system prompt:** ค้น `systemInstruction` ใน function `callGemini`

## ข้อจำกัด

- Sheet ต้อง publish to web (public read) — chatbot อ่านได้แค่ข้อมูลที่ public
- ถ้า sheet ใหญ่มาก (เกินกว่าที่ context window รับไหว) ต้องเพิ่ม retrieval/embedding — เวอร์ชันนี้ส่งทั้ง sheet ไปกับทุก request
- ไม่มี backend = ไม่มี rate limiting ฝั่งเรา ผู้ใช้สามารถยิง API key ได้ตรงๆ
