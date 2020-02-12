<template>
  <div class="main-container">
    <div class="main-header">
      <Blob01 class="blob"></Blob01>
      <Blob02 class="blob blob2"></Blob02>
      <Blob03 class="blob blob3"></Blob03>
      <Blob04 class="blob blob4"></Blob04>
      <Blob05 class="blob blob5"></Blob05>
      <Blob06 class="blob blob6"></Blob06>

      <h1 class="hero">Work In Progress!</h1>
      <h2 class="hero">SoonTM</h2>
    </div>
    <nuxt />
  </div>
</template>

<script>
import categoriesQuery from '~/apollo/queries/category/categories';
import Blob01 from '~/static/svg/blob01.svg?inline';
import Blob02 from '~/static/svg/blob02.svg?inline';
import Blob03 from '~/static/svg/blob03.svg?inline';
import Blob04 from '~/static/svg/blob04.svg?inline';
import Blob05 from '~/static/svg/blob05.svg?inline';
import Blob06 from '~/static/svg/blob06.svg?inline';

export default {
  components: {
    Blob01,
    Blob02,
    Blob03,
    Blob04,
    Blob05,
    Blob06
  },

  data() {
    return {
      categories: []
    };
  },

  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery
    }
  }
};
</script>

<style lang="sass">

html
  overflow-x: hidden
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

  &:visited
    color: $font-colour

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
  font-family: 'Inconsolata', monospace
  text-transform: uppercase
  font-weight: 500
  font-size: 16px
  letter-spacing: 3px
  display: flex
  justify-content: center
  align-items: center
  color: $font-colour
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.51)
  border: none
  background-color: $bg-alternative
  line-height: 40px
  text-align: center
  height: 40px
  padding: 0 20px

  &:hover
    cursor: pointer
    color: $bg-alternative
    background-color: $hover

  &:hover .button-icon
    filter: invert(100)

.main-container
  position: relative

.main-header
  position: relative
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 100vh
  border-bottom: 2px solid $bg-alternative
  margin-bottom: 150px

.hero
  z-index: 200


.blob
  position: absolute
  transform: translateY(-100vh)
  top: -36%
  right: -14%
  filter: drop-shadow($blob-shadow)
  animation: blob-animation 1s ease 2.6s forwards
  path
    fill: $bg

.blob2
  top: 20%
  right: 12%
  animation: blob-animation 1s ease 2.2s forwards

.blob3
  top: -10%
  right: 22%
  animation: blob-animation 1s ease 2.4s forwards
  path
    fill: $bg-alternative

.blob4
  top: -22%
  right: -9%
  animation: blob-animation 1s ease 2s forwards
  path
    fill: $bg-alternative-light

.blob5
  top: -3%
  right: -3%
  animation: blob-animation 1s ease 2.8s forwards
  path
    fill: $bg-medium

.blob6
  top: -10%
  right: -5%
  animation: blob-animation 1s ease 3s forwards
  path
    fill: $bg-alternative

@keyframes blob-animation
  0%
    transform: translateY(-100vh)
  70%
    transform: translateY(5vh)
  100%
    transform: translateY(0vh)
</style>
