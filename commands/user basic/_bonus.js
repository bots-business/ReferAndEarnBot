/*CMD
  command: /bonus
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

var interval = SETTINGS.BONUS_INTERVAL || 24;
var bonusAmount = SETTINGS.BONUS_REWARD || 5;
let lastClaimTime = User.getProperty("claimTime");
let currentTime = Date.now();

// Check if the user has claimed before in the interval period
if (lastClaimTime) {
  let timeDifference = (currentTime - lastClaimTime) / (1000 * 60 * 60);

  if (timeDifference < interval) {
    let remainingTime = (interval - timeDifference).toFixed(2);
    Api.sendMessage({
      text: `⏳ You can claim your next bonus after ${remainingTime} hours.`,
      parse_mode: "Markdown",
    });
    return;
  }
}

// Add bonus to the user’s balance
let balance = Libs.ResourcesLib.userRes("balance");
balance.add(Number(bonusAmount));

// Update the claim time
User.setProperty("claimTime", currentTime, "integer");

// Send confirmation message
Api.sendMessage({
  text: `🎉 You have successfully claimed your ${bonusAmount} ${
    values.CURRENCY || "TRX"
  } bonus!\n\n💰 Current Balance: ${balance.value()}`,
  parse_mode: "Markdown",
});
