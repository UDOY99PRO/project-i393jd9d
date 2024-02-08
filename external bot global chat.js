(async() => {
 var { GatewayIntentBits, Partials, Client, Events } = require("discord.js"); 
var chanData = await gdb.getArray("channel.data");
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
await client.application.commands.set([
 {
    name: 'set_global_chat',
    description: 'Sets global chat channel',
   options: [
        {
            name: 'channel',
            description: 'Select the channel in which the global chat will be set.',
           type: 7,
            required: true,   
            channelTypes: [0] // Specify channel type as GUILD_TEXT for text channels only
      }
    ]
},
{
    name: 'remove_global_chat',
    description: 'Remove global chat channel',
}
 ]);

});






client.on('interactionCreate', async(interaction) => {
    if (!interaction.isCommand()) return;
await interaction.deferReply();
    const { commandName, options } = interaction;

    if (commandName === 'set_global_chat') {
        const channelOption = options.getChannel('channel');
          if (channelOption) {
if(chanData.indexOf(i => i.id === channelOption.guild.id)){
 var torm = chanData.filter(i => i.id === channelOption.guild.id);
await gdb.pull("channel.data", torm);
 chanData.splice(chanData.indexOf(i => i.id === channelOption.guild.id), 1);
}
           
            await interaction.editReply({content: `Selected channel: <#${channelOption.id}>`});
           await gdb.push("channel.data", {id: channelOption.guild.id, cid: channelOption.id, whid: null });
           await chanData.push({id: channelOption.guild.id, cid: channelOption.id, whid: null });
          } else {
            console.log('No channel option provided.');
     await interaction.editReply({content: 'No channel option provided.'});  
           return;
          }
    }else if(commandName === 'remove_global_chat'){
    await interaction.editReply({content: "true"}); 
    }
});







//main global chat event
client.on("messageCreate", async(message) => {
var cid = message.channel.id;
 var rwhat = chanData.some(ed => ed.cid === cid);
 if(rwhat){
  await message.react("🎉");
 }
});

})();
