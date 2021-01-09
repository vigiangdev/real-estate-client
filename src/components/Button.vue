<template>
  <div class="button">
    <button
      v-on:mousedown="mouseClick = true"
      v-on:mouseup="mouseClick = false"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mouseClick: false,
    };
  },
};
</script>

<style scoped>
button {
  background-color: teal;
  padding: 0.8rem;
  font-size: 1.6rem;
  color: white;
  width: 100%;
  border: none;
}

@media (min-width: 640px) {
  button {
    width: auto;
  }
}
</style>