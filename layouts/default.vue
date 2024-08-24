<script setup>
const drawer = ref(false);
const list = [
  { to: "/", label: "Home", icon: "mdi-home" },
  { to: "/services", label: "Services", icon: "mdi-solar-panel" },
  // { to: "/blog", label: "Blog", icon: "mdi-email-newsletter" },
  {
    to: "/partnerWithUs",
    label: "Partner With Us",
    icon: "mdi-handshake-outline",
  },
];
</script>

<template>
  <header
    class="bg-white fixed top-0 text-black h-[6em] w-full flex items-center justify-center z-[2]"
  >
    <div class="flex items-center justify-between h-[100%] w-full">
      <NuxtLink to="/">
        <img src="/logo.png" width="100" height="100" class="ml-5" />
      </NuxtLink>

      <v-spacer></v-spacer>

      <div class="block sm:hidden">
        <v-btn
          ripple
          @click="drawer = !drawer"
          icon="mdi-menu"
          color="white"
          flat
        />
      </div>

      <div class="hidden sm:block">
        <v-btn to="/" ripple text="Home" class="text-none" flat />

        <v-btn to="/services" ripple text="Services" class="text-none" flat />

        <!-- <v-btn to="/blog" ripple text="Blog" /> -->

        <v-btn
          variant="text"
          text="Partner With Us"
          to="/partnerWithUs"
          flat
          ripple
          class="text-none"
        />
      </div>
    </div>
  </header>
  <v-navigation-drawer
    v-model="drawer"
    class="flex flex-col text-black"
    location="right"
    temporary
  >
    <v-list density="comfortable">
      <v-btn
        ripple
        @click="drawer = !drawer"
        icon="mdi-close"
        color="white"
        flat
        square
      />

      <v-list-item v-for="item in list" :to="item.to" :title="item.label" />
    </v-list>
  </v-navigation-drawer>
  <div class="mt-[6em]">
    <slot />
  </div>

  <footer class="flex items-center justify-between px-5">
    <img src="public/logo.png" width="150" height="150" />

    <div>
      <p>LayiTech</p>
      <p>Lekki- Ajah, Lagos.</p>
    </div>
  </footer>
</template>

<style>
body {
  background-color: #fff;
}

footer {
  height: 10vh;
  background-color: #002b65;
}
</style>
