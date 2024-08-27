<script setup lang="ts">
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { title } from "radash";
import { SendMailClient } from "zeptomail";

//Display Helper for changing page
const formStage = ref(0);

//Options for Select Button On Form
const categoryofBusiness = ["Limited Liability Company", "Partnership", "Sole"];
const meansOfIdentification = ["NIN", "Voter's Card", "Driver's License"];

//Reactive Object that holds the form information.
const partnerWithUsForm = ref({
  businessName: "",
  businessRegistrationNumber: "",
  dateOfIncorporation: "",
  categoryofBusiness: "",
  operatingBusinessAddress: "",
  corporateBusinessAddress: "",
  businessEmail: "",
  businessWebsite: "",
  businessPhoneNumber1: "",
  businessPhoneNumber2: "",
  businessTaxIdentificationNumber: "",
  directorSurname: "",
  directorFirstName: "",
  directorOtherName: "",
  directorDateOfBirth: "",
  directorGender: "",
  directorMeansOfIdentification: "",
  directorIdentificationNumber: "",
  directorBVN: "",
  directorJobRole: "",
  directorResidentialAddress: "",
  directorState: "",
  directorCountry: "",
  directorPhoneNumber1: "",
  directorPhoneNumber2: "",
  directorEmail: "",
  directorSignature: "",
  dateToday: "",
});

const generatedDocument = ref();

async function buildDocument() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          createHeading("Solar Provider On-boarding Information"),
          ...writeJSONIntoParagraph(partnerWithUsForm.value),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  return buffer;
}

function createHeading(text: string): Paragraph {
  return new Paragraph({
    text: text,
    heading: "Heading1",
    thematicBreak: true,
  });
}
function writeJSONIntoParagraph(formData: Object): Paragraph[] {
  const eachEntry = Object.entries(formData);

  let children = [];

  for (const [key, value] of eachEntry) {
    const newLine = new Paragraph({
      children: [new TextRun(`${title(key)}: ${title(String(value))}`)],
      heading: HeadingLevel.HEADING_1,
    });

    children.push(newLine);
  }

  return children;
}

