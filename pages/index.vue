<template>
  <div class="index-container">
    <div class="main-header">
      <h1>Work In Progress!</h1>
      <h2>SoonTM</h2>

      <div class="design-sort">
        <h1 class="sort-title">Sort By</h1>
        <button
          @click="sortDesigns('Website')"
          v-bind:class="[
            'btn',
            'sort-button',
            currentType === 'Website' ? 'selected' : ''
          ]"
        >
          Web Design
        </button>
        <button
          @click="sortDesigns('3D')"
          v-bind:class="[
            'btn',
            'sort-button',
            currentType === '3D' ? 'selected' : ''
          ]"
        >
          3D Design
        </button>
      </div>
    </div>

    <Designs :designs="designs"> </Designs>
  </div>
</template>

<script>
import designsQuery from '~/apollo/queries/design/designs';
import Designs from '~/components/Designs';

export default {
  components: {
    Designs
  },

  data() {
    return {
      designs: [],
      currentType: null,
      designsBackup: null
    };
  },

  created() {
    this.designsBackup = this.designs;
  },

  methods: {
    sortDesigns(type) {
      if (type && (this.currentType === null || this.currentType !== type)) {
        this.currentType = type;
        this.designs = this.designsBackup.filter(
          (design) => design.category.name === type
        );
      } else {
        this.designs = this.designsBackup;
        this.currentType = null;
      }
    }
  },

  apollo: {
    designs: {
      prefetch: true,
      query: designsQuery,
      variables() {
        return { id: parseInt(this.$route.params.id) };
      }
    }
  }
};
</script>

<style lang="sass">
.index-container
  position: relative

.main-header
  position: relative
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 100vh
  border-bottom: 2px solid $bg-alternative
  margin-bottom: 150px

.design-sort
  width: 80%
  display: flex
  justify-content: center
  align-items: center
  flex-wrap: wrap
  position: absolute
  bottom: -140px

  .sort-button
    color: $font-colour
    background-color: $bg
    width: 300px
    margin: 0 5px

    &:hover
      background-color: $bg-alternative-light

  .selected
    background-color: $bg-alternative

  .sort-title
    margin: 20px 0
    font-family: 'Inconsolata', monospace
    font-weight: 200
    color: $bg-alternative
    text-align: center
    width: 100%
</style>
