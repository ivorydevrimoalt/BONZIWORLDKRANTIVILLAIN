const chatInput = document.getElementById('chat_message');
if (chatInput) {
  chatInput.addEventListener('input', (event) => {
    let val = event.target.value;

    // 1. Exact string replacements for standard inputs
    val = val.replace(/67/gi, 'Ub');
    val = val.replace(/6\s+7/gi, 'U b');
    val = val.replace(/six\s*seven/gi, 'You bee');
    val = val.replace(/sixty\s*seven/gi, 'Uhb');
    val = val.replace(/sixseven/gi, 'Youbee');
    val = val.replace(/sixtyseven/gi, 'UbUbUbUbUb');

    // 2. Advanced Bypass Protection: Check a normalized version for stealthy spacing/symbols
    // This strips out zero-width spaces, punctuation, symbols, and tabs to catch hidden injections.
    // e.g. "6 . 7", "s-i-x s-e-v-e-n", or hidden unicode characters.
    const normalized = val.toLowerCase().replace(/[\s\u200B-\u200D\uFEFF\p{P}\p{S}]/gu, '');

    if (
      normalized.includes('67') || 
      normalized.includes('sixseven') || 
      normalized.includes('sixtyseven')
    ) {
      // If a hidden bypass is detected in the normalized string, 
      // you can sanitize, clear, or aggressively replace it:
      val = val
        .replace(/6/g, 'U')
        .replace(/7/g, 'b')
        .replace(/six/gi, 'You')
        .replace(/seven/gi, 'bee');
    }

    event.target.value = val;
  });
}
