import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
});

export default transporter;