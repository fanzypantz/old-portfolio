<template>
  <transition-group
    name="fade"
    enter-active-class="grow"
    leave-active-class="shrink"
    class="design-container"
  >
    <div
      :ref="'design' + design.id"
      v-for="(design, index) in designs"
      v-bind:key="design.id"
      v-bind:class="[
        expanded === design.id ? 'expanded-container' : '',
        isCollapsed(design.id) ? 'collapsed-container' : '',
        'design-index'
      ]"
      v-bind:style="{
        height: getHeight(design.id)
      }"
    >
      <div
        @click="toggleDesignView($event, index)"
        class="design-container-image"
      >
        <img
          @click="(e) => e.preventDefault()"
          :src="getImageSrc(design.index_image.url)"
          alt=""
        />
        <div
          v-bind:class="[
            showDescription(design.id) ? 'expanded-description' : '',
            'design-description'
          ]"
        >
          <n-link
            :to="{ name: 'designs-id', params: { id: design.id } }"
            class="design-link"
          >
          </n-link>
          <div
            v-html="$md.render(removeLinks(design.content))"
            class="content"
          ></div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    designs: Array
  },

  data() {
    return {
      designHeight: null,
      expanded: null,
      collapsedElements: [],
      timeOut: 500
    };
  },

  methods: {
    getHeight(id) {
      if (this.expanded === id && this.designHeight !== null) {
        return this.designHeight + 'px';
      } else {
        return '';
      }
    },

    getImageSrc(url) {
      return (process.env.IMAGE_URL || 'http://localhost:1337') + url;
    },

    showDescription(id) {
      return this.designHeight !== null && this.expanded === id;
    },

    fixLinks(content) {
      return content.replace(
        /!\[text\]\(\/uploads\//g,
        '![text](' +
          (process.env.IMAGE_URL || 'http://localhost:1337') +
          '/uploads/'
      );
    },

    removeLinks(content) {
      return content.replace(/!\[text\]\(\/uploads\/\b[\w-]{32}\b.jpg\)/g, '');
    },

    isCollapsed(id) {
      return this.collapsedElements.includes(id);
    },

    toggleDesignView(e, index) {
      e.preventDefault();
      const elementData = this.designs[index];
      const currentSub = (index + 1) % 4;
      if (this.expanded === null) {
        const clickedElement = this.$refs['design' + elementData.id][0];
        const image = clickedElement.querySelector('IMG');

        // If its not the third index or the first entry
        if (currentSub !== 0) {
          switch (currentSub) {
            case 3:
              this.collapsedElements.push(this.designs[index - 1].id);
              this.collapsedElements.push(this.designs[index - 2].id);
              break;
            case 2:
              if (this.designs[index + 1] !== undefined) {
                this.collapsedElements.push(this.designs[index + 1].id);
              }
              this.collapsedElements.push(this.designs[index - 1].id);
              break;
            default:
              if (this.designs[index + 1] !== undefined) {
                this.collapsedElements.push(this.designs[index + 1].id);
              }
              if (this.designs[index + 2] !== undefined) {
                this.collapsedElements.push(this.designs[index + 2].id);
              }
              break;
          }
          this.expanded = elementData.id;

          setTimeout(() => {
            clickedElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'start'
            });
            const aspectRatio = image.naturalWidth / image.naturalHeight;
            this.designHeight = (window.innerWidth * 0.8) / aspectRatio;
          }, this.timeOut);
        } else {
          this.expanded = elementData.id;
          const aspectRatio = image.naturalWidth / image.naturalHeight;
          this.designHeight = (window.innerWidth * 0.8) / aspectRatio;
          setTimeout(() => {
            clickedElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center'
            });
          }, this.timeOut);
        }
      } else {
        // If its already open close then call this function again
        // eslint-disable-next-line no-lonely-if
        const clickedElement = this.$refs['design' + elementData.id][0];
        if (this.expanded === elementData.id) {
          this.designHeight = null;
          setTimeout(() => {
            this.expanded = null;
            this.collapsedElements = [];
            clickedElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center'
            });
          }, this.timeOut);
        } else {
          this.designHeight = null;
          setTimeout(() => {
            this.expanded = null;
            this.collapsedElements = [];
            // Call the function again to open the new one
            if (currentSub === 0) {
              setTimeout(() => {
                this.toggleDesignView(e, index);
              }, this.timeOut);
            } else {
              this.toggleDesignView(e, index);
            }
          }, this.timeOut);
        }
      }
    }
  }
};
</script>

<style lang="sass">
$ease-timer: 500ms

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
    opacity: 1
    transition: width $ease-timer ease, height $ease-timer ease, opacity $ease-timer ease, margin-right $ease-timer ease

    &:nth-child(-n+3)
      margin-top: 0

    &:nth-child(4n+3)
      margin-right: 0

    &:nth-child(4n+4)
      margin-right: 0
      width: 100%

    .design-container-image
      position: relative
      height: 100%
      width: 100%

    .design-description
      width: 100%
      height: 0
      justify-content: center
      align-items: center
      background-color: rgba(0, 0, 0, 0.50)
      position: absolute
      bottom: 0
      left: 0
      opacity: 0
      pointer-events: none
      display: flex
      transition: height $ease-timer ease, opacity $ease-timer ease

      .content
        font-size: 20px
        line-height: 20px
        width: 80%
        height: 40px
        overflow: hidden

    .expanded-description
      opacity: 1
      max-height: 200px
      height: 20%
      pointer-events: all

    img
      height: 100%
      width: 100%
      object-fit: cover
      box-shadow: 0 0 8px 0 rgba(0,0,0, 0.5)

  .expanded-container
    width: 100%
    margin-right: 0

  .collapsed-container
    opacity: 0
    width: 0
    margin-right: 0

  @keyframes fade-out
    0%
      width: calc((80vw / 3) - (20px / 3))
      opacity: 1
    100%
      width: 0
      opacity: 0

  .shrink
    transform-origin: center
    animation: fade-out 5000ms ease-in-out normal

  .grow
    transform-origin: center
    animation: fade-out 5000ms ease-in-out reverse
</style>
