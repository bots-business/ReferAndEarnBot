/*CMD
  command: /get_reply
  help: 
  need_reply: true
  auto_retry_time: 
  folder: support 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var reply_to = User.getProperty("reply_to");
if (!reply_to) {
    Bot.sendMessage("❌ No user to reply to");
    return;
}

// Copy the message to the user with  "ask anohther question" button
Api.copyMessage({
    from_chat_id: user.telegramid,
    message_id: request.message_id,
    chat_id: reply_to,
    reply_markup: {
        inline_keyboard: [
            [{ text: "❓ Ask Another Question", callback_data: "/ask_question" }]
        ]
    }
});

// Notify the user that the message has been sent
Bot.sendMessage("✅ Your message has been sent to the user");

// Clear the reply_to property
User.setProperty("reply_to", undefined);
