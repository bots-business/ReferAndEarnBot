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

// it is folders only for admins
const ADMIN_FOLDERS = ["Admin", "Withdraw"];

const needCheckAdminAccess =
  command && command?.folder && ADMIN_FOLDERS.includes(command?.folder);

function getAdmins() {
  const admins = SETTINGS.ADMINS?.split(",").map((e) => e.trim());
  if (!admins || admins.length === 0) return [];

  return admins;
}

function haveAnyAdmins() {
  return getAdmins().length > 0;
}

function checkForAdminAccess() {
  // no user - no admin
  if (!user) return false;

  const isAdmin = getAdmins().includes(user.telegramid.toString());
  if (isAdmin) return true;

  return false;
}

function sendNoAccessMessage() {
  const text = `🚫 You are not authorized to do this.\n\n Only admins can do this and you are not an admin`;

  // for Withdraw command we need Api.answerCallbackQuery
  if(command?.folder === "Withdraw") {
    Api.answerCallbackQuery({
      text: text,
      show_alert: true,
      callback_query_id: request.id,
    });
    return;
  }

  // for all other commands we need to send message to user
  Api.sendMessage({text: text});
}

function checkAdminAccess(){
  // check if the user is an admin
  const isAdmin = checkForAdminAccess();
  if(isAdmin) return true;

  sendNoAccessMessage();
}

// return from bot execution if not admin.
// It is @ (befor_all) command, so it is possible
if (needCheckAdminAccess && !checkAdminAccess()) {
  return; // totally exist from the bot execution here
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