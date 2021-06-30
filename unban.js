const discord = require("discord.js")

module.exports.run = async(Client,message,args,prefix)=>{
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('you dont have permissions to do this!')
    if(!message.member.guild.me.hasPermission("BAN_MEMBERS")) return message.reply('i dont have perms to do this')


    let reason = args.slice(1).join("")
    let userId = args[0]


    if(!reason) reason = "No reason provided";
    if(!userId) return message.channel.send("Please provide a id to unban!");
    if(isNaN(userId)) return message.channel.send("Please provide a valid ID that is numbers")
    message.guild.fetchBans().then(async bans=>{
        if(bans.size === 0) return message.channel.send("No one is banned in this server lul")
        let BannedUser = bans.find(ban=> ban.user.id=== userId)
        if(!BannedUser) return message.channel.send("this user isnt banned")
        await message.guild.members.unban(BannedUser.user, {reason})
            .then(()=>{
                message.channel.send(`Unbanned member successfully ${userId}` )
            }).catch(err =>{
            console.log(err)
            if(err)message.channel.send("Something went wrong D:")})
    })
}
module.exports.help={
    name:'unban'
}