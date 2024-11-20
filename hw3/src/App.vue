<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </nav>
  </header>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

/* Reset padding & margin */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 4.25rem 1rem 3rem;
}

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
