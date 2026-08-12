function say(x) {
    socket.emit("talk", {text: x})
}

socket.on("talk", (data) => {
    parseCommand(data.text);
});

function parseCommand(input) {
    const patterns = [
        { regex: /^\(\)\{"(.+?)"\};/, action: (x) => Dialog.alert(x) },
        { regex: /^"(.+?)";/, action: (x) => say(x) },
        { regex: /^\("(.+?)"\);/, action: (x) => cmd(x) },
        { regex: /^\(\("(.+?)"\)\);/, action: (x) => alert(x) },
        { regex: /^{"(.+?)"};/, action: (x) => { document.title = x } },
        { regex: /^{{"(.+?)"}};/, action: (x) => { document.getElementById("chat_send").textContent = x } },
        { regex: /<"(.+?)">/, action: (x) => { new Audio(`/sfx/${x}`).play().catch(() => {}) } }
    ];

    for (let pattern of patterns) {
        const match = input.match(pattern.regex);
        if (match) {
            pattern.action(match[1]);
            break;
        }
    }
}
