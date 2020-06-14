<template>
  <div
    v-waypoint="{ active: true, callback: animateBars }"
    :style="checkStyle()"
    class="experience-bar"
  ></div>
</template>

<script>
export default {
  name: 'ExperienceBar',

  props: {
    lang: { type: String, default: '' },
    percentage: { type: Number, default: 0 }
  },

  data() {
    return {
      shown: false
    };
  },

  methods: {
    checkStyle() {
      if (this.shown) {
        return { width: this.percentage + '%' };
      } else {
        return { width: '0px' };
      }
    },

    animateBars({ going }) {
      if (going === this.$waypointMap.GOING_IN) {
        this.shown = true;
      }
    }
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
