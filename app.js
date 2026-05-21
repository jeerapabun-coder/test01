// ============================================
// Claim Management System - Main App
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initLangToggle();
    applyLang(getCurrentLang());
    initDashboard();
    initChat();
    updateConnectionStatus();
});

// ============================================
// Language Toggle
// ============================================
function initLangToggle() {
    const container = document.getElementById('langToggleContainer');
    if (container) container.appendChild(createLangToggle());
}

// ============================================
// Settings Helper
// ============================================
function getSettings() {
    return {
        sheetId: localStorage.getItem('cms_sheetId') || '',
        sheetName: localStorage.getItem('cms_sheetName') || 'Sheet1',
        sheetApiKey: localStorage.getItem('cms_sheetApiKey') || '',
        geminiApiKey: localStorage.getItem('cms_geminiApiKey') || '',
        geminiModel: localStorage.getItem('cms_geminiModel') || 'gemini-2.0-flash',
        lookerUrl: localStorage.getItem('cms_lookerUrl') || ''
    };
}

function isConfigured() {
    const s = getSettings();
    return s.sheetId && s.sheetApiKey && s.geminiApiKey;
}

function updateConnectionStatus() {
    const dot = document.querySelector('#connectionStatus .status-dot');
    const txt = document.querySelector('#connectionStatus .status-text');
    if (!dot || !txt) return;
    if (isConfigured()) {
        dot.className = 'status-dot online';
        txt.textContent = t('statusConfigured');
    } else {
        dot.className = 'status-dot offline';
        txt.textContent = t('statusNotConfigured');
    }
}

// ============================================
// Sidebar
// ============================================
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

// ============================================
// Dashboard / Looker Embed
// ============================================
function initDashboard() {
    const settings = getSettings();
    const frame = document.getElementById('lookerFrame');
    const placeholder = document.getElementById('embedPlaceholder');
    const expandBtn = document.getElementById('expandDashboard');
    const embedContainer = document.getElementById('dashboardEmbed');
    const refreshBtn = document.getElementById('refreshBtn');

    if (settings.lookerUrl) {
        frame.src = settings.lookerUrl;
        frame.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
    }

    if (expandBtn && embedContainer) {
        expandBtn.addEventListener('click', () => {
            embedContainer.classList.toggle('expanded');
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            if (frame && frame.src) frame.src = frame.src;
            cachedSheetData = null;
        });
    }
}

// ============================================
// Google Sheet Data
// ============================================
let cachedSheetData = null;

async function fetchSheetData() {
    if (cachedSheetData) return cachedSheetData;
    const settings = getSettings();
    if (!settings.sheetId || !settings.sheetApiKey) {
        throw new Error(t('chatNeedSheet'));
    }
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${settings.sheetId}/values/${encodeURIComponent(settings.sheetName)}?key=${settings.sheetApiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `Sheet API Error: ${res.status}`);
    }
    const data = await res.json();
    cachedSheetData = data.values || [];
    return cachedSheetData;
}

function sheetDataToText(data) {
    if (!data || data.length === 0) return t('chatNoData');
    const headers = data[0];
    const rows = data.slice(1);
    const limitedRows = rows.slice(0, 200);

    let text = t('chatDataInfo', { rows: rows.length, cols: headers.length }) + '\n';
    text += t('chatColumns') + ': ' + headers.join(', ') + '\n\n';
    text += headers.join('\t') + '\n';
    limitedRows.forEach(row => { text += row.join('\t') + '\n'; });
    if (rows.length > 200) {
        text += '\n... (' + t('chatShowing', { shown: 200, total: rows.length }) + ')';
    }
    return text;
}

// ============================================
// Gemini AI Chat
// ============================================
let chatHistory = [];

function initChat() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    if (!input || !sendBtn) return;

    input.addEventListener('input', () => {
        sendBtn.disabled = !input.value.trim();
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.value.trim()) sendMessage();
        }
    });

    sendBtn.addEventListener('click', () => {
        if (input.value.trim()) sendMessage();
    });
}

function addMessage(content, type = 'bot') {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `message ${type}`;
    const avatarSvg = type === 'bot'
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
    div.innerHTML = `
        <div class="message-avatar">${avatarSvg}</div>
        <div class="message-content"><p>${content}</p></div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

function addTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'message bot';
    div.id = 'typingIndicator';
    div.innerHTML = `
        <div class="message-avatar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>
        <div class="message-content"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const question = input.value.trim();
    if (!question) return;

    if (!isConfigured()) {
        addMessage(question, 'user');
        addMessage(t('chatNeedConfig'));
        input.value = '';
        return;
    }

    addMessage(question, 'user');
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    addTypingIndicator();

    try {
        const sheetData = await fetchSheetData();
        const dataText = sheetDataToText(sheetData);
        const settings = getSettings();

        const systemPrompt = t('aiSystemPrompt') + '\n\n' + dataText;

        const messages = [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'model', parts: [{ text: t('aiReady') }] }
        ];

        chatHistory.forEach(msg => {
            messages.push({ role: 'user', parts: [{ text: msg.q }] });
            messages.push({ role: 'model', parts: [{ text: msg.a }] });
        });

        messages.push({ role: 'user', parts: [{ text: question }] });

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${settings.geminiModel}:generateContent?key=${settings.geminiApiKey}`;

        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: messages,
                generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
            })
        });

        removeTypingIndicator();

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error?.message || `Gemini API Error: ${res.status}`);
        }

        const data = await res.json();
        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || t('chatNoAnswer');
        addMessage(formatAnswer(answer), 'bot');

        chatHistory.push({ q: question, a: answer });
        if (chatHistory.length > 10) chatHistory.shift();
    } catch (err) {
        removeTypingIndicator();
        addMessage(`❌ ${t('chatError')}: ${err.message}`);
    }
}

function formatAnswer(text) {
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');

    if (html.includes('|') && html.split('<br>').filter(l => l.includes('|')).length > 2) {
        const lines = html.split('<br>');
        let inTable = false, tableHtml = '', result = '';
        lines.forEach(line => {
            if (line.trim().includes('|') && !line.trim().match(/^\|[-\s|]+\|$/)) {
                if (!inTable) {
                    tableHtml = '<table>';
                    inTable = true;
                    const cells = line.split('|').filter(c => c.trim());
                    tableHtml += '<tr>' + cells.map(c => `<th>${c.trim()}</th>`).join('') + '</tr>';
                } else {
                    const cells = line.split('|').filter(c => c.trim());
                    tableHtml += '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
                }
            } else if (line.trim().match(/^\|[-\s|]+\|$/)) {
                // skip separator
            } else {
                if (inTable) { tableHtml += '</table>'; result += tableHtml; inTable = false; tableHtml = ''; }
                result += line + '<br>';
            }
        });
        if (inTable) { tableHtml += '</table>'; result += tableHtml; }
        html = result;
    }
    return html;
}
