<template>
  <div class="container">
    <h1>Error {{ error.statusCode }}</h1>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Go Home</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  layout: 'errorLayout'
};
</script>

<style lang="sass">
body
  min-height: 100vh !important


.container
  height: 100vh
  width: 100vw
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
</style>
