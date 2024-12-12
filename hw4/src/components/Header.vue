<template>
	<header class="header">
		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/login">Log In</router-link>
			<router-link to="/signup">Sign Up</router-link>
			<router-link to="/contact">Contact</router-link>
		</nav>
	</header>
</template>

<script>
export default {
	name: "Header",
};
</script>

<style scoped>
header {
	background-color: rgba(255, 255, 255, 0.75);
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
	-webkit-backdrop-filter: blur(15px);
	backdrop-filter: blur(15px);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 50;
	padding: 0.5rem;
}

nav {
	max-width: 800px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;
}

nav a {
	padding: 0.5rem 0.75rem;
	border-radius: 0.5rem;
	text-decoration: none;
	font-weight: 400;
	color: #000;
	transition: background-color 0.15s;
}

nav a:hover {
	background-color: rgba(0, 0, 0, 0.05);
}

nav a.router-link-exact-active {
	font-weight: 500;
}
</style>
