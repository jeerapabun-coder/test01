// ============================================================
// APP CONFIG — แก้ค่าตรงนี้ที่เดียว ใช้ได้ทั้ง index.html และ settings.html
// แก้แล้ว push ขึ้น GitHub Pages → ทุกเครื่องที่เปิดเว็บได้ค่าเดียวกัน
// ผู้ใช้ยัง override ผ่านหน้า Settings ได้ (เก็บใน localStorage ของเครื่องนั้น)
// ============================================================
window.APP_CONFIG = {
  GEMINI_API_KEY: "AIzaSyBhch_AKJ-WENNRNAD979ef27jmDFbVqpU",
  GEMINI_MODEL: "gemini-2.5-flash",
  SHEET_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRDkuy49xfY_O7uATI8EwSYbwWwDU_ORs2gUHn15UvOK_zvp-3FRGkkz5TexxspBzRcejgrtcxb4m_R/pub?gid=0&single=true&output=csv",
  LOOKER_URL: "https://datastudio.google.com/embed/reporting/301fb879-7465-47b1-b437-6cf68598a38d/page/I8pyF",
  MAX_KNOWLEDGE_CHARS: 12000,
};
