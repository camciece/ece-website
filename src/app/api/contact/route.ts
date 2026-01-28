import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const CONTACT_TO = process.env.CONTACT_TO || 'info@ececamci.com'

function redirectWithStatus(request: Request, status: 'sent' | 'error') {
  const url = new URL('/contact', request.url)
  url.searchParams.set(status, '1')
  return NextResponse.redirect(url)
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const firstName = String(formData.get('firstName') || '').trim()
  const lastName = String(formData.get('lastName') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!email || !message) {
    return redirectWithStatus(request, 'error')
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 0)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || user

  if (!host || !port || !user || !pass || !from) {
    return redirectWithStatus(request, 'error')
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  })

  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim()
  const subject = fullName
    ? `Contact form: ${fullName}`
    : 'Contact form submission'

  const text = [
    `From: ${fullName || 'Unknown sender'}`,
    `Email: ${email}`,
    '',
    message,
  ].join('\n')

  await transporter.sendMail({
    from,
    to: CONTACT_TO,
    replyTo: email,
    subject,
    text,
  })

  return redirectWithStatus(request, 'sent')
}
