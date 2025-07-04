const { animeStyleMenu } = require("../lib/anime-ui"); const prefix = "."; // Change this if your bot uses a different prefix

module.exports = { name: "menu", alias: ["help", "cmds"], desc: "Show the list of available commands", type: "main", exec: async (m, { conn, command }) => { const commands = [ { category: "AI", cmds: ["ai", "img", "ask", "code"] }, { category: "Games", cmds: ["tic", "snake", "truth", "dare", "truthscanner"] }, { category: "Group", cmds: ["kick", "add", "promote", "demote", "tagall"] }, { category: "Media", cmds: ["vv", "sticker", "toimg", "tomp3"] }, { category: "Utilities", cmds: ["ping", "owner", "runtime", "speed"] }, { category: "Custom", cmds: ["animequote", "animewall", "waifu"] } ];

let menuText = animeStyleMenu(commands, prefix);
await conn.reply(m.chat, menuText, m, { mentions: [m.sender] });

} };

                                                                                                                                                            
