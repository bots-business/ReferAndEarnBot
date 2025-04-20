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

// Help message content
var helpMessage =
  SETTINGS.SUPPORT_MESSAGE ||
  `ℹ️ *Bot Information:*

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
    [{ text: "🔙 Back", callback_data: "/start" }],
  ],
};

let prms = {
  text: helpMessage,
  reply_markup: buttons,
  parse_mode: "Markdown",
}

// edit message if message_id is available
if (request.message?.message_id) {
  Api.editMessageText({
    ...prms,
    message_id: request.message.message_id
  });
  return;
}

Api.sendMessage(prms);