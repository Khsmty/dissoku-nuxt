<template>
  <div>
    <v-tooltip
      v-if="guild.nsfw_flg"
      top
    >
      <template #activator="{ on, attrs }">
        <v-chip
          small
          label
          input-value="true"
          class="float-left ml-1"
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
            v-if="guild.nsfw_flg"
            class="font-weight-bold text-overline"
          >
            NSFW
          </span>
        </v-chip>
      </template>
      <span>成人向けコンテンツを含むサーバー</span>
    </v-tooltip>
    <v-tooltip
      v-if="guild.boost_count > 0"
      top
    >
      <template #activator="{ on, attrs }">
        <v-chip
          small
          label
          input-value="true"
          class="float-left ml-1"
          v-bind="attrs"
          v-on="on"
        >
          <GemSvg class="pb-2" />
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
    <v-tooltip
      v-if="guild.is_new"
      top
    >
      <template #activator="{ on, attrs }">
        <v-chip
          v-if="guild.new_flg"
          class="float-left ml-2"
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
            v-if="guild.new_flg"
            class="font-weight-bold text-overline"
          >
            NEW
          </span>
        </v-chip>
      </template>
      <span>最近作られたサーバー</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mdiAlert , mdiCreation} from '@mdi/js'

export default {
  components:{
    GemSvg      : () => import('@/components/GemSvg.vue')
  },
  props: ['guild'],
  data () {
    return {
      mdiAlert: mdiAlert,
      mdiCreation: mdiCreation
    }
  }
}
</script>
