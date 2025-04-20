/*CMD
  command: @
  help:
  need_reply: false
  auto_retry_time:
  folder: setup

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases:
  group:
CMD*/

// no returns for callback from channel, ignores all group messages
if (chat && (chat.chat_type === "group" || chat.chat_type === "supergroup")) {
  return;
}

// just always preload the settings
const SETTINGS = AdminPanel.getPanelValues("SETTINGS");

function checkForAdminAccess() {
  // no user - no admin
  if(!user) { return false }

  const isAdmin = SETTINGS.ADMINS?.split(",").map((e) => e.trim()).includes(user.telegramid.toString());
  if (isAdmin) { return true }

  Api.sendMessage({
    text: "🚫 You are not authorized to do this.\n\n Only admins can do this and you are not an admin",
  });

  return false;
}

const backgroundCheck = SETTINGS.BACKGROUND_MEMBERSHIP_CHECKUP;

if (backgroundCheck === true && chat && chat.chat_type === "private") {
  Libs.MembershipChecker.handle();
}

// prossecc withdrawal history. up to 15
var history = {
  add: function (userid, newItem) {
    var list = Bot.getProperty("history" + userid, []);
    if (!Array.isArray(list)) {
      list = [];
    }
    list.unshift(newItem);
    if (list.length > 15) {
      list = list.slice(0, 15);
    }
    Bot.setProperty("history" + userid, list, "json");
  },

  get: function (userid) {
    return Bot.getProperty("history" + userid, []);
  },
};

var banned = Bot.getProp(user?.telegramid);
if (banned === "blocked") {
  Bot.sendMessage("❌ You are blocked by the admin.");
  return;
}
