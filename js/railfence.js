function railFenceEncode(text, rails) {
    if (rails < 2) return text;
    let fence = Array.from({length: rails}, () => []);
    let rail = 0, dir = 1;
    for (let c of text) {
        fence[rail].push(c);
        rail += dir;
        if (rail === 0 || rail === rails - 1) dir *= -1;
    }
    return fence.flat().join('');
}
function railFenceDecode(cipher, rails) {
    if (rails < 2) return cipher;
    let len = cipher.length;
    let fence = Array.from({length: rails}, () => Array(len).fill(null));
    let rail = 0, dir = 1;
    for (let i = 0; i < len; i++) {
        fence[rail][i] = '*';
        rail += dir;
        if (rail === 0 || rail === rails - 1) dir *= -1;
    }
    let idx = 0;
    for (let r = 0; r < rails; r++) {
        for (let i = 0; i < len; i++) {
            if (fence[r][i] === '*' && idx < len) {
                fence[r][i] = cipher[idx++];
            }
        }
    }
    let result = '';
    rail = 0; dir = 1;
    for (let i = 0; i < len; i++) {
        result += fence[rail][i];
        rail += dir;
        if (rail === 0 || rail === rails - 1) dir *= -1;
    }
    return result;
}
(function(){
    const input = document.getElementById('railfence-input');
    const output = document.getElementById('railfence-output');
    const rails = document.getElementById('railfence-rails');
    const encodeBtn = document.getElementById('railfence-encode');
    const decodeBtn = document.getElementById('railfence-decode');
    encodeBtn.onclick = () => {
        output.value = railFenceEncode(input.value, Number(rails.value));
    };
    decodeBtn.onclick = () => {
        output.value = railFenceDecode(input.value, Number(rails.value));
    };
})(); 