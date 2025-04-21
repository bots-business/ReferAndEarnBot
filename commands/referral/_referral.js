/*CMD
  command: /referral
  help: 
  need_reply: false
  auto_retry_time: 
  folder: referral
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// bonus and currency settings
const referralBonus = SETTINGS.REFER_REWARD || 0.5;
const currency = SETTINGS.CURRENCY || "TRX";

// Generate referral link
const inviteLink = RefLib.getRefLink(
  bot.name,
  SETTINGS.REFER_LINK_PREFIX || "Bot"
);

// Image URL for link preview
const imageUrl =
  SETTINGS.REFER_IMAGE_URL ||
  "https://telegra.ph/file/48041b64392e58130f23a.jpg";

// Prepare message content
const refMessage = `<b>🎉 Total Referrals:</b> ${RefLib.getRefCount()} user(s)
🔗 <b>Your Invite Link: </b><code>${inviteLink}</code>

💰 <b>Earn ${referralBonus} ${currency}</b> for every successful referral!`;

// Prepare inline buttons
const buttons = {
  inline_keyboard: [
    [
      { text: "🔍 My Refers", callback_data: "/myreferrals" },
      { text: "🔥 Top List", callback_data: "/toplist" },
    ],
    [{ text: "Copy Link", copy_text: { text: inviteLink } }],
    [{ text: "Back", callback_data: "/start" }],
  ],
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
      show_above_text: true,
    },
    reply_markup: buttons,
  });
  return
}

// Send new message if no message_id
Api.sendMessage({
  text: refMessage,
  parse_mode: "HTML",
  link_preview_options: {
    url: imageUrl,
    prefer_large_media: true,
    show_above_text: true,
  },
  reply_markup: buttons,
});
