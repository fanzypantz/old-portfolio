<template>
  <transition-group name="page-transition-header" class="main-container">
    <div v-if="$store.state.openPage" :key="0" class="main-header">
      <NavComponent @togglePageTransition="togglePageTransition" />

      <BlobsComponent />

      <ArrowComponent />

      <HeroComponent />
    </div>
    <nuxt v-if="$store.state.openPage" :key="1" />
  </transition-group>
</template>

<script>
import ArrowComponent from '../components/ArrowComponent';
import BlobsComponent from '../components/BlobsComponent';
import HeroComponent from '../components/HeroComponent';
import NavComponent from '../components/NavComponent';
import categoriesQuery from '~/apollo/queries/category/categories';

export default {
  components: {
    NavComponent,
    HeroComponent,
    BlobsComponent,
    ArrowComponent
  },

  data() {
    return {
      categories: [],
      showMenu: false,
      delay: 1000
    };
  },

  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery
    }
  },

  mounted() {
    this.$store.commit('setOpenPage', true);
  },

  methods: {
    togglePageTransition() {
      setTimeout(() => {
        this.$store.commit('setOpenPage', true);
      }, this.delay);
    }
  },

  head() {
    return {
      title: 'Andreas Tollånes - A Personal Portfolio'
    };
  }
};
</script>

<style lang="sass">

html
  font-family: 'Inconsolata', monospace
  color: $font-colour
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

h1, h2, h3, h4, h5
  font-family: orator-std, monospace

a
  color: $font-colour
  text-decoration: none

  &:hover
    color: $bg-alternative

  &:visited
    color: $font-colour

.content a
  color: $bg
  &:hover
    color: $bg-alternative-light

li
  list-style: none

*,
*:before,
*:after
  box-sizing: border-box
  margin: 0


body
  background-color: $bg
  min-height: 200vh

button, .btn
  font-family: $font-family
  text-transform: uppercase
  font-weight: 500
  font-size: 16px
  letter-spacing: 3px
  display: flex
  justify-content: center
  align-items: center
  color: $font-colour
  box-shadow: 0 0 10px rgba(109, 146, 169, 0.4)
  border: none
  background-color: $bg-alternative
  line-height: 40px
  text-align: center
  height: 40px
  padding: 0 20px
  transition: transform 250ms ease-in-out

  &:hover
    cursor: pointer
    color: $bg-alternative
    background-color: $hover
    transform: scale(1.05)

  &:focus
    outline: none

  &:hover .button-icon
    filter: invert(100)

.main-container
  width: 100%
  overflow-x: hidden
  position: relative

.centered-content
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

.main-header
  z-index: 2
  overflow: hidden
  position: relative
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 100vh

.bounce-enter-active
  animation: bounce-in .8s

.bounce-leave-active
  animation: bounce-out .5s

@keyframes bounce-in
  0%
    transform: scale(0)
  50%
    transform: scale(1.5)
  100%
    transform: scale(1)

@keyframes bounce-out
  0%
    transform: scale(1)
  50%
    transform: scale(1.5)
  100%
    transform: scale(0)

.page-open-animation
  animation: page-open 1000ms ease forwards

.page-close-animation
  animation: page-open 1000ms ease reverse

@keyframes page-open
  0%
    opacity: 0
    max-height: 0px
  99%
    max-height: 500vh
  100%
    opacity: 1
    max-height: unset

.page-transition-header-enter-active
  animation: page-open-header 1000ms ease forwards

.page-transition-header-leave-active
  animation: page-open-header 1000ms ease reverse

@keyframes page-open-header
  0%
    opacity: 0
    height: 0px
  100%
    opacity: 1
    height: 100vh

@media (max-width: $breakpoint-tablet)
  .main-header
    margin-bottom: 200px
</style>
