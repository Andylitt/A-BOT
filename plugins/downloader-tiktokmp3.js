import { tiktokdl, tiktokdlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
try{
       if (!args[0]) throw `contoh:\n ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
    m.reply(wait)
    let res = await axios.get(`https://api.caliph.biz.id/api/tiktok?url=${args[0]}&apikey=caliphkey`)
    /*if (res.status != 200) throw res.message;
    if (!res) throw res.message;*/
    let resvideo = res.data.data.music.play_url
    let result = `Like; ${res.data.data.stats.likeCount}\nCommand; ${res.data.data.stats.commentCount}`
  console.log(res)
    conn.sendMessage(m.chat, {audio: {url: resvideo},ptt: false,mimetype: 'audio/mpeg'}, {quoted: m }) 
} catch (e) {
            m.reply('_Failed For sendding media :(_')
            }
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = true 
handler.command = /^(tt|tiktok)(audio|mp3)?$/i

export default handler

async function shorten(url) {
	let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
	return await res.text()
}