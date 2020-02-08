<template>
  <div>
    <li v-for="(category, index) in categories" :key="index">
      <router-link
        :to="{ name: 'categories-id', params: { id: category.id } }"
        tag="a"
        >{{ category.name }}
      </router-link>
    </li>

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
  font-family: 'Source Sans Pro'
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box


*,
*:before,
*:after
  box-sizing: border-box
  margin: 0


body
  background-color: $bg

.button--green
  display: inline-block
  border-radius: 4px
  border: 1px solid #3b8070
  color: #3b8070
  text-decoration: none
  padding: 10px 30px


.button--green:hover
  color: #fff
  background-color: #3b8070


.button--grey
  display: inline-block
  border-radius: 4px
  border: 1px solid #35495e
  color: #35495e
  text-decoration: none
  padding: 10px 30px
  margin-left: 15px


.button--grey:hover
  color: #fff
  background-color: #35495e


img
  width: 500px
  height: auto
</style>
