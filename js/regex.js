(function(){
    const input = document.getElementById('regex-input');
    const pattern = document.getElementById('regex-pattern');
    const flags = document.getElementById('regex-flags');
    const btn = document.getElementById('regex-btn');
    const output = document.getElementById('regex-output');
    btn.onclick = () => {
        let text = input.value;
        let pat = pattern.value;
        let flg = flags.value;
        if (!pat) {
            output.innerHTML = 'Please enter a regex pattern.';
            return;
        }
        try {
            let re = new RegExp(pat, flg);
            let matches = [...text.matchAll(re)];
            if (matches.length === 0) {
                output.innerHTML = '<span style="color:#ffb0b0">No matches found.</span>';
            } else {
                output.innerHTML = matches.map(m => `<div>Match: <b>${m[0]}</b> at index ${m.index}</div>`).join('');
            }
        } catch (e) {
            output.innerHTML = '<span style="color:#ffb0b0">Invalid regex pattern or flags.</span>';
        }
    };
})(); 