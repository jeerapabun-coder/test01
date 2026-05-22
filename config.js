// ============================================================
// APP CONFIG — แก้ค่าตรงนี้ที่เดียว ใช้ได้ทั้ง index.html และ settings.html
// แก้แล้ว push ขึ้น GitHub Pages → ทุกเครื่องที่เปิดเว็บได้ค่าเดียวกัน
// ผู้ใช้ยัง override ผ่านหน้า Settings ได้ (เก็บใน localStorage ของเครื่องนั้น)
// ============================================================
window.APP_CONFIG = {
  GEMINI_API_KEY: "AIzaSyBhch_AKJ-WENNRNAD979ef27jmDFbVqpU",
  GEMINI_MODEL: "gemini-2.5-flash",
  SHEET_CSV_URL: "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_SHEET_ID/pub?gid=0&single=true&output=csv",
  LOOKER_URL: "https://lookerstudio.google.com/embed/reporting/YOUR_LOOKER_REPORT_ID/page/YOUR_PAGE_ID",
  MAX_KNOWLEDGE_CHARS: 12000,
};
