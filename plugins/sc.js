import fs from 'fs'
let handler = async (m, { conn, usedPrefix: _p }) => {

let an = `SC NYA\nhttps://github.com/rasssya76/R-BOT\n\nKALO MAU YANG MIRIP AMA SC BOT INI BELI AJA KE wa.me//6282142108243`

 conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: 50000000,
      requestFrom: m.sender,
      noteMessage: {
      extendedTextMessage: {
      text: an,
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
}

handler.command = /^(sc)$/i

export default handler