const Discord = require('discord.js'); // import the Discord object (Using new ES6 imports)
const client = new Discord.Client() // create a Client Object from inside the Discord object imported
const { token, prefix } = require('./config.json'); // import config as an object;

// Executes a callback function when Bot is able to signin to discord
client.on('ready', () => {
    console.log("Our bot is ready!"); // Prints the line in OUR terminal, not in any server as that has not been specified
})

client.on('message', (message) => {
    if (message.author.bot) return; // checks if the author of the message is a bot

    let message_split = message.content.trim().split(/ +/); // trims the message contents of any extra whitespace and splits it into an array 
    let firstChar = message_split[0].charAt(0)
    let command = message_split[0].slice(1); // gets the first word of the message. Not including the first character, which will be tested against the prefix to check if it's a valid command

    if (firstChar != prefix) return; // This wasn't started with the prefix so stop!

    let voiceChannel = message.member.voice.channel; // Gets the voice channel the author of the message is currently in 
    let vcMembers = voiceChannel.members.array(); // Gets all members of the voiceChannel as an array
    let mentioned = message.mentions.members.array(); // Returns an array of the mentioned users as an array
    
    switch(command) {
        
        case 'mute':

            if (mentioned.length == 0) { // Checks if array is empty
                message.reply("Didn't mention anyone!"); 
            } else { // Array is not empty, continue
                // Mentioned is an array, so we loop through these users;
                let user = mentioned[0];
                let newVoiceState = !user.voice.serverMute; // serveMute is a boolean that we flip in order to toggle the new voice state on and off
                user.voice.setMute(newVoiceState);
                message.reply("Muted user!");
            }
            break;

        case 'muteall':
            if (!voiceChannel) return;
            
            for (let member of vcMembers) {
                let newVoiceState = !member.voice.serverMute; // serveMute is a boolean that we flip in order to toggle the new voice state on and off
                member.voice.setMute(newVoiceState); 
                let output = (newVoiceState ? "Muted " : "Unmuted ") + member.displayName; // Rewrites the above if else with a ternary operator (bool ? valueIfTrue : valueIfFalse)
                message.channel.send(output);
            }
            break;

        case 'ghost':
            break;
        
        case 'reset':
            if (!voiceChannel) return;
            
            for (let member of vcMembers) {
                let newVoiceState = false; // unmute everbody 
                member.voice.setMute(newVoiceState); 
            }
            message.channel.send("Reset game!");
            break;

        case 'help':
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
            break;
        } 
    } 
)

client.login(token); // logs bot into discord after it sets up the callback functions