<template>
  <div class="float-left mb-5">
    <v-btn
      v-for="(lineup, index) in lineuparr"
      :key="index"
      :exact="lineup.exact"
      class="ma-1 float-left"
      :ripple="false"
      text
      :to="lineup.to"
      outlined
      large
    >
      {{ lineup.text }}
    </v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lineuparr: {
        update : {
          to: '/servers?page=1',
          text: '更新順',
          exact: true
        },
        member : {
          to: '/servers/member?page=1',
          text: '人数順',
          exact: false
        },
        like : {
          to: '/servers/like?page=1',
          text: 'いいね順',
          exact: false
        },
        active : {
          to: '/servers/rank?page=1',
          text: 'アクティブ順',
          exact: false
        }
      }
    }
  },
}
</script>