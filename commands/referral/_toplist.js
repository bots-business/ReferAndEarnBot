/*CMD
  command: /toplist
  help: 
  need_reply: false
  auto_retry_time: 
  folder: referral
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Check if the request is from a button press
const callback_message_id = request.data ? request.message?.message_id : null;

// Get top referring users
function getTopReferringUsers() {
  let list = Libs.ReferralLib.getTopList();
  list.order_by = "integer_value";
  list.order_ascending = false;
  list.page = 1;
  list.per_page = 10;
  return list.get();
}

// Generate leaderboard message
function generateLeaderboardMessage(items) {
  if (items.length === 0) {
    return "⚠️ No referring users found.";
  }

  let msg = "🏆 *Leaderboard: Top Referring Users* \n\n";
  items.forEach((prop, index) => {
    let userLink = `[${prop.user.first_name}](tg://user?id=${prop.user.telegramid})`;
    msg += `*${index + 1}.* ${userLink} ➺ *${prop.value}* Referrals\n`;
  });
  return msg;
}

// Send or edit message
function sendOrEditMessage(msg, callback_message_id) {
  const inline_keyboard = [[{ text: "🔙 Back", callback_data: "/referral" }]];

  const messageOptions = {
    text: msg,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: inline_keyboard },
  };

  if (callback_message_id) {
    Api.editMessageText({
      ...messageOptions,
      message_id: callback_message_id,
    });
  } else {
    Api.sendMessage(messageOptions);
  }
}

// Main logic
const items = getTopReferringUsers();
const msg = generateLeaderboardMessage(items);
sendOrEditMessage(msg, callback_message_id);
