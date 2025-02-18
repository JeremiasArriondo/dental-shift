import * as React from 'react'

interface EmailTemplateProps {
  firstName: string
  date: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  date
}) => (
  <div>
    <h1>Hola, {firstName}!</h1>
    <hr />
    <p>Tu turno fue creado para el día {date}</p>
  </div>
)
