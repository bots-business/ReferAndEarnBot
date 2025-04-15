/*CMD
  command: /help
  help: 
  need_reply: false
  auto_retry_time: 
  folder: support 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var values = AdminPanel.getPanelValues("SETTINGS");

// Help message content
var helpMessage = values.SUPPORT_MESSAGE || `ℹ️ *Bot Information:*

🤖 *This is a Refer and Earn Bot.*
⚡️ Refer your friends to this bot to earn TRX.

📚 *How It Works:*
1️⃣ *Start the bot.*
2️⃣ *Join all required channels.*
3️⃣ *Invite your friends to earn TRX.*
4️⃣ *Withdraw TRX anytime.*`;

// Inline buttons
var buttons = {
  inline_keyboard: [
    [{ text: "❓ Ask a Question", callback_data: "/ask_question" }],
    [{ text: "🔙 Back", callback_data: "/start" }]
  ]
};

// edit message if message_id is available
if (request.message?.message_id) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: helpMessage,
    parse_mode: "Markdown",
    reply_markup: buttons
  });
} else {
  Api.sendMessage({
    text: helpMessage,
    parse_mode: "Markdown",
    reply_markup: buttons
  });
}

