<template>
  <form @submit="sendMail" method="post">
    {{ errors }}
    <div class="form-group">
      <label for="name">Name</label>
      <input id="name" v-model="name" type="text" minlength="4" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" />
    </div>
    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" v-model="message" minlength="4"></textarea>
    </div>
    <button type="submit">Send</button>
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
      }
      console.log('errors: ', this.errors);
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
.experience-bar
  position: absolute
  top: 0
  left: 0
  height: 100%
  background-color: $bg-alternative-light
  transition: width 1s ease-in-out 1s
</style>
