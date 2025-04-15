/*CMD
  command: !
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var values = AdminPanel.getPanelValues("SETTINGS");

// error message content
var errorMessage = values.ERROR_MESSAGE || "Error happened, Please try again later or contact support if this happens again"

Bot.sendMessage(errorMessage)
