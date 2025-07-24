(function(){
    const input = document.getElementById('steg-image-input');
    const message = document.getElementById('steg-image-message');
    const encodeBtn = document.getElementById('steg-image-encode');
    const decodeBtn = document.getElementById('steg-image-decode');
    const output = document.getElementById('steg-image-output');
    encodeBtn.onclick = () => {
        output.innerHTML = 'Encoding...';
        if (!input.files || !input.files[0] || !message.value) {
            output.innerHTML = 'Please upload an image and enter a message.';
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    try {
                        steg.encode(message.value, canvas, {colorCorrect: true});
                    } catch (err) {
                        output.innerHTML = '<span style="color:#ffb0b0">Error encoding image (steg.js failed).</span>';
                        console.error('steg.js encode error:', err);
                        return;
                    }
                    if (canvas.toBlob) {
                        canvas.toBlob(function(blob) {
                            if (!blob) {
                                output.innerHTML = '<span style="color:#ffb0b0">Error: Could not create encoded image blob.</span>';
                                return;
                            }
                            const url = URL.createObjectURL(blob);
                            output.innerHTML = `<a href='${url}' download='steg-encoded.png' style='color:#2997ff'>Download encoded image</a>`;
                        }, 'image/png');
                    } else {
                        output.innerHTML = '<span style="color:#ffb0b0">Error: canvas.toBlob not supported in this browser.</span>';
                    }
                } catch (e) {
                    output.innerHTML = '<span style="color:#ffb0b0">Error encoding image (canvas or image error).</span>';
                    console.error('Canvas/image error:', e);
                }
            };
            img.onerror = function(err) {
                output.innerHTML = '<span style="color:#ffb0b0">Error loading image for encoding.</span>';
                console.error('Image load error:', err);
            };
            img.src = e.target.result;
        };
        reader.onerror = function(err) {
            output.innerHTML = '<span style="color:#ffb0b0">Error reading image file.</span>';
            console.error('FileReader error:', err);
        };
        reader.readAsDataURL(input.files[0]);
    };
    decodeBtn.onclick = () => {
        output.innerHTML = 'Decoding...';
        if (!input.files || !input.files[0]) {
            output.innerHTML = 'Please upload an image.';
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    let msg = '';
                    try {
                        msg = steg.decode(canvas);
                    } catch (err) {
                        output.innerHTML = '<span style="color:#ffb0b0">Error decoding image (steg.js failed).</span>';
                        console.error('steg.js decode error:', err);
                        return;
                    }
                    output.innerHTML = msg ? msg : '<span style="color:#ffb0b0">No message found.</span>';
                } catch (e) {
                    output.innerHTML = '<span style="color:#ffb0b0">Error decoding image (canvas or image error).</span>';
                    console.error('Canvas/image error:', e);
                }
            };
            img.onerror = function(err) {
                output.innerHTML = '<span style="color:#ffb0b0">Error loading image for decoding.</span>';
                console.error('Image load error:', err);
            };
            img.src = e.target.result;
        };
        reader.onerror = function(err) {
            output.innerHTML = '<span style="color:#ffb0b0">Error reading image file.</span>';
            console.error('FileReader error:', err);
        };
        reader.readAsDataURL(input.files[0]);
    };
})(); 