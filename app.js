// =================================================================
// MATRIX CANVAS STREAM BACKGROUND
// =================================================================
(function initMatrixBackground() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const alphabet = "HUOKAING THARA BANK 1 2 CINEMA CRYPTO COMPLIANCE WITHDRAWAL CALCULATOR QR SCANNER PEN TEST RED TEAM";
  const fontSize = 15;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  const charOffsets = Array.from({ length: columns }, () => Math.floor(Math.random() * alphabet.length));

  function draw() {
    ctx.fillStyle = 'rgba(3, 7, 18, 0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00f0ff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const idx = (charOffsets[i] + drops[i]) % alphabet.length;
      ctx.fillText(alphabet[idx], i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 40);
})();

// =================================================================
// AI VOICE READER ENGINE (Khmer & English)
// =================================================================
const voiceScripts = [
  {
    langCode: 'km',
    langName: 'Khmer',
    locale: 'km-KH',
    lines: [
      "សូមគោរពជូនអតិថិជនទាំងអស់មេត្តាជ្រាបថា ធនាគារ ហួកាំង ថារ៉ា ១ កំពុងស្ថិតក្រោមការអភិវឌ្ឍ និងដំឡើងកំណែប្រព័ន្ធស្នូល។",
      "ប្រព័ន្ធដែលកំពុងអភិវឌ្ឍរួមមាន ផ្នែករោងភាពយន្ត គ្រីបតូកឺរិនស៊ី អនុលោមភាពហិរញ្ញវត្ថុ ការដកប្រាក់ កាល់គុយឡាទ័រ និងប្រព័ន្ធស្កេន QR ។",
      "ការដំឡើងកំណែនេះនឹងប្រព្រឹត្តិទៅរហូតដល់ម៉ោង ៥ ល្ងាច ថ្ងៃនេះ។",
      "សូមអញ្ជើញបន្តប្រតិបត្តិការរបស់អ្នកនៅធនាគារទី ២ តាមរយៈតំណភ្ជាប់ដែលបានផ្តល់ជូន។",
      "បន្ទាប់មក ប្រព័ន្ធនឹងត្រូវធ្វើតេស្តសុវត្ថិភាពប្រតិបត្តិការដោយក្រុមការងារសន្តិសុខ سایب៊ឺ និងក្រុមហេឃឺរ ក្រោមការដឹកនាំរបស់លោក ហួកាំង ថារ៉ា ជាប្រធានផ្នែកសន្តិសុខ។"
    ]
  },
  {
    langCode: 'en',
    langName: 'English',
    locale: 'en-US',
    lines: [
      "Dear customers, Huokaing Thara Bank 1 is currently undergoing core system development and upgrades.",
      "Modules under enhancement include Cinema, Cryptocurrency, Financial Compliance, Withdrawal Bank, Calculator, and QR Scan Upload.",
      "This maintenance window runs until 5 PM today.",
      "Please continue your transactions securely at Bank 2 using the provided portal link.",
      "Following deployment, operational penetration testing and security audits will be executed by Gray Hat and Red Team hackers, led by Chief of Cybersecurity Mr. Huokaing Thara."
    ]
  }
];

let activeLangIdx = 0;
let activeLineIdx = 0;
let isVoiceSpeaking = false;

function setActiveButton(langCode) {
  document.querySelectorAll('.sys-btn').forEach(btn => {
    if (btn.getAttribute('onclick')?.includes(`'${langCode}'`)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function processSpeechLine() {
  if (!isVoiceSpeaking || !('speechSynthesis' in window)) return;

  const currentLang = voiceScripts[activeLangIdx];

  if (activeLineIdx >= currentLang.lines.length) {
    activeLineIdx = 0;
    activeLangIdx = (activeLangIdx + 1) % voiceScripts.length;
    setTimeout(processSpeechLine, 1000);
    return;
  }

  const textToSpeak = currentLang.lines[activeLineIdx];
  const transcriptEl = document.getElementById('transcript-box');
  if (transcriptEl) {
    transcriptEl.textContent = `[${currentLang.langName.toUpperCase()}] ${textToSpeak}`;
  }
  setActiveButton(currentLang.langCode);

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = currentLang.locale;
  utterance.rate = 0.95;

  utterance.onend = function() {
    activeLineIdx++;
    if (isVoiceSpeaking) setTimeout(processSpeechLine, 400);
  };

  utterance.onerror = function() {
    activeLineIdx++;
    if (isVoiceSpeaking) setTimeout(processSpeechLine, 400);
  };

  speechSynthesis.speak(utterance);
}

function playVoiceAnnouncement(langCode) {
  if (!('speechSynthesis' in window)) {
    alert("Speech Synthesis is not supported in this browser.");
    return;
  }
  speechSynthesis.cancel();
  isVoiceSpeaking = true;

  const foundIdx = voiceScripts.findIndex(s => s.langCode === langCode);
  activeLangIdx = foundIdx !== -1 ? foundIdx : 0;
  activeLineIdx = 0;

  processSpeechLine();
}

function stopVoiceReader() {
  isVoiceSpeaking = false;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  setActiveButton(null);
  const transcriptEl = document.getElementById('transcript-box');
  if (transcriptEl) {
    transcriptEl.textContent = "Voice reader paused by manual user command.";
  }
}

// =================================================================
// COUNTDOWN TIMER TO 5 PM
// =================================================================
function updateCountdownTimer() {
  const now = new Date();
  const target = new Date();
  target.setHours(17, 0, 0, 0); // 5:00 PM today

  const diff = target - now;
  const timerEl = document.getElementById('timer');
  if (!timerEl) return;

  if (diff <= 0) {
    timerEl.textContent = "UPGRADE WINDOW COMPLETED (ACTIVE)";
    return;
  }

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timerEl.textContent = `${hours}h ${minutes}m ${seconds}s REMAINING`;
}
updateCountdownTimer();
setInterval(updateCountdownTimer, 1000);

// =================================================================
// LIVE TELEMETRY LOGS (Security & Development)
// =================================================================
const telemetryFeed = document.getElementById("telemetry-feed");
if (telemetryFeed) {
  setInterval(() => {
    const logs = [
      "CORE UPGRADE: Cinema & Crypto modules compilation active.",
      "COMPLIANCE SYNC: Financial compliance engine verifying ledger nodes.",
      "BANK ROUTING: Withdrawal & QR Scanner API endpoints remapped.",
      "REDIRECTION ACTIVE: Traffic flowing securely to Bank 2 gateway.",
      "SECURITY PREP: Red Team and Gray Hat penetration test environment staging.",
      "CHIEF DIRECTIVE: Cybersecurity audits overseen by Mr. Huokaing Thara."
    ];
    const logItem = logs[Math.floor(Math.random() * logs.length)];
    const li = document.createElement("li");
    li.innerHTML = `<span style="color:var(--neon-gold)">[${new Date().toLocaleTimeString()}]</span> <strong>${logItem}</strong>`;
    telemetryFeed.insertBefore(li, telemetryFeed.firstChild);
    if (telemetryFeed.children.length > 5) telemetryFeed.removeChild(telemetryFeed.lastChild);
  }, 4000);
}
