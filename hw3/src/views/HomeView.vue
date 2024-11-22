<template>
  <div class="home">
    <div class="reset-container">
      <h1>Home</h1>
      <button @click="resetLikes">Reset likes</button>
    </div>
  </div>
  <div class="posts-list">
    <Post v-for="post in posts" :post="post" :key="post.id" />
  </div>
</template>

<script>
import Post from "@/components/Post.vue";

export default {
  name: "HomeView",
  components: {
    Post,
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
  },
  mounted() {
    this.$store.dispatch("fetchPosts");
  },
  methods: {
    resetLikes() {
      this.$store.dispatch("resetLikes");
    },
  },
};
</script>

<style scoped>
.home {
  padding-bottom: 1rem;
}

.reset-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
