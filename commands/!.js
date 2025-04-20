if(!user){
  return // we can't send message
}

let values = AdminPanel.getPanelValues("SETTINGS");

// error message content
let errorMessage = values.ERROR_MESSAGE || "Error happened, Please try again later or contact support if this happens again"

Bot.sendMessage(errorMessage)
