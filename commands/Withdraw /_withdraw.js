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

var minimumWithdraw = SETTINGS.MINIMUM_WITHDRAW || 5; //default minimum withdraw amount
var maximumWithdraw = SETTINGS.MAXIMUM_WITHDRAW || 100; //default maximum withdraw amount
var wallet = Bot.getProp("wallet"+user.telegramid);
var ntificationChannel = SETTINGS.WITHDRAW_NOTIFICATION_CHANNEL;
let userRes = Libs.ResourcesLib.userRes("balance");
var withdrawMessage = `To withdraw balance please send /withdraw command followed by the amount. \n\n<b>For Example:</b> \n<code>/withdraw 100</code> \n\nYou can withdraw a minimum of ${minimumWithdraw} and a maximum of ${maximumWithdraw}.`;

if (!params) {
    Api.sendMessage({
        text: withdrawMessage,
        parse_mode: "HTML"
    });
    return;
}

if (!wallet) {
    Api.sendMessage({
        text: "❌ Please set your wallet address first using /setwallet command. or from the menu.",
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Set Wallet", callback_data: "/setwallet" }
                ]
            ]
        }
    });
    return;
}
var amount = parseFloat(params);

if (isNaN(amount)) {
    Api.sendMessage({
        text: "❌ Invalid amount. Please enter a numeric value.",
        parse_mode: "HTML"
    });
    return;
}

if (amount < minimumWithdraw || amount > maximumWithdraw) {
    Api.sendMessage({
        text: `❌ The amount must be between ${minimumWithdraw} and ${maximumWithdraw}.`,
        parse_mode: "HTML"
    });
    return;
}

var userBalance = Libs.ResourcesLib.userRes("balance").value();

if (amount > userBalance) {
    Api.sendMessage({
        text: "❌ Insufficient balance. your current balance is: " + userBalance,
        parse_mode: "HTML"
    });
    return;
}

if(!ntificationChannel) {
    Api.sendMessage({
        text: "❌ Notification channel is not set. Please reach support.",
        parse_mode: "HTML"
    });
    return;
}

var date = new Date();
//because the DateTime formate Lib has bug, we will use the native JS Date object to get the date and time.
var options = {
  timeZone: "Asia/Kolkata",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
};

var formattedTime = date.toLocaleString("en-GB", options).replace(",", " -");


var requestInfo = `<b>😎 User:</> <a href='tg://user?id=${user.telegramid}'> ${user.first_name}</a>
<b>💵 Amount:</> ${amount}
<b>💰 Wallet:</> <code> ${wallet} </>
<b>⌚ Time:</> ${formattedTime} (IST)`;

userRes.add(-amount);
let requestId = Libs.Random.randomInt(10000000, 99999999);
//save the request info so we can get it again when sending notification to announcement channel.
Bot.setProp(requestId, requestInfo);

Api.sendMessage({
    text: "💵<b>Witdraw Request</>\n\n"+requestInfo+"\n\nBefore aproving, make sure you have transfered the amount to the user.",
    parse_mode: "HTML",
    chat_id: ntificationChannel,
    reply_markup: {
        inline_keyboard: [
            [
                { text: "✅ Amount Sent", callback_data: `/approve ${requestId} ${user.telegramid} ${amount}` },
                { text: "❌ Decline", callback_data: `/decline ${requestId} ${user.telegramid}` }
            ]
        ]
    }
});

Api.sendMessage({
    text: "✅ Your withdraw request has been sent for approval.\n\n"+requestInfo,
    parse_mode: "HTML"
});


