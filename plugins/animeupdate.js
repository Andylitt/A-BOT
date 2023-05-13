let handler = async (m, { conn }) => {
global.db.data.chats[m.chat].lastAnime = true
m.reply('Oke nyala')
}
handler.command = /^animeupdate$/i
handler.tags = ['group']
handler.help = ['animeupdate']

export default handler