const Discord = require('discord.js') 
const bot = new Discord.Client({ws: {intents: Discord.Intents.ALL}});
const fs = require("fs")
bot.commands = new Discord.Collection();

bot.on('ready', () => {
    console.log('Bot online')
    bot.user.setActivity("pitzel is are pro and ok!",{
        type: "STREAMING",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    })
    fs.readdir('./commands', (err, files) => {
        if(err) return console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() == 'js');


        if (jsfile.length <= 0) return console.log("Could not find commands!")

        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props)
        })
    })
}) 

bot.on('message', (message) => {
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;
    let prefix = '+';
    // hello there ['hello', 'there']
    // !ban user reason ['user', 'reason']
    // Breaking Rules ['breaking', 'rules'] breaking rules
    // hello
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length)
    let args = MessageArray.slice(1)
 if(!message.content.startsWith(prefix)) return

 let commandfile = bot.commands.get(cmd);
 if(commandfile) {commandfile.run(bot,message,args)}
})


    

bot.on('guildMemberUpdate', (oldMember, newMember)=>{
    if(oldMember.nickname !== newMember.nickname){
        newMember.send("You Changed your nickname!")
    }
    let oldAvatar = oldMember.user.displayAvatarURL() // https://link.com
    let newAvatar = newMember.user.displayAvatarURL(); // https://link.com
    if(oldAvatar !== newAvatar) {
        newMember.send('Your avatar has changed!')
    }
})

bot.on('guildMemberAdd',(member)=>{
    let embed = new Discord.MessageEmbed()
    .setTitle('Welcome to my server!')
    .setDescription(`Thank you for joining my server! Make sure to stay active and talk with other members!\nCurrent Member Count: ${member.guild.memberCount}\n**Owner:** ${member.guild.owner.user.tag}`)
    .setColor("#ff0066")
    .setAuthor(member.guild.owner.user.tag, member.guild.owner.user.avatarURL())
    .setFooter(member.guild.name, member.guild.iconURL())
    .setThumbnail(member.user.avatarURL());

    member.send(embed);
})

  
;
bot.login("ODU3MTQ4MjU2NDEyMTA2Nzgy.YNLXhQ.Tn6wuESi9K5-zjzt8hL7qXCooVY")