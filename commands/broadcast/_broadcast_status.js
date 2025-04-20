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

// check if the user is an admin
if(!checkAdminAccess()) return;

let prms = {
  reply_to_message_id: request.message_id,
  parse_mode: "HTML"
}

const task_id = Bot.getProperty("broadcast_task_id");
prms.text = "No broadcast task found. Please create a new broadcast first.\n\nUse the command /broadcast to create a new broadcast task."

if (!task_id) {
  Api.sendMessage(prms);
  return;
}

let task = new RunAllTask({ id: task_id });
prms.text = `<blockquote>Last Broadcast task status:</>\n\n<b>Task ID:</b> ${task.id}\n<b>Current Position:</b> ${task.cur_position}\n<b>Status Code:</b> ${task.status_code}\n<b>Progress:</b> ${task.progress}%\n<b>Created At:</b> ${task.created_at}\n<b>Total:</> ${task.total}\n<b>Speed:</> ${task.speed}\n\n<b>Status:</b> ${task.status}`

Api.sendMessage(prms);