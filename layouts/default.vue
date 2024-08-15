<script setup></script>

<template>
  <header>
    <v-toolbar class="flex justify-between bg-white" density="compact">
      <img src="/logo.png" width="100" height="100" class="ml-5" />

      <v-spacer></v-spacer>

      <v-btn to="/" ripple text="Home" />

      <v-btn to="/services" ripple text="Services" />

      <v-btn to="/blog" ripple text="Blog" />

      <v-btn variant="text" text="Partner With Us" to="/partnerWithUs" ripple />
    </v-toolbar>
  </header>
  <slot />

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
