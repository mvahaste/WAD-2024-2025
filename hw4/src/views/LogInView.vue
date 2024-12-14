<template>
  <div id="login-container">
    <div id="login-card">
      <h1 id="login-header">Login</h1>
      <form>
        <label for="email" class="input-field-label">Email:</label
        ><br />
        <input
            type="email"
            id="email"
            class="input-field"
            placeholder="Email"
            v-model="email"
            required
        /><br />

        <label for="password" class="input-field-label">Password:</label
        ><br />
        <input
            type="password"
            id="password"
            class="input-field"
            placeholder="Password"
            v-model="password"
            required
        /><br />
        <div id="buttons">
          <button @click="LogIn">Login</button>
          <button @click="this.$router.push('/signup')">Signup</button>
        </div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",

  data: function() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {


    LogIn() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', //  Don't forget to specify this if you need cookies
        body: JSON.stringify(data),
      })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((err => {
                throw new Error(err.error || "Login failed");
              }))
            }
            response.json()
          })
          .then((data) => {
            console.log(data);
            this.errorMessage = '';
            //this.$router.push("/");
            location.assign("/");
          })
          .catch((error) => {
            console.log(error.message);
            console.log("error");
            this.errorMessage = error.message;
          });
    },
  },
}

</script>

<style scoped>
#login-container {
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 80vh;
}

#login-card {
  background-color: white;

  border: solid 1px #d9d9d9;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.3),
  0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);

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

#login-header {
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
  border-color: rgba(251, 198, 255, 0.69);
}

#buttons {
  display: flex;
  align-self: center;
  margin-top: 1rem;
}

button {
  margin: 0 1rem 0 1rem;
}

.error {
  color: #ff2d2d;
  font-size: 0.9rem;
  margin-top: 2rem;
  text-align: center;

  width: 100%;
  max-width: 20rem;
  box-sizing: border-box;
}
</style>