<script setup>
const showForm = ref(false);

const landingForm = ref({
  name: "",
  email: "",
  phoneNumber: "",
  reason: "",
});
</script>

<template>
  <section
    v-if="!showForm"
    class="bg-[#002b65] sm:bg-bluewave bg-cover bg-no-repeat p-[5%] h-svh"
  >
    <div
      class="h-[95%] sm:bg-white sm:text-[#004AAD] main flex flex-col-reverse sm:flex-row justify-between sm:border-3 sm:border-[#002b65]"
    >
      <div
        class="sm:w-1/2 flex flex-col items-center justify-center sm:items-start px-5"
      >
        <img src="/lightbulb.png" alt="lightbulb" width="50" height="50" />

        <p class="text-2xl sm:text-5xl font-bold mb-5">
          Build your clean energy business on LayiTech for Solar-Installation
        </p>
        <p class="text-base font-normal">
          We've built a platform to help solar business owners grow energy sales
          & get financing by offering your customers an initial deposit of only
          25%. Build your clean energy business with LayiTech.
        </p>
        <div>
          <UButton
            label="Partner With Us"
            color="white"
            variant="outline"
            class="mt-5 transition duration-700 ease-in-out"
            :ui="{ rounded: 'rounded-full', color: '#002b65' }"
            @click="showForm = true"
          />
        </div>
      </div>
      <div
        class="h-80 w-full sm:h-full bg-smarthome bg-contain bg-center bg-no-repeat sm:w-1/2"
      ></div>
    </div>
  </section>

  <section v-if="showForm" class="h-dvh flex flex-col relative">
    <div
      class="section-top h-[45%] bg-technicians bg-no-repeat bg-cover bg-center flex items-center justify-center z-[0]"
    >
      <p class="text-white text-2xl sm:text-6xl font-bold">Partner With Us</p>
    </div>
    <div class="h-[65%] bg-bluewave bg-no-repeat bg-cover z-[0]"></div>

    <div class="z-[10] h-[32rem] test">
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

          <div class="p-0 flex items-center justify-center">
            <v-btn color="#002B65" text="Submit" max-width="30%" />
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style>
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
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 26px;
  border: 2px solid #002b65;
}
.test {
  position: absolute;
  top: 50%;
  left: 28%;
}
</style>
