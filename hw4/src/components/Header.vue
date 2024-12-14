<template>
	<header class="header">
		<nav>
      <div id="links">
        <router-link v-if="isAuthenticated" to="/">Home</router-link>
        <router-link v-if="!isAuthenticated" to="/login">Log In</router-link>
        <router-link v-if="!isAuthenticated" to="/signup">Sign Up</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <button @click="logOut" v-if="isAuthenticated" id="nav-button">Logout</button>
		</nav>
	</header>
</template>

<script>
import auth from "@/auth";

export default {
	name: "Header",
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    this.updateAuthStatus();
  },
  watch: {
    $route(to, from) {
      this.updateAuthStatus();
    }
  },
  methods: {
    async updateAuthStatus() {
      this.isAuthenticated = await auth.authenticated();
    },
    logOut() {
      fetch("http://localhost:3000/api/auth/logout", {
        credentials: "include",
      })
          .then(() => {
            this.isAuthenticated = false;
            this.$router.push("/login");
          })
          .catch((error) => {
            console.error("LOG OUT FAILED: " + error);
          });
    },
  }
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

#links {
  display: flex;
  flex-direction: row;
}

nav {
	max-width: 800px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;
  justify-content: space-between;
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

#nav-button {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 400;
  color: #000;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s;
  text-align: left;
  font-size: 1rem;
}

#nav-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
