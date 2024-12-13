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
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
      errorMessage: "",
    };
  },
  methods: {
    addPost() {
      if (this.content.trim().length < 3) {
        this.errorMessage = "Content must be at least 3 characters long.";
        return;
      } else {
        this.errorMessage = "";
      }

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

.error-message {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: red;
  margin: auto;
}
</style>
