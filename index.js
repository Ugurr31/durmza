const Discord = require('discord.js');

require('dotenv').config();
require('colors');

const client = global.client = new Discord.Client({
    intents: [32767, Discord.GatewayIntentBits.MessageContent],
    presence: { status: 'idle', activities: [{ name: 'BOTUN DURUMU', type: 3 }] }
}); console.clear();

client.login(process.env.Token)
    .then(async c => await console.log(`\n\n Bu botun tüm haklari BlazeeShop'a aittir. Siparis ve detayli bilgi icin: https://www.itemsatis.com/p/Blazeestore \n\n  Botun calıstıgı sunucu sayısı:`.magenta + ` ${client.guilds.cache.size} servers `.blue + `\n  Bot Adı:`.magenta + ` ${client.user.tag} \n\n`.blue));
console

setInterval(async () => {
    let guild = client.guilds.cache.get('SUNUCU ID GIRINIZ');
    if (!guild) return console.log('Sunucu ID\'si Belirtilmemiş'.red);
    let role = guild.roles.cache.get('VERILECEK ROLÜN ID GIRINIZ');
    if (!role) return console.log('Rol ID\'si Belirtilmemiş'.red);
    let channel = guild.channels.cache.get('KAYIT TUTULACAK METIN KANALININ ID GIRIN');
    if (!channel) return console.log('Kanal ID\'si Belirtilmemiş'.red);

    await guild.members.cache.map(async m => {
        let status = m.presence?.activities.map(pre => pre.state).join() || '';
        let control = status.includes('DURUMDA NE OLURSA ROL VERILSIN GIRINIZ');

        if (!control) {
            if (m.roles.cache.has(role.id)) {
                await m.roles.remove(role.id);
                return await channel.send({ embeds: [{ color: 0xf43f5e, description: `${m} adlı kullanıcı durumunu değiştirdiği icin rolü alındı. (\`Yeni durumu: ${status}\`)` }] });
            }
        }

        if (control) {
            if (!m.roles.cache.has(role.id)) {
                await m.roles.add(role.id);
                return await channel.send({ embeds: [{ color: 0x10b981, description: `${m} adlı kullanıcı'nın durumu onaylandı ve rol verildi." (\`Yeni Durumu: ${status}\`)` }] });
            }
        }
    });

}, 1000 * 30 * 1);