export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}
