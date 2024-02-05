var app = require("express")();
app.get("/", async(req, res) => {
res.send(true);
});
app.listen(3000);
const { Client, GatewayIntentBits } = require('discord.js');

const intents = new GatewayIntentBits([
  'GUILDS',
  'GUILD_MEMBERS',
  'GUILD_BANS',
  'GUILD_EMOJIS_AND_STICKERS',
  'GUILD_INTEGRATIONS',
  'GUILD_WEBHOOKS',
  'GUILD_INVITES',
  'GUILD_VOICE_STATES',
  'GUILD_PRESENCES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS',
  'GUILD_MESSAGE_TYPING',
  'DIRECT_MESSAGES',
  'DIRECT_MESSAGE_REACTIONS',
  'DIRECT_MESSAGE_TYPING',
]);

const client = new Client({ intents });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
