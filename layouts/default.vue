<template>
  <div class="main-container">
    <div class="main-header">
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

      <Blobs />

      <Arrow v-scroll-to="'#first-element'" class="arrow"></Arrow>

      <Hero />
    </div>
    <nuxt @click.self="closeMenu" />
  </div>
</template>

<script>
import Blobs from '../components/Blobs';
import Hero from './Hero';
import categoriesQuery from '~/apollo/queries/category/categories';
import Arrow from '~/static/svg/arrow.svg?inline';
import Hamburger from '~/static/svg/hamburger.svg?inline';

export default {
  components: {
    Hero,
    Blobs,
    Arrow,
    Hamburger
  },

  data() {
    return {
      categories: [],
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
  },

  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery
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
  position: relative
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 100vh
  margin-bottom: 150px

@keyframes hero-text
  0%
    opacity: 0
    transform: translateX(60vw)
  70%
    opacity: 0.7
    transform: translateX(-10vw)
  100%
    opacity: 1
    transform: translateX(0vw)

@keyframes border-fade
  0%
    padding-left: 0
    border-left: 0 solid $bg-alternative

  100%
    padding-left: 40px
    border-left: 4px solid $bg-alternative

@function decimal($v)
  @if (type_of($v) != number OR unit($v) != "%")
    @error "decimal: `#{$v}` is not a percent"
  @return $v / 100%

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

.arrow
  z-index: 200
  position: absolute
  bottom: 3%
  left: 50%
  opacity: 0
  animation: bounce-in-top 1.1s forwards

  &:hover
    cursor: pointer
    opacity: 1
    animation: shake-top 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both

@keyframes shake-top
  0%,
  100%
    opacity: 1
    transform: rotate(0deg) scale(1)
    transform-origin: 50% 0

  10%
    transform: rotate(2deg)

  20%,
  40%,
  60%
    transform: rotate(-4deg)

  30%,
  50%,
  70%
    transform: rotate(4deg) scale(1.1)

  80%
    transform: rotate(-2deg)

  90%
    transform: rotate(2deg)


@keyframes bounce-in-top
  0%
    transform: translateY(-500px)
    animation-timing-function: ease-in
    opacity: 0
  38%
    transform: translateY(0)
    animation-timing-function: ease-out
    opacity: 1
  55%
    transform: translateY(-65px)
    animation-timing-function: ease-in
    opacity: 1
  72%
    transform: translateY(0)
    animation-timing-function: ease-out
    opacity: 1
  81%
    transform: translateY(-28px)
    animation-timing-function: ease-in
    opacity: 1
  90%
    transform: translateY(0)
    animation-timing-function: ease-out
    opacity: 1
  95%
    transform: translateY(-8px)
    animation-timing-function: ease-in
    opacity: 1
  100%
    transform: translateY(0)
    animation-timing-function: ease-out
    opacity: 1


@media (max-width: $breakpoint-tablet)


  .main-header
    margin-bottom: 200px

@media (max-width: $breakpoint-mobile-L)

  @keyframes border-fade
    0%
      padding-left: 0
      border-left: 0 solid $bg-alternative
    70%
      padding-left: 40px
      border-left: 6px solid $bg-alternative
    100%
      padding-left: 20px
      border-left: 4px solid $bg-alternative
</style>
