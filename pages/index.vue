<script setup lang="ts">
const landingForm = ref({
  name: "",
  email: "",
  phoneNumber: "",
  reason: "",
});
const commisionPercentage = useRuntimeConfig().public.commsionPercentage;
const interestRate = useRuntimeConfig().public.interestRate;

const projectCost = ref();
const initialDepositPercentage = ref();
const repaymentPeriodInMonths = ref();
const paymentDetails = {
  commision: 0,
  projectCostPlusCommision: 0,
  initialDeposit: 0,
  balancePayment: 0,
  chargesOnBalance: 0,
  totalOutstandingBalancePayment: 0,
  amountExpectedInMonths: 0,
};

const infoGiven = ref(false);

const options = [
  "Not Sure - Exploring Options",
  "At some point this year",
  "Within the next month or so",
  "Within the next 2 weeks",
  "ASAP, within the next few days",
];

const images = [
  "/africell.png",
  "/byd.png",
  "/felicity.png",
  // "/growatt.png",
  "/jinko.png",
  "/mercury.webp",
  "/srne.png",
  "/victron.png",
];

function calculatePaymentBreakDown() {
  infoGiven.value = !infoGiven.value;
  paymentDetails.commision = +projectCost.value * (+commisionPercentage / 100);

  paymentDetails.projectCostPlusCommision =
    +projectCost.value + paymentDetails.commision;

  paymentDetails.initialDeposit =
    paymentDetails.projectCostPlusCommision *
    (+initialDepositPercentage.value / 100);

  paymentDetails.balancePayment =
    paymentDetails.projectCostPlusCommision - paymentDetails.initialDeposit;

  paymentDetails.chargesOnBalance =
    (+interestRate / 100) * paymentDetails.balancePayment;

  paymentDetails.totalOutstandingBalancePayment =
    paymentDetails.chargesOnBalance + paymentDetails.balancePayment;

  paymentDetails.amountExpectedInMonths =
    paymentDetails.totalOutstandingBalancePayment /
    repaymentPeriodInMonths.value;

  console.log(paymentDetails.amountExpectedInMonths);
}

function calculateInterestRate() {
  return true;
}
</script>

