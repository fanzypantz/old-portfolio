<template>
  <div>
    <img
      v-for="(image, index) in design.images"
      :src="'http://localhost:1337' + image.url"
      :key="index"
      alt=""
    />
    <h1>{{ design.project_name }}</h1>

    <div>
      <div>
        <div
          id="editor"
          v-if="design.content"
          v-html="$md.render(design.content)"
        ></div>
        <p v-if="design.published_at">
          {{ getDateAsText(design.published_at) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import designQuery from '~/apollo/queries/design/design';
const moment = require('moment');

export default {
  data() {
    return {
      design: {}
    };
  },

  methods: {
    getDateAsText(date) {
      return moment(date).format('MMM Do YY');
    }
  },

  apollo: {
    design: {
      prefetch: true,
      query: designQuery,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  }
};
</script>

<style lang="scss">
img {
  width: 500px;
}
</style>
