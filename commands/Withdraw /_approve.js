/*CMD
  command: /approve
  help:
  need_reply: false
  auto_retry_time:
  folder: Withdraw

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases:
  group:
CMD*/

// Helper function to get the current date
function getCurrentDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Helper function to send a message
function sendMessage(chatId, text, replyMarkup = null) {
  const options = {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
  };
  if (replyMarkup) {
    options.reply_markup = replyMarkup;
  }
  Api.sendMessage(options);
}

// Determine action type and source of params
const isReject = options?.action === "reject";
const rawParams = isReject ? options.params : params;
const [requestId, userId, amount] = rawParams.split(" ");

// Validate callback query
const messageId = request.message?.message_id;
if (!messageId) return;

// Validate required params
if (!requestId || !userId || (!isReject && !amount)) return;

// Retrieve request info
const requestInfo = Bot.getProp(requestId);
if (!requestInfo) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Invalid request ID.",
    show_alert: true,
  });
  return;
}

// Prepare visual elements
const statusText = isReject ? "❌ Rejected" : "✅ Approved";
const userNotice = isReject
  ? "❌ Your withdraw request has been rejected."
  : "✅ Your withdraw request has been approved.";
const callbackNotice = isReject
  ? "Withdraw request rejected."
  : "Withdraw request approved.";

// Update message to reflect status
Api.editMessageText({
  message_id: messageId,
  text: `${requestInfo}\n\n<b>${statusText}</b>`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[{ text: "🗑️ Delete", callback_data: "/delete" }]],
  },
});

// Notify admin
Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: callbackNotice,
  show_alert: true,
});

// Notify user
sendMessage(userId, userNotice);

// Notify payout channel
sendMessage(
  values.ANNOUNCEMENT_CHANNEL,
  `${requestInfo}\n\n<b>${statusText}</b>`,
  {
    inline_keyboard: [[{ text: "🗑️ Delete", callback_data: "/delete" }]],
  }
);

// If approved, save withdrawal history
if (!isReject) {
  const userWallet = Bot.getProp("wallet" + userId);
  history.add(userId, {
    amount: amount,
    wallet: userWallet,
    date: getCurrentDate(),
    status: "Success",
  });
}

// Clean up bot props
Bot.deleteProp(requestId);
