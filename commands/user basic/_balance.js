/*CMD
  command: /balance
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

// Get bot settings from admin panel
var values = AdminPanel.getPanelValues("SETTINGS");
var linkPrefix = values.REFER_LINK_PREFIX || "Bot";
// Get user details
var userId = user.telegramid;
var firstName = user.first_name;
var username = user.username ? "@" + user.username : "No username";
var inviter = RefLib.getAttractedBy();
var inviteLink = Libs.ReferralLib.getRefLink(bot.name, linkPrefix);
var balance = Libs.ResourcesLib.userRes("balance").value().toFixed(2);
var walletAddress = Bot.getProp("wallet"+user.telegramid) || "Not Set";


// Prepare message content
var profileMessage = `
<b>👤 User Profile</b>

🆔 <b>User ID:</b> <code>${userId}</code>
📛 <b>Name:</b> ${firstName}
📣 <b>Username:</b> ${username}
👥 <b>Invited By:</b> ${inviter?.first_name || "None"}
🔗 <b>Invite Link: ↓\n</b> <code>${inviteLink}</code>\n
💰 <b>Balance:</b> ${balance} ${values.CURRENCY || "TRX"}
🏦 <b>Wallet Address:</b> ↓\n<code>${walletAddress}</code>`;

// Inline buttons
var buttons = {
  inline_keyboard: [
    [{ text: "🔗 Copy Invite Link", copy_text: {text: inviteLink}}],
    [{ text: "💸 Withdraw", callback_data: "/withdraw" }],
    [{ text: "⌛ Transaction History", callback_data: "/history" }],
    [{ text: "🔙 Back", callback_data: "/start" }]
  ]
};

// edit the message if message_id is available
if (request.message?.message_id) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text: profileMessage,
      parse_mode: "HTML",
      reply_markup: buttons
    });
  } else {
    // Send a new message if no message_id exists
    Api.sendMessage({
      text: profileMessage,
      parse_mode: "HTML",
      reply_markup: buttons
    });
  }

