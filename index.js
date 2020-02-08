import Bot from './bot'
import Mailer from './mailer'

import { mapMapToEmbed, isInCC } from './utils'

require('dotenv').config()

const {
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_HOST,
  DISCORD_TOKEN,
  DISCORD_CHANNEL_NAME
} = process.env

const main = async () => {
  const bot = new Bot()
  const mailer = new Mailer({
    username: MAIL_USERNAME,
    password: MAIL_PASSWORD,
    host: MAIL_HOST
  })

  await bot.login(DISCORD_TOKEN)

  mailer.subscribe((mail) => {
    if(isInCC(mail.cc)) {
      const message = mapMapToEmbed(mail)
      bot.sendMessage(message, DISCORD_CHANNEL_NAME)
    }
  })

  bot.setStatus(`Waiting for emails <${MAIL_USERNAME}>`, 'LISTENING')

  const cleanup = async () => {
    process.stdin.resume()

    await bot.destroy()
    mailer.destroy()

    process.exit(99)
  }

  process.on('SIGINT', cleanup)
  process.on('SIGUSR1', cleanup)
  process.on('SIGUSR2', cleanup)
}

main()
