const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'welcome',
  event: 'group-participants.update',
  description: 'Sends an anime-styled welcome message when a new user joins',

  async execute(sock, update) {
    const { id, participants, action } = update;
    if (action !== 'add') return;

    const metadata = await sock.groupMetadata(id);
    const groupName = metadata.subject;

    for (const user of participants) {
      const ppUser = await sock.profilePictureUrl(user, 'image').catch(
        () => 'https://i.ibb.co/s2N0Czj/default-pfp.png'
      );

      const welcomeText = `✨ *Welcome to ${groupName}!* ✨\n\n` +
        `👤 @${user.split('@')[0]}\n` +
        `🔮 We're glad to have you here!\n` +
        `⚡ Type *.menu* to see what I can do!\n\n` +
        `_Powered by ATOMIC-XMD_`;

      await sock.sendMessage(id, {
        image: { url: ppUser },
        caption: welcomeText,
        mentions: [user],
      });
    }
  }
};
