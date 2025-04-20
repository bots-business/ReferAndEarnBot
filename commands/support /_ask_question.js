/*CMD
  command: /ask_question
  help:
  need_reply: true
  auto_retry_time:
  folder: support
  answer: Please ask your question! ✅ All formats are supported—images, audio, videos, and text formatting. 🚀

  <<KEYBOARD

  KEYBOARD
  aliases:
  group:
CMD*/

if (!haveAnyAdmins()) {
  Bot.sendMessage(
    "❌ No admins found. If you're the owner of this bot, please set the admins in the admin panel."
  );
  return;
}

var buttons = {
  inline_keyboard: [
    [{ text: "🧐 Visit User Profile", url: "tg://user?id=" + user.telegramid }],
    [
      { text: "💌 Reply", callback_data: "/reply " + user.telegramid },
      { text: "❌ Ignore", callback_data: "/delete" },
    ],
  ],
};

Api.copyMessage({
  from_chat_id: user.telegramid,
  message_id: request?.message_id,
  chat_id: adminList[0],
  reply_markup: buttons,
});

Bot.sendMessage(
  "✅ Your message has been sent to the admin. They'll get back to you shortly."
);
