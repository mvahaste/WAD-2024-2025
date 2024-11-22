<template>
  <div class="home">
    <h1>Home</h1>
  </div>
  <div class="posts-list">
    <Post v-for="post in posts" :post="post" :key="post.id" />
  </div>
</template>

<script>
// @ is an alias to /src
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
};
</script>

<style scoped>
.home {
  padding-bottom: 1rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
