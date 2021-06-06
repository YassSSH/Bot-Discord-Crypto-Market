const Discord = require('discord.js');
const axios = require('axios');
const { MessageButton, MessageActionRow } = require('discord-buttons');

const client = new Discord.Client();
require('discord-buttons')(client)
const { TOKEN, PREFIX } = require("./config.json");
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
// CONSOLE
client.on("ready", () => console.log("Je suis pret masta"))
client.on("error", () => console.error);
client.on("warn", () => console.warn);
client.on("debug", console.log);
client.login(TOKEN);



client.on("message", async msg => {
    // SETUP CMD
    if (msg.author.bot) return;
    if (msg.content.indexOf(PREFIX) !== 0) return;
    const args = msg.content.slice(PREFIX.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();


    // API COIN

    if (cmd === 'c') {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${args}&vs_currencies=eur`)
        let coin = new Discord.MessageEmbed()
            .setTimestamp()
            .setThumbnail(msg.guild.owner.user.displayAvatarURL({ size: 256 }))
            .setTitle(`**Coin Show by Yass#2255**`)
            .setDescription(`**Coin Information**
                **Coin**: ${args}
                **Prix**: ${data[args]['eur']}
                `)
            .setImage("https://wallpapercave.com/wp/wp5182630.jpg")
            .setFooter(`Yass#2255`)
            .setColor('RANDOM')
            .setFooter(msg.guild.owner.user.tag, msg.guild.owner.user.avatarURL());
        const button = new MessageButton()
            .setStyle("url")
            .setLabel("Invitez le Bot")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=850289995226284035&permissions=0&scope=bot")

        const button1 = new MessageButton()
            .setStyle("url")
            .setLabel("GitHub")
            .setURL("https://github.com/YassSSH")

        let row = new MessageActionRow()
            .addComponent(button)
            .addComponent(button1)

        msg.channel.send({ component: row, embed: coin })

    };
});