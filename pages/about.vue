<template>
  <div>
    <div id="first-element" class="about-container">
      <div class="centered-content about-content">
        <ExperienceComponent
          :isActive="isActive"
          :lang-experience="langExperience"
          :name="'Language Experience'"
        />
        <div class="about-description">
          <p>
            I'm a newly educated front-end developer that has a passion for the
            creative arts.
          </p>
          <p>
            I create experiences and amazing visuals in everything from web
            design to game development.
          </p>
          <p>
            My specializations are in front-end development and design plus CGi
            architectural visualizations.
          </p>
        </div>
        <ExperienceComponent
          :isActive="isActive"
          :lang-experience="fieldExperience"
          :name="'Field Experience'"
        />
      </div>
    </div>
    <div class="about-container">
      <div class="centered-content">
        <h2 class="contact-title">Get in touch!</h2>
        <MailComponent></MailComponent>
      </div>
    </div>
  </div>
</template>

<script>
import ExperienceComponent from '../components/ExperienceComponent';
import MailComponent from '../components/MailComponent';

export default {
  components: { ExperienceComponent, MailComponent },

  data() {
    return {
      langExperience: {
        Javascript: 70,
        PHP: 50,
        Python: 50,
        'c++': 25,
        'HTML/CSS': 65
      },
      fieldExperience: {
        'Front-End': 55,
        'Back-End': 60,
        '3D Design': 75,
        'Game Development': 50,
        'Video Editing/Compositing': 40
      },
      isActive: false,
      hasScrolled: false
    };
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    setTimeout(() => {
      this.isActive = true;
      if (!this.hasScrolled) {
        this.$scrollTo('.about-container');
      }
    }, 5000);
  },

  methods: {
    handleScroll(event) {
      if (!this.hasScrolled) {
        this.hasScrolled = true;
      }
    }
  },

  head() {
    return {
      title: 'Andreas Tollånes - About Me'
    };
  }
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

.contact-title
  text-align: center

@media (max-width: 1260px)

  .about-content
    flex-direction: column
    justify-content: center
    align-items: center

  .about-description
    margin: 90px auto 50px auto
    padding: 0 20px

    p
      margin: 5px 0

@media (max-width: $breakpoint-tablet)

  .about-container
    width: 60%
    margin: 0 auto

  .about-content
    width: 100%

  .about-description
    width: 100%
    box-sizing: border-box

@media (max-width: $breakpoint-mobile-L)

  .about-container
    width: 80%

@media (max-width: $breakpoint-mobile-M)

  .about-container
    width: 90%
</style>
