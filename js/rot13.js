function rot13(str) {
    return str.replace(/[a-zA-Z]/g, c =>
        String.fromCharCode(
            (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13)
                ? c
                : c - 26
        )
    );
}

(function() {
    const input = document.getElementById('rot13-input');
    const output = document.getElementById('rot13-output');
    const btn = document.getElementById('rot13-convert');

    btn.onclick = () => {
        output.value = rot13(input.value);
    };
    input.oninput = btn.onclick;
})();
