import nodemailer from 'nodemailer'
import { EMAIL_PASSWORD, EMAIL_USERNAME } from '../../../constants'


const transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD
  }
})


export const sendActivationEmail = async (origin: string, email: string, activationToken: string) => {
  const activateUrl = `${origin}/api/activate?email=${email}&activationToken=${activationToken}`
  const info = await transport.sendMail({
    from: `"Activation Service - Quantum Snowball" <${EMAIL_USERNAME}>`,
    to: email,
    subject: 'Activation: Todos - Quantum Snowball',
    text: activateUrl,
    html: `<h1>Please click the link to activate your account.</h1><p><a href="${activateUrl}">${activateUrl}</a></p>`
  })
  console.log(info)
}

