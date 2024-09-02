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

const educationLevel = [
  "High school",
  "OND",
  "HND",
  "Training Certificate",
  "Bachelor's Degree",
];

const yearsOfExperience = [
  "less than 2 years of experience",
  "over 2 years of experience",
];

const specialization = [
  "Design",
  "Installation",
  "QHSE",
  "Project Management",
  "Site Assessment",
  "Customer Service",
  "Other",
];

//  1.⁠ ⁠Surname, ✅
//  2.⁠ ⁠first name,✅
//  3.⁠ ⁠date of birth,✅
//  4.⁠ ⁠gender,✅
//  5.⁠ ⁠means of ID,✅
//  6.⁠ ⁠ID number with example,✅
//  7.⁠ ⁠BVN,✅
//  8.⁠ ⁠residential address,✅
//  9.⁠ ⁠Upload utility Bill,✅
// 10.⁠ ⁠state,✅
// 11.⁠ ⁠country,✅
// 12.⁠ ⁠phone number 1,✅
// 13.⁠ ⁠email,✅

// 14.⁠ ⁠Highest education level (objective; High school, OND, HND, Training certificate, Bachelors)
// 15.⁠ ⁠Numbers of years of experience (less than 2 years of experience, over 2 years of existence)
// 16.⁠ ⁠Specialization (please select as many skills as possible) design, installation, QHSE, project management, Site assessment, customer service, other.
// 17.⁠ ⁠todays date
// 18.⁠ ⁠Upload installation pictures minimum of 5
// 19.⁠ ⁠upload Signature

//Reactive Object that holds the form information.
const installerKYCForm = ref({
  installerFirstName: "",
  installerLastName: "",
  installerDateOfBirth: "",
  installerGender: "",
  installerPhoneNumber: "",
  installerEmail: "",
  installerMeansOfIdentification: "",
  installerIdentificationNumber: "",
  installerAddress: "",
  utilityBill: [],
  installerCountryOfResidence: "",
  installerStateOfResidence: "",
  installerBVN: "",
  levelOfEducation: "",
  yearsOfExperience: "",
  specialization: [],
  dateToday: new Date().toISOString().split("T")[0],
  installationPictures: [],
  signature: [],
});

const generatedDocument = ref();

async function buildDocument() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          createHeading("Solar Provider On-boarding Information"),
          ...writeJSONIntoParagraph(installerKYCForm.value),
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
      <p class="text-white text-2xl sm:text-6xl font-bold">Installer KYC</p>
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
            To finance your solar installation, we need you to provide your
            personal and financial information.
          </p>

          <div v-if="!formStage">
            <p>1. Personal & Employment Details</p>
            <v-text-field
              v-model="installerKYCForm.installerFirstName"
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
              v-model="installerKYCForm.installerLastName"
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
              density="compact"
              v-model="installerKYCForm.installerDateOfBirth"
              placeholder="01/01/1999"
              color="#002b65"
              base-color="black"
              class="mb-4"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
              variant="outlined"
              label="Date of Birth"
              type="date"
            />
            <v-select
              v-model="installerKYCForm.installerGender"
              density="compact"
              :items="['Male', 'Female']"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Gender"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="installerKYCForm.installerPhoneNumber"
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
              v-model="installerKYCForm.installerEmail"
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

            <v-select
              density="compact"
              v-model="installerKYCForm.installerMeansOfIdentification"
              placeholder="Select a means of identification"
              color="#002b65"
              base-color="black"
              :items="meansOfIdentification"
              variant="outlined"
              class="mb-4"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
              label="Means of Identification"
            />

            <v-text-field
              density="compact"
              v-model="installerKYCForm.installerIdentificationNumber"
              placeholder="Insert ID number here"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="ID Number"
              class="mb-4"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              v-model="installerKYCForm.installerAddress"
              density="compact"
              color="#002b65"
              base-color="black"
              variant="outlined"
              label="Address"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
            />
            <v-text-field
              density="compact"
              v-model="installerKYCForm.utilityBill"
              color="#002b65"
              base-color="black"
              class="mb-3"
              rounded
              :rules="[(value) => !!value || 'This field is required.']"
              variant="outlined"
              label="Upload Utility Bill "
              type="file"
            />

            <v-select
              v-model="installerKYCForm.installerCountryOfResidence"
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
              v-model="installerKYCForm.installerStateOfResidence"
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
              density="compact"
              v-model="installerKYCForm.installerBVN"
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
          <Transition>
            <div v-if="formStage">
              <p>2. Identity Confirmation & Credit Information</p>
              <p class="mb-10">
                Your identity information is required to verify your identity
              </p>

              <v-select
                v-model="installerKYCForm.levelOfEducation"
                density="compact"
                :items="educationLevel"
                color="#002b65"
                base-color="black"
                variant="outlined"
                label="Level of Education"
                class="mb-3"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
              />

              <v-select
                v-model="installerKYCForm.yearsOfExperience"
                density="compact"
                :items="yearsOfExperience"
                color="#002b65"
                base-color="black"
                variant="outlined"
                label="Years of Experience"
                class="mb-3"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
              />

              <v-select
                v-model="installerKYCForm.specialization"
                density="compact"
                :items="specialization"
                color="#002b65"
                base-color="black"
                variant="outlined"
                label="Specialization"
                hint="Pick as many that apply to you"
                chips
                class="mb-5"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
                multiple
                persistent-hint
              />

              <v-text-field
                density="compact"
                v-model="installerKYCForm.dateToday"
                placeholder="Insert today’s date here"
                color="#002b65"
                base-color="black"
                class="mb-4"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
                variant="outlined"
                label="Today's Date"
                type="date"
              />

              <v-file-input
                density="compact"
                v-model="installerKYCForm.installationPictures"
                color="#002b65"
                base-color="black"
                class="mb-3"
                multiple
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
                variant="outlined"
                label="6 months Bank Statements"
                accept=".png,.jpeg,.pdf"
              />

              <v-file-input
                density="compact"
                v-model="installerKYCForm.signature"
                placeholder="Select an upload method from the dropdown"
                color="#002b65"
                base-color="black"
                class="mb-4"
                rounded
                :rules="[(value) => !!value || 'This field is required.']"
                variant="outlined"
                label="Upload Signature"
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
          </Transition>
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
