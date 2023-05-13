import fetch from 'node-fetch'
import { youtubeSearch } from '@bochilteam/scraper'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, groupMetadata, usedPrefix, text, args, command, isPrems, isOwner }) => {
try{
if (!text) throw 'Input Query' 
m.reply(wait)
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Tidak Ditemukan'
  let { description, videoId, durationH, durationS, viewH, publishedTime } = vid
  let url = 'https://www.youtube.com/watch?v=' + videoId
  const { thumbnail, audio: _audio, title } = await youtubedl(url).catch(async _ => await youtubedlv2(url)).catch(async _ => await youtubedlv3(url))
  let ytLink = `https://yt-downloader.akkun3704.repl.co/?url=${url}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
const limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
let audio, source, res, link, lastError, isLimit
  for (let i in _audio) {
    try {
      audio = _audio[i]
      isLimit = limitedSize < audio.fileSize
      if (isLimit) continue
      link = await audio.download()
      if (link) res = await fetch(link)
      isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
      if (isLimit) continue
      if (res) source = await res.arrayBuffer()
      if (source instanceof ArrayBuffer) break
    } catch (e) {
      audio = link = source = null
      lastError = e
    }
  }
  if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw 'Error: ' + (lastError || 'Can\'t download audio')
  let capt = ` 📌 *Title:* ${title}
 *Url:* ${url}
 *Description:* ${description}

 *Published:* ${publishedTime}
 *Duration:* ${durationH}
 *Views:* ${viewH}
  `
  let buttons = [{ buttonText: { displayText: '🎥 Video' }, buttonId: `${usedPrefix}ytv ${url}` },
                { buttonText: { displayText: '🎵 Audio' }, buttonId: `${usedPrefix}getaud ${url}` }]
 // let msg = await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: capt}, { quoted: m })
  await conn.sendFile(m.chat, source, title + '.mp3', '', m, null, { mimetype: 'audio/mp4', contextInfo: {
          externalAdReply :{
    body: 'Size: ' + audio.fileSizeH,
    containsAutoReply: true,
    mediaType: 2, 
    mediaUrl: url,
    showAdAttribution: true,
    sourceUrl: url,
    thumbnailUrl: thumbnail,
    renderLargerThumbnail: true,
    title: 'Nih Kak, ' + name,
     }}
  })
} catch(err) {
m.reply(`video/audio tidak di temukan`)
}
  // if (durationS > 4000) return conn.sendMessage(m.chat, { text: `*Download:* ${await shortUrl(ytLink)}\n\n_Duration too long..._` }, { quoted: msg })  
}
handler.help = ['play', 'play2'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play?$/i

//handler.limit = true

export default handler

async function shortUrl(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://is.gd/create.php?format=simple&url=${url}`)
  if (!res.ok) throw false
  return await res.text()
}