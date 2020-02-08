<template>
  <div class="design-container">
    <div
      :ref="'design' + design.id"
      v-for="(design, index) in designs"
      v-bind:key="design.id"
      v-bind:class="[
        expanded === design.id ? 'expanded-container' : '',
        'design-index'
      ]"
      v-bind:style="{
        height: getHeight(design.id)
      }"
    >
      <div
        @click="toggleDesignView($event, index)"
        v-bind:class="[
          design.expanded ? 'expanded-container-image' : '',
          'design-container-image'
        ]"
      >
        <img
          @click="(e) => e.preventDefault()"
          :src="'http://localhost:1337' + design.index_image.url"
          alt=""
        />
        <n-link
          :to="{ name: 'designs-id', params: { id: design.id } }"
          class="design-link"
        >
        </n-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    designs: Array
  },

  data() {
    return {
      currentFocus: null,
      designHeight: null,
      expanded: null
    };
  },

  methods: {
    getHeight(id) {
      if (this.expanded === id) {
        return this.designHeight + 'px';
      } else {
        return 'calc((80vw / 3) - 10px)';
      }
    },

    toggleDesignView(e, index) {
      e.preventDefault();
      if (this.expanded === null) {
        const elementData = this.designs[index];
        const clickedElement = this.$refs['design' + elementData.id][0];
        const image = clickedElement.querySelector('IMG');
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        this.designHeight = (window.innerWidth * 0.8) / aspectRatio;
        this.expanded = elementData.id;

        // const imageContainer = clickedElement.querySelector(
        //   '.design-container-image'
        // );

        // If its not the third index or the first entry
        const currentSub = (index + 1) % 4;
        if (currentSub !== 0) {
          switch (currentSub) {
            case 3:
              break;
            case 2:
              break;
            default:
              break;
          }
        }
      } else {
        this.designHeight = null;
        this.expanded = null;
      }
    }
  }
};
</script>

<style lang="sass">
.design-container
  display: flex
  flex-wrap: wrap
  width: 80vw
  margin: 0 auto

  .design-index
    cursor: pointer
    margin-top: 10px
    margin-right: 10px
    width: calc((80vw / 3) - (20px / 3))
    height: calc((80vw / 3) - 10px)
    transition: width 250ms ease, height 250ms ease

    &:nth-child(-n+3)
      margin-top: 0

    &:nth-child(4n+3)
      margin-right: 0

    &:nth-child(4n+4)
      margin-right: 0
      width: 100%

    .design-container-image
      height: 100%
      width: 100%
      transition: height 250ms ease

    .design-link
      opacity: 0
      pointer-events: none
      display: none

    img
      height: 100%
      width: 100%
      object-fit: cover
      box-shadow: 0 0 8px 0 rgba(0,0,0, 0.5)

  .expanded-container
    width: 100%
</style>
