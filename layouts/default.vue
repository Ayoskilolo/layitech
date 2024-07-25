<script setup>
const navbarLinks = [
  [{ label: "LayiTech" }],
  [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Blog", to: "/blog" },
    { label: "Partner With Us", to: "/partnerWithUs" },
  ],
];
</script>
<template>
  <header>
    <!-- <img src="/logo.png" width="200" height="200" /> -->
    <UHorizontalNavigation :links="navbarLinks" class="" />
  </header>
  <slot />

  <footer class="flex items-center px-5">
    <img src="public/logo.png" width="150" height="150" />
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
