import { Resend } from "resend";

export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json(
      { error: "Please fill in your name, email and message." },
      { status: 400 }
    );
  }

  // ← BAGO: kunin ang key at gawin ang Resend client DITO, sa loob ng function
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable");
    return Response.json(
      { error: "Email service is not configured yet." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  // ← hanggang dito ang bago

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: subject?.trim() || `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}