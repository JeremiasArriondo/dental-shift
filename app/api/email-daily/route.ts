import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies })
  const today = new Date().toISOString().split('T')[0]

  const { data: recipients, error } = await supabase
    .from('turnos')
    .select('*, users(name, email)')
    .gte('appointment_date', `${today}T00:00:00.000Z`)
    .lt('appointment_date', `${today}T23:59:59.999Z`)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      pool: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      maxMessages: Infinity,
      maxConnections: 5
    })

    const emailPromises = recipients.map((recipient) =>
      transporter.sendMail({
        from: `"Eliana Ginocchio" <${process.env.EMAIL_USER}>`,
        to: `${recipient.users.name} <${recipient.users.email}>`,
        subject: '📅 Recordatorio de Turno',
        text: `Hola ${recipient.users.name}, tienes un turno programado para hoy a las ${recipient.hour}hs.`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <title>📅 Recordatorio de Turno</title>
            </head>
            <body>
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #4F7268;">📅 Recordatorio de Turno</h2>
                <p>Hola <strong>${recipient.users.name}</strong>,</p>
                <p>Este es un recordatorio de tu turno programado.</p>
                <div style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
                  📍 <strong>Fecha:</strong> ${recipient.date} <br>
                  ⏰ <strong>Hora:</strong> ${recipient.hour}hs <br>
                </div>
              </div>
            </body>
            </html>`
      })
    )

    Promise.all(emailPromises)
      .then((results) => {
        console.log('All emails sent successfully')
        results.forEach((result) => {
          console.log(
            `Message to ${result.envelope.to} sent: ${result.messageId}`
          )
        })
      })
      .catch((errors) => {
        console.error('Failed to send one or more emails:', errors)
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
