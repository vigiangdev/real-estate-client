<template>
  <auth-base-layout>
    <template v-slot:header>
      <h1>Register</h1>
    </template>

    <template v-slot:default>
      <form @submit.prevent="registerUser">
        <div class="form-item">
          <label for="name">Name</label>
          <input id="name" type="text" placeholder="Name" v-model="name" />
        </div>
        <div class="form-item">
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="Email" v-model="email" />
        </div>
        <div class="form-item">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="form-item">
          <label for="passwordConfirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="Password"
            v-model="passwordConfirm"
          />
        </div>
        <div class="form-item">
          <button type="submit">Sign Up</button>
        </div>
        <p class="register-redirect">
          Already registered?
          <router-link :to="{ name: 'Login' }">
            <span>Log In</span>
          </router-link>
        </p>
        <!-- <Error /> -->
      </form>
    </template>
  </auth-base-layout>
</template>

<script>
import AuthBaseLayout from "@/components/Authentication/AuthBaseLayout.vue";
// import Error from "@/components/Error";
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: {
    AuthBaseLayout,
    // Error,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    async registerUser() {
      const userInfo = {
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      };
      const res = await this.register(userInfo);

      if (res.data.success) {
        this.$router.push({ name: "Login" });
      } else {
        this.email = "";
        this.password = "";
        this.passwordConfirm = "";
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

.register-redirect {
  padding-top: 1rem;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
}

.register-redirect a {
  text-decoration: none;
  color: teal;
}
</style>