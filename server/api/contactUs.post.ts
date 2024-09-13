import sgMail from "@sendgrid/mail";
import { format } from "date-fns";
export default defineEventHandler<{
  body: { name: string; email: string; phoneNumber: string; dateBooked: Date };
}>(async (event) => {
  const body = await readBody(event);

  const token = useRuntimeConfig().sendGridToken;
  sgMail.setApiKey(token);

  const emailBody = `
  <h2>New Client Consultation!</h2> 
  <p> Name: ${body.name} </p> 
  <p> Email: ${body.email} </p> 
  <p> Phone Number: ${body.phoneNumber}</p> 
  <p>Date and Time Booked: ${format(body.dateBooked, "PPPPpp")}</p> 
  <br />`;

  try {
    const msg = {
      to: "layitechltd@gmail.com", // Change to your recipient
      from: "admin@layitech.africa ", // Change to your verified sender
      subject: "New Response from Contact Us!",
      html: emailBody,
    };

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
    return false;
  }
});
