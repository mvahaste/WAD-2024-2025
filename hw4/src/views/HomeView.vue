<template>
	<div class="home">
		<div class="controls-container">
			<h1>Home</h1>
			<div>
				<button>Add Post</button>
				<button>Log Out</button>
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
