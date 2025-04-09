/*CMD
  command: /referral
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

// Get bot settings from admin panel
var values = AdminPanel.getPanelValues("SETTINGS");

// bonus and currency settings
var referralBonus = values.REFER_REWARD || 0.5;
var currency = values.CURRENCY || "TRX";

// Generate referral link
var inviteLink = RefLib.getRefLink(bot.name, values.REFER_LINK_PREFIX || "Bot");

// Image URL for link preview
let imageUrl = values.REFER_IMAGE_URL || "https://telegra.ph/file/48041b64392e58130f23a.jpg";

// Prepare message content
let refMessage =
  `<b>🎉 Total Referrals:</b> ${RefLib.getRefCount()} user(s)
🔗 <b>Your Invite Link: </b><code>${inviteLink}</code>

💰 <b>Earn ${referralBonus} ${currency}</b> for every successful referral!`;


// Prepare inline buttons
let buttons = {
  inline_keyboard: [
    [{ text: "🔍 My Refers", callback_data: "/myreferrals" }, { text: "🔥 Top List", callback_data: "/toplist" }],
    [{ text: "Copy Link", copy_text:{text: inviteLink} }],
    [{ text: "Back", callback_data: "/start" }]
  ]
};

// edit message if message_id is available
if (request.message?.message_id) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: refMessage,
    parse_mode: "HTML",
    link_preview_options: {
      url: imageUrl,
      prefer_large_media: true,
      show_above_text: true
    },
    reply_markup: buttons
  });
} else {
  // Send new message if no message_id
  Api.sendMessage({
    text: refMessage,
    parse_mode: "HTML",
    link_preview_options: {
      url: imageUrl,
      prefer_large_media: true,
      show_above_text: true
    },
    reply_markup: buttons
  });
}

