// ============================================================
// APP CONFIG — แก้ค่าตรงนี้ที่เดียว ใช้ได้ทั้ง index.html และ settings.html
// ⚠️ อย่าใส่ GEMINI_API_KEY ที่นี่! → ให้แต่ละคนกรอกผ่านหน้า Settings
//    key จะเก็บใน localStorage ของ browser ตัวเอง ไม่รั่วขึ้น GitHub
// ============================================================
window.APP_CONFIG = {
  GEMINI_API_KEY: "",  // ← ห้ามใส่ key จริงที่นี่ ให้กรอกในหน้า Settings
  GEMINI_MODEL: "gemini-2.5-flash",
  SHEET_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRDkuy49xfY_O7uATI8EwSYbwWwDU_ORs2gUHn15UvOK_zvp-3FRGkkz5TexxspBzRcejgrtcxb4m_R/pub?gid=0&single=true&output=csv",
  LOOKER_URL: "https://datastudio.google.com/embed/reporting/301fb879-7465-47b1-b437-6cf68598a38d/page/I8pyF",
  MAX_KNOWLEDGE_CHARS: 12000,
};
