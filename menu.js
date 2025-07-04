// plugins/menu.js

const { animeMenu } = require('../utils/animeStyle');

module.exports = { name: 'menu', description: 'Shows the full command menu', category: 'main', command: ['menu', 'help', '?'],

async execute(client, message, args, db) { const menuText = animeMenu({ owner: 'Atomic', botName: 'ATOMIC-XMD', prefix: '.', commandCount: 400, categories: [ 'AI', 'Audio', 'Autoreply', 'Bot', 'Budget', 'Document', 'Download', 'Editor', 'Game', 'Group', 'Logia', 'Misc', 'Personal', 'Plugin', 'Schedule', 'Search', 'Sticker', 'Textmaker', 'User', 'Vars', 'Video', 'WhatsApp' ] }); return message.reply(menuText); } };

