import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
  from = 'Acme <no-reply@acme.com>',
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string; 
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set');
  }
 
  return resend.emails.send({
    from,
    to,
    subject,
    html,
  });
}
