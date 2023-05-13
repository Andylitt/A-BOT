import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
m.reply( `☰⃟⟣ Yᴏᴜʀ Cᴀʀᴅ Iɴᴛʀᴏ ⟓
⃟⟣⟜ *Nama:* 
⟣⟜ *Umur:* 
⟣⟜ *Alamat:*
⟣⟜ *Hobi:*
⟣⟜ *Pasangan:*
`)
}
handler.command = /^(intro)$/i

export default handler