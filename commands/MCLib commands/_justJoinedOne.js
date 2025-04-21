/*CMD
  command: /justJoinedOne
  help: 
  need_reply: 
  auto_retry_time: 
  folder: MCLib commands
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (!options) return // protect from manual run

Bot.sendMessage("Thank you for joining to " + options.chat_id,
  { parse_mode: "HTML"}
);
