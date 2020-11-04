import { Client } from 'discord.js'; // import the Discord object (Using new ES6 imports)
let client = new Client() // create a Client Object from inside the Discord object imported
import { token } from './config.json'; // import config as an object;

// Executes a callback function when Bot is able to signin to discord
client.on('ready', () => {
    console.log("Our bot is ready!"); // Prints the line in OUR terminal, not in any server as that has not been specified
})

client.on('message', (message) => {
    if (message.author.bot) return; // checks if the author of the message is a bot

    let message_split = message.content.trim().split(/ +/); // trims the message contents of any extra whitespace and splits it into an array 
    let command = message_split[0]; // gets the first word of the message (by accessing the first item in the split array)
    if (command == ',mute') { 
        let mentioned = message.mentions.members.array(); // Returns an array of the mentioned users

        if (mentioned.length == 0) { // Checks if array is empty
            message.reply("Didn't mention anyone!"); 
        } else if (mentioned.length == 1) { // Array is not empty, continue
            // We use mentioned[0] as discord gives us an array, and we want the first mentioned user
            let user = mentioned[0]
            let newVoiceState = !user.voice.serverMute; // serveMute is a boolean that we flip in order to toggle the new voice state on and off
            user.voice.setMute(newVoiceState);
            message.reply("Muted user!");
        }
    }
})

client.login(token); // logs bot into discord after it sets up the callback functions