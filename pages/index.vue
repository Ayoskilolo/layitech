<script setup lang="ts">
import gsap from 'gsap';

const landingForm = ref({
  name: "",
  email: "",
  phoneNumber: "",
  reason: "",
});
const commisionPercentage = useRuntimeConfig().public.commsionPercentage;
const interestRate = useRuntimeConfig().public.interestRate;

const projectCost = ref();

const monthlyAmount = computed( () => [
  calculatePaymentBreakDown(3),
  calculatePaymentBreakDown(6),
  calculatePaymentBreakDown(9),
  calculatePaymentBreakDown(12)]);

const value = ref()
const initialDepositPercentage = ref();
const paymentDetails = {
  commision: 0,
  projectCostPlusCommision: 0,
  initialDeposit: 0,
  balancePayment: 0,
  chargesOnBalance: 0,
  totalOutstandingBalancePayment: 0,
  amountExpectedInMonths: 0,
};


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

function calculatePaymentBreakDown(repaymentPeriodInMonths: number) {
  if(!projectCost.value  || !initialDepositPercentage.value)  {
    return 0;
  }
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
    (repaymentPeriodInMonths * 3);

  return Math.ceil(paymentDetails.amountExpectedInMonths).toLocaleString()
}
</script>

<template>
  <section
    id="hero"
    class="p-5 bg-top bg-cover text-[40px] bg-no-repeat flex items-center justify-center md:flex-row md:h-screen md:bg-cover md:bg-center"
  >
    <div class="flex md:h-[55%] gap-8 flex-col md:flex-row">
      <div class="hero-text pb-12 md:w-[60%] md:pr-5 flex items-center">
        <div
          class="flex flex-col text-center justify-center items-center py-5 px-5 md:justify-left md:items-start md:text-left"
        >
          <img src="/lightbulb.png" alt="lightbulb" width="50" height="50" />
          <p
            class="text-[40px] leading-10 sm:text-6xl py-3 sm:text-left font-bold"
          >
            Get <span style="color: #56d856">Instant Access </span> to Financing
            for Solar-Installation
          </p>
          <p class="text-[20px] sm:text-3xl sm:text-left">
            Access repayments between 3-12months with a 30% down payment
          </p>
        </div>
      </div>

      <div
        class="h-[32rem] md:h-[32rem] card-container w-[100%] ml-3 md:w-[50%] md:mb-0 md:pb-0"
      >
        <div class="cards green"></div>
        <form class="cards m-3 bg-white z-[1] on-top p-4 pt-12 md:p-5">
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
              placeholder="Enter your name."
              color="#002b65"
              base-color="black"
              variant="outlined"
            />
            <v-text-field
              density="compact"
              v-model="landingForm.email"
              placeholder="Enter your email."
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
              value="Purpose of solar installation"
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
    class="flex flex-col items-center h-[60rem] text-black p-[5%] gap-5 justify-around sm:flex-row sm:h-[35rem]"
  >
    <div
      class="sm:h-full text-black sm:w-1/2 flex flex-col justify-center text-justify"
    >
      <p class="sm:text-4xl font-semibold mb-4 text-3xl text-[#43ab43]">
        About LayiTech
      </p>
      <p class="text-xl md:text-2xl text-left">
        LayiTech (subsidiary of LAYI Energy) is a cleantech company specializing
        in providing installment payment solutions through strategic
        partnerships with solar vendors.
      </p>

      

      <div class="mt-5 hidden sm:block">
        <p class="sm:text-4xl font-semibold sm:mb-2 text-3xl text-[#43ab43]">
          Our Vision
        </p>
        <p class="text-lg md:text-2xl text-left">
          To be a world-class provider of renewable energy across Africa.
        </p>
      </div>

      <div class="mt-5 hidden sm:block">
        <p class="sm:text-4xl font-semibold sm:mb-2 text-3xl text-[#43ab43]">
          Our Mission
        </p>
        <p class="text-lg md:text-2xl text-left">
          To make clean energy accessible and affordable across Africa.
        </p>
      </div>
    </div>

    <div
      class="hidden sm:h-full w-full flex flex-col justify-around gap-10 text-black sm:w-[50%]"
    >
      <div>
        <p class="sm:text-4xl font-semibold sm:mb-2 text-3xl text-[#43ab43]">
          Our Vision
        </p>
        <p class="text-lg md:text-2xl text-left">
          To be a world-class provider of renewable energy across Africa.
        </p>
      </div>

      <div>
        <p class="sm:text-4xl font-semibold sm:mb-2 text-3xl text-[#43ab43]">
          Our Mission
        </p>
        <p class="text-lg md:text-2xl text-left">
          To make clean energy accessible and affordable across Africa.
        </p>
      </div>
    </div>

    <div class="w-full card-container2  sm:w-[50%] ml-5 mt-5">
      <div class="cards green"></div>
      <div class="cards flex flex-col items-center justify-center m-3 bg-white z-[1] on-top bg-[url('/team.jpeg')] bg-cover bg-center bg-no-repeat">
      </div>
    </div>

          <div class="mt-5 sm:hidden">
        <p class="sm:text-4xl font-semibold sm:mb-2 text-3xl text-[#43ab43]">
          Our Vision
        </p>
        <p class="text-lg md:text-2xl text-left">
          To be a world-class provider of renewable energy across Africa.
        </p>
      </div>

      <div class="mt-5 sm:hidden">
        <p class="sm:text-4xl font-semibold sm:mb-2 text-3xl text-[#43ab43]">
          Our Mission
        </p>
        <p class="text-lg md:text-2xl text-left">
          To make clean energy accessible and affordable across Africa.
        </p>
      </div>
  </section>

  <section class="text-center">
    <p class="pt-5 text-black text-4xl font-bold">Our Trusted Brands</p>
    <NuxtMarquee
      :speed="70"
      class="h-[20rem] sm:h-[25rem]"
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

  <section id="calculator" class="flex flex-col sm:flex-row p-[5%] text-black bg-[#002b65] text-white gap-5">
    <div class="mb-10 w-1/2">
      <p class="text-3xl font-bold mb-2 sm:text-6xl text-[#43ab43] mb-5">
        Calculate Your Solar Savings with LayiTech
      </p>
      <p class="text-xl sm:text-2xl">
        Input your project cost and initial down payment to see your flexible
        payment plan options within 3-12 months. Discover how much you can save
        by switching to solar with LayiTech.
      </p>
    </div>

    <div class="flex flex-col w-1/2">
      <v-form
        class="flex flex-col items-center w-full justify-center"
      >
        <div class="flex gap-5 w-full mb-5 flex-col p-1">
          <v-text-field
            v-model="projectCost"
            placeholder="Project Amount(₦):"
            color="#002b65"
            base-color="white"
            variant="outlined"
            type="tel"
            class="w-full"
            :rules="[(value) => !!value || 'There must be project amount.']"
            required
          />
          <v-text-field
            v-model="initialDepositPercentage"
            append-inner-icon="mdi-percent-outline"
            placeholder="Initial Deposit Percentage(%)"
            color="#002b65"
            base-color="white"
            variant="outlined"
            type="tel"
            class="w-full"
            :rules="[
              (value) =>
                value > 29 ? value > 100 ? 'Initial Deposit must be at most a 100% of project amount.' : true :
                'Initial Deposit must be at least 30% of project amount.'
            ]"
            required
          />
        </div>
      </v-form>

      <Transition>
      <div class="grid grid-row-4 grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-row-2 mt-5" v-if="projectCost && initialDepositPercentage">
        <v-card v-for="n in 4" class="p-5 " variant="outlined" style="padding: 2em">
        <p class="text-[1.4em]  mb-12">
          <p>Plan {{ n }}:</p>
          <span class="text-[2em] text-[#43ab43] plan" >
            {{ `₦${ monthlyAmount[n-1] }` }}
          </span>
        </p>

        <div class="text-right flex justify-between">
          <div class="text-[1.2em] text-left"> 
            <p>MONTHS OF REPAYMENT</p>
            <p>{{ n * 3 }} Months</p>
          </div>

          <div class="text-[1.2em] text-[#43ab43]">
            <p>INITIAL DEPOSIT</p>
            <span>{{ `₦${paymentDetails.initialDeposit.toLocaleString("En-Us")}` }}</span>
        </div>
      </div>

      </v-card>
      </div>
      </Transition>
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
