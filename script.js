const form = document.getElementById("aspirantForm");
const confirmation = document.getElementById("confirmation");

// Replace with your Telegram bot token and group ID
const BOT_TOKEN = "7877699696:AAE486elDfuUuHfjrVEdrR5S3bKzQ7KxnjE";
const CHAT_ID = "-1002704210959"; // 👈 Your group chat ID

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const cls = document.getElementById("class").value;
  const serious = document.getElementById("serious").value;
  const telegram = document.getElementById("telegram").value;
  const studytime = document.getElementById("studytime").value;

  const message = `📝 *New Form Submission!*
👤 *Name:* ${name}
🎓 *Class:* ${cls}
🔥 *Serious Aspirant:* ${serious}
📱 *Telegram:* @${telegram}
⏳ *Daily Study Hours:* ${studytime}`;

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
      confirmation.classList.remove("hidden");
      form.reset();
    } else {
      alert("❌ Failed to send message to Telegram.");
    }
  })
  .catch(error => {
    console.error("Error sending message:", error);
    alert("❌ Error occurred.");
  });
});
