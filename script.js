const form = document.getElementById("studyForm");
const successMsg = document.getElementById("successMsg");

const BOT_TOKEN = "7877699696:AAE486elDfuUuHfjrVEdrR5S3bKzQ7KxnjE";
const CHAT_ID = "-1002704210959"; // Replace with your group chat ID

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const cls = document.getElementById("class").value;
  const exams = Array.from(document.querySelectorAll(".checkboxes input:checked")).map(cb => cb.value).join(", ");
  const hours = document.getElementById("hours").value;
  const why = document.getElementById("why").value;
  const serious = document.getElementById("serious").value;
  const rules = document.getElementById("rules").value;
  const referral = document.getElementById("referral").value;
  const finalwords = document.getElementById("finalwords").value;

  const message = `📥 *New Registration!*

👤 *Name:* ${name}
📱 *Telegram:* @${username}
🎓 *Class:* ${cls}
🎯 *Exams:* ${exams}
⏱️ *Study Hours:* ${hours}
🧠 *Serious?:* ${serious}
📜 *Rules Accepted:* ${rules}
📝 *Why Join:* ${why}
🤝 *Referral:* ${referral}
💬 *Final Words:* ${finalwords}`;

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
      successMsg.classList.remove("hide");
      form.reset();
    } else {
      alert("Failed to send to Telegram.");
    }
  })
  .catch(err => {
    alert("Error:", err);
  });
});
