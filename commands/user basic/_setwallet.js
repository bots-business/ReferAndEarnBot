/*CMD
  command: /setwallet
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

// Get wallet info from admin panel
var waletInfo = SETTINGS.WALLET_INFO || "TRX (TRC20)";

if (!params) {
  Api.sendMessage({
    text:
      "Send <code>/setwallet</code> command followed by your wallet address.\n\n<b>For Example:</b>\n<code>/setwallet 0x1234567890abcdef</code>\n\n" +
      waletInfo,
    parse_mode: "html",
  });
  return;
}

// Regex to check for valid text (no emojis and no spaces allowed)
let textRegex = /^[\w.,!?()@#$%^&*+=\-;:'"<>\/\\\\]*$/;

// Check if message is valid text
if (!textRegex.test(params)) {
  Api.sendMessage({
    text: "❌ Invalid input! Please enter valid text without emojis or spaces.",
    parse_mode: "Markdown",
  });
  return;
}

Bot.setProp("wallet" + user.telegramid, params);
Api.sendMessage({
  text: "✅ Wallet address saved successfully!\n\n" + params,
  parse_mode: "html",
});
