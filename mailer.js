import MailListener from 'mail-listener2'

class Mailer {
  constructor({ username, password, host }) {
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
      console.log("emailParsed", mail);
      this.subscribers.forEach((cb) => {
        cb(mail, seqno, attributes)
      })
    });

    this.listener.start()
  }

  subscribe(cb) {
    this.subscribers.push(cb)
  }
}

export default Mailer
