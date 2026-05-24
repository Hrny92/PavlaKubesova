import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { fullName, email, phone, message } = await req.json();

  if (!fullName || !email || !message) {
    return NextResponse.json({ error: "Chybí povinná pole" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // SSL na portu 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Web kubesovareality.cz" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Nová zpráva z webu – ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C9A84C; border-bottom: 2px solid #C9A84C; padding-bottom: 10px;">
            Nová zpráva z webu
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; color: #666; width: 120px;">Jméno:</td>
              <td style="padding: 10px 0; font-weight: bold;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;">E-mail:</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; color: #666;">Telefon:</td>
              <td style="padding: 10px 0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 20px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <p style="color: #666; margin: 0 0 8px;">Zpráva:</p>
            <p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Email error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
