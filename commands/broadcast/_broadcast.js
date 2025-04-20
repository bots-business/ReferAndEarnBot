/*CMD
  command: /broadcast
  help:
  need_reply: false
  auto_retry_time:
  folder: broadcast

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
  Api.sendMessage({
    text: "🚫 You are not authorized to do this.\n\n Only admins can do this and you are not an admin",
  });
  return;
}

if (!chat || chat.chat_type !== "private") {
  return;
}

var message_id = request?.reply_to_message?.message_id;
var chat_id = request?.reply_to_message?.chat?.id;

if (!message_id) {
  Api.sendMessage({
    text: "Please reply to a message to broadcast it.",
    reply_to_message_id: request.message_id,
  });
  return;
}

Bot.runAll({
  command: "/news",
  for_chats: "private-chats",
  on_create: "/broadcast_created",
  options: {
    chat_id: chat_id,
    message_id: message_id,
  },
});
