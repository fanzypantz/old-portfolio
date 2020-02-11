<template>
  <div class="main-container">
    <!--    <li v-for="(category, index) in categories" :key="index">-->
    <!--      <router-link-->
    <!--        :to="{ name: 'categories-id', params: { id: category.id } }"-->
    <!--        tag="a"-->
    <!--        >{{ category.name }}-->
    <!--      </router-link>-->
    <!--    </li>-->

    <nuxt />
  </div>
</template>

<script>
import categoriesQuery from '~/apollo/queries/category/categories';

export default {
  data() {
    return {
      categories: []
    };
  },
  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery
    }
  }
};
</script>

<style lang="sass">

html
  font-family: 'Inconsolata', monospace
  color: $font-colour
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

h1, h2, h3, h4, h5
  font-family: orator-std, monospace

a
  color: $font-colour
  text-decoration: none

  &:visited
    color: $font-colour

li
  list-style: none

*,
*:before,
*:after
  box-sizing: border-box
  margin: 0


body
  background-color: $bg
  min-height: 200vh

button, .btn
  font-family: 'Inconsolata', monospace
  text-transform: uppercase
  font-weight: 500
  font-size: 16px
  letter-spacing: 3px
  display: flex
  justify-content: center
  align-items: center
  color: $font-colour
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.51)
  border: none
  background-color: $bg-alternative
  line-height: 40px
  text-align: center
  height: 40px
  padding: 0 20px

  &:hover
    cursor: pointer
    color: $bg-alternative
    background-color: $hover

  &:hover .button-icon
    filter: invert(100)
</style>
