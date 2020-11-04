const Discord = require('discord.js'); // import the Discord object (Using new ES6 imports)
const client = new Discord.Client() // create a Client Object from inside the Discord object imported
const { token } = require('./config.json'); // import config as an object;

// Executes a callback function when Bot is able to signin to discord
client.on('ready', () => {
    console.log("Our bot is ready!"); // Prints the line in OUR terminal, not in any server as that has not been specified
})

client.on('message', (message) => {
    if (message.author.bot) return; // checks if the author of the message is a bot

    let message_split = message.content.trim().split(/ +/); // trims the message contents of any extra whitespace and splits it into an array 
    let command = message_split[0]; // gets the first word of the message (by accessing the first item in the split array)

    if (command == ',mute') { 
        
        let mentioned = message.mentions.members.array(); // Returns an array of the mentioned users as an array

        if (mentioned.length == 0) { // Checks if array is empty
            message.reply("Didn't mention anyone!"); 
        } else if (mentioned.length == 1) { // Array is not empty, continue
            // We use mentioned[0] as discord gives us an array, and we want the first mentioned user
            let user = mentioned[0]
            let newVoiceState = !user.voice.serverMute; // serveMute is a boolean that we flip in order to toggle the new voice state on and off
            user.voice.setMute(newVoiceState);
            message.reply("Muted user!");
        }
        
    } else if (command == ",muteall") {

        let voiceChannel = message.member.voice.channel; // Gets the voice channel the author of the message is currently in 
        if (!voiceChannel) return;
        
        let vcMembers = voiceChannel.members.array(); // Gets all members of the voiceChannel as an array
        for (let member of vcMembers) {
            let newVoiceState = !member.voice.serverMute; // serveMute is a boolean that we flip in order to toggle the new voice state on and off
            member.voice.setMute(newVoiceState); 
            // The code below is a normal way of determining what output to do, but I opted to make it a little shorter to teach Ternary operators on like 46
            // let output;
            // if (newVoiceState) {
            //     output = "Muted " + member.displayName;
            // } else {
            //     output = "Unmuted " + member.displayName);
            // }
            let output = (newVoiceState ? "Muted " : "Unmuted ") + member.displayName; // Rewrites the above if else with a ternary operator (bool ? valueIfTrue : valueIfFalse)
            message.channel.send(output);
        }

    } else if (command == ",help") {
        // Below is how you make a customizeable discord embedded message!
        const embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Among Us Discord Bot")
            .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            .setAuthor("Rohit Dasgupta")
            .setDescription("A Discord Bot to help control voice chat")
            .setThumbnail("https://www.apkmirror.com/wp-content/uploads/2020/11/64/5fa0b604e2e7d.png")
            .addField(",mute @___:", "toggle's someonee's current mute status on and off")
            .addField(",muteall", "like mute, but toggles everyone individually")
            .setFooter("Thank you using this bot!");
        message.channel.send(embed); // And send it to the Discord channel it was asked on
    }
})

client.login(token); // logs bot into discord after it sets up the callback functions