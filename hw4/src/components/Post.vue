<template>
	<div class="post">
		<div class="post-header">
			<div class="user">
				<img
					id="avatar"
					:src="`https://ui-avatars.com/api/?background=random&name=${post.author}`"
					:alt="`${post.author}`"
				/>
				<p>{{ post.author }}</p>
			</div>
			<p class="date">{{ getDate }}</p>
		</div>
		<div class="content">
			<p>{{ post.content }}</p>
			<img id="image-content" :src="`${post.image}`" v-if="post.image" />
		</div>
		<div class="interactions">
			<LikeButton :likes="post.likes" :post="post" />
			<button>Report</button>
		</div>
	</div>
</template>

<script>
import LikeButton from "@/components/LikeButton.vue";

export default {
	name: "Post",
	props: {
		post: {
			type: Object,
			required: true,
		},
	},
	components: {
		LikeButton,
	},
	computed: {
		getDate() {
			const date = new Date(this.post.created);
			const options = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			};
			return date.toLocaleDateString("en-GB", options);
		},
	},
};
</script>

<style scoped>
h1 {
	font-weight: bold;
	color: black;
}

.post {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 0.5rem 1rem 1rem;
	border-radius: 0.5rem;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19);
	background-color: white;
}

.post-header {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 0.75rem;
	margin-top: 0.5rem;
}

.user {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

#avatar {
	border-radius: 2.5rem;
	width: 2.5rem;
}

#image-content {
	border-radius: 0.5rem;
}

.interactions {
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
}
</style>
