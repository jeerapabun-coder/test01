// ============================================
// Claim Management System - Settings Page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initLangToggle();
    applyLang(getCurrentLang());
    loadSettings();
    initEventListeners();
    updateConnectionStatus();
});

function initLangToggle() {
    const container = document.getElementById('langToggleContainer');
    if (container) container.appendChild(createLangToggle());
}

function initSidebar() {
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    if (toggle) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('show');
        });
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        });
    }
}

function updateConnectionStatus() {
    const dot = document.querySelector('#connectionStatus .status-dot');
    const txt = document.querySelector('#connectionStatus .status-text');
    if (!dot || !txt) return;
    const hasConfig = localStorage.getItem('cms_sheetId') &&
                      localStorage.getItem('cms_sheetApiKey') &&
                      localStorage.getItem('cms_geminiApiKey');
    if (hasConfig) {
        dot.className = 'status-dot online';
        txt.textContent = t('statusConfigured');
    } else {
        dot.className = 'status-dot offline';
        txt.textContent = t('statusNotConfigured');
    }
}

function loadSettings() {
    document.getElementById('sheetId').value = localStorage.getItem('cms_sheetId') || '';
    document.getElementById('sheetName').value = localStorage.getItem('cms_sheetName') || 'Sheet1';
    document.getElementById('sheetApiKey').value = localStorage.getItem('cms_sheetApiKey') || '';
    document.getElementById('geminiApiKey').value = localStorage.getItem('cms_geminiApiKey') || '';
    document.getElementById('geminiModel').value = localStorage.getItem('cms_geminiModel') || 'gemini-2.0-flash';
    document.getElementById('lookerUrl').value = localStorage.getItem('cms_lookerUrl') || '';
}

function saveSettings() {
    localStorage.setItem('cms_sheetId', document.getElementById('sheetId').value.trim());
    localStorage.setItem('cms_sheetName', document.getElementById('sheetName').value.trim() || 'Sheet1');
    localStorage.setItem('cms_sheetApiKey', document.getElementById('sheetApiKey').value.trim());
    localStorage.setItem('cms_geminiApiKey', document.getElementById('geminiApiKey').value.trim());
    localStorage.setItem('cms_geminiModel', document.getElementById('geminiModel').value);
    localStorage.setItem('cms_lookerUrl', document.getElementById('lookerUrl').value.trim());
    updateConnectionStatus();
    showToast(t('saveSuccess'));
}

function clearSettings() {
    if (!confirm(t('clearConfirm'))) return;
    ['cms_sheetId','cms_sheetName','cms_sheetApiKey','cms_geminiApiKey','cms_geminiModel','cms_lookerUrl'].forEach(k => localStorage.removeItem(k));
    loadSettings();
    updateConnectionStatus();
    showToast(t('clearSuccess'));
}

async function testConnection() {
    const results = document.getElementById('testResults');
    const body = document.getElementById('resultBody');
    results.style.display = 'block';
    body.innerHTML = `<div class="result-item info">${t('testLoading')}</div>`;

    let html = '';

    // Test Google Sheet
    const sheetId = document.getElementById('sheetId').value.trim();
    const sheetName = document.getElementById('sheetName').value.trim() || 'Sheet1';
    const sheetKey = document.getElementById('sheetApiKey').value.trim();

    if (sheetId && sheetKey) {
        try {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${sheetKey}`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                const rows = data.values ? data.values.length : 0;
                const cols = data.values && data.values[0] ? data.values[0].length : 0;
                html += `<div class="result-item success">${t('testSheetSuccess', { rows, cols })}</div>`;
                if (data.values && data.values[0]) {
                    html += `<div class="result-item info">${t('testSheetColumns', { columns: data.values[0].join(', ') })}</div>`;
                }
            } else {
                const err = await res.json().catch(() => ({}));
                html += `<div class="result-item error">${t('testSheetError', { error: err.error?.message || res.status })}</div>`;
            }
        } catch (e) {
            html += `<div class="result-item error">${t('testSheetError', { error: e.message })}</div>`;
        }
    } else {
        html += `<div class="result-item error">${t('testSheetMissing')}</div>`;
    }

    // Test Gemini
    const geminiKey = document.getElementById('geminiApiKey').value.trim();
    const geminiModel = document.getElementById('geminiModel').value;

    if (geminiKey) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiKey}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text: 'Reply OK' }] }],
                    generationConfig: { maxOutputTokens: 10 }
                })
            });
            if (res.ok) {
                html += `<div class="result-item success">${t('testGeminiSuccess', { model: geminiModel })}</div>`;
            } else {
                const err = await res.json().catch(() => ({}));
                html += `<div class="result-item error">${t('testGeminiError', { error: err.error?.message || res.status })}</div>`;
            }
        } catch (e) {
            html += `<div class="result-item error">${t('testGeminiError', { error: e.message })}</div>`;
        }
    } else {
        html += `<div class="result-item error">${t('testGeminiMissing')}</div>`;
    }

    // Looker URL
    const lookerUrl = document.getElementById('lookerUrl').value.trim();
    if (lookerUrl) {
        if (lookerUrl.includes('lookerstudio.google.com') && lookerUrl.includes('/embed/')) {
            html += `<div class="result-item success">${t('testLookerOk')}</div>`;
        } else if (lookerUrl.includes('lookerstudio.google.com') || lookerUrl.includes('datastudio.google.com')) {
            html += `<div class="result-item error">${t('testLookerNoEmbed')}</div>`;
        } else {
            html += `<div class="result-item error">${t('testLookerBadUrl')}</div>`;
        }
    } else {
        html += `<div class="result-item info">${t('testLookerSkip')}</div>`;
    }

    body.innerHTML = html;
}

function initEventListeners() {
    document.getElementById('saveSettings').addEventListener('click', saveSettings);
    document.getElementById('testConnection').addEventListener('click', testConnection);
    document.getElementById('clearSettings').addEventListener('click', clearSettings);

    document.getElementById('toggleSheetKey').addEventListener('click', () => {
        const input = document.getElementById('sheetApiKey');
        input.type = input.type === 'password' ? 'text' : 'password';
    });
    document.getElementById('toggleGeminiKey').addEventListener('click', () => {
        const input = document.getElementById('geminiApiKey');
        input.type = input.type === 'password' ? 'text' : 'password';
    });
}

function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position:fixed; bottom:24px; right:24px;
        background:#1c1f2e; color:#e8eaf0;
        border:1px solid #2a2e42;
        padding:14px 24px; border-radius:10px;
        font-family:'Noto Sans Thai',sans-serif; font-size:0.9rem;
        box-shadow:0 4px 20px rgba(0,0,0,0.4); z-index:9999;
        animation:toastIn 0.3s ease;
    `;
    if (!document.getElementById('toastStyle')) {
        const style = document.createElement('style');
        style.id = 'toastStyle';
        style.textContent = `
            @keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
            @keyframes toastOut{from{opacity:1}to{opacity:0;transform:translateY(10px)}}
        `;
        document.head.appendChild(style);
    }
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
