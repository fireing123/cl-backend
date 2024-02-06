import nodemailer from 'nodemailer';

const { EMAIL, EMAIL_PASS } = process.env;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASS
    }
});