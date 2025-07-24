function vigenereProcess(input, key, mode = 'enc') {
    if (!key.match(/^[a-z]+$/i)) return "Key must be A-Z letters only.";
    input = input.toUpperCase().replace(/[^A-Z]/g, '');
    key = key.toUpperCase();
    let res = '';
    let ki = 0, kl = key.length;
    for (let i = 0; i < input.length; i++) {
        let ch = input[i];
        let k = key[ki++ % kl];
        let ci = ch.charCodeAt(0) - 65;
        let ki_ = k.charCodeAt(0) - 65;
        let co;
        if (mode === 'enc') {
            co = (ci + ki_) % 26;
        } else {
            co = (ci - ki_ + 26) % 26;
        }
        res += String.fromCharCode(co + 65);
    }
    return res;
}
(function() {
    const keyEl = document.getElementById('vig-key');
    const inEl  = document.getElementById('vig-input');
    const outEl = document.getElementById('vig-output');
    const btnEnc = document.getElementById('vig-encode');
    const btnDec = document.getElementById('vig-decode');

    btnEnc.onclick = () => {
        outEl.value = vigenereProcess(inEl.value, keyEl.value, 'enc');
    };
    btnDec.onclick = () => {
        outEl.value = vigenereProcess(inEl.value, keyEl.value, 'dec');
    };
})();
