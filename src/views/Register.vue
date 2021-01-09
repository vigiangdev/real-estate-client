<template>
  <div class="register-view">
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from "@/components/Authentication/RegisterForm.vue";
export default {
  components: {
    RegisterForm,
  },
};
</script>

<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  padding-top: 5rem;
}
</style>