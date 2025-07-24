(function(){
    function shiftText(str, amount) {
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
    const input = document.getElementById('wordshift-input');
    const output = document.getElementById('wordshift-output');
    const shift = document.getElementById('wordshift-shift');
    const btn = document.getElementById('wordshift-btn');
    btn.onclick = () => {
        output.value = shiftText(input.value, Number(shift.value));
    };
    input.oninput = btn.onclick;
    shift.oninput = btn.onclick;
})(); 