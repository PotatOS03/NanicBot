const Discord = require("discord.js");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
    let rMember = message.mentions.members.first();
    if (!rMember) return message.channel.send("Couldn't find user.");
    let role = args.slice(1).join(" ");
    if (!role) return message.channel.send("No role specified.");
    let gRole = message.guild.roles.find(`name`, role);
    if (!gRole) return message.channel.send("Couldn't find that role.");

    if (rMember.roles.has(gRole.id)) return message.channel.send(`They already have the **${gRole.name}** role.`);
    await (rMember.addRole(gRole.id));

    message.delete().catch();
    try {
        await rMember.send(`You have been given the **${gRole.name}** role in ${message.guild.name}.`)
    } catch (e) {
        message.channel.send(`<@${rMember.id}> has been given the **${gRole.name}** role.`)
    }
}

module.exports.help = {
    name: "addrole",
    desc: "Give a role to a user",
    usage: " [user] [role]"
}