import MailListener from 'mail-listener2'

class Mailer {
  constructor({ username, password, host }) {
    this.lastFetchDate = new Date()
    this.subscribers = []

    this.listener = new MailListener({
      username,
      password,
      host,
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      mailbox: "INBOX",
      mailParserOptions: {streamAttachments: true},
      attachments: true,
      attachmentOptions: { directory: "attachments/" }
    })

    this.listener.on("error", (err) => {
      console.log(err);
    });

    this.listener.on("mail", (mail, seqno, attributes) => {
      if(!this.dateAfterStartup(mail.date)) {
        return
      }

      this.subscribers.forEach((cb) => {
        cb(mail, seqno, attributes)
      })

      this.lastFetchDate = new Date()
    });

    this.listener.start()
    console.log(`MailListener started to listen on <${username}>`);
  }

  dateAfterStartup(date = new Date()) {
    return date - this.lastFetchDate >= 0
  }

  subscribe(cb) {
    this.subscribers.push(cb)
  }
}

export default Mailer
