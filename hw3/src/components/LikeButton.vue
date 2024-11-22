<template>
  <button @click="addLike">Likes ({{ likes }})</button>
</template>

<script>
export default {
  name: "LikeButton",
  props: {
    likes: Number,
    post: Object,
  },
  methods: {
    addLike() {
      this.$store.dispatch("addLike", this.post.id);
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: bold;
  color: black;
}
</style>
