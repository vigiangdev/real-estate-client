<template>
  <div class="auth-base-template">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.auth-base-template {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem;
  margin: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 6px gray;
  width: 480px;
}

header {
  font-size: 2.5rem;
}

main {
  display: block;
  width: 100%;
  padding-top: 2rem;
}
</style>