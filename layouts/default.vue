<template>
  <div class="main-container">
    <div class="main-header">
      <Navigation />

      <Blobs />

      <Arrow />

      <Hero />
    </div>
    <nuxt />
  </div>
</template>

<script>
import Blobs from '../components/Blobs';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import categoriesQuery from '~/apollo/queries/category/categories';
import Arrow from '~/static/svg/arrow.svg?inline';

export default {
  components: {
    Navigation,
    Hero,
    Blobs,
    Arrow
  },

  data() {
    return {
      categories: [],
      showMenu: false
    };
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


@media (max-width: $breakpoint-tablet)
  .main-header
    margin-bottom: 200px
</style>
