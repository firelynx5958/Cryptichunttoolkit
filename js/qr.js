(function(){
    const input = document.getElementById('qr-input');
    const genBtn = document.getElementById('qr-generate');
    const decBtn = document.getElementById('qr-decode');
    const qrImg = document.getElementById('qr-image');
    const output = document.getElementById('qr-output');
    genBtn.onclick = () => {
        let val = input.value.trim();
        if (!val) {
            qrImg.innerHTML = '';
            output.innerHTML = 'Please enter text to generate QR.';
            return;
        }
        qrImg.innerHTML = `<img src='https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(val)}&size=180x180' alt='QR Code'>`;
        output.innerHTML = '';
    };
    decBtn.onclick = async () => {
        let val = input.value.trim();
        if (!val) {
            output.innerHTML = 'Please enter an image URL to decode.';
            return;
        }
        output.innerHTML = 'Decoding...';
        try {
            const resp = await fetch(`https://api.qrserver.com/v1/read-qr-code/?fileurl=${encodeURIComponent(val)}`);
            if (!resp.ok) throw new Error('API error');
            const data = await resp.json();
            const result = data[0]?.symbol[0]?.data;
            if (result) {
                output.innerHTML = result;
            } else {
                output.innerHTML = '<span style="color:#ffb0b0">No QR code found or could not decode.</span>';
            }
        } catch (e) {
            output.innerHTML = '<span style="color:#ffb0b0">Error decoding QR code.</span>';
        }
    };
})(); 