import { Client, RichEmbed } from 'discord.js'

class Bot {
  constructor() {
    this.client = new Client()
  }

  login(token) {
    return new Promise((resolve) => {
      this.client.login(token);

      this.client.on('ready', () => {
        console.log(`DiscordBot logged in as ${this.client.user.tag}!`);
        resolve()
      });
    })
  }

  sendMessage(msg, channelName) {
    const channel = this.client.channels.find(({name}) => name === channelName)
    if(channel) {
      channel.send(msg)
    } else {
      console.log(`Warning: Given channel name (${channelName}) does not exist!`)
    }
  }
}

export default Bot
