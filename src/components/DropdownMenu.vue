<template>
  <div class="dropdown-menu">
    <div
      class="backdrop"
      v-on:click="showDropdown = false"
      v-if="showDropdown"
    ></div>
    <div class="foreground">
      <button v-on:click="showDropdown = !showDropdown">
        <span v-bind:class="{ active: showDropdown }">
          <slot name="title"></slot>
        </span>
        <i class="material-icons btn-dropdown-icon">{{ iconName }}</i>
      </button>
      <div v-if="showDropdown" class="dropdown-fields">
        <slot name="fields"></slot>
        <button v-on:click="showDropdown = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    iconName() {
      if (this.showDropdown === false) {
        return "expand_more";
      } else {
        return "expand_less";
      }
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
}

.foreground {
  position: relative;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  background-color: teal;
  color: white;
  border: none;
  outline: none;
  z-index: 1;
  width: 100%;
}

.dropdown-fields {
  position: absolute;
  padding: 1.6rem;
  top: 4rem;
  font-size: 1.6rem;
  background-color: white;
  width: 100%;
  box-shadow: 0 0 5px rgb(0, 0, 0, 0.5);
  z-index: 2;
}

@media (min-width: 576px) {
  .dropdown-fields {
    min-width: 250px;
  }
}
</style>