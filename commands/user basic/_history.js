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
var withdrawalHistory = history.get(user.telegramid) || [];

var historyText = "";
var replyMarkup = {
  inline_keyboard: [[{ text: "🔙 Back", callback_data: "/balance" }]],
};

var messageId = request.message?.message_id;

if (withdrawalHistory.length === 0) {
  historyText = "❌ No withdrawals have been made.";
} else {
  historyText = "💸 <b>Your Withdrawal History:</b>\n\n";
  for (var index = 0; index < withdrawalHistory.length; index++) {
    var record = withdrawalHistory[index];
    historyText += `#${index + 1}\n<b>Amount:</b> ${
      record.amount
    }\n<b>Wallet:</b> <code>${record.wallet}</code>\n<b>Date:</b> ${
      record.date
    }\n<b>Status:</b> ${record.status}\n\n`;
  }
}

if (messageId) {
  Api.editMessageText({
    message_id: messageId,
    text: historyText,
    parse_mode: "HTML",
    reply_markup: replyMarkup,
  });
} else {
  Api.sendMessage({
    text: historyText,
    parse_mode: "HTML",
    reply_markup: replyMarkup,
  });
}
