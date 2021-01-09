<template>
  <auth-base-layout>
    <template v-slot:header>
      <h1>Login</h1>
    </template>

    <template v-slot:default>
      <form @submit.prevent="loginUser" class="login-form">
        <div class="form-item">
          <label for="email">Email:</label>
          <input id="email" type="email" placeholder="Email" v-model="email" />
        </div>
        <div class="form-item">
          <label for="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="form-item">
          <button type="submit">Log In</button>
        </div>
      </form>
      <p class="login-redirect">
        New user?
        <router-link :to="{ name: 'Register' }">
          <span>Sign Up</span>
        </router-link>
      </p>
      <!-- <Error /> -->
    </template>
  </auth-base-layout>
</template>

<script>
import AuthBaseLayout from "@/components/Authentication/AuthBaseLayout.vue";
// import Error from "@/components/Error";
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    AuthBaseLayout,
    // Error,
  },
  data() {
    return {
      email: "",
      password: "",
      feedback: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async loginUser() {
      const userInfo = {
        email: this.email,
        password: this.password,
      };

      const res = await this.login(userInfo);

      if (res.data.success) {
        this.$router.push({ name: "Profile" });
      } else {
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>

<style scoped>
.form-item {
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  padding: 1rem;
  width: 100%;
}

.form-item label {
  padding-right: 1rem;
}

.form-item input {
  flex-grow: 1;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  border: 1px solid gray;
}

.form-item input:focus {
  outline: none;
}

button {
  background-color: teal;
  border: 1px solid teal;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  width: 100%;
  padding: 1rem;
}

button:hover {
  cursor: pointer;
}

.login-redirect {
  padding-top: 1rem;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
}

.login-redirect a {
  text-decoration: none;
  color: teal;
}
</style>