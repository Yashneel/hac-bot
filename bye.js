exports.run = async(bot,message,args) => {
    let member = message.mentions.members.first();
           if(!member) {message.channel.send('bye');}
            else{
               message.channel.send(`bye ${member.user.tag}`)
           }
           }
           exports.help = {
               name: 'bye'
           }
           