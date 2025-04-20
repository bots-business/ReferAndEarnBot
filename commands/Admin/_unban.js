/*CMD
  command: /unban
  help:
  need_reply:
  auto_retry_time:
  folder:
  answer:
  keyboard:
  aliases:
  group:
CMD*/

Bot.run({
  command: "/ban",
  options: {
    tgid: params,
  }
})