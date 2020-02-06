<template>
  <div>
    <div>
      <div>
        <h1>{{ category.name }}</h1>

        <Designs :designs="category.designs || []"></Designs>
      </div>
    </div>
  </div>
</template>

<script>
import designsQuery from '~/apollo/queries/design/designs-categories'
import Designs from '~/components/Designs'

export default {
  components: {
    Designs
  },
  data() {
    return {
      category: []
    }
  },

  apollo: {
    category: {
      prefetch: true,
      query: designsQuery,
      variables() {
        return { id: this.$route.params.id }
      }
    }
  }
}
</script>
