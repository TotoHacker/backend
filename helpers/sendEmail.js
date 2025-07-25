import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export async function sendEmail(subject, text) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: `"CRM Notificaciones" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject,
    text,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('📨 Correo enviado correctamente')
  } catch (error) {
    console.error('❌ Error al enviar correo:', error)
  }
}
