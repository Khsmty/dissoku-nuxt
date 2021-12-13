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
                <span class="text-h6">タグのついたDiscordサーバー</span>
              </h1>
            </v-subheader>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <p
              style="color:#bdbdbd;"
              class="float-left"
            >
              <strong class=" mx-1">{{ tag_data.category__name }}</strong><span class="text-caption">カテゴリーのタグ</span>
            </p>
            <div style="clear:both;">
              <span
                v-for="(tag, index) in same_category_tags.results"
                :key="index"
                class="ma-1 float-left"
                style="display: inline-block;"
              >
                <GuildTagBtn
                  :name="tag.name"
                  :count="tag.count"
                  :categoryid="tag.category"
                />
              </span>
            </div>
          </v-col>
        </v-row>
        <Count :data="guilds" />
        <v-row justify="center">
          <v-col>
            <adsbygoogle
              ad-format=""
              :ad-style="{display:'inline-block', width:'100%', height:'110px'}"
              ad-slot="8931303691"
              data-full-width-responsive="false"
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
import List from '@/components/List.vue'
import Footer from '@/components/Footer.vue'
import Count from '@/components/Count.vue'
import Pagination from '@/components/btns/Pagination.vue'

export default {
  components: {
    List,
    Footer,
    Count,
    Pagination,
    BreadCrumb  : () => import('@/components/Breadcrumb.vue'),
    GuildTagBtn : () => import('@/components/btns/GuildTagBtn.vue')
  },
  async fetch (ctx) {
    try {
      await ctx.store.dispatch('guild_list/fetchByTag', {order:ctx.route.params.order, page:ctx.route.query.page})
      await ctx.store.dispatch('tag/fetchCategoryTag', ctx.route.params.order)
      ctx.$setLikeData(ctx.store.getters['guild_list/get'].results)
    } catch (err) {
      ctx.error({statusCode: 400})
    }
  },
  data () {
    return {
      guilds: this.$store.getters['guild_list/get'],
      tag_data: this.$store.getters['tag/getTag'],
      same_category_tags: this.$store.getters['tag/getCategoryTag'],
      title: this.$route.params.order,
      meta_data:  {}
    }
  },
  head () {
    return {
      title: this.meta_data.head_title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta_data.description}
      ]
    }
  },
  watchQuery: ['page'],
  created() {
    this.meta_data  = this.$loadtagmeta(this.$route.params, this.$route.query)
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
        name: '「'+this.$route.params.order+'」タグのついたサーバー'
      }
    ]
  },
}
</script>
