(function(){
    const input = document.getElementById('reverser-input');
    const output = document.getElementById('reverser-output');
    const btn = document.getElementById('reverser-btn');
    btn.onclick = () => {
        output.value = input.value.split('').reverse().join('');
    };
    input.oninput = btn.onclick;
})(); 