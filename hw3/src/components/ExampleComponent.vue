<template>
  <div class="example-component">
    <h1>{{ text }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: bold;
  color: black;
}
</style>

<script>
export default {
  name: "ExampleComponent",
  props: {
    text: String,
  },
};
</script>
