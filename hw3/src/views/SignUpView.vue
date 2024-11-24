<template>
  <div id="signup-container">
    <div id="signup-card">
      <h1 id="signup-header">Sign-up</h1>
      <form @submit.prevent="handleSubmit">
        <label for="email" class="input-field-label">Email:</label><br/>
        <input type="email" id="email" class="input-field" placeholder="Email" v-model="email" required /><br/>

        <label for="password" class="input-field-label">Password:</label><br/>
        <input type="password" id="password" class="input-field" placeholder="Password" v-model="password" required /><br/>

        <label for="password2" class="input-field-label">Retype password:</label><br />
        <input type="password" id="password2" class="input-field" placeholder="Password" v-model="password2" required /><br/>

        <div v-if="isError" class="error">
          <p>The password is not valid:</p>
          <p v-for="message in errorMessages">{{ message }}</p>
        </div>
        <p v-if="isAccountCreated" id="success">
          Thank you for registering!
        </p>
        <button type="submit" id="signup-button">Signup</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpView",
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      errorMessages: [],
      isError: false,
      isAccountCreated: false
    };
  },
  methods: {
    validatePassword(password, password2) {
      const errors = [];

      if (password.length < 8 || 14 < password.length) {
        errors.push("Password must be between 8 and 14 characters long.");
      }

      if (!/^[A-Z]/.test(password)) {
        errors.push("Password must start with an uppercase letter.");
      }

      if (!/[a-z].*[a-z]/.test(password)) {
        errors.push("Password must include at least two lowercase letters.");
      }

      if (!/\d/.test(password)) {
        errors.push("Password must include at least one numeric digit.");
      }

      if (!/_/.test(password)) {
        errors.push("Password must include an underscore (_).");
      }

      if (password !== password2) {
        errors.push("Passwords must match.");
      }

      return errors;
    },
    handleSubmit() {
      this.errorMessages = this.validatePassword(this.password, this.password2);

      if (0 < this.errorMessages.length) {
        this.isError = true;
        this.isAccountCreated = false;
        return;
      }

      this.errorMessages = [];
      this.isError = false;
      this.isAccountCreated = true;
    }
  }
};
</script>

<style scoped>
#signup-container {
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 80vh;
}

#signup-card {
  background-color: white;

  border: solid 1px #d9d9d9;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.3), 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);

  padding: 1rem 5rem 3rem 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 400px) {
  #signup-card {
    width: 100vw;

    border-radius: 0;
  }
}

#signup-header {
  color: rgb(97, 97, 97);
  margin: 3rem 0 3rem 0;
  padding: 0;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-field-label {
  padding-left: 0.2rem;
}

.input-field {
  height: 2rem;
  width: 100%;
  min-width: 15rem;
  padding: 0 1rem;

  border: solid 2px #d9d9d9;
  border-radius: 1rem;

  outline: none;

  margin-top: 0.5rem;
  margin-bottom: 1rem;

  transition: border-color 0.2s ease;
}

.input-field:focus,
.input-field:hover {
  border-color: rgba(251, 198, 255, 0.69)
}

#signup-button {
  align-self: center;
  margin-top: 1rem;
}

.error {
  color: #ff2d2d;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;

  width: 100%;
  max-width: 20rem;
  box-sizing: border-box;
}

#success {
  text-align: center;
}
</style>