const axios = require('axios');


const Prefixes = [
  'Tsanta',
  'tsanta',
  'TSANTA',
  '#tsanta',
  'Rabemananjara',
  '#fiderana',
  'Fiderana',
];


module.exports = {
  config: {
    name: "tsanta", //ask
    version: 1.0,
    cooldown: 10,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const a = "repl";
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("Tuto fampiasana azy:

 tsanta Texte/questions

 Ex: tsanta Salut, qui est le président Madagascar?");
        return;
      }


api.setMessageReaction("⏰", event.messageID, () => {}, true);
      const response = await axios.get(`https://sdxl.otinxsandeep.${a}.co/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;


 api.setMessageReaction("✅", event.messageID, () => {}, true);
    await message.reply(answer);


    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
