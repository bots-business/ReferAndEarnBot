/*CMD
  command: /ban
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let tgid = params;
let action = "ban";

if(options){
  tgid = options.tgid;
  action = 'unban';
}

if (!params) {
  let commandExample = action === "ban" ? "/ban [user_id]" : "/unban [user_id]";
  Bot.sendMessage(
    `To ${action} a user, please send "\`${commandExample}\`"\n\n*Example:*\n\`${commandExample.replace("[user_id]", "124643754")}\``
  );
  return
}

if (!/^\d+$/.test(params)) {
  Bot.sendMessage(
    "❌ Invalid user ID. Please provide a valid numeric user ID without spaces or emojis."
  );
  return
}

// BB block chat - it save iterations
if (action === "ban") {
  Bot.blockChat(params)
}
else {
  Bot.unblockChat(params)
}

Bot.sendMessage(
  `✅ User chat ${action === "ban" ? "blocked" : "unblocked"}: ${params}`,
  { is_reply: true }
);
