import { RichEmbed } from 'discord.js'

export const mapMapToEmbed = (mail) => (
  new RichEmbed()
    .setTitle(`${mail.subject}`)
    .setAuthor(`From: ${mail.from[0].address} -> To: ${mail.to && mail.to[0].address}`)
    .setTimestamp(mail.date)
    .setColor(0xFF0000)
    .setDescription(mail.text)
)

export default {
  mapMapToEmbed
}
