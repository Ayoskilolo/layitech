<script setup lang="ts">
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { title } from "radash";

//Display Helper for changing page
const formStage = ref(0);

//Options for Select Button On Form
const nigerianStates = [
  { name: "Abia", inactive: true },
  { name: "Adamawa", inactive: true },
  { name: "Akwa Ibom", inactive: true },
  { name: "Anambra", inactive: true },
  { name: "Bauchi", inactive: true },
  { name: "Bayelsa", inactive: true },
  { name: "Benue", inactive: true },
  { name: "Borno", inactive: true },
  { name: "Cross River", inactive: true },
  { name: "Delta", inactive: true },
  { name: "Ebonyi", inactive: true },
  { name: "Edo", inactive: true },
  { name: "Ekiti", inactive: true },
  { name: "Enugu", inactive: true },
  { name: "FCT - Abuja", inactive: true },
  { name: "Gombe", inactive: true },
  { name: "Imo", inactive: true },
  { name: "Jigawa", inactive: true },
  { name: "Kaduna", inactive: true },
  { name: "Kano", inactive: true },
  { name: "Katsina", inactive: true },
  { name: "Kebbi", inactive: true },
  { name: "Kogi", inactive: true },
  { name: "Kwara", inactive: true },
  { name: "Lagos" },
  { name: "Nasarawa", inactive: true },
  { name: "Niger", inactive: true },
  { name: "Ogun", inactive: true },
  { name: "Ondo", inactive: true },
  { name: "Osun", inactive: true },
  { name: "Oyo", inactive: true },
  { name: "Plateau", inactive: true },
  { name: "Rivers", inactive: true },
  { name: "Sokoto", inactive: true },
  { name: "Taraba", inactive: true },
  { name: "Yobe", inactive: true },
  { name: "Zamfara", inactive: true },
];
const meansOfIdentification = [
  "National Identication Number",
  "Voter's Card",
  "Driver's License",
  "International Passport",
];

//Reactive Object that holds the form information.
const customerKYCForm = ref({
  customerFirstName: "",
  customerLastName: "",
  customerPhoneNumber: "",
  customerEmail: "",
  customerAddress: "",
  customerCountryOfResidence: "",
  customerStateOfResidence: "",
  customerLGAOfResidence: "",
  isContactAddressPointOfInstallation: "",
  customerTypeOfEmployment: "",
  customerImage: "",
  customerIDCard: "",
  customerIdCardNumber: "",
  customerBVN: "",
  customerBankName: "",
  customerBankStatement: "",
});

const generatedDocument = ref();

async function buildDocument() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          createHeading("Solar Provider On-boarding Information"),
          ...writeJSONIntoParagraph(customerKYCForm.value),
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
</script>

<template>
  <section class="h-[150vh] flex flex-col relative animate__fadeIn relative">
    <div
      class="section-top h-[45%] bg-technicians bg-no-repeat bg-cover bg-center flex items-center justify-center z-[0]"
    >
      <p class="text-white text-2xl sm:text-6xl font-bold">Customer KYC</p>
    </div>
    <div
      class="h-[100%] bg-[#004AAD] sm:bg-bluewave bg-no-repeat bg-cover z-[0]"
    ></div>

    <div class="test absolute w-[87%] sm:w-[60%] h-[75%] sm:h-[70%] top-[60%]">
      <div class="cards green"></div>
      <div class="cards m-3 bg-white z-[1] on-top p-4 pt-12 sm:p-9">
        <v-form class="sm:w-[100%] flex flex-col text-left">
          <p
            class="text-[#43ab43] text-xl sm:text-3xl font-black mb-3 sm:text-left"
          >
            Client Information
          </p>
          <p
            class="text-[#002b65] text-base sm:text-xl font-light mb-3 sm:text-left"
          >
            To create your account, we need you to provide your personal and
            employment information
          </p>

          <div v-if="!formStage">
            <p>1. Personal & Employment Details</p>
            <v-text-field
              v-model="customerKYCForm.customerFirstName"
              density="compact"
              placeholder="e.g John "
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="First Name"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="customerKYCForm.customerLastName"
              density="compact"
              placeholder="e.g Bosco"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Last Name"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="customerKYCForm.customerPhoneNumber"
              density="compact"
              placeholder="0901 234 5678"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Phone Number"
              type="tel"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="customerKYCForm.customerEmail"
              density="compact"
              placeholder="john.bosco@email.com"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Email"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="customerKYCForm.customerAddress"
              density="compact"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Address"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-select
              v-model="customerKYCForm.customerCountryOfResidence"
              density="compact"
              :items="['Nigeria']"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Country"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-select
              v-model="customerKYCForm.customerStateOfResidence"
              density="compact"
              :items="nigerianStates"
              item-title="name"
              item-value="name"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="State"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="customerKYCForm.customerLGAOfResidence"
              density="compact"
              placeholder="e.g John Bosco Ventures"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="LGA (Local Government Area)"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-radio-group
              v-model="customerKYCForm.isContactAddressPointOfInstallation"
              label="Is your contact address the same as where you want to install the system?"
            >
              <v-radio label="Yes, it is." value="Yes"></v-radio>
              <v-radio label="No, it isn't" value="No"></v-radio>
            </v-radio-group>

            <v-radio-group
              v-model="customerKYCForm.customerTypeOfEmployment"
              label="What type of employment are you currently on?"
            >
              <v-radio label="Self Employed" value="Self Employed"></v-radio>
              <v-radio label="Part Time" value="Part Time"></v-radio>
              <v-radio label="Full Time" value="Full Time"></v-radio>
              <v-radio label="Retired" value="Retired"></v-radio>
            </v-radio-group>

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
            <p>2. Identity Confirmation & Credit Information</p>
            <p class="mb-10">
              Your identity information is required to verify your identity
            </p>

            <v-text-field
              density="compact"
              v-model="customerKYCForm.customerImage"
              color="#002b65"
              base-color="black"
              variant="outlined"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
              type="file"
              label="Add Photo (We will use your image to carry our a liveness check and also verify your identity)"
            />
            <v-select
              density="compact"
              v-model="customerKYCForm.customerIDCard"
              :items="meansOfIdentification"
              color="#002b65"
              base-color="black"
              variant="outlined"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
              label="Add your ID card (To verify your identity, please add your ID card number)"
            />
            <v-text-field
              density="compact"
              v-model="customerKYCForm.customerIdCardNumber"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="ID Card Number"
              type="date"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />

            <v-text-field
              density="compact"
              v-model="customerKYCForm.customerBVN"
              placeholder="Insert BVN here"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="BVN"
              type="tel"
              class="mb-4"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />

            <v-text-field
              density="compact"
              v-model="customerKYCForm.customerBankName"
              placeholder="Union Bank"
              color="#002b65"
              base-color="black"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
              variant="outlined"
              label="Bank Name (Name of Bank the statement is submitted in)"
            />

            <v-text-field
              density="compact"
              v-model="customerKYCForm.customerBankStatement"
              color="#002b65"
              base-color="black"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
              variant="outlined"
              label="6 months Bank Statements"
              type="file"
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
