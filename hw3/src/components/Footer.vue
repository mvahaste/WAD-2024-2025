<template>
  <footer class="footer">
    <p>&copy; 2024 Bean Man Industries</p>
    <a href="https://github.com/mvahaste/WAD-2024-2025" target="_blank"
      >GitHub</a
    >
  </footer>
</template>

<style scoped>
footer {
  max-width: 800px;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 3rem 0.5rem 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  opacity: 0.75;
  gap: 1rem;
}

footer a {
  color: inherit;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  footer {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>

<script>
export default {
  name: "Footer",
};
</script>
