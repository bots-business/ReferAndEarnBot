/*CMD
  command: /delete
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

// check if message is from a callback query and delete the message
var messageId = request.message.message_id;
if (messageId) {
  Api.deleteMessage({
    message_id: messageId,
  });

  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "✅ Message deleted.",
    show_alert: false,
  });
}