<template>
  <section
    id="hero"
    class="p-5 bg-top bg-cover text-[40px] bg-no-repeat flex items-center justify-center sm:flex-row sm:h-screen sm:bg-cover sm:bg-center"
  >
    <div class="flex sm:h-[55%] gap-8 flex-col sm:flex-row">
      <div class="hero-text pb-12 sm:w-[60%] sm:pr-5 flex items-center">
        <div
          class="flex flex-col text-center justify-center items-center py-5 px-5 sm:justify-left sm:items-start sm:text-left"
        >
          <img src="/lightbulb.png" alt="lightbulb" width="50" height="50" />
          <p
            class="text-[40px] leading-10 sm:text-6xl py-3 sm:text-left font-bold"
          >
            Get <span style="color: #56d856">Instant Access </span> to Financing
            for Solar-Installation
          </p>
          <p class="text-[20px] sm:text-3xl sm:text-left">
            Access repayments between 3-18 months with a 25% down payment.
          </p>
        </div>
      </div>

      <div
        class="h-[32rem] sm:h-auto card-container w-[100%] ml-3 sm:w-[50%] sm:mb-0 sm:pb-0"
      >
        <div class="cards green"></div>
        <form class="cards m-3 bg-white z-[1] on-top p-4 pt-12 sm:p-9">
          <div class="sm:w-[90%] flex flex-col text-center">
            <p class="text-[#43ab43] text-3xl font-black mb-4 sm:text-left">
              Let’s Get Started
            </p>
            <p
              class="text-[#002b65] text-base sm:text-xl font-light mb-4 sm:text-left"
            >
              Please provide us with the following details to finance your
              sustainable future
            </p>
            <v-text-field
              v-model="landingForm.name"
              density="compact"
              placeholder="Enter your email"
              color="#002b65"
              base-color="black"
              variant="outlined"
            />
            <v-text-field
              density="compact"
              v-model="landingForm.email"
              placeholder="Enter your email"
              color="#002b65"
              base-color="black"
              variant="outlined"
            />
            <v-text-field
              density="compact"
              v-model="landingForm.phoneNumber"
              placeholder="Enter your phone number"
              color="#002b65"
              base-color="black"
              variant="outlined"
            />
            <v-select
              density="compact"
              placeholder="Purpose of solar installation"
              v-model="landingForm.reason"
              :items="options"
              color="#002b65"
              base-color="black"
              variant="outlined"
            />
            <div class="p-0 flex items-center justify-center">
              <v-btn color="#002B65" text="Submit" max-width="30%" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>

  <section
    id="about"
    class="flex flex-col-reverse items-center h-[40rem] p-[5%] gap-10 justify-between sm:flex-row sm:h-[28rem]"
  >
    <div
      class="h-full green sm:w-2/5 p-5 flex flex-col"
      style="border: 2px solid #002b65"
    >
      <p class="text-4xl font-semibold">About LayiPay</p>
      <p class="">
        Insert short statement/paragraph on LayiPay (now LayiTech). Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Donec ac varius diam, eu
        auctor nisi. Pellentesque enim mi, malesuada nec maximus sed, malesuada
        in ante.
      </p>
    </div>
    <div class="w-full card-container2 sm:w-[50%] ml-5 mt-5">
      <div class="cards green"></div>
      <div class="cards flex flex-col m-5 bg-white z-[1] on-top"></div>
    </div>
  </section>

  <section class="text-center">
    <p class="pt-5 text-black text-4xl font-bold">Our Trusted Brands</p>
    <NuxtMarquee
      :speed="70"
      class="h-[40rem] sm:h-[20rem]"
      autofill
      play
      pauseOnClick
    >
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        width="200px"
        height="200px"
        class="mr-14"
      />
    </NuxtMarquee>
  </section>

  <section id="calculator" class="flex flex-col p-[5%] text-black bg-slate-200">
    <div class="mb-10">
      <p class="text-4xl font-bold mb-2">
        Calculate Your Solar Savings with LayiTech
      </p>
      <p class="text-2xl">
        Input your project cost and initial down payment to see your flexible
        payment plan options within 3-12 months. Discover how much you can save
        by switching to solar with LayiTech.
      </p>
    </div>
    <v-form
      class="flex flex-col items-center"
      @submit.prevent="calculatePaymentBreakDown"
    >
      <div class="flex gap-5 w-full mb-5">
        <v-text-field
          v-model="projectCost"
          placeholder="Project Amount:"
          color="#002b65"
          base-color="black"
          variant="underlined"
          type="tel"
          style="width: 40%"
          :rules="[(value) => !!value || 'There must be project amount.']"
          required
        />
        <v-text-field
          v-model="initialDepositPercentage"
          append-inner-icon="mdi-percent-outline"
          placeholder="Initial Deposit Amount(%)"
          color="#002b65"
          base-color="black"
          variant="underlined"
          type="tel"
          style="width: 39%"
          :rules="[
            (value) =>
              value > 29 ||
              'Initial Deposit must be at least 30% of project amount.',
          ]"
          required
        />
        <v-text-field
          v-model="repaymentPeriodInMonths"
          placeholder="Tenure"
          color="#002b65"
          base-color="black"
          hint="In months"
          variant="underlined"
          type="tel"
          style="width: 10%"
          :rules="[(value) => value > 0 || 'There must be a tenure.']"
          required
          persistent-hint
        />
      </div>
      <v-btn variant="tonal" type="submit" color="#43ab43" size="x-large">
        Submit
      </v-btn>
    </v-form>

    <div v-if="infoGiven" class="flex">
      <v-card
        variant="outlined"
        :title="`LayiTech's Commision (${commisionPercentage})%`"
      >
        <p>{{ paymentDetails.commision.toLocaleString("En-Us") }}</p>
      </v-card>
      <v-card
        variant="outlined"
        title="New Project Cost"
        :subtitle="`${paymentDetails.projectCostPlusCommision}`"
      >
        <p>
          Initial Deposit:
          {{ paymentDetails.initialDeposit.toLocaleString("En-Us") }}
        </p>
        <p>
          Outstanding Balance:
          {{ paymentDetails.balancePayment.toLocaleString("En-Us") }}
        </p>
      </v-card>
    </div>
  </section>

  <section id="panel" class="flex flex-col items-center h-[28rem] sm:h-[60rem]">
    <div class="flex flex-col items-center justify-around py-8 text-center">
      <img
        src="/lightbulb.png"
        alt="lightbulb"
        width="50"
        height="50"
        class="pt-5"
      />
      <p class="text-xl sm:text-6xl font-bold mb-4 tracking-wider">
        Finance your sustainable future, <br />
        today.
      </p>
      <UButton
        label="Learn More"
        color="white"
        variant="outline"
        :ui="{ rounded: 'rounded-full' }"
      />
    </div>
    <div class="bg-panels"></div>
  </section>
</template>

<style>
#calculator .v-text-field input {
  font-size: 2em;
}
p {
  font-family: "Outfit", sans-serif;
}

#hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/checkingvitals.jpeg");
}

@media screen and (max-width: 640px) {
  #hero {
    background-image: linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.6),
        white
      ),
      url("/checkingvitals.jpeg");
    background-size: contain;
    background-position: bottom, top;
  }
}

.card-container {
  position: relative;
}

.card-container2 {
  position: relative;
  height: 100%;
}

.cards {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 26px;
  border: 2px solid #002b65;
}
.green {
  /* background: #43ab43; */
  background: #56d856;
  opacity: 1;
}

.on-top {
  font-family: "Inter", sans-serif;
}

#panel {
  background-color: #43ab43;
  background-image: url("/panels.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
