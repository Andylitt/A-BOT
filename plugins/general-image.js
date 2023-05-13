const { Configuration, OpenAIApi } = await import("openai");

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return m.reply(`Membuat gambar dari AI.\n\nContoh:\n${usedPrefix}${command} Wooden house on snow mountain`);
            const configuration = new Configuration({
              apiKey: global.apiai,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "512x512",
            });
            //console.log(response.data.data[0].url)
            conn.sendFile(m.chat, response.data.data[0].url, 'neko.jpg', `BY OPENAI`, m, false)
            } 
handler.help = handler.alias = ['image']
handler.tags = ['general']
handler.command = /^image$/i

export default handler

async function shortUrl(url) {
	return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
}
