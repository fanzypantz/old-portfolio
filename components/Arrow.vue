<template>
  <Arrow v-scroll-to="'#first-element'" class="arrow"></Arrow>
</template>

<script>
import Arrow from '~/static/svg/arrow.svg?inline';

export default {
  name: 'Arrow',
  components: { Arrow }
};
</script>

<style lang="sass">


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
</style>
