import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  try {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    let url = await fetch('https://salism3api.pythonanywhere.com', '/text2img/', { text: teks, outlineColor: '255,0,0,255', textColor: '0,0,0,255' }))
    let res = await url.json()
    let stick = res.image
    let stiker = await createSticker(stick, { pack: global.packname, author: global.author})
     m.reply(stiker)
  } catch (e) {
    m.reply('Conversion Failed')
    throw false
  }
  }
handler.help = ['ttpdark <teks>']
handler.tags = ['sticker']
handler.command = /^(ttp)$/i
handler.limit = true

export default handler

const isUrl = (text) => text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))

async function createSticker(img, url, packName, authorName, quality) {
	let stickerMetadata = {
		type: 'full',
		pack: packName,
		author: authorName,
		quality
	}
	return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}