<template>
  <section class="bg-bluewave bg-cover bg-no-repeat p-[5%] h-svh">
    <div class="h-[95%] bg-white text-[#004AAD] flex justify-between main">
      <div class="w-1/2 flex flex-col items-left justify-center px-5">
        <img src="/lightbulb.png" alt="lightbulb" width="50" height="50" />
        <div>
          <p class="text-5xl font-bold mb-5">
            Build your clean energy business on LayiTech for Solar-Installation
          </p>
          <p class="text-xl font-normal">
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
      <div class="bg-smarthome bg-contain bg-center bg-no-repeat w-1/2"></div>
    </div>
  </section>
</template>

<style>
.main {
  border: 3px solid #002b65;
}
</style>
