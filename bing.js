const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "bing",
    aliases: [],
    version: "1.0",
    author: "JARiF",
    countDown: 50,
    role: 0,
    shortDescription: "Generate images by Dalle3",
    longDescription: "Generate images by Dalle3",
    category: "download",
    guide: {
      en: "{pn} prompt"
    }
  },

  onStart: async function ({ api, message, args, event }) {
    //ACCÈS PRIVÉ 
    const permission = ["61552825191002","100002143684665"];
    // User1 star DATE 29Dec - fin DATE 29jan24: 100002143684665
    if (!permission.includes(event.senderID)) {
      return message.reply(" 💰ACCÈS PAYANT BING_IMAGES\n\n Tolotra ho an'ireo nandoa vola ihany.\n\n Raha maniry hampiasa ity tolotra ity ianao dia mandefa ny sarany \n✅5000Ar (durée : 1mois)\n✅@034.93.102.68\n✅Tsanta Fiderana\n\n Rehefa lasa dia mandefasa sms na mp eto na @Admin.\n\n Créez votre propre imagination avec #bing sur Facebook.\n▪︎ Fanamboarana sary basé sur votre textes (prompt)\n▪︎ Mitovy amin'ny Bing mihitsy ny résultat \n▪︎ Mahavita izay sary tena ilainao.\n▪︎ Mora ampiasaina eto ihany no manao azy, satria juste manoratra #bing [texte] fotsiny ianao dia miseo ny résultats \n ▪︎ Tsara qualités avokoa ny sary\n▪︎ Misy safidy 4 ny sary afaka isafidianana izay tena tsara indrindra\n▪︎ Azo téléchargena avokoa ny sary rehetra.\n\n 💡 Tafiditra sy afaka mampiasa avy hatrany aorian'ny fandefasana ny sarany. \nTsy misy fetra ny fampiasana azy na firy na firy. [24h/7j]", event.threadID, event.messageID);
    }


    

    try {
      const p = args.join(" ");
  
      const w = await message.reply("⏰ Imagination en cours...");

      // const cookieString = await fs.readFile('dallekey.json', 'utf-8');
      // const cookie = JSON.parse(cookieString);

      const data2 = {
        prompt: p,
        cookie: "1GM9ngXEMC85lX0XIzcROild1I2UmZLDFqVmtd-Dzppw6vy_p-3Il_YG0dkybqS4QnlJbBs6VLV0qAuEZ8F_3Fnj27RBOCZM5_QFXkdkNxDA-Ij8ZkTrSL6OLfbBACvQqyPrWcU017dVgXponYv4xWFtLB5U9eMSg_30Yt_MUNfVgShs8nJ-JZVFcnCZ60Op7S7JhsHmyMCzu1eQJeBAtlpDMnmfQQx1tryu1wgyTEo4"
      };
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const response = await axios.post('https://project-dallee3.onrender.com/dalle', data2, config);
  
      if (response.status === 200) {
        const imageUrls = response.data.image_urls.filter(url => !url.endsWith('.svg'));
        const imgData = [];
  
        for (let i = 0; i < imageUrls.length; i++) {
          const imgResponse = await axios.get(imageUrls[i], { responseType: 'arraybuffer' });
          const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
          await fs.outputFile(imgPath, imgResponse.data);
          imgData.push(fs.createReadStream(imgPath));
        }
  
        await api.unsendMessage(w.messageID);
  
        await message.reply({
          body: `✅ | Voici Votre imagination`,
          attachment: imgData
        });
      } else {
        throw new Error("Non-200 status code received");
      }
    } catch (error) {
      return message.reply("Création  failed! Mauvaise prompt. Essayer une autre chose.");
    }
  }
}
