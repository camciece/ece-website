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

  const safeMessage = message.replace(/\n/g, '<br />')
  const safeName = fullName || 'Unknown sender'
  const safeEmail = email || '—'

  const html = `
    <div style="margin:0;padding:0;background:#f6f7fb;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7fb;padding:32px 16px;font-family:Arial, Helvetica, sans-serif;color:#1f232b;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:16px;padding:28px 28px 24px;box-shadow:0 10px 30px rgba(20,22,26,0.08);">
              <tr>
                <td>
                  <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#7b8088;">
                    New contact form submission
                  </p>
                  <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#141414;">
                    ${safeName}
                  </h1>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:16px 0 20px;border-collapse:collapse;">
                    <tr>
                      <td style="padding:10px 12px;border:1px solid #eceef2;border-radius:10px;font-size:14px;background:#fafbff;">
                        <strong style="color:#5a5e66;">Email:</strong>
                        <span style="margin-left:6px;color:#1f232b;">${safeEmail}</span>
                      </td>
                    </tr>
                  </table>
                  <div style="padding:18px 18px;border:1px solid #eceef2;border-radius:12px;background:#fcfcff;font-size:15px;line-height:1.6;color:#2f3239;">
                    ${safeMessage}
                  </div>
                </td>
              </tr>
            </table>
            <p style="margin:16px 0 0;font-size:12px;color:#9aa0a6;">
              Reply directly to this email to respond.
            </p>
          </td>
        </tr>
      </table>
    </div>
  `

  await transporter.sendMail({
    from,
    to: CONTACT_TO,
    replyTo: email,
    subject,
    text,
    html,
  })

  return redirectWithStatus(request, 'sent')
}
