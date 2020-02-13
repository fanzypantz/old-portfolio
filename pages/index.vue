<template>
  <div class="index-container">
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

    <Designs
      v-for="n in Math.ceil(designs.length / 7)"
      :designs="designs.slice(7 * n - 7, 7 * n)"
      :key="n"
    >
    </Designs>
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

.design-sort
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  flex-wrap: wrap
  position: absolute
  top: -140px

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
