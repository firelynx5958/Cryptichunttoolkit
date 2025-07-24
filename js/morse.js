(function(){
    const input = document.getElementById('morse-input');
    const output = document.getElementById('morse-output');
    const toMorseBtn = document.getElementById('morse-to-morse');
    const toTextBtn = document.getElementById('morse-to-text');
    const morseMap = {
        'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.',
        'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---',
        'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---',
        'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
        'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--',
        'Z': '--..',  '0': '-----', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
        '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
        ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
        '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
    };
    const invMorseMap = Object.fromEntries(Object.entries(morseMap).map(([k,v])=>[v,k]));
    toMorseBtn.onclick = () => {
        output.value = input.value.toUpperCase().split('').map(c => morseMap[c] || '').join(' ').replace(/ +/g,' ').replace(/\//g,' / ');
    };
    toTextBtn.onclick = () => {
        try {
            output.value = input.value.trim().split(/\s+/).map(m => invMorseMap[m] || (m==='/')?' ':'').join('');
        } catch (e) {
            output.value = 'Invalid Morse.';
        }
    };
})(); 