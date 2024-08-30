import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { title } from "radash";
import { SendMailClient } from "zeptomail";
import * as fs from "fs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    async function sendEmail() {
      const url = "api.zeptomail.com";
      const token =
        "Zoho-enczapikey wSsVR60i8xb3DKl9mjf4cr8xmF5XUgn0HE982Vqo7nGtT63F8cc8l0zNVwOmGKdKFGNqFDoW9bx8nRwHgTdc3t58wwwJXSiF9mqRe1U4J3x17qnvhDzIXGRYlBqBL4gPzghpnWdlG88g+g==";

      let client = new SendMailClient({ url, token });

      client
        .sendMail({
          from: {
            address: "<DOMAIN>",
            name: "noreply",
          },
          to: [
            {
              email_address: {
                address: "admin@layitech.africa",
                name: "LayiTech",
              },
            },
          ],
          subject: "Test Email",
          htmlbody: "<div><b> Test email sent successfully.</b></div>",
        })
        .then((resp) => console.log("success"))
        .catch((error) => console.log("error"));
    }
  } catch (e) {
    console.log(e);
  }
});
