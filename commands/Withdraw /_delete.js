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

// check if message is from a callback query and delete the message
var messageId = request.message.message_id;
if (!messageId) return;

Api.deleteMessage({
  message_id: messageId,
});

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "✅ Message deleted.",
  show_alert: false,
});
