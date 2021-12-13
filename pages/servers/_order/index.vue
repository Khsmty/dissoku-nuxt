<template>
  <v-container
    fluid
    class="py-12"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        lg="10"
        xl="9"
      >
        <v-row justify="center">
          <v-col>
            <BreadCrumb :breadcrumbs="breadcrumbs" />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <v-subheader class="pl-0">
              <h1
                class="text-h5 font-weight-bold white--text"
                style="text-align:left;"
              >
                {{ emoji_arr[$route.params.order] }}Discordサーバー一覧 <br v-if="$vuetify.breakpoint.name == 'xs'">{{ title_arr[$route.params.order] }}
              </h1>
            </v-subheader>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-subheader
              class="pl-0"
              v-text="subtitle[$route.params.order]"
            />
          </v-col>
        </v-row>
        <Count :data="guilds" />
        <v-row justify="center">
          <v-col>
            <ServerSelectBtns />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <adsbygoogle
              ad-format=""
              :ad-style="{display:'inline-block', width:'100%', height:'110px'}"
              ad-slot="8931303691"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <List :list="guilds.results" />
          </v-col>
        </v-row>
        <Pagination :data="guilds" />
        <v-row
          justify="center"
          class="pb-12 mb-12"
        >
          <v-col class="mb-12">
            <adsbygoogle ad-slot="4079296294" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <Footer />
  </v-container>
</template>

<script>

export default {
  components: {
    List            : () => import('@/components/List.vue'),
    Footer          : () => import('@/components/Footer.vue'),
    Count           : () => import('@/components/Count.vue'),
    Pagination      : () => import('@/components/btns/Pagination.vue'),
    ServerSelectBtns: () => import('@/components/btns/ServerSelectBtns.vue'),
    BreadCrumb      : () => import('@/components/Breadcrumb.vue')
  },
  async fetch (ctx) {
    try {
      await ctx.store.dispatch('guild_list/fetchOrder', {order: ctx.route.params.order, page: ctx.route.query.page})
      ctx.$setLikeData(ctx.store.getters['guild_list/get'].results)
    } catch (err) {
      ctx.error({statusCode: 400})
    }
  },
  data () {
    return {
      guilds: this.$store.getters['guild_list/get'],
      title_arr: {'member': '人気順', 'like': 'いいね順', 'rank': 'アクティブ順'},
      emoji_arr: {'member': '🙌', 'like': '👍', 'rank': '👑'},
      subtitle: {'member': '', 'like': '', 'rank': '活発なサーバーのランキングです！'},
      meta_data: {}
    }
  },
  head () {
    return {
      title:  this.meta_data.head_title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta_data.description}
      ]
    }
  },
  watchQuery: true,
  created() {
      this.meta_data  = this.$loadserversmeta(this.$route.params.order, this.$route.query)
      let title_arr = {'member': '人気順', 'like': 'いいね順', 'rank': 'アクティブ順'}
      this.breadcrumbs= [
        {
          name: 'ディス速',
          path: '/'
        },
        {
          name: 'サーバー一覧',
          path: '/servers?page=1'
        },
        {
          name: title_arr[this.$route.params.order]
        }
      ]
  }
}
</script>
