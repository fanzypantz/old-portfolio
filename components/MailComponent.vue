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
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MailComponent',

  data() {
    return {
      errors: {},
      url: 'http://localhost:3000/api/contact',
      name: '',
      email: '',
      message: ''
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
          this.name = '';
          this.email = '';
          this.message = '';
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

    &:focus
      outline: none
      border: none
      border-bottom: 2px solid $bg-alternative

@media (max-width: $breakpoint-tablet)
  .centered-content
    width: 100%

  .mail-form
    width: 100%
</style>
