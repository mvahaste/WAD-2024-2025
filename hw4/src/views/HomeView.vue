<template>
  <div class="home">
    <div class="controls-container">
      <h1>Home</h1>
      <div>
        <button @click="this.$router.push('/addpost')">Add Post</button>
        <button @click="logOut">Log Out</button>
        <button>Delete All</button>
      </div>
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
  methods: {
    resetLikes() {
      this.$store.dispatch("resetLikes");
    },
    logOut() {
      fetch("http://localhost:3000/api/auth/logout", {
        credentials: "include",
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("LOG OUT FAILED: " + error);
        });
    },
  },
};
</script>

<style scoped>
.home {
  padding-bottom: 1rem;
}

.controls-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.controls-container div {
  display: flex;
  gap: 1rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 768px) {
  .controls-container {
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
}
</style>
