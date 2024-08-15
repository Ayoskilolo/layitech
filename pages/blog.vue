<template>
  <section
    id="blog "
    class="h-dvh bg-greenwave bg-no-repeat bg-cover flex flex-col justify-around"
  >
    <div class="bg-white flex flex-none items-center justify-center h-[10vh]">
      <p class="text-4xl text-[#43ab43] font-bold">Our Blog</p>
    </div>

    <div class="blog">
      <div v-for="n in 10" :key="n" class="mb-5">
        <div class="card-container2">
          <div class="cards green"></div>
          <div class="cards on-top">
            <p>Title of Article</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              mollis eget ante eget accumsan. Praesent blandit, massa vel
              elementum euismod, urna tellus molestie leo, vel mattis magna enim
              quis purus.
            </p>
            <UButton type="submit">Submit</UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-container2 {
  position: relative;
  height: 300px;
  margin: 10px;
}

.cards {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 26px;
  border: 2px solid #002b65;
  color: black;
}
.green {
  background: #43ab43;
  opacity: 1;
}
.on-top {
  display: flex;
  flex-direction: column;
  padding: 5% 10% 5% 5%;
  z-index: 1;
  margin: 8px;
  background-color: white;
}

.blog {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 5%;
  height: 90%;
  overflow-y: scroll;
}
</style>
