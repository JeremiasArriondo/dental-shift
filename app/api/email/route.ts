import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'

const resend = new Resend(process.env.API_KEY_RESEND)

export async function POST(req: Request) {
  const { firstName, date } = await req.json()

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['jeremiasarriondo98@gmail.com'],
      subject: 'Bienvenido',
      react: EmailTemplate({ firstName, date })
    })
    if (error) {
      return Response.json({ error }, { status: 500 })
    }
    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
