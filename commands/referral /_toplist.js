/*CMD
  command: /toplist
  help:
  need_reply: false
  auto_retry_time:
  folder: referral

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases:
  group:
CMD*/

// Check if the request is from a button press
if (request.data) {
  var message_id = request.message?.message_id;
}

// Get top referring users
let list = Libs.ReferralLib.getTopList();
list.order_by = "integer_value";
list.order_ascending = false;
list.page = 1;
list.per_page = 10;

var items = list.get();
var msg = "🏆 *Leaderboard: Top Referring Users* \n\n";

if (items.length > 0) {
  for (var ind in items) {
    let prop = items[ind];
    let userLink = `[${prop.user.first_name}](tg://user?id=${prop.user.telegramid})`;
    msg += `*${parseInt(ind) + 1}.* ${userLink} ➺ *${prop.value}* Referrals\n`;
  }
} else {
  msg += "⚠️ No referring users found.";
}

// Inline button for returning
var inline_keyboard = [[{ text: "🔙 Back", callback_data: "/referral" }]];

// Edit the message if message_id is available, otherwise send a new one
if (message_id) {
  Api.editMessageText({
    message_id: message_id,
    text: msg,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: inline_keyboard },
  });
} else {
  Api.sendMessage({
    text: msg,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: inline_keyboard },
  });
}