function testEmail() {
  const url = "api.zeptomail.com/";
  const token =
    "Zoho-enczapikey wSsVR60i8xb3DKl9mjf4cr8xmF5XUgn0HE982Vqo7nGtT63F8cc8l0zNVwOmGKdKFGNqFDoW9bx8nRwHgTdc3t58wwwJXSiF9mqRe1U4J3x17qnvhDzIXGRYlBqBL4gPzghpnWdlG88g+g==";

  let client = new SendMailClient({ url, token });
  client
    .sendMail({
      from: {
        address: "undefined",
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
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
}

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
</script>

<template>
  <section class="h-[150vh] flex flex-col relative animate__fadeIn relative">
    <div
      class="section-top h-[45%] bg-technicians bg-no-repeat bg-cover bg-center flex items-center justify-center z-[0]"
    >
      <p class="text-white text-2xl sm:text-6xl font-bold">Partner With Us</p>
    </div>
    <div
      class="h-[100%] bg-[#004AAD] sm:bg-bluewave bg-no-repeat bg-cover z-[0]"
    ></div>

    <div class="test absolute w-[87%] sm:w-[60%] h-[75%] sm:h-[70%] top-[60%]">
      <div class="cards green"></div>
      <div class="cards m-3 bg-white z-[1] on-top p-4 pt-12 sm:p-9">
        <v-form class="sm:w-[100%] flex flex-col text-center">
          <p
            class="text-[#43ab43] text-xl sm:text-3xl font-black mb-4 sm:text-left"
          >
            Solar Provider’s On-boarding Form
          </p>
          <p
            class="text-[#002b65] text-base sm:text-xl font-light mb-4 sm:text-left"
          >
            (Incorporated & Non-Incorporated)
          </p>
          <!-- :rules="[(value) => !!value || ' field']" -->

          <div v-if="!formStage">
            <p>1. Company Details</p>
            <v-text-field
              v-model="partnerWithUsForm.businessName"
              density="compact"
              placeholder="e.g John Bosco Ventures"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Company/Business Name"
              class="mb-2"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.businessRegistrationNumber"
              placeholder="e.g Rc 123456"
              color="#002b65"
              base-color="black"
              variant="outlined"
              class="mb-2"
              label="Certification of Incorporation/Registration
Number"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.dateOfIncorporation"
              placeholder="DD/MM/YYYY"
              color="#002b65"
              base-color="black"
              variant="outlined"
              type="date"
              class="mb-2"
              label="Date of Incorporation/Registration"
            />
            <v-select
              density="compact"
              v-model="partnerWithUsForm.categoryofBusiness"
              placeholder="Select a category from the dropdown"
              color="#002b65"
              :items="categoryofBusiness"
              base-color="black"
              variant="outlined"
              class="mb-2"
              label="Category of business"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.operatingBusinessAddress"
              placeholder="e.g 23 Orange Lane, Surulere, Lagos"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Operating Business Address"
              type="tel"
              class="mb-2"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.corporateBusinessAddress"
              placeholder="e.g 47 Adewale Avenue, Lekki, Lagos"
              color="#002b65"
              base-color="black"
              variant="outlined"
              class="mb-2"
              label="Corporate business Address/Registered Office
(if different from above)"
              type="tel"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.businessEmail"
              placeholder="e.g johnbventures@gmail.com"
              color="#002b65"
              base-color="black"
              variant="outlined"
              ype="email"
              label="Email Address"
              class="mb-2"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.businessWebsite"
              placeholder="e.g johnboscoventures.com"
              color="#002b65"
              base-color="black"
              class="mb-2"
              variant="outlined"
              label="Website Address (if any)"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.businessPhoneNumber1"
              placeholder="e.g +234 801 234 5679"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Phone Number (1)"
              type="tel"
              class="mb-2"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.businessPhoneNumber2"
              placeholder="e.g +234 801 234 5679"
              color="#002b65"
              base-color="black"
              variant="outlined"
              class="mb-2"
              label="Phone Number (2)"
              type="tel"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.businessTaxIdentificationNumber"
              placeholder="Insert TIN here"
              color="#002b65"
              base-color="black"
              variant="outlined"
              class="mb-2"
              label="Tax Identification Number (TIN)"
            />

            <div class="p-0 flex items-center justify-center">
              <v-btn
                color="#002B65"
                text="Next"
                max-width="30%"
                rounded="lg"
                append-icon="mdi-chevron-right"
                @click="formStage += 1"
              />
            </div>
          </div>
          <div v-if="formStage">
            <p>2. Director’s Details</p>
            <v-text-field
              v-model="partnerWithUsForm.directorSurname"
              density="compact"
              placeholder="Insert surname here"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Surname"
              class="mb-2"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorFirstName"
              placeholder="Insert first name here"
              color="#002b65"
              base-color="black"
              variant="outlined"
              class="mb-2"
              label="First Name"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorOtherName"
              placeholder="Insert other name here"
              color="#002b65"
              base-color="black"
              variant="outlined"
              class="mb-2"
              label="Other Name"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorDateOfBirth"
              placeholder="DD/MM/YYYY"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Date of Birth"
              type="date"
              class="mb-2"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorGender"
              placeholder="Select gender from the dropdown"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Gender"
              class="mb-2"
            />
            <v-select
              density="compact"
              v-model="partnerWithUsForm.directorMeansOfIdentification"
              placeholder="Select a means of identification"
              color="#002b65"
              base-color="black"
              :items="meansOfIdentification"
              variant="outlined"
              class="mb-2"
              label="Means of Identification"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorIdentificationNumber"
              placeholder="Insert ID number here"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="ID Number"
              class="mb-2"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorBVN"
              placeholder="Insert BVN here"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="BVN"
              type="tel"
              class="mb-2"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorJobRole"
              placeholder="Insert job role here"
              color="#002b65"
              base-color="black"
              variant="outlined"
              class="mb-2"
              label="Job Role"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorResidentialAddress"
              placeholder="Insert residential address here"
              color="#002b65"
              base-color="black"
              class="mb-2"
              variant="outlined"
              label="Residential Address"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorState"
              placeholder="Insert state here"
              color="#002b65"
              base-color="black"
              class="mb-2"
              variant="outlined"
              label="State"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorCountry"
              placeholder="Insert country here"
              color="#002b65"
              class="mb-2"
              base-color="black"
              variant="outlined"
              label="Country"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorPhoneNumber1"
              placeholder="Insert phone number here"
              color="#002b65"
              base-color="black"
              class="mb-2"
              variant="outlined"
              label="Phone Number (1)"
              type="tel"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorPhoneNumber2"
              placeholder="Insert phone number here"
              color="#002b65"
              base-color="black"
              class="mb-2"
              variant="outlined"
              label="Phone Number (2)"
              type="tel"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorEmail"
              placeholder="Insert email address here"
              color="#002b65"
              base-color="black"
              class="mb-2"
              variant="outlined"
              ype="email"
              label="Email Address"
            />
            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.directorSignature"
              placeholder="Select an upload method from the dropdown"
              color="#002b65"
              base-color="black"
              class="mb-2"
              variant="outlined"
              label="Upload Signature"
              type="file"
            />

            <v-text-field
              density="compact"
              v-model="partnerWithUsForm.dateToday"
              placeholder="Insert today’s date here"
              color="#002b65"
              base-color="black"
              class="mb-2"
              variant="outlined"
              label="Today's Date"
              type="date"
            />

            <div class="p-0 flex items-center justify-center gap-8">
              <v-btn
                color="#002B65"
                text="Previous"
                max-width="40%"
                prepend-icon="mdi-chevron-left"
                rounded="lg"
                @click="formStage -= 1"
              />
              <v-btn
                color="#43AB43"
                text="Submit"
                max-width="30%"
                rounded="lg"
                @click="testEmail()"
              />
            </div>
          </div>
        </v-form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main {
  border: 3px solid #002b65;
}

.section-top {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("/technicians.jpeg");
}

.card-container {
  position: relative;
}

.cards {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 26px;
  border: 2px solid #002b65;
  overflow: scroll;
}
.test {
  overflow-y: visible;
  overflow-x: visible;
  position: absolute;
  left: 52%;
  transform: translate(-50%, -50%);
}
</style>
