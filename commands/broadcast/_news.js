/*CMD
  command: /news
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

if (!options) return;

Api.copyMessage({
  from_chat_id: options.chat_id,
  message_id: options.message_id,
});
