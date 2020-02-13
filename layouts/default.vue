<template>
  <div class="main-container">
    <div class="main-header">
      <div
        v-bind:style="{
          transform: 'scale(' + blobHeight() + ')'
        }"
        class="blob-container"
      >
        <Blob01 class="blob"></Blob01>
        <Blob02 class="blob blob2"></Blob02>
        <Blob03 class="blob blob3"></Blob03>
        <Blob04 class="blob blob4"></Blob04>
        <Blob05 class="blob blob5"></Blob05>
        <Blob06 class="blob blob6"></Blob06>
      </div>

      <div class="hero-container">
        <h3 class="hero-text">
          Hi I am Andreas Halvorsen Tollånes, I do web stuff
        </h3>
        <h1 class="hero hero01">Front End Developer</h1>
        <h1 class="hero hero02">3D Designer</h1>
        <h1 class="hero hero03">Programmer</h1>
        <h3 class="hero-text">
          I also dabble in architectural visualisations and game design
        </h3>
      </div>
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
      categories: [],
      viewPortHeight: null,
      viewPortWidth: null
    };
  },

  created() {
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      this.viewPortHeight = window.innerHeight;
      // eslint-disable-next-line nuxt/no-globals-in-created
      this.viewPortWidth = window.innerWidth;
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('resize', this.setViewPortHeight);
    }
  },

  methods: {
    blobHeight() {
      if (this.viewPortHeight !== null && this.viewPortWidth !== null) {
        if (this.viewPortHeight < this.viewPortWidth) {
          return this.viewPortHeight / 1000;
        } else {
          return this.viewPortWidth / 1000;
        }
      } else {
        return 1;
      }
    },

    setViewPortHeight() {
      this.viewPortHeight = window.innerHeight;
      this.viewPortWidth = window.innerWidth;
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
  width: 100%
  overflow-x: hidden
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

.hero-container
  color: $bg-alternative
  position: absolute
  top: 50%
  left: 10%
  transform: translateY(-50%)
  border-left: 0 solid $bg-alternative
  padding-left: 0
  z-index: 2
  animation: border-fade 0.4s ease 3s forwards

  .hero
    opacity: 0
    font-size: 4rem
    font-weight: 300
    font-family: 'Inconsolata', monospace

  .hero01
    animation: hero-text 1s ease 1.7s forwards
  .hero02
    animation: hero-text 1s ease 1.8s forwards
  .hero03
    animation: hero-text 1s ease 1.9s forwards

  .hero-text
    opacity: 0
    text-transform: uppercase

    &:first-of-type
      margin-bottom: 40px
      animation: hero-text 1s ease 1.6s forwards

    &:last-of-type
      margin-top: 40px
      animation: hero-text 1s ease 2s forwards

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
  70%
    padding-left: 60px
    border-left: 6px solid $bg-alternative
  100%
    padding-left: 40px
    border-left: 4px solid $bg-alternative

@function decimal($v)
  @if (type_of($v) != number OR unit($v) != "%")
    @error "decimal: `#{$v}` is not a percent"
  @return $v / 100%


.blob-container
  transform-origin: top right
  position: absolute
  top: calc(100% / 100)
  right: 0
  width: 500px
  height: 500px

.blob
  position: absolute
  transform: translateY(-100vh)
  top: -69%
  right: -61%
  filter: drop-shadow($blob-shadow)
  animation: blob-animation 1s ease 3.8s forwards
  path
    fill: $bg

.blob2
  top: 37%
  right: 44%
  animation: blob-animation 1s ease 4s forwards

.blob3
  top: -28%
  right: 89%
  animation: blob-animation 1s ease 4.2s forwards
  path
    fill: $bg-alternative

.blob4
  top: -43%
  right: -33%
  animation: blob-animation 1s ease 3.4s forwards
  path
    fill: $bg-alternative-light

.blob5
  top: -5%
  right: -5%
  animation: blob-animation 1s ease 4.4s forwards
  path
    fill: $bg-medium

.blob6
  top: -30%
  right: -19%
  animation: blob-animation 1s ease 3.6s forwards
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
