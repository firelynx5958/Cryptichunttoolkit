(function(){
    const input = document.getElementById('backlink-input');
    const output = document.getElementById('backlink-output');
    const btn = document.getElementById('backlink-btn');
    const serviceBases = {
        tinyurl: code => `https://tinyurl.com/${code}`,
        bitly: code => `https://bit.ly/${code}`,
        pastebin: code => `https://pastebin.com/${code}`,
        dropbox: code => `https://www.dropbox.com/s/${code}`,
        youtube: code => `https://youtu.be/${code}`,
        imgur: code => `https://imgur.com/${code}`,
        spotify: code => `https://open.spotify.com/track/${code}`,
        discord: code => `https://discord.gg/${code}`
    };
    function isUrl(str) {
        return /^https?:\/\//i.test(str);
    }
    function isPastebinCode(code) {
        // Pastebin codes are usually 8+ alphanumeric chars, sometimes longer
        return /^[a-zA-Z0-9]{8,}$/.test(code);
    }
    async function unshortenApi(url) {
        try {
            const resp = await fetch(`https://unshorten.me/json/${encodeURIComponent(url)}`);
            if (!resp.ok) return null;
            const data = await resp.json();
            if (data && data.resolved_url && data.resolved_url !== url) {
                return data.resolved_url;
            }
        } catch (e) {}
        return null;
    }
    function makeLink(label, url) {
        return `<div style='margin-bottom:0.5em;'><b>${label}:</b> <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></div>`;
    }
    btn.onclick = async () => {
        let val = input.value.trim();
        if (!val) {
            output.innerHTML = 'Please enter a URL or code.';
            return;
        }
        if (isUrl(val)) {
            output.innerHTML = 'Searching...';
            let expanded = await unshortenApi(val);
            if (expanded) {
                output.innerHTML = makeLink('Result', expanded);
            } else {
                output.innerHTML = val + '<br><span style="color:#ffb0b0">(Could not expand. Some links may not be supported by the API.)</span>';
            }
            return;
        }
        // Try all services
        output.innerHTML = 'Searching all supported services...';
        const tries = Object.entries(serviceBases).map(async ([service, fn]) => {
            const url = fn(val);
            const expanded = await unshortenApi(url);
            return expanded ? {service, url, expanded} : null;
        });
        const results = (await Promise.all(tries)).filter(Boolean);
        if (isPastebinCode(val)) {
            results.push({
                service: 'pastebin',
                url: `https://pastebin.com/${val}`
            });
        }
        if (results.length === 0) {
            output.innerHTML = '<span style="color:#ffb0b0">No supported service found for this code. Try checking the code or pasting the full short URL.</span>';
        } else if (results.length === 1) {
            const r = results[0];
            output.innerHTML = makeLink(r.service, r.url || r.expanded);
        } else {
            let html = '<b>Multiple possible matches found:</b><br>';
            results.forEach(r => {
                html += `${r.service}: <a href="${r.url}" target="_blank">${r.url}</a><br>`;
            });
            output.innerHTML = html;
        }
    };
})(); 
