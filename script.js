const form = document.getElementById("aspirantForm");
const confirmation = document.getElementById("confirmation");

// Replace these with your own Bot Token and Chat ID
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";        // 🔁 Replace this
const CHAT_ID = "YOUR_CHAT_ID_HERE";            // 🔁 Replace this

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const cls = document.getElementById("class").value;
  const serious = document.getElementById("serious").value;

  const message = `📝 *New Form Submission!*
👤 *Name:* ${name}
🎓 *Class:* ${cls}
🔥 *Serious Aspirant:* ${serious}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      confirmation.style.display = "block";
      form.reset();
    } else {
      alert("❌ Failed to send to Telegram.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("❌ Error sending message.");
  });
});