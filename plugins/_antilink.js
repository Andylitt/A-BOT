let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
export async function before(m, { isAdmin, isBotAdmin }) {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let delet = m.key.participant
let bang = m.key.id
let bot = global.db.data.settings[this.user.jid] || {}
const isGroupLink = linkRegex.exec(m.text)
const grupo = `https://chat.whatsapp.com`
if (isAdmin && chat.antiLink && m.text.includes(grupo)) return m.reply(`Hai Atmin, Hehe`)
if (chat.antiLink && isGroupLink && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
if (m.text.includes(linkThisGroup)) return !0
}    
await m.reply(`kenapa lu sendLink begoooo Lu kan member hadehhh 😑`)
//await conn.sendButton(m.chat, `${lenguajeGB['smsEnlaceWat']()} ${await this.getName(m.sender)} ${isBotAdmin ? '' : `\n\n${lenguajeGB['smsAllAdmin']()}`}`, wm, [`${lenguajeGB['smsApagar']()}`, '/disable antilink'], m)    
if (!isBotAdmin) return m.reply(`Hadeh Lupa gw kan bukan admin 😓`)  
if (isBotAdmin) { 
await conn.sendMessage(m.chat, { delete: m.key })
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
} else if (!bot.restrict) return m.reply(`Lah`)
}
return !0
}