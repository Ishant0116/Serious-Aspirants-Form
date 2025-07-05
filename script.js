const form = document.getElementById("studyForm");
const groupLink = document.getElementById("groupLink");

// Telegram bot setup
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";
const CHAT_ID = "-1002704210959"; // Replace with your group chat ID

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  let allFilled = true;

  for (let [key, value] of formData.entries()) {
    if (key !== "referral" && key !== "final" && value.trim() === "") {
      allFilled = false;
      break;
    }
  }

  if (!allFilled) {
    alert("Please fill all required fields.");
    return;
  }

  // Convert FormData to message
  const name = formData.get("name");
  const username = formData.get("username");
  const cls = formData.get("class");
  const exam = formData.get("exam");
  const hours = formData.get("hours");
  const why = formData.get("why");
  const serious = formData.get("serious");
  const rules = formData.get("rules");
  const referral = formData.get("referral") || "N/A";
  const finalWords = formData.get("final") || "N/A";

  const message = `📝 *New Registration!*

👤 *Name:* ${name}
📱 *Telegram:* @${username}
🎓 *Class:* ${cls}
🎯 *Target Exam:* ${exam}
⏱ *Study Hours:* ${hours}
🧠 *Serious?:* ${serious}
✅ *Rules Accepted?:* ${rules}

🗣 *Why Join:* ${why}
🤝 *Referral:* ${referral}
💬 *Final Words:* ${finalWords}`;

  // Send to Telegram
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        form.style.display = "none";
        groupLink.style.display = "block";
      } else {
        alert("❌ Failed to send message to Telegram.");
      }
    })
    .catch(err => {
      console.error("Telegram Error:", err);
      alert("❌ Error sending message.");
    });
});
