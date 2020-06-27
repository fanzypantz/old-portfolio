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
      <SpinnerComponent
        class="spinner"
        v-if="loadingImage && expanded === design.id"
      />
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
          @load="loadingImageAnimation(design.id, index)"
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
          <div class="design-buttons">
            <button @click.stop="toggleFullScreen(design.id)" class="btn">
              Full VIew
            </button>

            <a
              @click.stop=""
              v-if="design.codeLink"
              :href="design.codeLink"
              class="btn"
              target="_blank"
              >View Code</a
            >
            <a
              @click.stop=""
              v-if="design.liveLink"
              :href="design.liveLink"
              class="btn"
              target="_blank"
              >View Live</a
            >
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import SpinnerComponent from '../components/SpinnerComponent';

export default {
  components: {
    SpinnerComponent
  },

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
      hovering: null,
      loadingImage: false
    };
  },

  methods: {
    handleMouseOver(id) {
      this.hovering = id;
    },

    handleMouseOut() {
      this.hovering = null;
    },

    expandImage(image, clickedElement) {
      // Wait for css animation to finish before getting image width
      setTimeout(() => {
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        this.designHeight = (window.innerWidth * 0.8) / aspectRatio;

        setTimeout(() => {
          if (this.designHeight > window.innerHeight) {
            clickedElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            return;
          }
          clickedElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, this.timeOut);
      }, this.timeOut);
    },

    loadingImageAnimation(id, index) {
      if (id !== this.expanded) {
        return;
      }
      const currentSub = (index + 1) % 4;
      const elementData = this.designs[index];
      const clickedElement = this.$refs['design' + elementData.id][0];
      const image = clickedElement.querySelector('IMG');

      this.loadingImage = false;
      this.expandImage(image, clickedElement);
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

    async toggleDesignView(e, index) {
      e.preventDefault();
      const elementData = this.designs[index];
      const currentSub = (index + 1) % 4;
      if (this.expanded === null) {
        this.openDesign(currentSub, index, elementData);
      } else if (this.expanded === elementData.id) {
        await this.closeDesign();
        this.scrollIntoViewClosed(currentSub, elementData);
      } else {
        await this.closeDesign();
        this.toggleDesignView(e, index);
      }

      // TODO: Add inn the closing before open
      // Make async
    },

    openDesign(currentSub, index, elementData) {
      return new Promise((resolve) => {
        this.loadingImage = true;
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
          // Expand the clicked image at the same time
          this.expanded = elementData.id;
        } else {
          this.expanded = elementData.id;
        }
        setTimeout(() => {
          resolve(true);
        }, this.timeOut);
      });
    },

    closeDesign() {
      return new Promise((resolve) => {
        this.designHeight = null;
        // Delay until the height has been closed
        setTimeout(() => {
          this.expanded = null;
          this.collapsedElements = [];
          resolve(true);
        }, this.timeOut);
      });
    },

    scrollIntoViewClosed(currentSub, elementData) {
      const clickedElement = this.$refs['design' + elementData.id][0];
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

.design-buttons
  display: flex
  width: 100%
  margin: 0 auto
  justify-content: center
  align-items: center

  .btn
    margin-right: 15px !important

    &:last-child
      margin-right: 0 !important

.spinner
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  z-index: 200

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
  .list-complete-enter-active
    transform-origin: center
    animation: list-complete-anim $ease-timer ease forwards

  .list-complete-leave-active
    transform-origin: center
    animation: list-complete-anim $ease-timer ease backwards


  @keyframes list-complete-anim
    0%
      opacity: 0
      transform: scale(0)
    100%
      opacity: 1
      transform: scale(1)

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

  .design-buttons
    flex-direction: column

    .btn
      width: 100% !important
      margin-right: 0 !important

@media (max-width: $breakpoint-mobile-L)

  .design-container
    width: 90%

  .design-index .design-description .content
    width: 90%
    font-size: 14px
    line-height: 14px
</style>
