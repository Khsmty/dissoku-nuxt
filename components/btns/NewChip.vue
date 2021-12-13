<template>
  <v-tooltip
    v-if="guild.is_new"
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
          {{ mdiCreation }}
        </v-icon>
        <span
          class="font-weight-bold text-overline"
        >
          NEW
        </span>
      </v-chip>
    </template>
    <span>最近作られたサーバー</span>
  </v-tooltip>
</template>

<script>
import { mdiCreation} from '@mdi/js'

export default {
  props: ['guild'],
  data () {
    return {
      mdiCreation: mdiCreation
    }
  }
}
</script>
