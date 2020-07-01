<template>
  <form @submit="sendMail" class="mail-form" method="post">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="name"
        type="text"
        minlength="4"
        placeholder="Your Name"
      />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" placeholder="Your Email" />
      <p v-if="errors.email" class="error">{{ errors.email }}</p>
    </div>
    <div class="form-group">
      <label for="message">Message</label>
      <textarea
        id="message"
        v-model="message"
        minlength="4"
        placeholder="Message"
      ></textarea>
      <p v-if="errors.message" class="error">{{ errors.message }}</p>
    </div>
    <button class="mail-submit" type="submit">Send</button>
    <p v-if="errors.backend" class="error">
      {{ errors.backend }}
    </p>
    <transition name="thanks-transition"
      ><Hearth v-if="showThanks" class="thanks"></Hearth
    ></transition>
  </form>
</template>

<script>
import axios from 'axios';
import Hearth from '~/static/svg/hearth.svg?inline';

export default {
  name: 'MailComponent',

  components: { Hearth },

  data() {
    return {
      errors: {},
      url: 'https://andreas-tollanes.com/api/contact',
      name: '',
      email: '',
      message: '',
      showThanks: false
    };
  },

  methods: {
    async sendMail(event) {
      event.preventDefault();
      this.errors = {};

      if (this.name === '') {
        this.errors.name = 'Name Required';
      }
      if (this.email === '') {
        this.errors.email = 'Email Required';
      }
      if (this.message === '') {
        this.errors.message = 'Message Required';
      }

      if (Object.keys(this.errors).length === 0) {
        const response = await axios.post(this.url, {
          name: this.name,
          email: this.email,
          msg: this.message
        });
        if (response.data.success) {
          this.showThanks = true;
          // Delay the removal until animation has played
          setTimeout(() => {
            this.name = '';
            this.email = '';
            this.message = '';
            this.showThanks = false;
          }, 1100);
        } else {
          this.errors.backend = 'Something happened, please try again.';
        }
      }
    },

    validateEmail(email) {
      // eslint-disable-next-line no-useless-escape
      const re = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>

<style lang="sass">
.mail-form
  position: relative
  width: 500px
  height: 300px

.mail-submit
  margin-top: 10px

.form-group
  display: flex
  flex-direction: column

  .error
    margin-top: 5px
    color: darkred

  input[type=text],
  input[type=email]
    width: 100%
    height: 40px
    border: none
    border-bottom: 2px solid $bg-alternative-light
    border-radius: 0
    padding-left: 20px
    box-sizing: border-box
    font-size: 14px
    font-family: $font-family

    &:focus
      outline: none
      border: none
      border-bottom: 2px solid $bg-alternative


  label
    width: 100%
    font-size: 1.2em
    margin: 10px 0

  textarea
    border: none
    border-bottom: 2px solid $bg-alternative-light
    padding: 20px
    box-sizing: border-box
    width: 100%
    font-size: 14px
    font-family: $font-family


    &:focus
      outline: none
      border: none
      border-bottom: 2px solid $bg-alternative


.thanks
  width: 200px
  height: 200px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  pointer-events: none

.thanks-transition-enter-active
  animation: roll-in-bottom 1000ms ease forwards

.thanks-transition-leave-active
  animation: roll-in-bottom 1000ms ease reverse


@keyframes roll-in-bottom
  0%
    top: 200%
    transform: translate(-50%, -50%) rotate(540deg)
    opacity: 0

  80%
    top: 30%
    transform: translate(-50%, -50%) rotate(-10deg)

  100%
    top: 50%
    transform: translate(-50%, -50%) rotate(0deg)
    opacity: 1


@media (max-width: $breakpoint-tablet)
  .centered-content
    width: 100%

  .mail-form
    width: 100%
</style>
