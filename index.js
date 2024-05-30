var app = require("express")();
app.get("/", async(req, res) => {
res.send(true);
});
var server = app.listen(3000);
const io = require('socket.io')(server);
require("./external bot global chat.js");
require("./db.global.js"); 
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


client.on('ready', async() => {
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

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

    setInterval(() => {
socket.emit("test", "Hii this is a test");
    }, 5000);
socket.on("ping", async() => {
console.log('ping recived');   
});
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

