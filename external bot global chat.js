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
    name: `🌍💬 Global Chat`, type: 0 
  });
try {
    const commands = await client.application.commands.fetch();
    await Promise.all(commands.map(command => command.delete()));
    console.log('All commands deleted successfully');
  } catch (error) {
    console.error('Error deleting commands:', error);
     }
 
client.application.commands.create({
    name: 'help',
    description: 'You will get help from this command',
  });
  
   });





client.login(process.env.GLOBAL_TOKEN);
