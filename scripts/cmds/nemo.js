const axios = require('axios');
// Tableau pour stocker les demandes des utilisateurs
const userRequests = {};


module.exports = {
  config: {
    name: "nemo",
aliases: ["soa"], 
    role: 0,
    cooldown: 30,
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "ai with diff utilities",
    category: "ai",
    guide: {
      en: "{p}{n} questions
sdxl
imagine
art
gen
draw",
    },
  },
  onStart: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const userID = event.senderID;
      // Vérifier si l'utilisateur a déjà atteint la limite
      if (userRequests[userID] && userRequests[userID] >= 5) {
        message.reply("⚠ GRATUIT 5/5 TERMINÉ
🔄 Rahampitso indray afaka mampiasa 5/5 ianao

➡️Raha hampiasa tsy misy fetra dia Manasa anao hampiasa version Pro. 

👉Mandoa ny sarany 5000Ar
@ 0349310268
Tsanta Fiderana

Rehefa lasa dia mandefa SMS na Mp na @Admin Tsanta Rabemananjara.

Tafiditra sy afaka mampiasa tsy misy fetra aorian'izay.");
        return;
      }
      
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;
      const ment = [{ id, tag: name }];
      const prompt = args.join(" ");
      
      if (!prompt) {
        return message.reply("Tuto #soa

 ✅ 1. #soa + Questions
Ex: #soa Salut, tu es là ?


 ✅ 2. #soa + sdxl + prompt
Ex: #soa sdxl Cute boy


✅ 3. #soa + imagine + prompt
Ex: #soa imagine Une femme jolie triste


 ✅ 4. #soa + draw + prompt
Ex: #soa draw a big girl 


 ✅ 5. #soa art + prompt 
 Ex: #soa art litle girl


 ▪︎ Raha misy tsy mazava dia andefaso MP ny admin Tsanta Rabemananjara");
      }


      const encodedPrompt = encodeURIComponent(prompt);


      if (prompt.includes("sdxl")) {
        const [promptText, model] = args.join(' ').split('|').map((text) => text.trim());
        const puti = model || "2";
        const baseURL = `https://sdxl.otinxsandeep.repl.co/sdxl?prompt=${promptText}&model=${puti}`;


        message.reply({
          body: `${name}`,
          mentions: ment,
          attachment: await global.utils.getStreamFromURL(baseURL)
        });
      } else if (prompt.includes("imagine")) {
        let promptText, model;
        if (prompt.includes("|")) {
          [promptText, model] = prompt.split("|").map((str) => str.trim());
        } else {
          promptText = prompt;
          model = 19;
        }


        const a = "milanbhandari";
        const b = "imageapi";
        const response = await axios.get(`https://${a}.${b}.repl.co/milanisgodig?prompt=${encodeURIComponent(promptText)}&model=${model}`);
        const img = response.data.combinedImageUrl;
        message.reply({
          body: `${name}`,
          mentions: ment,
          attachment: await global.utils.getStreamFromURL(img)
        });
      } else if (prompt.includes("draw")) {
        const [promptText, model] = args.join(' ').split('|').map((text) => text.trim());
        const puti = model || "5";
        const baseURL = `https://sandyapi.otinxsandeep.repl.co/jeevan?prompt=${promptText}&model=${puti}`;


        message.reply({
          body: `${name}`,
          mentions: ment,
          attachment: await global.utils.getStreamFromURL(baseURL)
        });
      } else if (prompt.includes("gen")) {
        const [promptText, model] = args.join(' ').split('|').map((text) => text.trim());
        const puti = model || "19";
        const baseURL = `https://sdxl.otinxsandeep.repl.co/gen?prompt=${promptText}&model=${puti}`;


        message.reply({
          body: `${name}`,
          mentions: ment,
          attachment: await global.utils.getStreamFromURL(baseURL)
        });
      } else if (prompt.includes("art")) {
        const imgurl = encodeURIComponent(event.messageReply.attachments[0].url);


        const [promptText, model] = prompt.split('|').map((text) => text.trim());
        const puti = model || "37";


        const lado = `https://sandyapi.otinxsandeep.repl.co/art?imgurl=${imgurl}&prompt=${encodeURIComponent(promptText)}&model=${puti}`;
        const attachment = await global.utils.getStreamFromURL(lado);
        message.reply({
          body: `${name}`,
          mentions: ment,
          attachment,
        });
      } else {
        const response = await axios.get(`https://sandyapi.otinxsandeep.repl.co/api/ai?query=${encodedPrompt}`);
        const lado = response.data.answer;


        message.reply({
          body: `${name}${lado}`,
          mentions: ment,
          
        });
        
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
};
