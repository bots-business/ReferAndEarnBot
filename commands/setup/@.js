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
  

//Background membership checkup can be configured in the admin panel
// If you have enough iterations, turn it on
var values = AdminPanel.getPanelValues("SETTINGS");

var backgroundCheck = values.BACKGROUND_MEMBERSHIP_CHECKUP;

if (backgroundCheck === true && chat && chat.chat_type === "private") {
    Libs.MembershipChecker.handle();
}
