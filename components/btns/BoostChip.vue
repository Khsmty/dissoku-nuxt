<template>
  <v-tooltip
    v-if="guild.boost_count > 0"
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
        <GemSvg class="pt-1" />
        <span
          class="text-overline"
          style="vertical-align:bottom;display: inline;"
        >
          × {{ guild.boost_count }}
        </span>
      </v-chip>
    </template>
    <span>ブーストカウント</span>
  </v-tooltip>
</template>

<script>
export default {
  components:{
    GemSvg      : () => import('@/components/GemSvg.vue')
  },
  props: ['guild']
}
</script>
