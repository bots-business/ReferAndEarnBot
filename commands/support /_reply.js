/*CMD
  command: /reply
  help: 
  need_reply: false
  auto_retry_time: 
  folder: support 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!params || isNaN(params)) {
    return;
}

//save the user id from params and run another command for getting admin reply.
User.setProperty("reply_to", params);
Api.sendMessage({
    text: "*Replying To:* ["+params+"](tg://user?id="+params+")\n\n📝 Please send your reply to the user. All type of messages are supported",
    parse_mode: "Markdown"
})

Bot.runCommand("/get_reply");
