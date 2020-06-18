<template>
  <div class="hero-container">
    <h3 class="hero-text">
      Hi, I am Andreas Halvorsen Tollånes, I do web stuff
    </h3>
    <h1 class="hero hero01">Front End Developer</h1>
    <h1 class="hero hero02">3D Designer</h1>
    <h1 class="hero hero03">Programmer</h1>
    <h3 class="hero-text">
      I also dabble in architectural visualisations and game design
    </h3>
  </div>
</template>
<script>
export default {
  name: 'HeroComponent'
};
</script>
<style lang="sass">

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
  mix-blend-mode: color-dodge


  .hero
    opacity: 0
    font-size: 4rem
    font-weight: 300
    font-family: $font-family


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

    100%
        padding-left: 40px
        border-left: 4px solid $bg-alternative

@function decimal($v)
    @if (type_of($v) != number OR unit($v) != "%")
        @error "decimal: `#{$v}` is not a percent"
    @return $v / 100%

@media (max-width: $breakpoint-laptop-L)

  .hero-container
    mix-blend-mode: color-dodge
    -webkit-font-smoothing: antialiased


@media (max-height: $breakpoint-tablet-height)

  .hero-container
    .hero,
    .hero-text
      margin: 5px 0

    .hero-text:first-of-type
      margin: 0 0 5px 0

    .hero-text:last-of-type
      margin: 5px 0 0 0


@media (max-height: $breakpoint-mobile-L-height)

  .hero-container
    .hero
      font-size: 2em
    .hero-text
      font-size: 1em

@media (max-width: $breakpoint-mobile-L)

  @keyframes border-fade
    0%
      padding-left: 0
      border-left: 0 solid $bg-alternative

    100%
      padding-left: 10px
      border-left: 4px solid $bg-alternative


@media (max-width: $breakpoint-mobile-M)

  .hero-container
    left: 0
</style>
