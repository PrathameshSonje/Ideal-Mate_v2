import { NextRequest } from "next/server";
import nodemailer from "nodemailer"

export const POST = async (request: NextRequest) => {
    const body = await request.json()
    const { email, feedback, name, token } = body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: email,
            accessToken: token,
        },
    });

    try {
        await transporter.sendMail({
            from: email,
            to: process.env.MY_EMAIL,
            subject: `New Feedback from ${name}`,
            text: feedback,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${feedback}</p>`,
        });

        return new Response("Message send", {
            status: 200
        });
    } catch (error) {
        console.error('Failed to send email:', error);
        return new Response("Message not send", {
            status: 400
        });;
    }
}