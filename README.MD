# Mailer Discord Bot
This bot fetches new mails from your inbox and sends them as a message to your discord channel

## Start
You need to copy and rename `example.env` to `.env`, next you need to fill your email credentials, discord bot token and name of text channel you want to display mails
```
MAIL_USERNAME=YOUR_EMAIL
MAIL_HOST=YOUR_EMAIL_HOST
MAIL_PASSWORD=YOUR_PASSWORD
DISCORD_TOKEN=YOUR_TOKEN
DISCORD_CHANNEL_NAME=YOUR_CHANNEL_NAME
```

Then you can simply start your bot by:
```
$ npm run start
```
