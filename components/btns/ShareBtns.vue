<template>
  <div class="sharebtn">
    <v-btn
      class="ma-1"
      large
      icon
      :href="`https://twitter.com/intent/tweet?url=${url}`"
      target="_blank"
    >
      <v-icon
        large
        color="#1DA1F2"
      >
        {{ mdiTwitter }}
      </v-icon>
    </v-btn>
    <v-btn
      class="ma-1"
      large
      icon
      :href="`https://social-plugins.line.me/lineit/share?url=${url}`"
      target="_blank"
    >
      <img
        icon
        style="height:2rem;width:auto;"
        src="/line.webp"
      >
    </v-btn>
    <v-btn
      class="ma-1"
      large
      icon
      :href="`https://www.facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse`"
      target="_blank"
    >
      <v-icon
        large
        color="#1877F2"
      >
        {{ mdiFacebook }}
      </v-icon>
    </v-btn>
    <v-btn
      class="ma-1"
      large
      icon
      @click="$writeclipboard(url);snackbar = true"
    >
      <v-icon
        large
        color="#9E9E9E"
      >
        {{ mdiLink }}
      </v-icon>
    </v-btn>
    <v-snackbar
      v-model="snackbar"
    >
      コピーしました！
    </v-snackbar>
  </div>
</template>

<script>

import { mdiTwitter, mdiFacebook, mdiLink } from '@mdi/js'

export default {
  props: ['url'],
  data ()
  {
    return {
      mdiTwitter:    mdiTwitter,
      mdiFacebook:    mdiFacebook,
      mdiLink:        mdiLink,
      snackbar:    false,
    }
  },
}
</script>

<style scoped>
.sharebtn {
  margin: 0 0 0 auto;
}
</style>