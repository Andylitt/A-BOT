/*import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, command }) => {
 try {
if (args.length == 0) return setReply(`Example: ${prefix + command} YUconn`)
//let buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(q)}`)
await conn.sendMessage(from, {sticker: {url:`https://xteam.xyz/ttp?file&text=${encodeURI(q)}` }}, { quoted: dev })
} catch (e) {
 console.log(e)
 setReply(`Maap sedang error coba lagi besok`)            
}      
  }
handler.help = ['qc <teks>']
handler.tags = ['misc']
handler.command = /^(qc)$/i
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

*/
import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, command }) => {
     let tekscuy = m.quoted && m.quoted.text ? m.quoted.text : text ? text : "";
        if (!tekscuy)
          throw `Cara Penggunaan\n${command} [teks]\n\nAtau kamu bisa reply pesan orang lain dengan perintah ${command}`;
        let jsonstik = {
          type: "quote",
          format: "webp",
          backgroundColor: "#FFFFFF",
          width: 512,
          height: 768,
          scale: 2,
          messages: [
            {
              entities: [],
              avatar: true,
              from: {
                id: 1,
                name: conn.getName(m.quoted ? m.quoted.sender : m.sender),
                photo: {
                  url: await conn
                    .profilePictureUrl(
                      m.quoted ? m.quoted.sender : m.sender,
                      "image"
                    )
                    .catch(
                      () =>
                        `https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`
                    ),
                },
              },
              text: tekscuy,
              replyMessage: {},
            },
          ],
        };
        axios
          .post(
            "https://bot.lyo.su/quote/generate",
            jsonstik,
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(async (res) => {
            const buffer = Buffer.from(res.data.result.image, "base64");

            await conn.sendMessage(
              m.chat,
              {
                image: { url: 
                  null,
                  ``,
                  `By Rama(OrangGanteng)`
                ),
              },
              { quoted: m }
            );
          });
  }
handler.help = ['qc <teks>']
handler.tags = ['misc']
handler.command = /^(qc)$/i
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