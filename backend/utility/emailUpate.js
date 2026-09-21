import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email, token) => {
    const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await resend.emails.send({
        from: "ExTrack <onboarding@resend.dev>",
        to: email,
        subject: "Verify your email",
        html: `
      <div style="font-family: sans-serif; max-width: 420px; margin: auto;">
        <h2>Welcome to ExTrack!</h2>
        <p>Click the button below to verify your email and activate your account.</p>
        <a href="${verifyLink}" style="display:inline-block; background:#0EA5E9; color:#fff; padding:12px 24px; border-radius:10px; text-decoration:none; margin-top:12px;">
          Verify Email
        </a>
        <p style="margin-top:20px; font-size:12px; color:#6B7280;">
          This link expires in 24 hours. If you didn't sign up, ignore this email.
        </p>
      </div>
    `,
    });
};
