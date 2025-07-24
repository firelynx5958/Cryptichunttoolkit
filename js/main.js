const SECTION_TOOLMAP = {
  ciphers: [
    { name:"Caesar Cipher", tool:"caesar", icon:"swipe" },
    { name:"Vigenère Cipher", tool:"vigenere", icon:"vpn_key" },
    { name:"ROT13", tool:"rot13", icon:"loop" },
    { name:"Affine Cipher", tool:"affine", icon:"functions" },
    { name:"Playfair Cipher", tool:"playfair", icon:"grid_on" },
    { name:"Rail Fence Cipher", tool:"railfence", icon:"timeline" },
    { name:"Shift Tool", tool:"shift", icon:"compare_arrows" },
    { name:"Base64", tool:"base64", icon:"code" },
    { name:"Base32/Base85", tool:"baseencode", icon:"repeat" },
    { name:"Binary/ASCII", tool:"binary", icon:"flip" },
    { name:"Morse", tool:"morse", icon:"graphic_eq" }
  ],
  text: [
    { name:"Anagram Solver", tool:"anagram", icon:"shuffle" },
    { name:"Regex Tester", tool:"regex", icon:"rule" },
    { name:"Unicode Inspector", tool:"unicode", icon:"translate" },
    { name:"Braille Converter", tool:"braille", icon:"border_clear" },
    { name:"Text Flipper", tool:"text-reverser", icon:"swap_horiz" }
  ],
  media: [
    { name:"Image Steg", tool:"steganography", icon:"image" },
    { name:"Audio Steg", tool:"audio-steg", icon:"audiotrack" },
    { name:"QR Code", tool:"qrcode", icon:"qr_code" }
  ],
  info: [
    { name:"Backlink Finder", tool:"backlink", icon:"link" },
    { name:"EXIF Viewer", tool:"exif", icon:"filter" },
    { name:"Hashing Tools", tool:"hash", icon:"fingerprint" }
  ]
};

function htmlToolCard({name,tool,icon}) {
  return `<div class="tool-card" data-tool="${tool}" tabindex="0">
    <span class="material-icons">${icon||"build"}</span> ${name}
  </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('tool-modal');
    const toolContainer = document.getElementById('tool-container');
    const closeBtn = document.querySelector('.close-btn');
    const tabs = document.querySelectorAll('.tab');
    const toolCards = document.querySelectorAll('.tool-card');
    let currentCategory = 'ciphers';
    let lastFocusedCard = null;
    const loadedScripts = {};

    async function loadTool(tool) {
        // Try to load HTML for the tool
        try {
            const html = await fetch(`js/${tool}.html`).then(r => r.ok ? r.text() : null);
            if (html) {
                toolContainer.innerHTML = html;
                // Dynamically load JS if not already loaded
                if (!loadedScripts[tool] && await fetch(`js/${tool}.js`).then(r => r.ok)) {
                    const script = document.createElement('script');
                    script.src = `js/${tool}.js`;
                    script.onload = () => { loadedScripts[tool] = true; };
                    document.body.appendChild(script);
                }
                return;
            }
        } catch {}
        // Fallback placeholder
        toolContainer.innerHTML = `<h2>${tool.charAt(0).toUpperCase() + tool.slice(1)} Tool</h2><p>Coming soon.</p>`;
    }

    function showCategory(category) {
        // Hide/show tool-card (legacy)
        toolCards.forEach(card => {
            if (card.getAttribute('data-category') === category) {
                card.style.display = '';
                card.style.animation = 'none';
                void card.offsetWidth;
                card.style.animation = null;
            } else {
                card.style.display = 'none';
            }
        });
        // Hide/show bright-card (new)
        document.querySelectorAll('.bright-card[data-category]').forEach(card => {
            if (card.getAttribute('data-category') === category) {
                card.style.display = '';
                card.style.animation = 'none';
                void card.offsetWidth;
                card.style.animation = null;
            } else {
                card.style.display = 'none';
            }
        });
        tabs.forEach(tab => {
            if (tab.getAttribute('data-category') === category) {
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                tab.setAttribute('tabindex', '0');
            } else {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
                tab.setAttribute('tabindex', '-1');
            }
        });
        currentCategory = category;
    }

    tabs.forEach((tab, idx) => {
        tab.addEventListener('click', () => {
            showCategory(tab.getAttribute('data-category'));
            tab.focus();
        });
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                let newIdx = idx + (e.key === 'ArrowRight' ? 1 : -1);
                if (newIdx < 0) newIdx = tabs.length - 1;
                if (newIdx >= tabs.length) newIdx = 0;
                tabs[newIdx].focus();
                showCategory(tabs[newIdx].getAttribute('data-category'));
            }
        });
        tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');
        tab.setAttribute('role', 'tab');
    });
    document.querySelector('.tab-bar').setAttribute('role', 'tablist');
    showCategory('ciphers');

    // Tool card click logic for bright-card
    document.querySelectorAll('.bright-card[data-tool]').forEach(card => {
        card.addEventListener('click', () => {
            const tool = card.getAttribute('data-tool');
            const modal = document.getElementById('tool-modal');
            const toolContainer = document.getElementById('tool-container');
            const closeBtn = document.querySelector('.close-btn');
            // Load tool as before
            if (window.loadTool) {
                window.loadTool(tool);
            } else if (typeof loadTool === 'function') {
                loadTool(tool);
            }
            modal.classList.remove('hidden');
            closeBtn.focus();
        });
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    function closeModal() {
        modal.classList.add('hidden');
        toolContainer.innerHTML = '';
        if (lastFocusedCard) lastFocusedCard.focus();
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'Escape') closeModal();
            // Focus trap
            if (e.key === 'Tab') {
                const focusable = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        }
    });
});
