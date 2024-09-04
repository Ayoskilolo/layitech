<template>
  <section class="text-black p-[5%]">
    <p class="text-3xl font-bold mb-2 sm:text-5xl mb-5">Blog Articles</p>
    <div class="articles-section flex">
      <a
        :href="article.link"
        target="_blank"
        v-if="mediumArticles.items"
        v-for="article in mediumArticles.items"
        :key="article.link"
      >
        <div
          class="w-96 p-3 rounded-lg bg-[#002b65] text-white"
          style="border: 1px solid black"
        >
          <div class="article-title p-1 font-black text-lg">
            <label>{{ article.title }}</label>
          </div>

          <div
            class="ellipsis overflow-hidden h-40 p-2"
            v-html="article.description"
          ></div>

          <div class="article-date mt-2">
            <p>{{ new Date(article.pubDate).toLocaleDateString() }}</p>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
const loading = ref(true);

const { data: mediumArticles } = useFetch(
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@layi.energy",
  {
    lazy: true,
  }
);
</script>

<style scoped>
.articles-section {
  font-family: "Outfit", sans-serif;
  gap: 1rem;
  cursor: pointer;
  display: flex;
  overflow-y: scroll;
}
.article-title {
  cursor: pointer;
}
</style>
