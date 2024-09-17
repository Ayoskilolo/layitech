import sgMail from "@sendgrid/mail";
import { flat } from "radash";

export default defineEventHandler<{
  body: { doc: string; typeOfForm: string; files: File[][]; photo: string };
}>(async (event) => {
  const body = await readBody(event);

  const token = useRuntimeConfig().sendGridToken;
  sgMail.setApiKey(token);

  let emailBody = ``;
  switch (body.typeOfForm) {
    case "PARTNER":
      emailBody = `<h3>New Partner!</h3>`;
      break;
    case "INSTALLER":
      emailBody = `<h3>New Installer!</h3>`;
      break;
    case "CLIENT":
      emailBody = `<h3>New Client!</h3>`;
      break;
    default:
  }

  try {
    const msg = {
      to: "layitechltd@gmail.com", // Change to your recipient
      from: "admin@layitech.africa ", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      html: emailBody,
      attachments: [
        {
          content: body.doc,
          filename: "FilledForm.docx",
          type: "application/docx",
          disposition: "attachment",
        },
      ],
    };

    const newFiles: File[] = flat(body.files);

    for (const file of newFiles) {
      const { binaryString, ext } = parseDataUrl(file.content);

      const newAttachment = {
        content: binaryString.toString("base64"),
        type: ext,
        filename: file.name,
        disposition: "attachment",
      };

      msg.attachments.push(newAttachment);
    }

    await sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
});

interface File {
  name: string;
  content: string;
}
