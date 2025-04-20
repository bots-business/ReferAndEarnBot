if (!user) {
  return; // we can't send message
}

// error message content
let errorMessage =
  SETTINGS.ERROR_MESSAGE ||
  "Error happened, Please try again later or contact support if this happens again";

Bot.sendMessage(errorMessage);
