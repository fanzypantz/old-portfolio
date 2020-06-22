<template>
  <div
    :style="{ width: isActive ? percentage + '%' : '0px' }"
    class="experience-bar"
  ></div>
</template>

<script>
export default {
  name: 'ExperienceBar',

  props: {
    isActive: { type: Boolean, default: false },
    lang: { type: String, default: '' },
    percentage: { type: Number, default: 0 }
  },

  data() {
    return {
      shown: false
    };
  }
};
</script>

<style lang="sass">
.experience-bar
    position: absolute
    top: 0
    left: 0
    height: 100%
    background-color: $bg-alternative-light
    transition: width 1s ease-in-out 1s
</style>
