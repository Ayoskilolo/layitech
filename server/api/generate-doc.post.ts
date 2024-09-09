import { SendMailClient } from "zeptomail";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    console.log("iran");

    const url = "api.zeptomail.com";
    const token =
      "Zoho-enczapikey wSsVR60i8xb3DKl9mjf4cr8xmF5XUgn0HE982Vqo7nGtT63F8cc8l0zNVwOmGKdKFGNqFDoW9bx8nRwHgTdc3t58wwwJXSiF9mqRe1U4J3x17qnvhDzIXGRYlBqBL4gPzghpnWdlG88g+g==";

    const client = new SendMailClient({ url, token });

    try {
      client.sendMail({
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
      });

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
});
