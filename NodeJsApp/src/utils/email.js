import config from '@config';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.emailApiKey
    }
}));

export const sendEmail = (to, subject, content) => {
    transport.sendMail(
        {
            from: config.email,
            to: to,
            subject: subject,
            html: `<p>${content}</p>`
        },
        err => { if (err) console.log(err); });
};