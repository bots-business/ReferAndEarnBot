/*CMD
  command: /setup
  help:
  need_reply: false
  auto_retry_time:
  folder: setup

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases:
  group:
CMD*/

var settingsPanel = {
  title: "Bot Settings & Personalization",
  description: "Configure all bot settings and personalization options here.",
  index: 0,
  icon: "settings",
  button_title: "SAVE",
  fields: [
    {
      name: "ANNOUNCEMENT_CHANNEL",
      title: "📢 Announcement Channel",
      description: "Enter the channel ID where announcements will be posted.",
      type: "string",
      placeholder: "@channelusername or -100123456789",
    },
    {
      name: "WITHDRAW_NOTIFICATION_CHANNEL",
      title: "🏦 Withdraw Notification Channel",
      description:
        "Enter the channel ID where withdrawal notifications will be sent.",
      type: "string",
      placeholder: "@channelusername or -100123456789",
    },
    {
      name: "CURRENCY",
      title: "💱 Currency",
      description: "Specify the currency used for transactions.",
      type: "string",
      placeholder: "e.g., BBP, USD",
    },
    {
      name: "BONUS_REWARD",
      title: "🎁 Bonus Reward",
      description: "Set the amount of bonus reward for users.",
      type: "float",
      placeholder: "e.g., 5.00",
    },
    {
      name: "BONUS_INTERVAL",
      title: "⏰ Bonus Interval (in hours)",
      description: "Set the time interval for claiming bonuses.",
      type: "integer",
      placeholder: "e.g., 24",
    },
    {
      name: "REFER_REWARD",
      title: "👥 Referral Reward",
      description: "Set the reward amount for each referral.",
      type: "float",
      placeholder: "e.g., 1.00",
    },
    {
      name: "ADMINS",
      title: "👑 Admins",
      description:
        "Enter the admin IDs (comma-separated) who can manage the bot.",
      type: "string",
      placeholder: "e.g., 12345678, 98765432",
    },
    {
      name: "SUPPORT_MESSAGE",
      title: "📞 Support Message",
      description: "Set the support message users will receive.",
      type: "text",
      placeholder: "e.g., Contact @support",
    },
    {
      name: "START_MESSAGE",
      title: "🚀 Start Message",
      description:
        "Set the message that users will see when they start the bot.",
      type: "text",
      placeholder: "e.g., Welcome to our bot!",
    },
    {
      name: "ERROR_MESSAGE",
      title: "⚠️ Error Message",
      description: "Set the message for errors or invalid commands.",
      type: "text",
      placeholder: "e.g., Something went wrong!",
    },
    {
      name: "MINIMUM_WITHDRAW",
      title: "💸 Minimum Withdraw Amount",
      description: "Set the minimum amount allowed for withdrawals.",
      type: "float",
      placeholder: "e.g., 10.00",
    },
    {
      name: "MAXIMUM_WITHDRAW",
      title: "💸 Maximum Withdraw Amount",
      description: "Set the maximum amount allowed for withdrawals.",
      type: "float",
      placeholder: "e.g., 1000.00",
    },
    {
      name: "REFER_LINK_PREFIX",
      title: "🔗 Referral Link Prefix",
      description: "Set the prefix for referral links.",
      type: "string",
      placeholder: "e.g., user",
    },
    {
      name: "REFER_IMAGE_URL",
      title: "📸 Referral Image URL",
      description: "Set the image URL for the referral preview.",
      type: "string",
      placeholder: "e.g., https://telegra.ph/file/image.jpg",
    },
    {
      name: "BACKGROUND_MEMBERSHIP_CHECKUP",
      title: "Background Membership Checkup",
      description: "Turn it on if you have enough Iterations.",
      type: "checkbox",
      value: false,
    },
  ],
};

let botCommands = [
  { command: "/start", description: "Start the bot" },
  { command: "/withdraw", description: "Withdraw your balance" },
  { command: "/bonus", description: "Claim your timely bonus" },
  { command: "/help", description: "Get support" },
  { command: "/referral", description: "Get your referral link and details" },
  { command: "/myreferrals", description: "Get list of your invitees" },
  { command: "/toplist", description: "Get top inviters" },
  { command: "/balance", description: "Get your balance and account info" },
  { command: "/setwallet", description: "Setup your wallet" },
  { command: "/sendbalance", description: "For admins only" },
  { command: "/broadcast", description: "Send broadcast, for admins only" },
  {
    command: "/broadcast_status",
    description: "For admins only, see broadcast status",
  },
  { command: "/ban", description: "Ban users, for admins only" },
  { command: "/unban", description: "Unban user, for admins only" },
];

Api.setMyCommands({ commands: botCommands });

AdminPanel.setPanel({
  panel_name: "SETTINGS",
  data: settingsPanel,
  force: true, // Force save values even if modified
});

Libs.MembershipChecker.setup();
Bot.sendMessage("Bot settings have been successfully configured!");
Bot.sendMessage("Bot commands have been successfully set!");
