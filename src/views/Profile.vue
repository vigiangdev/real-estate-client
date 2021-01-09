<template>
  <div v-if="user" class="container m-auto py-6">
    <div>
      <h2 class="text-3xl">User Profile</h2>
      <ul>
        <li v-if="user.name">Name: {{ user.name }}</li>
        <li v-if="user.email">Email: {{ user.email }}</li>
      </ul>
    </div>
    <div class="my-4">
      <h2 class="text-3xl">Saved Properties</h2>
      <ul>
        <li v-for="(listing, index) in user.favoriteListings" v-bind:key="index">{{ listing }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["getProfile"])
  },
  async created() {
    const user = await this.getProfile();
    this.name = user.name;
    this.email = user.email;
  }
};
</script>

<style scoped>
</style>
