<template>
  <div class="addpost">
    <h1>Add Post</h1>
    <form @submit.prevent="addPost">
      <div>
        <label for="content">Content:</label>
        <textarea id="content" v-model="content"></textarea>
      </div>
      <div>
        <button type="submit">Add Post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPostView",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    addPost() {
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: this.content,
        }),
        credentials: "include",
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("ADD POST FAILED: " + error);
        });
    },
  },
};
</script>

<style scoped>
.addpost {
  padding-bottom: 1rem;
}

.addpost form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.addpost form div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.addpost form div label {
  font-weight: 500;
}

.addpost form div textarea {
  height: 10rem;
  resize: vertical;
}
</style>
