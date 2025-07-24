(function(){
    const input = document.getElementById('unicode-input');
    const output = document.getElementById('unicode-output');
    const btn = document.getElementById('unicode-btn');
    async function getUnicodeName(cp) {
        try {
            const resp = await fetch(`https://www.unicode.org/Public/UNIDATA/UnicodeData.txt`);
            if (!resp.ok) return 'Unknown';
            const text = await resp.text();
            const line = text.split('\n').find(l => l.startsWith(cp.toUpperCase() + ';'));
            if (line) return line.split(';')[1];
        } catch {}
        return 'Unknown';
    }
    btn.onclick = async () => {
        let val = input.value;
        if (!val) {
            output.innerHTML = 'Please enter some text.';
            return;
        }
        output.innerHTML = 'Inspecting...';
        let results = await Promise.all([...val].map(async c => {
            const cp = c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
            let name = await getUnicodeName(cp);
            return `<div>'${c}' U+${cp} <span style='color:#b0b0b0'>${name}</span></div>`;
        }));
        output.innerHTML = results.join('');
    };
})(); 