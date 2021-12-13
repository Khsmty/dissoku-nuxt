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
          class="pt-12"
        >
          <v-col>
            <v-row justify="center">
              <v-col
                cols="7"
                sm="5"
                md="3"
                lg="3"
                xl="3"
              >
                <v-img
                  min-width="100"
                  min-height="200"
                  src="/huwachan3.webp"
                  lazy-src="/huwachan3-lazy.webp"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
                lg="6"
                xl="6"
              >
                <v-row align="center">
                  <v-col>
                    <h1 class="font-weight-bold text-h5">
                      🔍 Discordサーバーを検索する
                    </h1>
                  </v-col>
                </v-row>
                <v-row
                  justify="center"
                  align="center"
                >
                  <v-col
                    cols="12"
                    sm="11"
                    md="12"
                    class="pt-12"
                  >
                    <Searchbox :keyword="keyword" />
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="7"
                md="3"
                lg="3"
                xl="3"
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <adsbygoogle ad-slot="1656939592" />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <v-subheader
              class="title"
              color="#41B883"
            >
              タグ一覧
            </v-subheader>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
          class="pb-12 mb-12"
        >
          <v-col class="pb-12 mb-12">
            <div
              v-for="(tags, category) in category_tags"
              :key="category"
            >
              <div
                style="clear:both;"
                class="mb-1"
              >
                <v-subheader>
                  <span class="font-weight-bold mr-1">{{ category }}</span><span class="text-caption">カテゴリーのタグ</span>
                </v-subheader>
                <v-divider />
              </div>
              <span
                v-for="(tag, index) in tags"
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
      </v-col>
    </v-row>
    <Footer />
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  components: {
    GuildTagBtn: () => import('@/components/btns/GuildTagBtn.vue'),
    Searchbox: () => import('@/components/Searchbox.vue'),
    Footer: () => import('@/components/Footer.vue'),
    BreadCrumb  : () => import('@/components/Breadcrumb.vue')
  },
  async asyncData ({ $axios, error })
  {
    try
    {
      let data = {}
      let res_tags    = $axios.$get('/api/tags/category_key/')
      data.category_tags      = await res_tags
      data.breadcrumbs= [
        {
          name: 'ディス速',
          path: '/'
        },
        {
          name: 'サーバー検索'
        }
      ]
      return data
    }
    catch (err)
    {
      error({statusCode: 400})
    }
  },
  data () {
    return {
      category_tags:      [],
      keyword:    '',
      cnt:      0,
      textcls:    'text-h3',
      app_url:    process.env.DISSOKUAPP_URL
    }
  },
  head () {
    return {
      title: 'Discordサーバーを検索',
      description: '好きなゲームや音楽の名前でDiscordサーバーを検索してください！',
      meta: [
        { hid: 'description', name: 'description', content: '好きなゲームや音楽の名前でDiscordサーバーを検索してください！あなたにぴったりのサーバーがきっと見つかります。' },
        { hid: 'og:url', property: 'og:url', content: 'https://dissoku.net/' },
        { hid: 'og:title', property: 'og:title', content: 'サーバーを検索 - ディスコード速報 | Discordサーバー掲示板' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:description', property: 'og:description', content: 'ディスコードサーバーを好きなキーワードで検索できます。' },
        { hid: 'og:image', property: 'og:image', content: 'https://dissoku.net/huwachan3.webp' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'ディスコード速報' },
        { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      ]
    }
  }
}
</script>
