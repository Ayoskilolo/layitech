<script setup lang="ts">
const landingForm = ref({
  name: "",
  email: "",
  phoneNumber: "",
  reason: "",
});

const options = [
  "Not Sure - Exploring Options",
  "At some point this year",
  "Within the next month or so",
  "Within the next 2 weeks",
  "ASAP, within the next few days",
];
</script>

<template>
  <section
    id="hero"
    class="p-5 bg-top bg-cover text-[40px] bg-no-repeat flex items-center justify-center sm:flex-row sm:h-screen sm:bg-cover sm:bg-center"
  >
    <div class="flex sm:h-[55%] gap-8 flex-col sm:flex-row">
      <div class="hero-text pb-12 sm:w-[60%] sm:pr-5 flex items-center">
        <div
          class="flex flex-col text-center justify-center items-center py-5 sm:justify-left sm:items-start sm:text-left"
        >
          <img src="/lightbulb.png" alt="lightbulb" width="50" height="50" />
          <p class="text-[40px] leading-10 sm:text-6xl py-3 sm:text-left">
            Get <span style="color: #81c781">Instant Access </span> to Financing
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
        <form class="cards m-5 bg-white z-[1] on-top p-4 pt-12 sm:p-9">
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

  <section id="panel" class="flex flex-col items-center h-[28rem] sm:h-[55rem]">
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
p {
  font-family: "Outfit", sans-serif;
}

#hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("/checkingvitals.jpeg");
}

@media screen and (max-width: 640px) {
  #hero {
    background-image: linear-gradient(
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.3),
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
  background: #43ab43;
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
