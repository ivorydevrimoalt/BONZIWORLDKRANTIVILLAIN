const chatInput = document.getElementById('chat_message');
if (chatInput) {
  chatInput.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/67/gi, 'Ub');
    event.target.value = event.target.value.replace(/6 7/gi, 'U b');
    event.target.value = event.target.value.replace(/six seven/gi, 'You bee');
    event.target.value = event.target.value.replace(/sixty seven/gi, 'Uhb');
    event.target.value = event.target.value.replace(/sixseven/gi, 'Youbee');
    event.target.value = event.target.value.replace(/sixtyseven/gi, 'UbUbUbUbUb');
  });
}
