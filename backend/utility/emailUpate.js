import transporter from "./mailer.js";

export const sendVerificationEmail = async (email, token, route) => {
  const verifyLink = `${process.env.FRONTEND_URL}${route === "verify" ? "/verify-email" : "/reset-password"}?token=${token}`;

  await transporter.sendMail({
    from: `ExTrack ${process.env.APP_USER}`,
    to: email,
    subject: `${route === "verify" ? " Verify your email" : "Change your password"}`,
    html: `
      <div style="font-family: sans-serif; max-width: 420px; margin: auto;">
        <h2>Welcome to ExTrack!</h2>
        <p>Click the button below to ${route === "verify" ? "verify your email and activate your account" : "change your password to secure your account"}.</p>
        <a href="${verifyLink}" style="display:inline-block; background:#0EA5E9; color:#fff; padding:12px 24px; border-radius:10px; text-decoration:none; margin-top:12px;">
         ${route === "verify" ? " Verify Email" : "Change Password"}
        </a>
        <p style="margin-top:20px; font-size:12px; color:#6B7280;">
         ${route === "verify" ? "This link expires in 24 hours. If you didn't sign up, ignore this email" : "This link expires in 15 minutes. If you don't want to change your password, you may ignore this email"} .
        </p>
      </div>
    `,
  });
  console.log("Email sent");
};
