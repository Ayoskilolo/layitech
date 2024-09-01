<template>
  <section
    class="bg-[#002b65] sm:bg-bluewave bg-cover bg-no-repeat h-dvh p-[5%]"
  >
    <div
      class="h-[95%] sm:bg-white sm:text-[#004AAD] main flex flex-col-reverse sm:flex-row justify-between sm:border-3 sm:border-[#002b65] rounded-lg"
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
          30%. Build your clean energy business with LayiTech.
        </p>
        <div class="flex justify-center items-center sm:hidden">
          <NuxtLink to="/partnerWithUs/form">
            <VBtn
              flat
              variant="outlined"
              rounded="pill"
              color="#002B65"
              text="Partner With Us"
              class="mt-5 text-none text-white sm:hidden"
            />
          </NuxtLink>
        </div>
        <div class="flex justify-center hidden items-center sm:block">
          <NuxtLink to="/partnerWithUs/form">
            <VBtn
              flat
              variant="outlined"
              rounded="pill"
              color="#002B65"
              text="Partner With Us"
              class="mt-5 text-none text-[#002B65]"
            />
          </NuxtLink>
        </div>
      </div>
      <div
        class="h-80 w-full sm:h-full bg-smarthome bg-contain bg-center bg-no-repeat sm:w-1/2"
      ></div>
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
