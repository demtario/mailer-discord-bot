import { RichEmbed } from 'discord.js'

const formatParticipant = ({ name, address } = {}) => {
  if (name) return `${name} <${address}>`
  return address
}

export const mapMapToEmbed = (mail) =>
  new RichEmbed()
    .setTitle(`${mail.subject}`)
    .setAuthor(`To: ${mail.to && formatParticipant(mail.to[0])}`)
    .setFooter(`Sent by ${mail.from && formatParticipant(mail.from[0])}`)
    .setTimestamp(mail.date)
    .setColor('#8e1d41')
    .setDescription(mail.text)

export const isInCC = (emailCC = []) => {
  return emailCC.find(({ address }) => address === process.env.MAIL_EMAIL)
}

export default {
  mapMapToEmbed
}
