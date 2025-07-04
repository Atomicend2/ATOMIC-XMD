// vv.js - View Once Media Bypass Plugin

const { downloadMediaMessage } = require('@whiskeysockets/baileys'); const fs = require('fs'); const path = require('path');

module.exports = { name: 'vv', alias: ['viewonce', 'vob'], description: 'Bypass view-once media and save it', category: 'media', use: '.vv [reply to media]',

async execute(m, { conn, args, text, mime }) { try { if (!m.quoted) return m.reply('📸 Reply to a view-once image or video'); if (!m.quoted.message || !m.quoted.message.viewOnceMessageV2) return m.reply('⚠️ This is not view-once media.');

const vmsg = m.quoted.message.viewOnceMessageV2;
  const type = Object.keys(vmsg.message)[0];
  const mediaMsg = vmsg.message[type];
  const stream = await downloadMediaMessage(
    { key: m.quoted.key, message: vmsg },
    'buffer',
    {},
    { reuploadRequest: conn.updateMediaMessage }
  );

  const filename = `${Date.now()}.${type === 'videoMessage' ? 'mp4' : 'jpg'}`;
  const filepath = path.join(__dirname, '../temp', filename);
  fs.writeFileSync(filepath, stream);

  await conn.sendFile(m.chat, filepath, filename, `✅ View-Once ${type === 'videoMessage' ? 'Video' : 'Image'} Saved!`, m);
  fs.unlinkSync(filepath);
} catch (err) {
  console.error(err);
  m.reply('❌ Failed to save view-once media.');
}

}, };

