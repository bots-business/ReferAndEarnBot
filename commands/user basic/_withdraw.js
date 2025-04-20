/*CMD
  command: /withdraw
  help:
  need_reply: false
  auto_retry_time:
  folder: Withdraw

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases:
  group:
CMD*/

const minimumWithdraw = SETTINGS.MINIMUM_WITHDRAW || 5; // Default minimum withdraw amount
const maximumWithdraw = SETTINGS.MAXIMUM_WITHDRAW || 100; // Default maximum withdraw amount
const wallet = Bot.getProp("wallet" + user.telegramid);
const notificationChannel = SETTINGS.WITHDRAW_NOTIFICATION_CHANNEL;
let balanceRes = Libs.ResourcesLib.userRes("balance");
const withdrawMessage = `To withdraw balance please send /withdraw command followed by the amount. \n\n<b>For Example:</b> \n<code>/withdraw 100</code> \n\nYou can withdraw a minimum of ${minimumWithdraw} and a maximum of ${maximumWithdraw}.`;

// Helper function to send a message
function sendMessage(text, replyMarkup = null) {
  const options = {
    text: text,
    parse_mode: "HTML",
  };
  if (replyMarkup) {
    options.reply_markup = replyMarkup;
  }
  Api.sendMessage(options);
}

// Helper function to format date and time
function getFormattedTime() {
  const date = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-GB", options).replace(",", " -");
}

// Validate input
if (!params) {
  sendMessage(withdrawMessage);
  return;
}

if (!wallet) {
  sendMessage("❌ Please set your wallet address first using /setwallet command or from the menu.", {
    inline_keyboard: [[{ text: "Set Wallet", callback_data: "/setwallet" }]],
  });
  return;
}

let amount = parseFloat(params);

if (isNaN(amount)) {
  sendMessage("❌ Invalid amount. Please enter a numeric value.");
  return;
}

if (amount < minimumWithdraw || amount > maximumWithdraw) {
  sendMessage(`❌ The amount must be between ${minimumWithdraw} and ${maximumWithdraw}.`);
  return;
}

const userBalance = balanceRes.value();

if (amount > userBalance) {
  sendMessage(`❌ Insufficient balance. Your current balance is: ${userBalance}`);
  return;
}

if (!notificationChannel) {
  sendMessage("❌ Notification channel is not set. Please reach support.");
  return;
}

// Process withdrawal
const formattedTime = getFormattedTime();
const requestInfo = `<b>😎 User:</b> <a href='tg://user?id=${user.telegramid}'>${user.first_name || user.telegramid}</a>
<b>💵 Amount:</b> ${amount}
<b>💰 Wallet:</b> <code>${wallet}</code>
<b>⌚ Time:</b> ${formattedTime} (IST)`;

balanceRes.add(-amount);
let requestId = Libs.Random.randomInt(10000000, 99999999);
Bot.setProp(requestId, requestInfo);

// Notify admin
Api.sendMessage({
  text:
    "💵 <b>Withdraw Request</b>\n\n" +
    requestInfo +
    "\n\nBefore approving, make sure you have transferred the amount to the user.",
  parse_mode: "HTML",
  chat_id: notificationChannel,
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "✅ Amount Sent",
          callback_data: `/approve ${requestId} ${user.telegramid} ${amount}`,
        },
        {
          text: "❌ Decline",
          callback_data: `/decline ${requestId} ${user.telegramid}`,
        },
      ],
    ],
  },
});

// Notify user
sendMessage(
  `✅ Your withdraw request has been sent for approval.\n\n${requestInfo}`
);
