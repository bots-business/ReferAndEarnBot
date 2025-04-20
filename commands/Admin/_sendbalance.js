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

const DEFAULT_CURRENCY = SETTINGS.CURRENCY || "TRX"; // Default currency

function sendMessage(text, chat_id = chat.chatid) {
  Api.sendMessage({
    text: text,
    chat_id: chat_id,
    parse_mode: "HTML",
  });
}

function sendUsageMessage() {
  sendMessage(
    `To send balance to any user, provide the user ID and the amount to send with <code>/sendBalance</code> command.\n\n<b>Usage:</b> /sendBalance {user_id} {amount}\n<b>Example:</b> <code>/sendBalance 123456789 50</code>\n\n<blockquote>Use negative amount to remove balance from user, (e.g., -45).</blockquote>`
  );
}

function sendErrorMessage() {
  sendMessage(
    "❌ Invalid input. Both user ID and amount must be numeric.\n\n<b>Usage:</b> <code>/sendBalance user_id amount</code>\n<b>Example:</b> <code>/sendBalance 123456789 50</code>",
  );
}

function sendConfirmationToAdmin(userId, amount, balance) {
  sendMessage(
    `✅ Successfully added <b>${amount}</b> ${DEFAULT_CURRENCY} to user ID: <code>${userId}</code>\n<b>New balance:</b> ${balance.value()}`,
  );
}

function notifyUser(userId, amount, balance) {
  sendMessage(
    `💰 <b>You have received</b> ${amount} ${DEFAULT_CURRENCY}\n<b>New balance:</b> ${balance.value()}`,
    userId,
  );
}

if (!params) {
  sendUsageMessage();
  return;
}

let [userId, amount] = params.split(" ");

// Validation
if (!userId || !amount || isNaN(userId) || isNaN(amount)) {
  sendErrorMessage();
  return;
}

// Parse values
userId = parseInt(userId);
amount = parseInt(amount);

// Add balance
let balance = Libs.ResourcesLib.anotherUserRes("balance", userId);
balance.add(amount);

// Confirmation to admin and notify user
sendConfirmationToAdmin(userId, amount, balance);
notifyUser(userId, amount, balance);
