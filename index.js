require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const { MessageAttachment, MessageEmbed } = require('discord.js');
const axios = require('axios');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] }); //create new client
const priceUri = "https://api.pancakeswap.info/api/v2/tokens/0x079f0f5f3ad15e01a5cd919564a8f52dde03431b";
const MemeArray = [
"100percent",
"brb",
"diamondhandedlegends01",
"fixeveryprob",
"housecovered",
"huntyou",
"iloveit",
"jamesywenmoon",
"ngmi",
"swigscarling"
];


function getRandomInt() {
    return Math.floor(Math.random() * MemeArray.length);
  }
async function getPrice(){
    const res = await axios.get(priceUri);
    return parseFloat(res.data.data.price) * 1000000;
  }

setInterval( async () => {
    var price = 0;
    try{
        price  = await getPrice();
        await client.user.setPresence({
            status: "idle",  //You can show online, idle....
            activities: [{
                name: `$${parseFloat(price).toFixed(2)}/Million`,  //The message shown
                type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
            }]
        });
    }catch(error){
        console.log("error caught: " + error);
    }
    
    
    //console.log(price)
}, 50000); 

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const price = await getPrice();
    await client.user.setPresence({
        status: "idle",  //You can show online, idle....
        activities: [{
            name: `$${parseFloat(price).toFixed(2)}/Million`,  //The message shown
            type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }]
    });
    console.log(price)
});

client.on('messageCreate', async msg => {
    //console.log(msg.embeds[0]);
    //console.log(msg.author);
    switch (msg.content.toLowerCase()) {
        case 'batmeme':
            var filenm =  `${MemeArray[getRandomInt()]}.jpg`
            var filenm2 = ""
            const file = new MessageAttachment(`./memes/${filenm}`);
            const file2 = new MessageAttachment(`./gifs/Happy.gif`);
            const exampleEmbed = new MessageEmbed()
            .setTitle('Have a BatMeme '+ msg.author.username +'! ')
            .setDescription("Memes provided by @powerhungryUK")
            .setImage(`attachment://${filenm}`)
            .setThumbnail(`attachment://Happy.gif`);
            //console.log(msg);
            msg.channel.send({ embeds: [exampleEmbed], files: [file, file2] });
            break;
        case '/website':
                var filenm =  `${MemeArray[getRandomInt()]}.JPG`
                
                var Embed = new MessageEmbed()
                .setTitle('Heres the website!')
                .setDescription("[MegababyINFT](https://megababyinft.com)");
                msg.channel.send({ embeds: [Embed]});
                break;
        case '/marketplace':
            var filenm =  `${MemeArray[getRandomInt()]}.JPG`
            
            var Embed = new MessageEmbed()
            .setTitle('Heres the Marketplace!')
            .setDescription("[MegababyINFT Marketplace](https://megababyinft.com/marketplace)");
            msg.channel.send({ embeds: [Embed]});
            break;
        case '/tokenprice':
            var price = await getPrice();
            var Embed = new MessageEmbed()
            .setTitle('Heres the Current Price!')
            .setDescription(`The Current Price of Megatoken is:`)
            .addField('Price Per Million Tokens', `$${(price).toFixed(3)}`, false)
            .addField('Price Per token', `$${(price/1000000).toFixed(8)}`, true)
            .addField('Token Contract: ','0x079f0f5f3ad15e01a5cd919564a8f52dde03431b')
            msg.channel.send({ embeds: [Embed]});
            break;
        case '/randominft':
            //gets a random NFT
            break;
        default:
            
            break;
    }
  });

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token