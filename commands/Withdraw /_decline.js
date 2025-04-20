/*CMD
  command: /decline
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

// check if message is from a callback query
var messageId = request.message.message_id;
if (!messageId) {
  return;
}

// check if params is provided
let [requestId, userId] = params.split(" ");
if (!requestId || !userId) {
  return;
}

// edit message text to show approved status
var requestInfo = Bot.getProp(requestId);
Api.editMessageText({
  message_id: messageId,
  text: requestInfo + "\n\n<b>❌ Rejected</b>",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[{ text: "🗑️ Delete", callback_data: "/delete" }]],
  },
});

// show alert to the admin
Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "Witdraw request Rejected.",
  show_alert: true,
});

//send notification to user
Api.sendMessage({
  chat_id: userId,
  text: "❌ Your withdraw request has been Rejected.",
  parse_mode: "HTML",
});

//send notification to payout channel
Api.sendMessage({
  chat_id: values.ANNOUNCEMENT_CHANNEL,
  text: requestInfo + "\n\n<b>❌ Rejected</b>",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[{ text: "🗑️ Delete", callback_data: "/delete" }]],
  },
});

// delete the request info from bot props
Bot.deleteProp(requestId);
