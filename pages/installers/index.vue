<template>
  <section
    class="bg-[#002b65] sm:bg-bluewave bg-cover bg-no-repeat h-dvh p-[5%]"
  >
    <div
      class="h-[95%] sm:bg-[#002b65] sm:text-white main flex flex-col-reverse sm:flex-row justify-around sm:justify-between sm:border-3 sm:border-[#002b65] rounded-2xl"
    >
      <div
        class="sm:w-1/2 flex flex-col items-center justify-center sm:items-start px-5"
      >
        <img src="/lightbulb.png" alt="lightbulb" width="50" height="50" />

        <p class="text-2xl sm:text-5xl font-bold mb-5">
          Solar installers can rely on LayiTech for trusted financing solutions
        </p>
        <p class="text-base font-normal">
          Partner with us to expand solar energy to more homes and businesses.
          Send LayiTech your client’s quotation and invoice and we’ll fund it!
          We disburse within 8 hours with a seamless application process. Join
          us as a solar installer today
        </p>
        <div class="flex justify-center items-center sm:hidden">
          <NuxtLink to="/installers/form">
            <VBtn
              flat
              variant="outlined"
              rounded="pill"
              color="white"
              text="Partner With Us"
              class="mt-5 text-none text-white sm:hidden"
            />
          </NuxtLink>
        </div>
        <div class="flex justify-center hidden items-center sm:block">
          <NuxtLink to="/installers/form">
            <VBtn
              flat
              variant="outlined"
              rounded="pill"
              color="white"
              text="Partner With Us"
              class="mt-5 text-none text-white"
            />
          </NuxtLink>
        </div>
      </div>
      <div
        class="h-80 w-full sm:h-full bg-youngGuy bg-contain bg-center bg-no-repeat sm:w-1/2"
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
