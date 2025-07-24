(function(){
    const input = document.getElementById('anagram-input');
    const output = document.getElementById('anagram-output');
    const btn = document.getElementById('anagram-btn');
    function makeLink(word) {
        return `<a href='https://www.datamuse.com/words?rel_anagram=${encodeURIComponent(word)}' target='_blank' rel='noopener noreferrer' style='color:#2997ff;margin-right:0.7em;'>${word}</a>`;
    }
    btn.onclick = async () => {
        let val = input.value.trim().replace(/\s+/g, '');
        if (!val) {
            output.innerHTML = 'Please enter a word or phrase.';
            return;
        }
        output.innerHTML = 'Searching...';
        try {
            const resp = await fetch(`https://api.datamuse.com/words?rel_anagram=${encodeURIComponent(val)}`);
            if (!resp.ok) throw new Error('API error');
            const data = await resp.json();
            if (data.length === 0) {
                output.innerHTML = '<span style="color:#ffb0b0">No anagrams found.</span>';
            } else {
                output.innerHTML = data.map(w => makeLink(w.word)).join(' ');
            }
        } catch (e) {
            output.innerHTML = '<span style="color:#ffb0b0">Error fetching anagrams. Please try again later.</span>';
        }
    };
})(); 