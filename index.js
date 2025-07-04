// index.js const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys') const pino = require('pino') const { Boom } = require('@hapi/boom') const fs = require('fs') const path = require('path') const commands = require('./plugins')

async function startSock() { const { state, saveCreds } = await useMultiFileAuthState('session') const sock = makeWASocket({ logger: pino({ level: 'silent' }), printQRInTerminal: true, auth: state })

sock.ev.on('creds.update', saveCreds)

sock.ev.on('messages.upsert', async ({ messages }) => { const m = messages[0] if (!m.message || m.key.fromMe) return

const text = m.message.conversation || m.message.extendedTextMessage?.text || ''
const prefix = '.'

if (text.startsWith(prefix)) {
  const [cmd, ...args] = text.slice(1).trim().split(/\s+/)
  const command = commands[cmd.toLowerCase()]
  if (command) command(sock, m, args.join(' '))
}

}) }

startSock()

                            
