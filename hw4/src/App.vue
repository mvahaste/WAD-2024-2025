<template>
	<Header />
	<main>
		<router-view />
	</main>
	<Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
	components: {
		Header,
		Footer,
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

html,
body {
	height: 100%;
	background-color: #f5f5f5;
}

#app {
	font-family: "Roboto", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
}

button {
	padding: 0.5rem 1rem;
	background-color: #e0e0e0;
	border: none;
	border-radius: 0.25rem;
	cursor: pointer;
	transition: background-color 0.3s;
}

button:hover {
	background-color: #d0d0d0;
}

main {
	max-width: 800px;
	width: 100%;
	margin: 3.5rem auto 0 auto;
	padding: 1rem;
}
</style>
