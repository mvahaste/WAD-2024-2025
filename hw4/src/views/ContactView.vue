<template>
	<div class="about">
		<h1>Contact Us</h1>
    <p>Send us a message and we'll get in touch!</p>
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" placeholder="Name" required />
      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="Email" required />
      <label for="message">Message:</label>
      <textarea id="message" placeholder="Message" required></textarea>
      <button type="submit">Send</button>
    </form>
    <p>This doesn't actually do anything.</p>
	</div>
</template>

<script>
export default {
  name: "ContactView",
};
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

label {
  font-weight: 500;
}

input, textarea {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}

.about input,
.about textarea {
  margin-bottom: 0.5rem;
}

/* Last p tag in about */
.about p:last-child {
  font-style: italic;
  margin: auto;
  margin-top: 0.5rem;
  opacity: 0.35;
  font-size: 0.75rem;
}
</style>
