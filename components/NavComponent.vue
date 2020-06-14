<template>
  <div class="nav">
    <Hamburger
      id="mobile-menu"
      @click="toggleMenu"
      v-if="!showMenu"
    ></Hamburger>

    <nav v-if="showMenu" @click.self="toggleMenu" class="nav-container">
      <nuxt-link class="btn" to="/">Home</nuxt-link>
      <nuxt-link class="btn" to="/about">About Me</nuxt-link>
      <button @click="toggleMenu" class="btn">Close</button>
    </nav>
  </div>
</template>

<script>
import Hamburger from '~/static/svg/hamburger.svg?inline';

export default {
  name: 'NavComponent',
  components: { Hamburger },

  data() {
    return {
      showMenu: false
    };
  },

  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    closeMenu() {
      if (this.showMenu) {
        this.showMenu = false;
      }
    }
  }
};
</script>

<style lang="sass">

#mobile-menu
    z-index: 201
    position: fixed
    top: 50%
    left: 0
    transform: translateY(-50%)
    transform-origin: left
    transition: transform 250ms ease

    &:hover
        cursor: pointer
        transform: translateY(-50%) scale(1.4)

.nav-container
    z-index: 200
    background-color: $transparent
    position: fixed
    top: 0
    left: 0
    height: 100vh
    width: 200px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    .btn
        background-color: $bg
        color: $bg-alternative
        width: 100%

        &:hover
            background-color: $bg-alternative
            color: $font-colour
</style>
