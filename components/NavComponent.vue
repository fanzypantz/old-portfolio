<template>
  <transition class="nav" name="nav-fade">
    <Hamburger
      id="mobile-menu"
      @click="toggleMenu"
      v-if="!showMenu"
    ></Hamburger>

    <nav @click="toggleMenu" v-if="showMenu" class="nav-container">
      <nuxt-link class="btn nav-item" to="/"><Home></Home></nuxt-link>
      <nuxt-link class="btn nav-item" to="/about"><Person></Person></nuxt-link>
      <button class="btn nav-item"><Close></Close></button>
    </nav>
  </transition>
</template>

<script>
import Hamburger from '~/static/svg/hamburger.svg?inline';
import Home from '~/static/svg/home.svg?inline';
import Person from '~/static/svg/person.svg?inline';
import Close from '~/static/svg/close.svg?inline';

export default {
  name: 'NavComponent',
  components: { Hamburger, Home, Person, Close },

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
    width: 80px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    transform-origin: left

    .nav-item
        padding: 0
        background-color: $bg-alternative
        width: 100%
        height: 80px
        margin-bottom: 15px
        transition: background-color 250ms ease

        svg
          transition: stroke 250ms ease, fill 250ms ease
          width: 40px
          height: 40px

          stroke: white
          fill: white

        &:hover
          transform: unset
          background-color: $hover

          svg
            stroke: $bg-alternative
            fill: $bg-alternative


.nav-fade-enter-active
  animation: scale-in .5s

.nav-fade-leave-active
  animation: scale-in .5s reverse

@keyframes scale-in
  0%
    opacity: 0
    width: 0px
  50%
    width: 90px
  100%
    opacity: 1
    width: 80px
</style>
