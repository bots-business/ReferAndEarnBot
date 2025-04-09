/*CMD
  command: /get
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
        text: "❌ Please provide a valid amount to add on your balance.",
        parse_mode: "HTML"
    });
    return;
}

var balance = Libs.ResourcesLib.userRes("balance");
balance.add(parseFloat(params));
Api.sendMessage({
    text: `✅ Your balance has been updated. New balance: ${balance.value()}`,
    parse_mode: "HTML"
});
