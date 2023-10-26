require('dotenv');
const Discord = require('discord.js');
const moment = require('moment-timezone');
const { Client, Util, Collection, MessageEmbed, Structures } = Discord;

const token = 'BotToken';
const targetChannelID = 'IDChannel';
const client = new Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
  ],
});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});
client.on('presenceUpdate', (oldMember, newMember) => {
  const now = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
  const member = newMember.user;
  const oldStatus = oldMember?.status;
  const newStatus = newMember.status;
  if (oldStatus !== newStatus) {
    const targetChannel = client.channels.cache.get(targetChannelID);
    if (targetChannel) {
      targetChannel.send(`${member.tag} : ${oldStatus} -> ${newStatus} vào lúc ${now}.`);
      targetChannel.send(`╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼`);
    } else {
      console.log(`Không tìm thấy kênh với ID ${targetChannelID}`);
    }
  }
});

//Chatbot 

async function errorEmbed(text, message) {
  const newembed = new Discord.MessageEmbed()
    .setColor("#FF7676")
    .setDescription(`**❌ | ${text} **`);
  return message.channel.send(newembed);
}
const axios = require("axios");
//=============================================
const channel_id = "1166705675821391945";
//=============================================
client.on('message', async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  try {
    if (message.channel.id != channel_id) return;
    let res = await axios.get(`http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=${encodeURIComponent(message.content)}`);
    message.reply(res.data.cnt);
  } catch {
    errorEmbed(`Bot error, please try again!`, message);
  }
});
client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} is online!`);
});
client.login(token);
