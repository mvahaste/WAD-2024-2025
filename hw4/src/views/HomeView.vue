<template>
	<div class="home">
		<div class="controls-container">
			<h1>Home</h1>
			<div>
				<button @click="this.$router.push('/addpost')">Add Post</button>
				<!-- <button @click="logOut">Log Out</button> -->
				<button @click="nukePosts">Delete All</button>
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
	data() {
		return {
			posts: [],
		};
	},
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
    nukePosts() {
      fetch("http://localhost:3000/nuke", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete post.");
            }
            this.post = null;
            this.posts = [];
            this.successMessage = "Deleted post successfully.";
            return response.json();
          })
          .catch((error) => {
            console.error(error);
            this.errorMessage = "Failed to delete post.";
          });
    },
		fetchPosts() {
			fetch("http://localhost:3000/api/posts", {
				credentials: "include",
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch posts.");
					}
					return response.json();
				})
				.then((data) => {
					this.posts = data;
				})
				.catch((error) => {
					console.error("Error fetching posts: ", error);
				});
		},
	},
	mounted() {
		this.fetchPosts();
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
