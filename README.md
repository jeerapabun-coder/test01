# Dashboard & AI Assistant

หน้าเว็บ static ที่รวม Looker Studio dashboard กับ chatbot ที่ใช้ Gemini API ตอบจากข้อมูลใน Google Sheet พร้อมระบบสลับภาษาไทย/อังกฤษ

## โครงสร้าง

- `index.html` — หน้าหลัก (Looker iframe + chatbot + สลับภาษา)
- `settings.html` — หน้าตั้งค่า (เก็บใน localStorage ของ browser)

## การตั้งค่า

มี 2 วิธี:

**วิธี A — ใช้หน้า Settings (แนะนำ)**
เปิดเว็บแล้วคลิกปุ่ม ⚙️ ที่มุมขวาบน กรอก URL/key ต่างๆ แล้วกดบันทึก ค่าจะเก็บใน localStorage ของ browser นั้น (ไม่ sync ข้าม device, ไม่หลุดถ้า refresh)

**วิธี B — แก้ default ใน `index.html` และ `settings.html`**
ถ้าอยากให้ทุกคนที่เปิดเว็บได้ค่า default แบบเดียวกัน แก้ที่ `DEFAULT_CONFIG` ในทั้ง 2 ไฟล์ (ต้องตรงกัน):

### 1. Looker Studio embed URL
ค้น `id="looker-frame"` และเปลี่ยน `src` เป็น embed URL ของคุณ
- ใน Looker Studio: `File > Embed report` → คัด URL จาก iframe src
- รูปแบบ: `https://lookerstudio.google.com/embed/reporting/REPORT_ID/page/PAGE_ID`

### 2. Google Sheet CSV URL
ใน Google Sheet: `File > Share > Publish to web` → เลือก sheet ที่ต้องการ + format `Comma-separated values (.csv)` → Publish

คัด URL มาวางที่ `CONFIG.SHEET_CSV_URL` ใน `<script>`

### 3. Gemini API Key
ใส่ไว้แล้วที่ `CONFIG.GEMINI_API_KEY` — เปลี่ยนได้ถ้าต้องการใช้ key อื่น

> **คำเตือนเรื่องความปลอดภัย:** API key อยู่ใน frontend ทำให้ใครก็ตามที่เปิดเว็บสามารถเห็นและใช้ key ได้ ควรไปตั้ง restriction ใน Google Cloud Console:
> - HTTP referrers: จำกัดเฉพาะโดเมน GitHub Pages ของคุณ
> - API restrictions: เปิดเฉพาะ Generative Language API
> - ตั้ง quota/budget alert

## Deploy ขึ้น GitHub Pages

```bash
git init
git add index.html settings.html README.md
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
