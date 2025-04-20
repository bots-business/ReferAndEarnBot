/*CMD
  command: /history
  help:
  need_reply:
  auto_retry_time:
  folder: user basic
  answer:
  keyboard:
  aliases:
  group:
CMD*/

// we have function to get and set withdrawal history on @ command
// Function to generate withdrawal history text
function generateHistoryText(history) {
  if (history.length === 0) {
    return "❌ No withdrawals have been made.";
  }

  let text = "💸 <b>Your Withdrawal History:</b>\n\n";
  history.forEach((record, index) => {
    text += `#${index + 1}\n<b>Amount:</b> ${record.amount}\n<b>Wallet:</b> <code>${record.wallet}</code>\n<b>Date:</b> ${record.date}\n<b>Status:</b> ${record.status}\n\n`;
  });

  return text;
}

// Function to send or edit message
function sendOrEditMessage(text, replyMarkup, messageId) {
  const messageOptions = {
    text: text,
    parse_mode: "HTML",
    reply_markup: replyMarkup,
  };

  if (messageId) {
    Api.editMessageText({
      ...messageOptions,
      message_id: messageId,
    });
    return
  }
  Api.sendMessage(messageOptions);
}

const withdrawalHistory = history.get(user.telegramid) || [];
const replyMarkup = {
  inline_keyboard: [[{ text: "🔙 Back", callback_data: "/balance" }]],
};
const messageId = request.message?.message_id;
const historyText = generateHistoryText(withdrawalHistory);

sendOrEditMessage(historyText, replyMarkup, messageId);