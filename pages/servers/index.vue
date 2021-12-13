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
                📖Discordサーバー一覧 <br v-if="$vuetify.breakpoint.name == 'xs'">更新順
              </h1>
            </v-subheader>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-subheader
              class="pl-0"
              v-text="'アップ順のサーバー一覧です！'"
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
      await ctx.store.dispatch('guild_list/fetchUpdate', ctx.route.query.page)
      ctx.$setLikeData(ctx.store.getters['guild_list/get'].results)
    } catch (err) {
      ctx.error({statusCode: 400})
    }
  },
  data () {
    return {
      guilds: this.$store.getters['guild_list/get'],
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
      this.meta_data  = this.$loadupdatemeta(this.$route.query)
      this.breadcrumbs= [
        {
          name: 'ディス速',
          path: '/'
        },
        {
          name: 'サーバー一覧'
        }
      ]
  }
}
</script>
