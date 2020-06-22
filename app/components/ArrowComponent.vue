<template>
  <Arrow v-scroll-to="'#first-element'" class="arrow"></Arrow>
</template>

<script>
import Arrow from '~/static/svg/arrow.svg?inline';

export default {
  name: 'ArrowComponent',
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
        transform: rotate(0deg) scale(1) translateX(-50%)
        transform-origin: 50% 0

    10%
        transform: rotate(2deg) translateX(-50%)

    20%,
    40%,
    60%
        transform: rotate(-4deg) translateX(-50%)

    30%,
    50%,
    70%
        transform: rotate(4deg) scale(1.1) translateX(-50%)

    80%
        transform: rotate(-2deg) translateX(-50%)

    90%
        transform: rotate(2deg) translateX(-50%)


@keyframes bounce-in-top
    0%
        transform: translateY(-500px) translateX(-50%)
        animation-timing-function: ease-in
        opacity: 0
    38%
        transform: translateY(0) translateX(-50%)
        animation-timing-function: ease-out
        opacity: 1
    55%
        transform: translateY(-65px) translateX(-50%)
        animation-timing-function: ease-in
        opacity: 1
    72%
        transform: translateY(0) translateX(-50%)
        animation-timing-function: ease-out
        opacity: 1
    81%
        transform: translateY(-28px) translateX(-50%)
        animation-timing-function: ease-in
        opacity: 1
    90%
        transform: translateY(0) translateX(-50%)
        animation-timing-function: ease-out
        opacity: 1
    95%
        transform: translateY(-8px) translateX(-50%)
        animation-timing-function: ease-in
        opacity: 1
    100%
        transform: translateY(0) translateX(-50%)
        animation-timing-function: ease-out
        opacity: 1
</style>
