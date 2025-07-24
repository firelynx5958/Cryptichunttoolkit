(function(){
    const input = document.getElementById('base64-input');
    const output = document.getElementById('base64-output');
    const encodeBtn = document.getElementById('base64-encode');
    const decodeBtn = document.getElementById('base64-decode');
    encodeBtn.onclick = () => {
        try {
            output.value = btoa(unescape(encodeURIComponent(input.value)));
        } catch (e) {
            output.value = 'Invalid input.';
        }
    };
    decodeBtn.onclick = () => {
        try {
            output.value = decodeURIComponent(escape(atob(input.value)));
        } catch (e) {
            output.value = 'Invalid Base64.';
        }
    };
})(); 