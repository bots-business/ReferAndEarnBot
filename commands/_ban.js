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

// get admin panel values
var values = AdminPanel.getPanelValues("SETTINGS");

// check if the user is an admin
var admins = values.ADMINS;
if (!admins || !admins.split(",").map(e => e.trim()).includes(user.telegramid.toString())) {
  Api.sendMessage({
    text: "🚫 You are not authorized to do this.\n\n Only admins can do this and you are not an admin"
  });
  return;
}

if (!params) {
    return Bot.sendMessage('To block a user, please send "`/ban [user_id]`"\n\n*Example:*\n`/ban 124643754`');
  }
  
  if (!/^\d+$/.test(params)) {
    return Bot.sendMessage('❌ Invalid user ID. Please provide a valid numeric user ID without spaces or emojis.');
  }
  
  Bot.setProp(params, "blocked");
  Bot.sendMessage("✅ User blocked: " + params, { is_reply: true });
  
