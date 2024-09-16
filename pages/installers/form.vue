<script setup lang="ts">
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { title } from "radash";

//Display Helper for changing page
const formStage = ref(0);
const loading = ref(false);
const dialog = ref(false);
const formSubmissionStatus = ref("PENDING");

//Options for Select Button On Form
const nigerianStates = [{ name: "Lagos" }];

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

const { handleFileInput, files } = useFileStorage();

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

  const buffer = await Packer.toBase64String(doc);

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

async function sendEmail() {
  try {
    loading.value = true;
    dialog.value = true;
    const docBuffer = await buildDocument();

    const response = await $fetch("api/generate-doc", {
      method: "POST",
      body: { doc: docBuffer, typeOfForm: "INSTALLER", files: files.value },
    });

    if (response) {
      loading.value = false;
      formSubmissionStatus.value = "SUCCESS";
    } else {
      loading.value = false;
      formSubmissionStatus.value = "FAILURE";
    }
  } catch (error) {
    loading.value = false;
    formSubmissionStatus.value = "FAILURE";
  } finally {
    setTimeout(() => (dialog.value = false), 1000);
  }
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
            Installer's Information
          </p>
          <p
            class="text-[#002b65] text-base sm:text-xl font-light mb-3 sm:text-left"
          >
            Fill the form accurately below to gain access to solar financing for
            your customers.
          </p>

          <div v-if="!formStage">
            <p>1. Personal & Residential Information</p>
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
              placeholder="22, Sule Avenue, Badore-Ajah, Lagos."
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
              @input="handleFileInput"
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
                label="Installation Pictues"
                hint="A minimum number of 5 picuturess"
                accept=".png,.jpeg,.pdf"
                @input="handleFileInput"
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
                @input="handleFileInput"
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
                  @click="sendEmail()"
                />
              </div>
            </div>
          </Transition>
        </v-form>
      </div>
    </div>
  </section>

  <v-dialog v-model="dialog" max-width="320" persistent>
    <v-list class="py-2" color="primary" elevation="12" rounded="lg">
      <v-list-item
        prepend-icon="mdi-check"
        title="Successfully sent your form!"
        v-if="formSubmissionStatus === 'SUCCESS'"
      >
        <template v-slot:prepend>
          <div class="pe-4">
            <v-icon color="primary" size="x-large"></v-icon>
          </div>
        </template>
      </v-list-item>
      <v-list-item
        v-if="formSubmissionStatus === 'PENDING'"
        prepend-icon="$vuetify-outline"
        title="Sending your form..."
      >
        <template v-slot:prepend>
          <div class="pe-4">
            <v-icon color="primary" size="x-large"></v-icon>
          </div>
        </template>

        <template v-slot:append>
          <v-progress-circular
            color="primary"
            indeterminate="disable-shrink"
            size="16"
            width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
      <v-list-item
        v-if="formSubmissionStatus === 'FAILURE'"
        prepend-icon="mdi-message-alert"
        title="OOPS! Something went wrong. Please try again."
      >
        <template v-slot:prepend>
          <div class="pe-4">
            <v-icon color="primary" size="x-large"></v-icon>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
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
