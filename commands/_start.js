/*CMD
  command: /start
  help:
  need_reply: false
  auto_retry_time:
  folder: user basic

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases:
  group:
CMD*/

const linkPrefix = SETTINGS.REFER_LINK_PREFIX || "Bot";
const totalUser = Libs.ResourcesLib.anotherChatRes("totalUser", "global");

// if user is new, add to total users.
if (chat && chat.just_created === true) {
  totalUser.add(1);
}

// Run referral tracking at the top
const tracks = {
  onTouchOwnLink: function () {
    Bot.sendMessage("*❌ Stop Clicking Your Own Referral Link!*");
  },

  onAtractedByUser: function (byUser) {
    Api.sendMessage({
      text: `🎁 You are invited by <a href='tg://user?id=${byUser.telegramid}'>${byUser.first_name}</a>`,
      parse_mode: "HTML",
    });
    Api.sendMessage({
      chat_id: byUser.telegramid,
      text: `🎉 You have successfully invited <a href='tg://user?id=${user.telegramid}'>${user.first_name}</a>`,
      parse_mode: "HTML",
    });
  },

  onAlreadyAttracted: function () {
    Bot.sendMessage("*🚫 You Have Already Started The Bot!*");
  },

  linkPrefix: linkPrefix,
};
RefLib.track(tracks);

// Check and get not joined chats if available
let chats = Libs.MembershipChecker.getNotJoinedChats();
Libs.MembershipChecker.check();
let isMember = Libs.MembershipChecker.isMember();

// If user hasn't joined all required chats
if (!isMember) {
  const chatArray = chats.split(",").map(function (chat) {
    return chat.trim();
  });

  const inlineKeyboard = [];
  for (let i = 0; i < chatArray.length; i += 2) {
    let row = [];
    if (chatArray[i]) {
      row.push({
        text: chatArray[i],
        url: "https://t.me/" + chatArray[i].replace("@", ""),
      });
    }
    if (chatArray[i + 1]) {
      row.push({
        text: chatArray[i + 1],
        url: "https://t.me/" + chatArray[i + 1].replace("@", ""),
      });
    }
    inlineKeyboard.push(row);
  }

  inlineKeyboard.push([{ text: "✅ Joined", callback_data: "/start" }]);

  const msg =
    values.NEED_JOIN_MSG ||
    `
📢 *Join Required Channels!*

To continue using this bot, please join all the required channels below:
`;
  Api.sendMessage({
    text: msg,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: inlineKeyboard },
  });
  return;
}

// Get inviter and reward after joining all chats, if not rewarded yet
let inviter = RefLib.getAttractedBy();
if (inviter && !User.getProperty("rewarded")) {
  let referralBonus = parseFloat(values.REFER_REWARD) || 0.5;
  Libs.ResourcesLib.anotherUserRes("balance", inviter.telegramid).add(
    referralBonus
  );
  Api.sendMessage({
    chat_id: inviter.telegramid,
    text: `🎉 You have received a referral bonus of *${referralBonus} ${values.CURRENCY}* for inviting ${user.first_name}!`,
    parse_mode: "Markdown",
  });
  User.setProperty("rewarded", true);
}

// Start message and buttons
let messageContent =
  values.START_MESSAGE ||
  `🎉 *Join Our Exclusive Affiliate Program!*

💡 *Earn ${values.CURRENCY || "TRX"} by Referring Friends!*
Invite your friends to join our community and earn rewards for each referral. 🚀

🚀 *Start Referring Today and Maximize Your Rewards!*`;

let buttons = {
  inline_keyboard: [
    [{ text: "🔗 Refer & Earn", callback_data: "/referral" }],
    [
      { text: "📞 Help & Support", callback_data: "/help" },
      { text: "💰 Balance & Account", callback_data: "/balance" },
    ],
    [
      { text: "🎁 Bonus", callback_data: "/bonus" },
      { text: "💳 Set wallet", callback_data: "/setwallet" },
    ],
    [{ text: "🏦 Withdraw", callback_data: "/withdraw" }],
  ],
};

if (request.message?.message_id) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: messageContent + "\n\n*Total Users:* " + totalUser.value(),
    parse_mode: "Markdown",
    reply_markup: buttons,
  });
} else {
  Api.sendMessage({
    text: messageContent + "\n\n*Total Users:* " + totalUser.value(),
    parse_mode: "Markdown",
    reply_markup: buttons,
  });
}
