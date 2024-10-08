import { NextRequest } from "next/server";
import nodemailer from "nodemailer"

export const POST = async (request: NextRequest) => {
    const body = await request.json()
    const { userEmail, feedback, name} = body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.MY_EMAIL,
            subject: `New Feedback from ${name}`,
            text: feedback,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${userEmail}</p><p>${feedback}</p>`,
        });

        return new Response(JSON.stringify({ message: 'Message sent successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Message not sent'}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}