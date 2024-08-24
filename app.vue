<template>
  <div class="relative">
    <v-app class="text-white">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </v-app>
  </div>
</template>

<script setup>
useHead({
  title: "LayiTech",
  meta: [
    {
      name: "description",
      content: "Get Access to Financing for Solar-Installation",
    },
  ],
  bodyAttrs: {
    class: "test",
  },
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.7s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
