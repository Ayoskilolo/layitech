<script setup>
const showForm = ref();
</script>

<template>
  <section
    class="bg-[#002b65] sm:bg-bluewave bg-cover bg-no-repeat p-[5%] h-svh"
  >
    <div
      class="h-[95%] sm:bg-white sm:text-[#004AAD] main flex flex-col-reverse sm:flex-row justify-between sm:border-3 sm:border-[#002b65]"
    >
      <div
        class="sm:w-1/2 flex flex-col items-center text-center sm:items-left sm:text-left justify-center px-5"
      >
        <img src="/lightbulb.png" alt="lightbulb" width="50" height="50" />
        <div>
          <p class="text-2xl sm:text-5xl font-bold mb-5">
            Build your clean energy business on LayiTech for Solar-Installation
          </p>
          <p class="text-base font-normal">
            We've built a platform to help solar business owners grow energy
            sales & get financing by offering your customers an initial deposit
            of only 25%. Build your clean energy business with LayiTech.
          </p>
          <UButton
            label="Partner With Us"
            color="white"
            variant="outline"
            class="mt-5 transition duration-700 ease-in-out"
            :ui="{ rounded: 'rounded-full', color: '#002b65' }"
          />
        </div>
      </div>
      <div
        class="h-[80%] sm:h-full bg-smarthome bg-contain bg-center bg-no-repeat sm:w-1/2"
      ></div>
    </div>
  </section>
</template>

<style>
.main {
  border: 3px solid #002b65;
}
</style>
