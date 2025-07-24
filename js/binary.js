(function(){
    const input = document.getElementById('binary-input');
    const output = document.getElementById('binary-output');
    const toBinaryBtn = document.getElementById('binary-to-binary');
    const toAsciiBtn = document.getElementById('binary-to-ascii');
    toBinaryBtn.onclick = () => {
        output.value = input.value.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    };
    toAsciiBtn.onclick = () => {
        try {
            output.value = input.value.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('');
        } catch (e) {
            output.value = 'Invalid binary.';
        }
    };
})(); 