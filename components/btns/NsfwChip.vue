<template>
  <v-tooltip
    v-if="guild.nsfw_flg"
    top
  >
    <template #activator="{ on, attrs }">
      <v-chip
        small
        label
        input-value="true"
        class="float-left ml-1 mb-1"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          small
          color="#AA7112"
        >
          {{ mdiAlert }}
        </v-icon>
        <span
          class="font-weight-bold text-overline"
        >
          NSFW
        </span>
      </v-chip>
    </template>
    <span>成人向けコンテンツを含むサーバー</span>
  </v-tooltip>
</template>

<script>
import { mdiAlert } from '@mdi/js'

export default {
  props: ['guild'],
  data () {
    return {
      mdiAlert: mdiAlert
    }
  }
}
</script>
