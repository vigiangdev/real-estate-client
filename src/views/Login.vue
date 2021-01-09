<template>
  <div class="login-view">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/Authentication/LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  padding-top: 5rem;
}
</style>