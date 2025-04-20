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

// Increment total users if the user is new
if (chat && chat.just_created === true) {
  totalUser.add(1);
}

// Helper function to send a message
function sendMessage(text, buttons = null) {
  const options = {
    text: text,
    parse_mode: "Markdown",
  };
  if (buttons) {
    options.reply_markup = buttons;
  }
  Api.sendMessage(options);
}

// Helper function to edit a message
function editMessage(messageId, text, buttons = null) {
  const options = {
    message_id: messageId,
    text: text,
    parse_mode: "Markdown",
  };
  if (buttons) {
    options.reply_markup = buttons;
  }
  Api.editMessageText(options);
}

// Function to handle referral rewards
function handleReferralRewards() {
  const inviter = RefLib.getAttractedBy();
  if (inviter && !User.getProperty("rewarded")) {
    rewardInviter(inviter);
  }
}

// Function to reward inviter
function rewardInviter(inviter) {
  const referralBonus = parseFloat(values.REFER_REWARD) || 0.5;
  Libs.ResourcesLib.anotherUserRes("balance", inviter.telegramid).add(referralBonus);
  notifyInviter(inviter, referralBonus);
  User.setProperty("rewarded", true);
}

// Function to notify inviter
function notifyInviter(inviter, referralBonus) {
  Api.sendMessage({
    chat_id: inviter.telegramid,
    text: `🎉 You have received a referral bonus of *${referralBonus} ${values.CURRENCY}* for inviting ${user.first_name}!`,
    parse_mode: "Markdown",
  });
}

// Function to check membership and send join message
function checkMembership() {
  const chats = Libs.MembershipChecker.getNotJoinedChats();
  Libs.MembershipChecker.check();
  const isMember = Libs.MembershipChecker.isMember();

  if (!isMember) {
    sendJoinMessage(chats);
    return false;
  }
  return true;
}

// Function to send join message
function sendJoinMessage(chats) {
  const inlineKeyboard = generateJoinButtons(chats);
  const msg =
    values.NEED_JOIN_MSG ||
    `
📢 *Join Required Channels!*

To continue using this bot, please join all the required channels below:
`;
  sendMessage(msg, { inline_keyboard: inlineKeyboard });
}

// Function to generate join buttons
function generateJoinButtons(chats) {
  const chatArray = chats.split(",").map((chat) => chat.trim());
  const inlineKeyboard = chatArray.reduce((rows, chat, index) => {
    if (index % 2 === 0) rows.push([]);
    rows[rows.length - 1].push({
      text: chat,
      url: `https://t.me/${chat.replace("@", "")}`,
    });
    return rows;
  }, []);
  inlineKeyboard.push([{ text: "✅ Joined", callback_data: "/start" }]);
  return inlineKeyboard;
}

// Function to generate start message and buttons
function generateStartMessage() {
  const messageContent = getStartMessageContent();
  const buttons = getStartButtons();
  const fullMessage = `${messageContent}\n\n*Total Users:* ${totalUser.value()}`;
  return { fullMessage, buttons };
}

// Function to get start message content
function getStartMessageContent() {
  return (
    values.START_MESSAGE ||
    `🎉 *Join Our Exclusive Affiliate Program!*

💡 *Earn ${values.CURRENCY || "TRX"} by Referring Friends!*
Invite your friends to join our community and earn rewards for each referral. 🚀

🚀 *Start Referring Today and Maximize Your Rewards!*`
  );
}

// Function to get start buttons
function getStartButtons() {
  return {
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
}

// Main logic
if (!checkMembership()) {
  return;
}

handleReferralRewards();

const { fullMessage, buttons } = generateStartMessage();

if (request.message?.message_id) {
  editMessage(request.message.message_id, fullMessage, buttons);
} else {
  sendMessage(fullMessage, buttons);
}
