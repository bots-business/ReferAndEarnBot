/*CMD
  command: /bonus
  help: 
  need_reply: false
  auto_retry_time: 
  folder: user basic
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const interval = SETTINGS.BONUS_INTERVAL || 24; // Interval in hours
const bonusAmount = SETTINGS.BONUS_REWARD || 5;

// Function to calculate time difference in hours
function getTimeDifferenceInHours(lastTime, currentTime) {
  return (currentTime - lastTime) / (1000 * 60 * 60);
}

// Function to send a message
function sendMessage(text) {
  Api.sendMessage({
    text: text,
    parse_mode: "Markdown",
  });
}

// Main logic
let lastClaimTime = User.getProp("claimTime");
let currentTime = Date.now();

if (lastClaimTime) {
  let timeDifference = getTimeDifferenceInHours(lastClaimTime, currentTime);

  if (timeDifference < interval) {
    let remainingTime = (interval - timeDifference).toFixed(2);
    sendMessage(`⏳ You can claim your next bonus after ${remainingTime} hours.`);
    return;
  }
}

// Add bonus to the user’s balance
let balance = ResLib.userRes("balance");
balance.add(Number(bonusAmount));

// Update the claim time
User.setProp("claimTime", currentTime);

// Send confirmation message
sendMessage(
  `🎉 You have successfully claimed your ${bonusAmount} ${
    SETTINGS.CURRENCY || "TRX"
  } bonus!\n\n💰 Current Balance: ${balance.value()}`
);
