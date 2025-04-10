/*CMD
  command: /broadcast_status
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

var task_id = Bot.getProperty("broadcast_task_id");
if (!task_id) {
  Api.sendMessage({
    text: "No broadcast task found. Please create a new broadcast first.\n\nUse the command /broadcast to create a new broadcast task.",
    reply_to_message_id: request.message_id,
  });
  return;
}

let task = new RunAllTask({ id: task_id });
Api.sendMessage({
    text: `Broadcast task status:\n\n<b>Task ID:</b> ${task.id}\n<b>Current Position:</b> ${task.cur_position}\n<b>Status Code:</b> ${task.status_code}\n<b>Progress:</b> ${task.progress}%\n<b>Created At:</b> ${task.created_at}\n<b>Total:</> ${task.total}\n<b>Speed:</> ${task.speed}\n\n<b>Status:</b> ${task.status}`,
    parse_mode: "HTML",
    reply_to_message_id: request.message_id
});
