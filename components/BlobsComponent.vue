<template>
  <div
    v-bind:style="{
      transform: 'scale(' + blobHeight + ')'
    }"
    class="blob-container"
  >
    <Blob01 class="blob"></Blob01>
    <Blob02 class="blob blob2"></Blob02>
    <Blob03 class="blob blob3"></Blob03>
    <Blob04 class="blob blob4"></Blob04>
    <Blob05 class="blob blob5"></Blob05>
    <Blob06 class="blob blob6"></Blob06>
  </div>
</template>
<script>
import Blob01 from '~/static/svg/blob01.svg?inline';
import Blob02 from '~/static/svg/blob02.svg?inline';
import Blob03 from '~/static/svg/blob03.svg?inline';
import Blob04 from '~/static/svg/blob04.svg?inline';
import Blob05 from '~/static/svg/blob05.svg?inline';
import Blob06 from '~/static/svg/blob06.svg?inline';

export default {
  name: 'BlobsComponent',
  components: { Blob01, Blob02, Blob03, Blob04, Blob05, Blob06 },

  data() {
    return {
      viewPortHeight: null,
      viewPortWidth: null
    };
  },

  created() {
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      this.viewPortHeight = window.innerHeight;
      // eslint-disable-next-line nuxt/no-globals-in-created
      this.viewPortWidth = window.innerWidth;
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('resize', this.setViewPortHeight);
    }
  },

  methods: {
    blobHeight() {
      if (this.viewPortHeight !== null && this.viewPortWidth !== null) {
        if (this.viewPortHeight < this.viewPortWidth) {
          return this.viewPortHeight / 1000;
        } else {
          return this.viewPortWidth / 1000;
        }
      } else {
        return 1;
      }
    },

    setViewPortHeight() {
      this.viewPortHeight = window.innerHeight;
      this.viewPortWidth = window.innerWidth;
    }
  }
};
</script>
<style lang="sass">



.blob-container
    transform-origin: top right
    position: absolute
    top: calc(100% / 100)
    right: 0
    width: 500px
    height: 500px

.blob
    position: absolute
    transform: translateY(-1000px)
    top: -69%
    right: -61%
    //filter: drop-shadow($blob-shadow)
    animation: blob-animation 1s ease 3.4s forwards, float-2 12s ease 4.4s infinite

    path
        fill: $bg-alternative-light

.blob2
    top: 37%
    right: 44%
    animation: blob-animation 1s ease 3.6s forwards, float 12s ease 4.6s infinite

    path
        fill: $bg

.blob3
    top: -28%
    right: 89%
    animation: blob-animation 1s ease 3.8s forwards, float-2 12s ease 4.8s infinite

    path
        fill: $bg-medium

.blob4
    top: -43%
    right: -33%
    animation: blob-animation 1s ease 3s forwards, float 12s ease 4s infinite

    path
        fill: $bg-alternative

.blob5
    top: -5%
    right: -5%
    animation: blob-animation 1s ease 4s forwards, float-2 12s ease 5s infinite

    path
        fill: $bg-medium

.blob6
    top: -30%
    right: -19%
    animation: blob-animation 1s ease 3.2s forwards, float 12s ease 4.2s infinite

    path
        fill: $bg

@keyframes blob-animation
    0%
        transform: translateY(-1000px)
    70%
        transform: translateY(50px)
    100%
        transform: translateY(0px)




@keyframes float
    0%
        //filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6))
        transform: translate(0px, 0px)

    50%
        //filter: drop-shadow(0 25px 15px rgba(0,0,0,0.2))
        transform: translate(0px, 20px)

    100%
        //filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6))
        transform: translate(0px, 0px)

@keyframes float-2
    0%
        //filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6))
        transform: translate(0px, 0px)

    50%
        //filter: drop-shadow(0 25px 15px rgba(0,0,0,0.2))
        transform: translate(0px, -20px)

    100%
        //filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6))
        transform: translate(0px, 0px)

@media (max-width: $breakpoint-mobile-L)

    @keyframes border-fade
        0%
            padding-left: 0
            border-left: 0 solid $bg-alternative
        70%
            padding-left: 40px
            border-left: 6px solid $bg-alternative
        100%
            padding-left: 20px
            border-left: 4px solid $bg-alternative
</style>
