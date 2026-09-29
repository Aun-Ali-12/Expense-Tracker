
export const sendVerificationEmail = async (email, token, route) => {
  const isVerify = route === "verify";
  const verifyLink = `${process.env.FRONTEND_URL}${isVerify ? "/verify-email" : "/reset-password"}?token=${encodeURIComponent(token)}`;

  const subject = isVerify ? "Verify your email" : "Change your password";

  const html = `
    <div style="font-family: sans-serif; max-width: 420px; margin: auto;">
      <h2>${isVerify ? "Welcome to ExTrack!" : "Reset your ExTrack password"}</h2>
      <p>Click the button below to ${isVerify ? "verify your email and activate your account" : "change your password to secure your account"}.</p>
      <a href="${verifyLink}" style="display:inline-block; background:#0EA5E9; color:#fff; padding:12px 24px; border-radius:10px; text-decoration:none; margin-top:12px;">
        ${isVerify ? "Verify Email" : "Change Password"}
      </a>
      <p style="margin-top:20px; font-size:12px; color:#6B7280;">
        ${isVerify ? "This link expires in 24 hours. If you didn't sign up, ignore this email." : "This link expires in 15 minutes. If you don't want to change your password, you may ignore this email."}
      </p>
    </div>
  `;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "ExTrack", email: process.env.SENDER_EMAIL },
      to: [{ email }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Brevo email failed: ${res.status} ${await res.text()}`);
  }
};