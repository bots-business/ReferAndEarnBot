/*CMD
  command: /decline
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Withdraw
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

Bot.run({
  command: "/approve",
  options: {
    action: "reject",
    params: params
  }
});
