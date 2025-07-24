function modinv(a, m) {
  let m0 = m, t, q, x0 = 0, x1 = 1;
  if (m === 1) return 0;
  while (a > 1) {
    q = Math.floor(a / m);
    t = m;
    m = a % m; a = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }
  return (x1 + m0) % m0;
}
function affineEncode(text, a, b) {
  return text.toUpperCase().replace(/[A-Z]/g, ch => {
    let x = ch.charCodeAt(0) - 65;
    return String.fromCharCode(((a * x + b) % 26) + 65);
  });
}
function affineDecode(text, a, b) {
  let aInv = modinv(a, 26);
  return text.toUpperCase().replace(/[A-Z]/g, ch => {
    let y = ch.charCodeAt(0) - 65;
    return String.fromCharCode(((aInv * (y - b + 26)) % 26) + 65);
  });
}
(function() {
  const input = document.getElementById('affine-input');
  const a = document.getElementById('affine-a');
  const b = document.getElementById('affine-b');
  const output = document.getElementById('affine-output');
  const enc = document.getElementById('affine-encode');
  const dec = document.getElementById('affine-decode');
  enc.onclick = () => {
    output.value = affineEncode(input.value, Number(a.value), Number(b.value));
  };
  dec.onclick = () => {
    output.value = affineDecode(input.value, Number(a.value), Number(b.value));
  };
})();
