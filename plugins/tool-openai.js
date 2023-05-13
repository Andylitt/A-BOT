const { Configuration, OpenAIApi } = await import("openai");

let handler = async (m, { args, usedPrefix, command, text }) => {
try {
            if (!text) return reply(`Chat ak AI.\n\nContoh:\n${prefix}${command} Ki sa ki se yon resesyon`);
            const configuration = new Configuration({
              apiKey: global.apiai,
            });
            const openai = new OpenAIApi(configuration)
            const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: text}],
          });
          m.reply(`${response.data.choices[0].message.content}`);
          } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Padon, sanble gen yon erè :"+ error.message);
          }
        }
}
handler.help = ['openai']
handler.tags = ['tools']
handler.command = /^(ai|ia)$/i

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