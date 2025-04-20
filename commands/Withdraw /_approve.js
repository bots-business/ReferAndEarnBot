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

// check if the user is an admin
var admins = SETTINGS.ADMINS;
if (
  !admins ||
  !admins
    .split(",")
    .map((e) => e.trim())
    .includes(user.telegramid.toString())
) {
  Api.answerCallbackQuery({
    text: "🚫 You are not authorized to do this.\n\n Only admins can do this and you are not an admin",
    show_alert: true,
    callback_query_id: request.id,
  });
  return;
}

// check if message is from a callback query
var messageId = request.message.message_id;
if (!messageId) {
  return;
}

// check if params is provided
let [requestId, userId, amount] = params.split(" ");
if (!requestId || !userId) {
  return;
}

// edit message text to show approved status
var requestInfo = Bot.getProp(requestId);
Api.editMessageText({
  message_id: messageId,
  text: requestInfo + "\n\n<b>✅ Approved</b>",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[{ text: "🗑️ Delete", callback_data: "/delete" }]],
  },
});

// show alert to the admin
Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "Witdraw request approved.",
  show_alert: true,
});

//send notification to user
Api.sendMessage({
  chat_id: userId,
  text: "✅ Your withdraw request has been approved.",
  parse_mode: "HTML",
});

//send notification to payout channel
Api.sendMessage({
  chat_id: values.ANNOUNCEMENT_CHANNEL,
  text: requestInfo + "\n\n<b>✅ Approved</b>",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [[{ text: "🗑️ Delete", callback_data: "/delete" }]],
  },
});

function getCurrentDate() {
  var d = new Date();
  var year = d.getFullYear();
  var month = String(d.getMonth() + 1).padStart(2, "0");
  var day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// save withdraw history
let userWallet = Bot.getProp("wallet" + userId);
// we have function to get and set withdrawal history on @ command
history.add(userId, {
  amount: amount,
  wallet: userWallet,
  date: getCurrentDate(),
  status: "Success",
});

// delete the request info from bot props
Bot.deleteProp(requestId);
