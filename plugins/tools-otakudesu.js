import fetch from 'node-fetch'
let handler = async (m, { args, usedPrefix, command, text }) => {
     try{
var anu = await fetchJson(`https://api.caliph.biz.id/api/cerpen?apikey=caliphkey`)
var ini_txt = `Title : ${anu.judul}\nSource : ${anu.sumber}\n\n${anu.cerita}`

m.reply(ini_txt)
       } catch (err){
m.reply("Not found")
      }
}
handler.help = ['anime <judul anime>']
handler.tags = ['internet']
handler.command = /^(cerpen)$/i

export default handler

const fetchJson = (url, options) => new Promise(async(resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})