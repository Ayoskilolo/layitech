<template>
  <section class="text-black p-[5%]">
    <p class="text-3xl font-bold mb-2 sm:text-5xl mb-5">Articles</p>
    <div class="articles-section flex">
      <a
        :href="article.link"
        target="_blank"
        v-if="mediumArticles.items"
        v-for="article in mediumArticles.items"
        :key="article.link"
      >
        <v-card flat hover variant="outlined">
          <div class="article-title p-1[rem]">
            <label>{{ article.title }}</label>
          </div>

          <!-- <div
          class="ellipsis overflow-hidden"
          v-html="article.description"
        ></div> -->

          <div class="article-date">
            <p>{{ new Date(article.pubDate).toLocaleDateString() }}</p>
          </div>
        </v-card>
      </a>
    </div>
  </section>
</template>

<script setup>
// const props = defineProps({
//   mediumArticles: Object,
// });

// console.log(props.mediumArticles);
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
  overflow-y: scroll;
}
</style>
