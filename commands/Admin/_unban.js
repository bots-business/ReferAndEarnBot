/*CMD
  command: /unban
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
    'To unban a an user, please send "`/unban [user_id]`"\n\n*Example:*\n`/unban 124643754`'
  );
}

if (!/^\d+$/.test(params)) {
  return Bot.sendMessage(
    "❌ Invalid user ID. Please provide a valid numeric user ID without spaces or emojis."
  );
}

Bot.setProp(params, null);
Bot.sendMessage("✅ User unblocked: " + params, { is_reply: true });
