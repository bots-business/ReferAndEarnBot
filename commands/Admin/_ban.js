/*CMD
  command: /ban
  help:
  need_reply:
  auto_retry_time:
  folder:
  answer:
  keyboard:
  aliases:
  group:
CMD*/

if (!params) {
  return Bot.sendMessage(
    'To block a user, please send "`/ban [user_id]`"\n\n*Example:*\n`/ban 124643754`'
  );
}

if (!/^\d+$/.test(params)) {
  return Bot.sendMessage(
    "❌ Invalid user ID. Please provide a valid numeric user ID without spaces or emojis."
  );
}

Bot.setProp(params, "blocked");
Bot.sendMessage("✅ User blocked: " + params, { is_reply: true });
