<template>
  <Designs :designs="category.designs || []"></Designs>
</template>

<script>
import designsQuery from '~/apollo/queries/design/designs-categories';
import Designs from '~/components/Designs';

export default {
  components: {
    Designs
  },
  data() {
    return {
      category: []
    };
  },

  apollo: {
    category: {
      prefetch: true,

      query: designsQuery,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  }
};
</script>
