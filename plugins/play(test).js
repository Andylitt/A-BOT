import fetch from 'node-fetch'
import { youtubeSearch } from '@bochilteam/scraper'
import yts from 'yt-search'
import axios from 'axios'
import fs from 'fs'
import ytdl from 'ytdl-core'


let handler = async (m, { conn, groupMetadata, usedPrefix, text, args, command }) => {
if(!text) return m.reply("Kirim perintah judul lagu/link youtube")
let rus = await yts(text)
if(rus.all.length == "0") return m.reply("Video tidak bisa di download")
let data = await rus.all.filter(v => v.type == 'video')
try{
var res = data[0]
var info = await ytdl.getInfo(res.url);
} catch{
var res = data[1]
var info = await ytdl.getInfo(res.url);
}
let audio = ytdl.filterFormats(info.formats, 'audioonly');
let format = ytdl.chooseFormat(info.formats, { quality: '18' });
try{
var thumbnya =`https://i.ytimg.com/vi/${res.videoId}/hqdefault.jpg`
} catch(err) {
var thumbnya =`https://i.ytimg.com/vi/${res.videoId}/default.jpg`
}
let inithumb = await getBuffer(thumbnya)
let teks =`*─────〈〈️ YOUTUBE MP3 〉〉─────*

∘ Channel : ${res.author.name}
∘ Ditonton : ${h2k(res.views)} Kali 
∘ Durasi : ${res.timestamp}
∘ Upload : ${res.ago}
∘ Video : ${FileSize(format.contentLength)}
∘ Audio : ${FileSize(audio[0].contentLength)} 
∘ Judul : ${res.title}
∘ Url : ${res.url}
∘ Description : ${res.description}

_Tunnggu beberapa detik file *AUDIO* akan dikirim!_
`
conn.sendMessage(from, { image: {url: inithumb},text: teks},{quoted: m})       
    
downloadMp3(`${res.url}`) 

  // if (durationS > 4000) return conn.sendMessage(m.chat, { text: `*Download:* ${await shortUrl(ytLink)}\n\n_Duration too long..._` }, { quoted: msg })
  //conn.sendMessage(m.chat, { audio: { url: ytLink }, mimetype: 'audio/mpeg' }, { quoted: msg })
}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^playy?$/i

//handler.limit = true

export default handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}


async function shortUrl(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://is.gd/create.php?format=simple&url=${url}`)
  if (!res.ok) throw false
  return await res.text()
}

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error in getBuffer: ${e}`)
	}
}

const downloadMp3 = async (Link ) => {
try{
await ytdl.getInfo(Link);
let mp3File = getRandom('.mp3') 
console.log(color("Download audio with ytdl-core"))
ytdl(Link, {filter: 'audioonly'})
.pipe(fs.createWriteStream(mp3File))
.on("finish", async () => {  
await conn.sendMessage(from, {audio:  fs.readFileSync(mp3File), mimetype: 'audio/mp4' },{ quoted: m })
fs.unlinkSync(mp3File)
})       
} catch (err){
console.log(color(err))
}
}