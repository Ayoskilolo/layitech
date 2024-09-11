import { SendMailClient } from "zeptomail";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    console.log("iran");

    const url = "api.zeptomail.com";
    const token = useRuntimeConfig().SENDGRID_TOKEN;
    const client = new SendMailClient({ url, token });

    try {
      client
        .sendMail({
          from: {
            address: "admin@layitech.africa",
            name: "LayiTech",
          },
          to: [
            {
              email_address: {
                address: "ayoafo82@gmail.com",
                name: "Ayomide",
              },
            },
          ],
          subject: "Test Email",
          htmlbody: "<div><b> Test email sent successfully.</b></div>",
        })
        .then((resp) => console.log("success"))
        .catch((error) => console.log("error"));

      return true;
    } catch (e) {
      return false;
    } finally {
      console.log(true);
      console.log("success");
    }
  } catch (e) {
    console.log(e);
  }

  // https://www.npmjs.com/package/zeptomail

  const url = "api.zeptomail.com/";
  const token = "<SEND_MAIL_TOKEN>";

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
});
