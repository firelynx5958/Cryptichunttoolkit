(function(){
    const input = document.getElementById('braille-input');
    const output = document.getElementById('braille-output');
    const toBrailleBtn = document.getElementById('braille-to-braille');
    const toTextBtn = document.getElementById('braille-to-text');
    // Simple a-z mapping
    const brailleMap = '⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠭⠽⠵'.split('');
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    function toBraille(str) {
        return str.toLowerCase().split('').map(c => {
            let idx = alpha.indexOf(c);
            return idx !== -1 ? brailleMap[idx] : c;
        }).join('');
    }
    function fromBraille(str) {
        return str.split('').map(c => {
            let idx = brailleMap.indexOf(c);
            return idx !== -1 ? alpha[idx] : c;
        }).join('');
    }
    toBrailleBtn.onclick = () => {
        output.innerHTML = toBraille(input.value);
    };
    toTextBtn.onclick = () => {
        output.innerHTML = fromBraille(input.value);
    };
})(); 