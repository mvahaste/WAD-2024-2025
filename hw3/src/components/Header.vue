<template>
  <header class="header">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 0.5rem;
}

nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
