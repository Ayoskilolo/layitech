<script setup>
const drawer = ref(false);
const list = [
  { to: "/", label: "Home", icon: "mdi-home" },
  { to: "/services", label: "Services", icon: "mdi-solar-panel" },
  // { to: "/blog", label: "Blog", icon: "mdi-email-newsletter" },
  {
    to: "/partnerWithUs",
    label: "Partner",
    icon: "mdi-handshake-outline",
  },
  {
    to: "/installers",
    label: "Installers",
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
        <img src="/logo.png" width="200" height="200" class="ml-5" />
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
        <NuxtLink to="/">
          <v-btn ripple text="Home" class="text-none" flat />
        </NuxtLink>

        <NuxtLink to="/services">
          <v-btn ripple text="Services" class="text-none" flat />
        </NuxtLink>

        <!-- <v-btn to="/blog" ripple text="Blog" /> -->
        <NuxtLink to="/partnerWithUs">
          <v-btn variant="text" text="Partner" flat ripple class="text-none" />
        </NuxtLink>

        <NuxtLink to="/installers">
          <v-btn
            variant="text"
            text="Installers"
            flat
            ripple
            class="text-none"
          />
        </NuxtLink>
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

  <footer class="flex flex-col h-[37em] sm:h-[25em]">
    <div class="w-full grow flex flex-col justify-between px-[5%]">
      <div
        class="w-full flex flex-col sm:flex-row justify-between pt-10 sm:px-3"
      >
        <div class="flex mt-5 mb-10">
          <div class="pt-2">
            <NuxtLink to="/">
              <img src="public/favicon.ico" width="30" height="30" />
            </NuxtLink>
          </div>
          <p class="text-3xl font-bold">LayiTech</p>
        </div>

        <div
          class="grid grid-rows-2 grid-cols-2 sm:flex gap-8 sm:gap-4 md:gap-6 lg:gap-8"
        >
          <div>
            <p class="text-sm uppercase font-bold">Company</p>
            <p class="py-1">
              <NuxtLink to="/partnerWithUs"> Partners</NuxtLink>
            </p>
            <p class="py-1">
              <NuxtLink :to="{ path: '/', hash: '#calculator' }">
                Blog
              </NuxtLink>
            </p>
          </div>
          <div>
            <p class="text-sm uppercase font-bold">Resources</p>
            <p class="py-1">
              <NuxtLink :to="{ path: '/', hash: '#calculator' }">
                Energy Calculator
              </NuxtLink>
            </p>
            <p class="py-1">
              <a
                href="https://drive.google.com/file/d/14ElYuRp7OQdkXVW7sJnu3-f7DZyCloO1/view?usp=sharing"
                >Deal Process Flow</a
              >
            </p>
            <p class="py-1">
              <NuxtLink to="/client">Customer KYC</NuxtLink>
            </p>
          </div>
          <div>
            <p class="text-sm uppercase font-bold">Legal</p>
            <p class="py-1">Service Level Agreement</p>
            <p class="py-1">
              <a
                href="https://drive.google.com/file/d/17qPxzpC61bywmfghsGBPLx3KRZUZmRfF/view?usp=sharing"
                >Technical Policy</a
              >
            </p>
          </div>
          <div>
            <p class="text-sm uppercase font-bold">Contact Us</p>
            <p class="py-1">
              <a href="mailto:contact@layitech.africa">
                contact@layitech.africa
              </a>
            </p>
            <p class="py-1">
              <a href="mailto:partners@layitech.africa">
                partners@layitech.africa
              </a>
            </p>
            <p class="py-1">
              <a href="mailto:careers@layitech.africa">
                careers@layitech.africa
              </a>
            </p>
            <p class="py-1">
              <a href="tel:+234 902 318 7179">+234 902 318 7179</a>
            </p>
          </div>
        </div>
      </div>
      <div class="w-full icons">
        <v-btn
          icon="mdi-facebook"
          density="compact"
          style="background-color: #002b65; color: white"
          flat
          href="https://www.facebook.com/profile.php?id=61564370400219&mibextid=LQQJ4d"
        ></v-btn>
        <v-btn
          icon="mdi-instagram"
          density="compact"
          style="background-color: #002b65; color: white"
          flat
          href="https://www.instagram.com/layitech?igsh=MWxpb2g3M2pleG9zMg=="
        ></v-btn>
        <v-btn
          icon="mdi-linkedin"
          density="compact"
          flat
          href="https://www.linkedin.com/company/layitech-africa/"
          style="background-color: #002b65; color: white"
        ></v-btn>
      </div>
    </div>

    <div
      class="w-full flex flex-col sm:flex-row justify-between items-center px-[5%] py-5"
    >
      <div>
        <p>Road 5, Ikota, Lekki-Lagos.</p>
      </div>

      <p>© {{ year }} LayiTech, all rights reserved</p>
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

.icons {
  display: flex;
  gap: 2px;
  justify-content: center;
}

@media screen and (min-width: 640px) {
  .icons {
    justify-content: right;
  }
}
</style>
