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
client.login(process.env.GLOBAL_TOKEN);



client.on('ready', async() => {
 await gdb.push("test", "success");
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    status: 'idle',
  });
  client.user.setActivity({
    name: `🌍💬 Global Chat`, type: 0 
  });
/*try {
    const commands = await client.application.commands.fetch();
    await Promise.all(commands.map(command => command.delete()));
    console.log('All commands deleted successfully');
  } catch (error) {
    console.error('Error deleting commands:', error);
     }
 */
client.application.commands.create(
 {
    name: 'help',
    description: 'You will get help from this command',
},
          {
    name: 'set_global_chat',
    description: 'sets global chat channel ',
    options: [
        {
            name: 'channel',
            description: 'Select the channel in which the global chat will be set.',
            type: 'CHANNEL',
            required: true,
            channelTypes: ['GUILD_TEXT'] // Specify channel type as GUILD_TEXT for text channels only
        }
    ]
});
  
   });








client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'set_global_chat') {
        const channelOption = options.getChannel('channel');
          if (channelOption) {
            const selectedChannel = channelOption.channel;
            console.log('Selected channel:', selectedChannel.name);
             await interaction.reply({content: `Selected channel: ${selectedChannel.name}`});
        } else {
            console.log('No channel option provided.');
     await interaction.reply({content: 'No channel option provided.'});  
           return;
          }
    }
});
