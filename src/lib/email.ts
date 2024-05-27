import nodemailer from 'nodemailer';

const { EMAIL, EMAIL_PASS } = process.env;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    host: 'smtp.gmail.com',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASS
    }
});