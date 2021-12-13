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
              <h1>
                <span class="text-h5 font-weight-bold text-decoration-underline mr-1">{{ title }}</span>
                <span class="text-h6">の検索結果</span>
              </h1>
            </v-subheader>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            cols="12"
            md="6"
          >
            <Searchbox />
          </v-col>
        </v-row>
        <Count :data="guilds" />
        <v-row justify="center">
          <v-col>
            <adsbygoogle
              ad-format=""
              :ad-style="{display:'inline-block', width:'100%', height:'110px'}"
              ad-slot="8931303691"
            />
          </v-col>
        </v-row>
        <v-row
          v-if="!guilds.count"
          class="mt-5"
          justify="center"
        >
          <v-subheader>検索結果が見つかりませんでした・・・</v-subheader>
        </v-row>
        <v-row
          v-if="!guilds.count"
          justify="center"
          align="center"
        >
          <v-col
            cols="8"
            xl="3"
          >
            <v-img src="/discordchan2.webp" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <List :list="guilds.results" />
          </v-col>
        </v-row>
        <Pagination
          v-if="guilds.count!=0"
          :data="guilds"
        />
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
import List from '@/components/List.vue'
import Footer from '@/components/Footer.vue'
import Searchbox from '@/components/Searchbox.vue'
import Count from '@/components/Count.vue'
import Pagination from '@/components/btns/Pagination.vue'

export default {
  components: {
    List,
    Footer,
    Searchbox,
    Count,
    Pagination,
    BreadCrumb  : () => import('@/components/Breadcrumb.vue')
  },
  async fetch (ctx) {
    try {
      await ctx.store.dispatch('guild_list/fetchSearch', {q:ctx.route.query.q, page:ctx.route.query.page})
      ctx.$setLikeData(ctx.store.getters['guild_list/get'].results)
    } catch (err) {
      ctx.error({statusCode: 400})
    }
  },
  data () {
    return {
      guilds: this.$store.getters['guild_list/get'],
      title: this.$route.query.q,
      meta_data:  {}
    }
  },
  created() {
    this.meta_data  = this.$loadsearchmeta(this.$route.query)
    this.breadcrumbs= [
      {
        name: 'ディス速',
        path: '/'
      },
      {
        name: 'サーバー検索',
        path: '/search'
      },
      {
        name: '「'+this.$route.query.q+'」の検索結果'
      }
    ]
  },
  head () {
    return {
      title: this.meta_data.head_title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta_data.description}
      ]
    }
  },
  watchQuery: true
}
</script>
