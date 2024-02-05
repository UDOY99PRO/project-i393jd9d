var app = require("express")();
app.get("/", async(req, res) => {
res.send(true);
});
app.listen(3000);

  var { GatewayIntentBits, Partials, Client, Events } = require("discord.js"); 

const client = new Client({
    fetchAllMembers: true,
    restTimeOffset: 0,
    failIfNotExists: false,
    shards: "auto",
    shardCount: 5,
    allowedMentions: {
      parse: ["roles", "users"],
      repliedUser: true,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER', 'MANAGE_MESSAGE', 'DIRECT_MESSAGE', Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates
    ]
  });


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    status: 'idle',
  });
  client.user.setActivity({
    name: `Nothing 📛`, type: 0 
  });
});

client.on("messageCreate", async(message) => {
if(message.content == ".?"){
  message.reply({content: `I am Alive `});
}
  return;
});





client.login(process.env.TOKEN);
