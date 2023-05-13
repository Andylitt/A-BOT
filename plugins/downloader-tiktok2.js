const {
  parse: urlParser
} = require("url");
const cheerio = require('cheerio');
const host = `https://us.tiktok.com`;

function extractJson(string) {
  let $ = cheerio.load(string);
  let json = JSON.parse($("script[id=\"SIGI_STATE\"]").toString().split(`application/json">`)[1].split('</script')[0]);
  return json;
}

function tiktokStalk(username) {
  let response = functions.curl(`${host}/@${username}`, "-H", `User-agent: Mozilla/5.0 (Linux; Android 11; RMX3235) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36`);
  return extractJson(response).MobileUserModule;
}

function tiktokDownload(url) {
  if (url.includes('vt')) {
    let res = functions.curl(url, "-I", "-H", `User-agent: Mozilla/5.0 (Linux; Android 11; RMX3235) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36`)
    return tiktokDownload(res.split('\n').find(tr=> tr.includes('Location')).split('Location:')[1].trim())
  } else {
    let parse = urlParser(url);
    url = `${host}${parse.path}`
    let response = functions.curl(url, "-H", `User-agent: Mozilla/5.0 (Linux; Android 11; RMX3235) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36`)
    let json = extractJson(response)
    json = {
      ...json.SEO.metaParams,
      data: json.SharingVideoModule.videoData
    }
    let split = json.description.split('.Video TikTok')
    let [suka,
      komentar] = split[0].split(',')
    let {
      video,
      music,
      author,
      createTime
    } = json.data.itemInfo.itemStruct;
    let result = {
      detail: {
        suka: suka.trim().split(' ')[0],
        komentar: komentar.trim().split(' ')[0],
        soundtrack: split[1].split('.')[1].trim(),
        desc: json.data.shareMeta.desc,
        uploaded: parseInt(createTime+"000")
      },
      author: {
        gid: author.id,
        id: author.uniqueId,
        name: author.nickname,
        avatar: author.avatarMedium
      },
      video,
      music
    }
    return result
  }
}


cmd.on(['tiktok'], ['downloader'], async(msg, {
  client, query, prefix
})=> {
  let url = functions.isUrl(query)
  if (!url) return await client.reply(msg, {
    text: `Link Yang Anda Masukan Tidak Valid, Contoh ${prefix}tiktok https://vt.tiktok.com/oakwkskwd`
  })
  await client.reply(msg, {
    text: `Tunggu Sebentar.....`
  })
  try {
    let obj = tiktokDownload(url[0])
    let text = `*@${obj.author.id}* | ${obj.author.name}\n${obj.detail.suka} Suka, ${obj.detail.komentar} Komentar\n\n${obj.detail.desc}\n\n\n_Sound:_ ${obj.detail.soundtrack}\n_${obj.music.authorName} - ${obj.music.title}_`

    return await client.sendButton(msg.from, {
      caption: text, image: obj.video.originCover, footer: `Hasil Download`
    }, [{
        url: "Download Video", value: obj.video.playAddr
      }, {
        url: "Download Sound", value: obj.music.playUrl
      }])
  } catch(e) {
    return await client.reply(msg, {
      text: `Terjadi Kesalahan`
    })
  }
}, {
  query: "Masukan Link Yang Mau Di Download"
})


import axios from 'axios'
import { exec } from 'child_process'
var handler = async (m, { conn, command, text, usedPrefix }) => {
	if (!text) throw `Use example ${usedPrefix}${command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_medium=copy_link`
  await m.reply("```Loading...````")
	const req = await igeh(text)
	const { url_list } = req
    for (const { url, isVideo } of url_list.reverse()) conn.sendFile(m.chat, url_list, `facebook.${!isVideo ? 'bin' : 'mp4'}`, ``, m)
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(tik2(dl)?)$/i

export default handler

async function tiktokDownload(url) {
  if (url.includes('vt')) {
    let res = exec(curl, (url, "-I", "-H", `User-agent: Mozilla/5.0 (Linux; Android 11; RMX3235) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36`))
    return tiktokDownload(res.split('\n').find(tr=> tr.includes('Location')).split('Location:')[1].trim())
  } else {
    let parse = urlParser(url);
    url = `${host}${parse.path}`
    let response = functions.curl(url, "-H", `User-agent: Mozilla/5.0 (Linux; Android 11; RMX3235) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36`)
    let json = extractJson(response)
    json = {
      ...json.SEO.metaParams,
      data: json.SharingVideoModule.videoData
    }
    let split = json.description.split('.Video TikTok')
    let [suka,
      komentar] = split[0].split(',')
    let {
      video,
      music,
      author,
      createTime
    } = json.data.itemInfo.itemStruct;
    let result = {
      detail: {
        suka: suka.trim().split(' ')[0],
        komentar: komentar.trim().split(' ')[0],
        soundtrack: split[1].split('.')[1].trim(),
        desc: json.data.shareMeta.desc,
        uploaded: parseInt(createTime+"000")
      },
      author: {
        gid: author.id,
        id: author.uniqueId,
        name: author.nickname,
        avatar: author.avatarMedium
      },
      video,
      music
    }
    return result
  }
}