(async() => {
 var { GatewayIntentBits, Partials, Client, Events, WebhookClient } = require("discord.js"); 
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
await interaction.deferReply().catch();
 
 const { commandName, options } = interaction;

    if (commandName === 'set_global_chat') {
        const channelOption = options.getChannel('channel');
if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
      await interaction.editReply({ content: '`❌` | Insufficient permissions to execute this command. Ypu Need Manage-Channel Permission to execute this command', ephemeral: true });
      return; // Terminate interaction if permission missing
     }
if (chanData.findIndex(i => i.id === channelOption.guild.id) !== -1){
 var torm = chanData.filter(i => i.id === channelOption.guild.id);
await gdb.pull("channel.data", torm[0]);
 chanData.splice(chanData.indexOf(i => i.id === channelOption.guild.id), 1);
}
         //grab wh
      try {
    const webhook = await channelOption.createWebhook({
     name: "Global Chatter",
     avatar: client.user.avatarURL()
    });
    await interaction.editReply({ content: `\`✅\` | <#${channelOption.id}> channel is successfully set for global chat` });
    await gdb.push("channel.data", { id: channelOption.guild.id, cid: channelOption.id, wh: webhook.url });
    chanData.push({ id: channelOption.guild.id, cid: channelOption.id, wh: webhook.url });
} catch (error) {
       console.log(error);
    await interaction.editReply({ content: `\`❌\` | Error: I think I don't have permission to manage or create webhooks. I need manage-webhook permission to create a webhook to send Global Messages to your selected channel` });
    return;
}
           
    }else if(commandName === 'remove_global_chat'){
     if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
      await interaction.editReply({ content: '`❌` | Insufficient permissions to execute this command. Ypu Need Manage-Channel Permission to execute this command', ephemeral: true });
      return; // Terminate interaction if permission missing
     }
     var thisGuildChannel = chanData.filter(l => l.id === interaction.guildId);
     if(!thisGuildChannel || thisGuildChannel.length === 0){
    await interaction.editReply({ content: "No channel was set for global chat."});
      return;
     }
     chanData.splice(chanData.indexOf(i => i.id === interaction.guildId), 1);
     await gdb.pull("channel.data", thisGuildChannel[0]); 
    await interaction.editReply({content: `Successfully removed <#${thisGuildChannel[0].cid}> channel from global chat`}); 
    }
});







//main global chat event
client.on("messageCreate", async(message) => {
 if(message.author.bot) return;
var cid = message.channel.id;
 var rwhat = chanData.findIndex(ed => ed.cid === cid);
 var whata = chanData.filter(i => i.cid === cid);
 var whata = whata[0];
 if(rwhat !== -1){
  if(message.content.match(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi)){
 try {
   message.reply({content: "We dont allow To send links"});
 }catch{}
   return;
  }
 chanData.forEach(async(data) => {
var toSendWh = data.wh;
 try {
  const webhookClient = new WebhookClient({ url: toSendWh });
  await webhookClient.send({content: `${message.content}`}).catch(console.log);
 }catch {
 }
 });
 
/* var rwhat = chanData.findIndex(ed => ed.cid === cid);
 var whata = chanData.filter(i => i.cid === cid);
 var whata = whata[0];
 if(rwhat !== -1){
  const webhookClient = new WebhookClient({ url: whata.wh });
  await webhookClient.send({content: `${message.content}`}).catch(console.log);   */
try {
  await message.delete()
} catch {
}}
});

})();
