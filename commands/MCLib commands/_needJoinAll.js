/*CMD
  command: /needJoinAll
  help:
  need_reply: false
  auto_retry_time:
  folder: MCLib commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases:
  group:
CMD*/

if (!options) return; // protect from manual run

let channels = Libs.MembershipChecker.getChats();
Bot.sendMessage("Please join to our channels " + channels); //send all required channels to user
