<template>
  <v-overlay v-if="isActive">
    <scale-loader :color="$discord_color" />
  </v-overlay>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components :{
    ScaleLoader: () => import('vue-spinner/src/ScaleLoader.vue')
  },
  computed: {
    ...mapState('loading', [
      'isActive'
    ])
  }
}
</script>
