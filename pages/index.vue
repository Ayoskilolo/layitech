<script setup lang="ts">
const landingForm = ref({
  name: "",
  email: "",
  phoneNumber: "",
  reason: "",
});

const options = [
  {
    name: "United States",
    value: "US",
  },
  {
    name: "Canada",
    value: "CA",
    disabled: true,
  },
  {
    name: "Mexico",
    value: "MX",
  },
];
</script>

<template>
  <section
    id="hero"
    class="h-screen p-5 bg-top bg-contain text-[40px] bg-no-repeat w-full flex flex-col items-center justify-center sm:flex-row sm:h-svh sm:bg-cover sm:bg-center"
  >
    <div class="hero-text pb-12 sm:w-[60%] sm:pr-5">
      <div
        class="flex flex-col text-center justify-center items-center py-5 sm:justify-left sm:items-start sm:text-left"
      >
        <img src="/lightbulb.png" alt="lightbulb" width="50" height="50" />
        <p class="text-[40px] leading-10 sm:text-6xl py-3">
          Get <span style="color: #81c781">Instant Access </span> to Financing
          for Solar-Installation
        </p>
        <p class="text-[20px] sm:text-3xl">
          Access repayments between 3-18 months with a 25% down payment.
        </p>
      </div>
    </div>

    <div
      class="card-container ml-6 pb-20 mb-20 w-[90%] sm:w-[50%] sm:mb-0 sm:pb-0"
    >
      <div class="cards green"></div>
      <form class="cards on-top">
        <p class="text-[#43ab43] text-3xl font-bold mb-4">Let’s Get Started</p>
        <span class="text-[#002b65] text-xl font-light mb-4">
          Please provide us with the following details to finance your
          sustainable future
        </span>
        <UInput
          v-model="landingForm.name"
          placeholder="Enter your name"
          size="lg"
          class="mb-4 border-1 border-red-200"
        />
        <UInput
          v-model="landingForm.email"
          placeholder="Enter your email"
          size="lg"
          class="mb-4"
        />
        <UInput
          v-model="landingForm.phoneNumber"
          placeholder="Enter your phone number"
          size="lg"
          class="mb-4"
        />
        <USelect
          v-model="landingForm.reason"
          :options="options"
          option-attribute="name"
        />
        <UButton type="submit" />
      </form>
    </div>
  </section>

  <section
    id="about"
    class="flex flex-col-reverse h-[60vh] p-[5%] gap-10 justify-between sm:flex-row sm:h-[40vh]"
  >
    <div
      class="green sm:w-2/5 p-5 flex flex-col"
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
    <div class="card-container2 sm:w-[50%] ml-5">
      <div class="cards green"></div>
      <div class="cards on-top"></div>
    </div>
  </section>

  <section
    id="panel"
    class="flex flex-col items-center bg-panels h-[45vh] sm:h-[90vh]"
  >
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
  </section>
</template>

<style>
p {
  font-family: "Outfit", sans-serif;
}

#hero {
  background-image: url("/checkingvitals.jpeg");
  display: flex;
  align-items: center;
}

.card-container {
  position: relative;
  height: 55%;
}

.card-container2 {
  position: relative;
  height: 100%;
}

.cards {
  width: 100%;
  height: 100%;
  padding-left: 20%;
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
  display: flex;
  flex-direction: column;
  padding: 5% 10% 5% 5%;
  z-index: 1;
  margin: 20px;
  background-color: white;
}

#panel {
  background-color: #43ab43;
  background-image: url("/panels.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
