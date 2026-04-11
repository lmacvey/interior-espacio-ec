import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { contactSchema } from "@/lib/validations";

const ses = new SESClient({
  region: process.env.SES_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    await ses.send(
      new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL!,
        Destination: {
          ToAddresses: [process.env.CONTACT_EMAIL!],
        },
        ReplyToAddresses: [email],
        Message: {
          Subject: {
            Data: `Nuevo mensaje de contacto de ${name}`,
          },
          Body: {
            Html: {
              Data: `
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Correo:</strong> ${email}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
              `,
            },
            Text: {
              Data: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`,
            },
          },
        },
      })
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
