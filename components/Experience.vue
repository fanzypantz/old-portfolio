<template>
  <div class="experience-container">
    <h2 class="experience-title">{{ name }}</h2>
    <div v-for="(percentage, lang) in langExperience" class="experience">
      <div
        v-bind:style="{ width: percentage + '%' }"
        class="experience-bar"
      ></div>
      <p class="language-name">{{ lang }}</p>
    </div>
    <div class="beginner">
      <div class="small-line"></div>
      <p class="experience-text">Complete Beginner</p>
    </div>
    <div class="master">
      <div class="small-line"></div>
      <p class="experience-text">Cant' even improve more</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Experience',
  props: {
    langExperience: {},
    name: {}
  }
};
</script>
<style lang="sass">
.experience-container
  position: relative
  width: 340px

.experience
    position: relative
    width: 100%
    background-color: $bg-alternative
    margin-bottom: 5px

.experience-title
    text-align: center
    color: $bg-alternative
    margin-bottom: 20px

.experience-bar
    position: absolute
    top: 0
    left: 0
    height: 100%
    background-color: $bg-alternative-light

.language-name
    position: relative
    z-index: 1
    font-family: $font-family-secondary
    width: 100%
    text-align: center
    margin: 0
    line-height: 35px
    text-transform: uppercase

.small-line
  height: 15px
  border-left: 4px solid $bg-alternative

.experience-text
  font-size: 16px
  color: $bg-alternative
  text-align: center

.beginner
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  position: absolute
  bottom: 0
  left: 0
  transform: translate(calc(-50% + 2px), 100%)

.master
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  position: absolute
  bottom: 0
  right: 0
  transform: translate(calc(50% - 2px), 100%)
</style>
