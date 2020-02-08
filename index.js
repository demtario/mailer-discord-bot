import Bot from './bot'
import Mailer from './mailer'

import { mapMapToEmbed } from './utils'

require('dotenv').config()

const {
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_HOST,
  DISCORD_TOKEN
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
    if(mail.cc && mail.cc.find(({address}) => address === MAIL_USERNAME)) {
      const message = mapMapToEmbed(mail)

      bot.sendMessage(message, 'test')
    }
  })

  bot.sendMessage('Siema', 'test')
}

main()
