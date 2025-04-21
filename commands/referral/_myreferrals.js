/*CMD
  command: /myreferrals
  help: 
  need_reply: false
  auto_retry_time: 
  folder: referral
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Get the list of referrals using the ReferralLib library
const refList = Libs.ReferralLib.getRefList();

// Initialize the referral details message with total invites and first invite date
let referralDetails =
  "➺ <b>Total Invites:</b> " +
  Libs.ReferralLib.getRefCount() +
  "\n➺ <b>First Invite:</b> " +
  refList.created_at +
  "\n\n👨‍👨‍👦 <b>Your Invites:</b>\n";

// Check if there are no affiliated users
if (!refList.exist) {
  referralDetails = "❌ No affiliated users found.";
}

// Get the list of referred users
const referredUsers = refList.getUsers();

// Loop through each referred user and append their details to the referral message
for (let index in referredUsers) {
  const user = referredUsers[index];
  referralDetails += `➺ <a href="tg://user?id=${user.telegramid}">${
    user.first_name || "Unknown User"
  }</a>\n`;
}

// Define the "Back" button for the inline keyboard
const backButton = [[{ text: "🔙 Back", callback_data: "/referral" }]];

// Edit the message if message_id available else send new one
if (request.message && request.message.message_id) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: referralDetails,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: backButton },
  });
} else {
  Api.sendMessage({
    text: referralDetails,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: backButton },
  });
}
