<template>
  <button @click="addLike">Like ({{ likes }})</button>
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
      // TODO: Implement the addLike method
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
