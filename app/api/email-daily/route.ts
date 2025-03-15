import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  // const { firstName, date } = await req.json()

  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      pool: true,
      auth: {
        user: process.env.EMAIL_USER, // Tu correo
        pass: process.env.EMAIL_PASS // Tu contraseña de aplicación
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address from the .env file
      to: 'jeremiascabj@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    }

    // const info = await transporter.sendEmail(mailOptions)
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error:', error)
      } else {
        console.log('Email sent: ', info.response)
      }
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
