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

const d = new Date();
const year = d.getFullYear();
</script>

<template>
  <header
    class="bg-white fixed top-0 text-black h-[6em] w-full flex items-center justify-center z-[2]"
  >
    <div class="flex items-center justify-between h-[100%] w-full">
      <NuxtLink to="/">
        <img src="/logo.png" width="150" height="150" class="ml-5" />
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

  <footer class="flex flex-col items-center h-[10em] p-5">
    <div class="w-full h-1/2 flex items-center justify-between">
      <div>
        <img src="public/logo.png" width="100" height="100" />
      </div>
      <div class="content-end">
        <v-btn
          icon="mdi-facebook"
          density="compact"
          href="Facebook: https://www.facebook.com/profile.php?id=61564370400219&mibextid=LQQJ4d
Instagram : https://www.instagram.com/layitech?igsh=MWxpb2g3M2pleG9zMg=="
        ></v-btn>
        <v-btn
          icon="mdi-instagram"
          density="compact"
          href="https://www.instagram.com/layitech?igsh=MWxpb2g3M2pleG9zMg=="
        ></v-btn>
        <v-btn icon="mdi-linkedin" density="compact"></v-btn>
      </div>
    </div>
    <div
      style="border-top: 1px solid white"
      class="w-full flex justify-between items-center px-5 pt-2"
    >
      <div>
        <p>LayiTech</p>
        <p>Lekki- Ajah, Lagos.</p>
      </div>

      <p>© {{ year }} LayiPay, all rights reserved</p>
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
