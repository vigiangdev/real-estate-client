<template>
  <nav class="navbar">
    <div class="company">
      <router-link :to="{ name: 'Home' }" class="company-info">
        <i class="material-icons company-logo">home</i>
        <span class="company-name">Homies</span>
      </router-link>
    </div>

    <div class="authentication">
      <router-link v-if="isLoggedIn" :to="{ name: 'Profile' }"
        >Profile</router-link
      >
      <router-link v-if="!isLoggedIn" :to="{ name: 'Register' }"
        >Register</router-link
      >
      <router-link v-if="!isLoggedIn" :to="{ name: 'Login' }"
        >Log In</router-link
      >
      <span v-if="isLoggedIn" v-on:click="logoutUser" class="logout"
        >Log Out</span
      >
    </div>

    <!-- <div class="ml-4 md:hidden">
      <button class="text-gray-100 focus:outline-none mr-4">
        <i class="material-icons border p-1">menu</i>
      </button>
    </div>

    <ul class="account px-4 py-4 space-y-1 md:hidden">
      <li v-if="isLoggedIn" class="text-gray-100 py-2 px-3">
        <router-link :to="{ name: 'Profile' }">Profile</router-link>
      </li>
      <li v-if="!isLoggedIn" class="text-gray-100 py-2 px-3">
        <router-link :to="{ name: 'Register' }">Register</router-link>
      </li>
      <li v-if="!isLoggedIn" class="text-gray-100 py-2 px-3">
        <router-link :to="{ name: 'Login' }">Log In</router-link>
      </li>
      <li
        v-if="isLoggedIn"
        class="text-gray-100 py-2 px-3"
        v-on:click="logoutUser"
      >
        <span class="cursor-pointer hover:text-gray-700">Log Out</span>
      </li>
    </ul> -->
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: teal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 1.6rem;
  font-weight: bold;
}

.company {
  display: flex;
  justify-content: center;
  align-items: center;
}

.company a {
  padding: 2px 10px;
  text-decoration: none;
}

.company-info {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.company-logo,
.company-name {
  padding: 0 5px;
}

.authentication {
  display: flex;
  justify-content: center;
  align-items: center;
}

.authentication a,
.logout {
  color: white;
  padding: 2px 10px;
  text-decoration: none;
}

.logout {
  cursor: pointer;
}
</style>