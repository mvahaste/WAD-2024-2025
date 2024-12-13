<template>
	<div class="postpage">
		<div class="single-post" v-if="post">
			<h1>Post</h1>
			<p>Content:</p>
			<textarea id="content" v-model="post.content"></textarea>
			<div class="buttons">
				<button @click="updatePost">Update</button>
				<button @click="deletePost">Delete</button>
			</div>
		</div>
		<p v-else>No post found.</p>
		<div class="feedback">
			<p v-if="errorMessage" class="error-message">
				{{ errorMessage }}
			</p>
			<p v-if="successMessage" class="success-message">
				{{ successMessage }}
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Post",
	data() {
		return {
			post: null,
			errorMessage: null,
			successMessage: null,
		};
	},
	methods: {
		fetchPostById() {
			const id = this.$route.params.id;
			fetch(`http://localhost:3000/api/posts/${id}`, {
				credentials: "include",
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch post.");
					}
					return response.json();
				})
				.then((data) => {
					this.post = data;
				})
				.catch((error) => {
					console.error(error);
				});
		},

		updatePost() {
			const id = this.$route.params.id;
			const content = this.post.content;

			fetch(`http://localhost:3000/api/posts/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content: content }),
				credentials: "include",
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to update post.");
					}
					this.successMessage = "Updated post successfully.";
					return response.json();
				})
				.catch((error) => {
					console.error(error);
					this.errorMessage = "Failed to update post.";
				});
		},

		deletePost() {
			const id = this.$route.params.id;

			fetch(`http://localhost:3000/api/posts/${id}`, {
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
					this.successMessage = "Deleted post successfully.";
					return response.json();
				})
				.catch((error) => {
					console.error(error);
					this.errorMessage = "Failed to delete post.";
				});
		},
	},
	mounted() {
		this.fetchPostById();
	},
};
</script>

<style>
.single-post {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.single-post textarea {
	padding: 10px;
	height: 10rem;
	resize: vertical;
}

.single-post p {
	font-weight: 500;
	font-size: large;
}

.buttons {
	display: flex;
	gap: 1rem;
	margin-top: 0.5rem;
}

.buttons button {
	flex: 1;
}

.error-message {
	margin-top: 0.5rem;
	color: red;
	margin: auto;
}

.success-message {
	margin-top: 0.5rem;
	color: rgb(0, 255, 0);
	margin: auto;
}

.feedback {
	font-size: 1.1rem;
	margin-top: 1rem;
}
</style>
