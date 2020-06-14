<template>
  <transition-group name="list-complete" class="design-container">
    <div
      @mouseover="handleMouseOver(design.id)"
      @mouseleave="handleMouseOut"
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
      <transition name="fade">
        <div
          v-if="expanded !== design.id && hovering === design.id"
          class="design-cta"
        >
          <h2 class="design-cta-text">See More</h2>
        </div>
      </transition>
      <transition name="fade">
        <div
          @click="toggleFullScreen(null)"
          v-if="fullScreenImage === design.id"
          class="fullscreen-image"
        >
          <a :href="getImageSrc(design.index_image.url)" target="_blank"
            ><img :src="getImageSrc(design.index_image.url)" alt=""
          /></a>
          <button @click="toggleFullScreen(null)" class="btn fullscreen-button">
            Close View
          </button>
        </div>
      </transition>
      <div
        @click="toggleDesignView($event, index)"
        class="design-container-image"
      >
        <img
          @load="loadedImage(design.id, index)"
          @click="(e) => e.preventDefault()"
          :src="
            getImageSrc(
              design.index_image_small.url,
              design.index_image.url,
              design.id
            )
          "
          alt=""
        />
        <div
          v-bind:class="[
            showDescription(design.id) ? 'expanded-description' : '',
            'design-description'
          ]"
        >
          <div class="design-link">
            <h2>
              {{ design.project_name }}
            </h2>
          </div>
          <div
            v-html="$md.render(removeLinks(design.content))"
            class="content"
          ></div>
          <button @click.stop="toggleFullScreen(design.id)" class="btn">
            Open image
          </button>
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
      timeOut: 250,
      fullScreenImage: null,
      hovering: null
    };
  },

  methods: {
    handleMouseOver(id) {
      this.hovering = id;
    },

    handleMouseOut() {
      this.hovering = null;
    },

    loadedImage(id, index) {
      if (id === this.expanded) {
        const currentSub = (index + 1) % 4;
        const elementData = this.designs[index];
        const clickedElement = this.$refs['design' + elementData.id][0];
        const image = clickedElement.querySelector('IMG');
        if (currentSub !== 0) {
          setTimeout(() => {
            const aspectRatio = image.naturalWidth / image.naturalHeight;
            this.designHeight = (window.innerWidth * 0.8) / aspectRatio;

            setTimeout(() => {
              if (this.designHeight > window.innerHeight) {
                clickedElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              } else {
                clickedElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
              }
            }, this.timeOut);
          }, this.timeOut);
        } else {
          const aspectRatio = image.naturalWidth / image.naturalHeight;
          this.designHeight = (window.innerWidth * 0.8) / aspectRatio;
          setTimeout(() => {
            clickedElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }, this.timeOut);
        }
      }
    },

    getHeight(id) {
      if (this.expanded === id && this.designHeight !== null) {
        return this.designHeight + 'px';
      } else {
        return '';
      }
    },

    getImageSrc(url, fallback, id) {
      // Show a higher rez image if it will be shown
      if (id && fallback && this.expanded === id) {
        return (process.env.IMAGE_URL || 'http://localhost:1337') + fallback;
      } else {
        return (process.env.IMAGE_URL || 'http://localhost:1337') + url;
      }
    },

    showDescription(id) {
      return this.designHeight !== null && this.expanded === id;
    },

    toggleFullScreen(id) {
      this.fullScreenImage = id;
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
        // If its not the third index or the first entry
        if (currentSub !== 0 && window.innerWidth > 768) {
          // Based on the result of the mod calculation you are one
          // out of three columns in the row, they need their own logic
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
        } else {
          this.expanded = elementData.id;
        }
      } else {
        // If its already open close then call this function again
        // eslint-disable-next-line no-lonely-if
        const clickedElement = this.$refs['design' + elementData.id][0];
        if (this.expanded === elementData.id) {
          this.designHeight = null;
          // Delay until the height has been closed
          setTimeout(() => {
            this.expanded = null;
            this.collapsedElements = [];
            // If not full width column delay once more
            if (currentSub !== 0) {
              setTimeout(() => {
                clickedElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
              }, this.timeOut);
            } else {
              clickedElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }
          }, this.timeOut);
        } else {
          this.designHeight = null;
          // Delay until height has been closed
          setTimeout(() => {
            this.expanded = null;
            this.collapsedElements = [];
            // Call the function again to open the new one
            // If not full width column delay once more
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
$ease-timer: 250ms

.design-container
  display: flex
  flex-wrap: wrap
  width: 80vw
  margin: 0 auto 200px auto

  .expanded-container
    width: 100%
    margin-right: 0

  .collapsed-container
    opacity: 0
    width: 0
    margin-right: 0

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter, .fade-leave-to
  opacity: 0

.list-complete-leave-active
  position: absolute

.design-index
  position: relative
  cursor: pointer
  margin-top: 10px
  margin-right: 10px
  width: calc((80vw / 3) - (20px / 3))
  height: calc((80vw / 3) - 10px)
  opacity: 1
  transition: all $ease-timer

  .design-cta
    background-color: $transparent
    z-index: 20
    position: absolute
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    pointer-events: none
    transition: opacity 1s ease

  &:hover
    .design-cta-text
      animation: tracking-in-contract 1s ease forwards

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
    cursor: default
    width: 100%
    height: 0
    display: flex
    justify-content: space-around
    align-items: center
    flex-direction: column
    background-color: $transparent
    position: absolute
    bottom: 0
    left: 0
    opacity: 0
    pointer-events: none
    transition: height $ease-timer ease, opacity $ease-timer ease

    .content
      font-size: 20px
      line-height: 20px
      width: 80%
      max-height: 80%
      overflow: hidden

    p, h2
      text-shadow: $text-shadow


  .expanded-description
    opacity: 1
    height: auto
    max-height: 100%
    pointer-events: all

    .design-link, .btn, .content
      margin: 10px 0

  img
    height: 100%
    width: 100%
    object-fit: cover
    box-shadow: 0 0 8px 0 rgba(0,0,0, 0.2)

  .fullscreen-image
    z-index: 200
    display: flex
    justify-content: center
    align-items: center
    width: 100vw
    height: 100vh
    position: fixed
    top: 0
    left: 0
    background-color: rgba(0,0,0, 0.5)
    animation: fade-in 500ms ease-in-out normal

    img
      object-fit: contain
      height: 100vh
      max-width: 100vw
      width: auto

  .fullscreen-button
    position: absolute
    bottom: 2%
    left: 50%
    transform: translateX(-50%)


@keyframes tracking-in-contract
  0%
    letter-spacing: 1em
    opacity: 0

  40%
    opacity: 0.6

  100%
    letter-spacing: normal
    opacity: 1

@media (min-width: $breakpoint-tablet)
  .list-complete-enter, .list-complete-leave-to
    width: 0 !important
    opacity: 0 !important
    margin: 0 !important

@media (max-width: $breakpoint-tablet)

  .design-container
    margin-bottom: 20px

  .design-index
    width: 100%
    height: 500px
    margin: 20px 0

    .expanded-description .btn,
    .expanded-description .design-link
      text-align: center
      width: 90%
      margin: 5px 0

  .list-complete-enter, .list-complete-leave-to
    height: 0 !important
    opacity: 0 !important
    margin: 0 !important

@media (max-width: $breakpoint-mobile-L)

  .design-container
    width: 90%

  .design-index .design-description .content
    width: 90%
    font-size: 14px
    line-height: 14px
</style>
