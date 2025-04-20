/*CMD
  command: /sendbalance
  help:
  need_reply:
  auto_retry_time:
  folder:
  answer:
  keyboard:
  aliases:
  group:
CMD*/

if (!params) {
  Api.sendMessage({
    text: `To send balance to any user, provide the user ID and the amount to send with <code>/sendBalance</code> command.\n\n<b>Usage:</b> /sendBalance {user_id} {amount}\n<b>Example:</b> <code>/sendBalance 123456789 50</code>\n\n<blockquote> Use negetive amount to remove balance from user, (e.g., -45).</blockquote>`,
    parse_mode: "HTML",
  });
  return;
}

let [userId, amount] = params.split(" ");
var currency = SETTINGS.CURRENCY || "TRX"; // Default currency

// Validation
if (!userId || !amount || isNaN(userId) || isNaN(amount)) {
  Api.sendMessage({
    text: "❌ Invalid input. Both user ID and amount must be numeric.\n\n<b>Usage:</b> <code>/sendBalance user_id amount</code>\n<b>Example:</b> <code>/sendBalance 123456789 50</code>",
    parse_mode: "HTML",
  });
  return;
}

// Parse values
userId = parseInt(userId);
amount = parseInt(amount);

// Add balance
let balance = Libs.ResourcesLib.anotherUserRes("balance", userId);
balance.add(amount);

// Confirmation to admin
Api.sendMessage({
  text: `✅ Successfully added <b>${amount}</b> ${currency} to user ID: <code>${userId}</code>\n<b>New balance:</b> ${balance.value()}`,
  parse_mode: "HTML",
});

// Notify user
Api.sendMessage({
  chat_id: userId,
  text: `💰 <b>You have received</b> ${amount} ${currency}\n<b>New balance:</b> ${balance.value()}`,
  parse_mode: "HTML",
});
