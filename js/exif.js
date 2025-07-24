(function(){
    const input = document.getElementById('exif-input');
    const btn = document.getElementById('exif-btn');
    const output = document.getElementById('exif-output');
    btn.onclick = () => {
        if (!input.files || !input.files[0]) {
            output.innerHTML = 'Please upload an image.';
            return;
        }
        output.innerHTML = 'Reading EXIF...';
        try {
            EXIF.getData(input.files[0], function() {
                const all = EXIF.getAllTags(this);
                if (Object.keys(all).length === 0) {
                    output.innerHTML = '<span style="color:#ffb0b0">No EXIF data found.</span>';
                } else {
                    output.innerHTML = Object.entries(all).map(([k,v]) => `<div><b>${k}:</b> ${v}</div>`).join('');
                }
            });
        } catch (e) {
            output.innerHTML = '<span style="color:#ffb0b0">Error reading EXIF data.</span>';
        }
    };
})(); 