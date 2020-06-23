<template>
  <div class="experience-container">
    <h2 class="experience-title">{{ name }}</h2>
    <div v-for="(key, lang) in langExperience" class="experience">
      <ExperienceBarComponent
        :isActive="isActive"
        :lang="lang"
        :percentage="key"
      />
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
import ExperienceBarComponent from './ExperienceBarComponent';

export default {
  name: 'Experience',
  components: { ExperienceBarComponent },
  props: {
    isActive: { type: Boolean, default: false },
    langExperience: {
      type: Object,
      default() {
        return {};
      }
    },
    name: { type: String, default: '' }
  },

  methods: {}
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

@media (max-width: 1500px)

  .experience-container
    width: 250px

@media (max-width: 1260px)
  .experience-container
    width: 100%


@media (max-width: $breakpoint-tablet)
  .beginner p
    transform: translateX(50%)

  .master p
    transform: translateX(-50%)
</style>
