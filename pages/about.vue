<template>
  <div id="first-element" class="about-container">
    <div class="centered-content about-content">
      <Experience
        :lang-experience="langExperience"
        :name="'Language Experience'"
      />
      <div class="about-description">
        <p>
          I'm a newly educated front-end developer that has a passion for the
          creative arts.
        </p>
        <p>
          I create experiences and amazing visuals in everything from web design
          to game development.
        </p>
        <p>
          My specializations are in front-end development and design plus CGi
          architectural visualizations.
        </p>
      </div>
      <Experience
        :lang-experience="fieldExperience"
        :name="'Field Experience'"
      />
    </div>
  </div>
</template>

<script>
import Experience from '../components/Experience';

export default {
  components: { Experience },

  data() {
    return {
      langExperience: {
        Javascript: 70,
        PHP: 50,
        Python: 50,
        'c++': 25,
        'HTML/CSS': 80
      },
      fieldExperience: {
        'Front-End': 55,
        'Back-End': 60,
        '3D Design': 75,
        'Game Development': 50,
        'Video Editing/Compositing': 40
      }
    };
  },

  created() {},

  methods: {}
};
</script>

<style lang="sass">
.about-container
  position: relative
  min-height: 100vh

.about-content
  display: flex

.about-description
  width: 500px
  margin: 52px 50px 0 50px
  padding: 0 50px
  border-left: 3px solid $bg-alternative
  border-right: 3px solid $bg-alternative
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center

  p
    font-size: 16px
    text-align: center
    color: $bg-alternative
</style>
