<template>
  <Designs :designs="designs"></Designs>
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
      designs: []
    };
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
