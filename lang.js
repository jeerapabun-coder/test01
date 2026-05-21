// ============================================
// Claim Management System - Language System
// ============================================

const LANG = {
    th: {
        // Sidebar
        brand: 'Claim System',
        menuDashboard: 'แดชบอร์ด',
        menuSettings: 'ตั้งค่า',
        statusConfigured: 'เชื่อมต่อแล้ว',
        statusNotConfigured: 'ยังไม่ได้ตั้งค่า',

        // Topbar
        pageDashboard: 'แดชบอร์ด',
        pageSettings: 'ตั้งค่าระบบ',
        refresh: 'รีเฟรช',

        // Dashboard
        lookerTitle: 'รายงาน Looker Studio',
        lookerPlaceholder: 'ยังไม่ได้ตั้งค่า Looker Studio URL',
        goToSettings: 'ไปตั้งค่า',

        // Chat
        chatTitle: 'ถาม-ตอบข้อมูล (Gemini AI)',
        chatWelcome: 'สวัสดีครับ! ผมพร้อมตอบคำถามจากข้อมูล Google Sheet ของคุณ กรุณาตั้งค่า API Key และ Sheet ID ในหน้า<a href="settings.html">ตั้งค่า</a>ก่อนเริ่มใช้งาน',
        chatPlaceholder: 'พิมพ์คำถามเกี่ยวกับข้อมูลของคุณ...',
        chatHint: 'กด Enter เพื่อส่ง • Shift+Enter ขึ้นบรรทัดใหม่',
        chatNeedConfig: 'กรุณาตั้งค่า API Keys ใน<a href="settings.html">หน้าตั้งค่า</a>ก่อนใช้งาน',
        chatError: 'เกิดข้อผิดพลาด',
        chatNoAnswer: 'ไม่สามารถสร้างคำตอบได้',
        chatNoData: 'ไม่มีข้อมูล',
        chatDataInfo: 'ข้อมูลมีทั้งหมด {rows} แถว {cols} คอลัมน์',
        chatColumns: 'คอลัมน์',
        chatShowing: 'แสดง {shown} จาก {total} แถว',
        chatNeedSheet: 'กรุณาตั้งค่า Google Sheet ID และ API Key ก่อน',

        // AI System Prompt
        aiSystemPrompt: 'คุณเป็น AI ผู้ช่วยวิเคราะห์ข้อมูลจาก Google Sheet ตอบเป็นภาษาไทย\nถ้าข้อมูลมีตัวเลข ให้แสดงเป็นตารางหรือรายการที่อ่านง่าย\nถ้าถูกถามเรื่องที่ไม่เกี่ยวกับข้อมูล ให้ตอบว่าสามารถช่วยได้เฉพาะเรื่องข้อมูลใน Sheet',
        aiReady: 'เข้าใจแล้วครับ ผมพร้อมตอบคำถามจากข้อมูลใน Sheet แล้ว',

        // Settings Page
        settingsSheetTitle: 'Google Sheet',
        settingsSheetDesc: 'ตั้งค่าการเชื่อมต่อ Google Sheet',
        settingsSheetId: 'Google Sheet ID',
        settingsSheetIdPlaceholder: 'เช่น 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms',
        settingsSheetIdHint: 'คัดลอกจาก URL: docs.google.com/spreadsheets/d/<strong>[SHEET_ID]</strong>/edit',
        settingsSheetName: 'ชื่อ Sheet (Tab)',
        settingsSheetNamePlaceholder: 'เช่น Sheet1',
        settingsSheetNameHint: 'ชื่อแท็บที่ต้องการดึงข้อมูล',
        settingsSheetApiKey: 'Google Sheets API Key',
        settingsSheetApiKeyHint: 'สร้างได้ที่ <a href="https://console.cloud.google.com/apis/credentials" target="_blank">Google Cloud Console</a> → Credentials → API Key',

        settingsGeminiTitle: 'Gemini API',
        settingsGeminiDesc: 'ตั้งค่า AI สำหรับถาม-ตอบข้อมูล',
        settingsGeminiApiKey: 'Gemini API Key',
        settingsGeminiApiKeyHint: 'สร้างได้ที่ <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a> → Get API Key',
        settingsGeminiModel: 'โมเดล',
        settingsGeminiModelRecommend: '(แนะนำ)',

        settingsLookerTitle: 'Looker Studio',
        settingsLookerDesc: 'ตั้งค่า Dashboard Embed URL',
        settingsLookerUrl: 'Looker Studio Embed URL',
        settingsLookerUrlHint: 'วิธีหา: เปิด Report → ไฟล์ → ฝังรายงาน → คัดลอก URL<br>URL ต้องมีคำว่า <strong>/embed/</strong> อยู่ด้วย',

        btnSave: 'บันทึกการตั้งค่า',
        btnTest: 'ทดสอบการเชื่อมต่อ',
        btnClear: 'ล้างการตั้งค่า',
        clearConfirm: 'ต้องการล้างการตั้งค่าทั้งหมด?',
        saveSuccess: 'บันทึกการตั้งค่าเรียบร้อยแล้ว ✅',
        clearSuccess: 'ล้างการตั้งค่าเรียบร้อยแล้ว',

        // Test Results
        testTitle: 'ผลการทดสอบ',
        testLoading: '⏳ กำลังทดสอบ...',
        testSheetSuccess: '✅ Google Sheet — เชื่อมต่อสำเร็จ ({rows} แถว, {cols} คอลัมน์)',
        testSheetColumns: '📋 คอลัมน์: {columns}',
        testSheetError: '❌ Google Sheet — {error}',
        testSheetMissing: '⚠️ Google Sheet — ยังไม่ได้กรอก Sheet ID หรือ API Key',
        testGeminiSuccess: '✅ Gemini API ({model}) — เชื่อมต่อสำเร็จ',
        testGeminiError: '❌ Gemini API — {error}',
        testGeminiMissing: '⚠️ Gemini API — ยังไม่ได้กรอก API Key',
        testLookerOk: '✅ Looker Studio URL — รูปแบบถูกต้อง',
        testLookerNoEmbed: '⚠️ Looker Studio URL — ต้องเป็น Embed URL (มี /embed/ ใน URL)',
        testLookerBadUrl: '❌ Looker Studio URL — URL ไม่ถูกต้อง',
        testLookerSkip: 'ℹ️ Looker Studio — ไม่ได้ตั้งค่า (ไม่บังคับ)'
    },

    en: {
        // Sidebar
        brand: 'Claim System',
        menuDashboard: 'Dashboard',
        menuSettings: 'Settings',
        statusConfigured: 'Connected',
        statusNotConfigured: 'Not configured',

        // Topbar
        pageDashboard: 'Dashboard',
        pageSettings: 'System Settings',
        refresh: 'Refresh',

        // Dashboard
        lookerTitle: 'Looker Studio Report',
        lookerPlaceholder: 'Looker Studio URL not configured',
        goToSettings: 'Go to Settings',

        // Chat
        chatTitle: 'Q&A Data (Gemini AI)',
        chatWelcome: 'Hello! I\'m ready to answer questions from your Google Sheet data. Please set up API Key and Sheet ID in the <a href="settings.html">Settings</a> page first.',
        chatPlaceholder: 'Type a question about your data...',
        chatHint: 'Press Enter to send • Shift+Enter for new line',
        chatNeedConfig: 'Please set up API Keys in the <a href="settings.html">Settings</a> page first.',
        chatError: 'Error occurred',
        chatNoAnswer: 'Unable to generate an answer',
        chatNoData: 'No data available',
        chatDataInfo: 'Total: {rows} rows, {cols} columns',
        chatColumns: 'Columns',
        chatShowing: 'Showing {shown} of {total} rows',
        chatNeedSheet: 'Please configure Google Sheet ID and API Key first',

        // AI System Prompt
        aiSystemPrompt: 'You are an AI assistant for analyzing data from Google Sheet. Answer in English.\nIf the data contains numbers, display as tables or easy-to-read lists.\nIf asked about unrelated topics, say you can only help with data in the Sheet.',
        aiReady: 'Got it! I\'m ready to answer questions from the Sheet data.',

        // Settings Page
        settingsSheetTitle: 'Google Sheet',
        settingsSheetDesc: 'Configure Google Sheet connection',
        settingsSheetId: 'Google Sheet ID',
        settingsSheetIdPlaceholder: 'e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms',
        settingsSheetIdHint: 'Copy from URL: docs.google.com/spreadsheets/d/<strong>[SHEET_ID]</strong>/edit',
        settingsSheetName: 'Sheet Name (Tab)',
        settingsSheetNamePlaceholder: 'e.g. Sheet1',
        settingsSheetNameHint: 'Tab name to fetch data from',
        settingsSheetApiKey: 'Google Sheets API Key',
        settingsSheetApiKeyHint: 'Create at <a href="https://console.cloud.google.com/apis/credentials" target="_blank">Google Cloud Console</a> → Credentials → API Key',

        settingsGeminiTitle: 'Gemini API',
        settingsGeminiDesc: 'Configure AI for data Q&A',
        settingsGeminiApiKey: 'Gemini API Key',
        settingsGeminiApiKeyHint: 'Create at <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a> → Get API Key',
        settingsGeminiModel: 'Model',
        settingsGeminiModelRecommend: '(Recommended)',

        settingsLookerTitle: 'Looker Studio',
        settingsLookerDesc: 'Configure Dashboard Embed URL',
        settingsLookerUrl: 'Looker Studio Embed URL',
        settingsLookerUrlHint: 'How to: Open Report → File → Embed Report → Copy URL<br>URL must contain <strong>/embed/</strong>',

        btnSave: 'Save Settings',
        btnTest: 'Test Connection',
        btnClear: 'Clear Settings',
        clearConfirm: 'Clear all settings?',
        saveSuccess: 'Settings saved successfully ✅',
        clearSuccess: 'Settings cleared successfully',

        // Test Results
        testTitle: 'Test Results',
        testLoading: '⏳ Testing...',
        testSheetSuccess: '✅ Google Sheet — Connected ({rows} rows, {cols} columns)',
        testSheetColumns: '📋 Columns: {columns}',
        testSheetError: '❌ Google Sheet — {error}',
        testSheetMissing: '⚠️ Google Sheet — Sheet ID or API Key not provided',
        testGeminiSuccess: '✅ Gemini API ({model}) — Connected',
        testGeminiError: '❌ Gemini API — {error}',
        testGeminiMissing: '⚠️ Gemini API — API Key not provided',
        testLookerOk: '✅ Looker Studio URL — Format correct',
        testLookerNoEmbed: '⚠️ Looker Studio URL — Must be Embed URL (contains /embed/)',
        testLookerBadUrl: '❌ Looker Studio URL — Invalid URL',
        testLookerSkip: 'ℹ️ Looker Studio — Not configured (optional)'
    }
};

// ============================================
// Language Manager
// ============================================
function getCurrentLang() {
    return localStorage.getItem('cms_lang') || 'th';
}

function setLang(lang) {
    localStorage.setItem('cms_lang', lang);
    applyLang(lang);
}

function t(key, params = {}) {
    const lang = getCurrentLang();
    let text = LANG[lang]?.[key] || LANG['th'][key] || key;
    Object.keys(params).forEach(k => {
        text = text.replace(`{${k}}`, params[k]);
    });
    return text;
}

function applyLang(lang) {
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        const text = LANG[lang]?.[key] || '';
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else if (el.hasAttribute('data-lang-html')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Update language toggle button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.langVal === lang);
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// ============================================
// Language Toggle Component
// ============================================
function createLangToggle() {
    const container = document.createElement('div');
    container.className = 'lang-toggle';
    container.innerHTML = `
        <button class="lang-btn ${getCurrentLang() === 'th' ? 'active' : ''}" data-lang-val="th">TH</button>
        <button class="lang-btn ${getCurrentLang() === 'en' ? 'active' : ''}" data-lang-val="en">EN</button>
    `;

    container.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLang(btn.dataset.langVal);
        });
    });

    return container;
}
