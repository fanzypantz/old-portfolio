<template>
  <div>
    <div>
      <div>
        <n-link
          v-for="design in designs"
          :to="{ name: 'designs-id', params: { id: design.id } }"
          v-bind:key="design.id"
        >
          <div>
            <div v-for="(image, index) in design.images" v-bind:key="index">
              <img
                :src="'http://localhost:1337' + image.url"
                alt=""
                height="100"
              />
            </div>
          </div>
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

  computed: {
    // leftDesignsCount() {
    //   return Math.ceil(this.designs.length / 5)
    // },
    // leftDesigns() {
    //   return this.designs.slice(0, this.leftDesignsCount)
    // },
    // rightDesigns() {
    //   return this.designs.slice(this.leftDesignsCount, this.designs.length)
    // }
  }
}
</script>
