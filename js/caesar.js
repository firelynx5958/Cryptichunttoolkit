function caesarShift(str, amount) {
    if (!amount || isNaN(amount)) amount = 0;
    let out = '';
    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (c.match(/[a-z]/i)) {
            let code = str.charCodeAt(i);
            let base = code >= 65 && code <= 90 ? 65 : 97;
            let shifted = ((code - base + amount + 26) % 26) + base;
            c = String.fromCharCode(shifted);
        }
        out += c;
    }
    return out;
}
(function(){
    const input = document.getElementById('caesar-input');
    const output = document.getElementById('caesar-output');
    const shift = document.getElementById('caesar-shift');
    const encodeBtn = document.getElementById('caesar-encode');
    const decodeBtn = document.getElementById('caesar-decode');
    function updateOutput(amount) {
        output.value = caesarShift(input.value, amount);
    }
    encodeBtn.onclick = () => updateOutput(Number(shift.value));
    decodeBtn.onclick = () => updateOutput(-Number(shift.value));
    input.oninput = encodeBtn.onclick;
    shift.oninput = encodeBtn.onclick;
})();
