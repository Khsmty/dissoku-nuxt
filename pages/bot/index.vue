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
            <v-subheader class="pl-0">
              <h1 class="white--text text-h5 font-weight-bold title float-left">
                🤖 Discord ボットリスト
              </h1>
            </v-subheader>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-card>
              <v-card-title class="text-caption">
                人気タグ
              </v-card-title>
              <v-card-text style="text-align:left;">
                <nuxt-link
                  v-for="(tag, index) in tags.results"
                  :key="index"
                  :to="`/bot/search/tag/${encodeURIComponent(tag.name)}?page=1`" 
                  class="blue--text ma-1 tag-link"
                >
                  {{ tag.name }}({{ tag.count }})
                </nuxt-link>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <h2>
              <v-subheader class="float-right text-h6">
                {{ new_bots.count }}&nbsp;体掲載中!!
              </v-subheader>
            </h2>
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
            <nuxt-link to="/bot/botlist?page=1">
              <ContentTitle title="ボット一覧" />
            </nuxt-link>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <List :list="bots.results" />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          style="height: 10rem;"
        >
          <v-btn
            nuxt
            outlined
            to="/bot/botlist?page=1"
            x-large
            color="#7289D9"
          >
            ボット一覧を見る
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-col>
            <ContentTitle title="新しく掲載されたボット" />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <List :list="new_bots.results" />
          </v-col>
        </v-row>
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
import { mdiRobot } from '@mdi/js'
export default {
  components: {
    List: () => import('@/components/List.vue'),
    Footer: () => import('@/components/Footer.vue'),
    ContentTitle: () => import('@/components/ContentTitle.vue'),
  },
  data () {
    return {
      new_bots: this.$store.getters['bot_index/getNew'],
      bots: this.$store.getters['bot_index/getLike'],
      tags: this.$store.getters['bot_index/getTag'],
      mdiRobot: mdiRobot
    }
  },
    async fetch (ctx) {
    try {
      await ctx.store.dispatch('bot_index/fetchNew')
      await ctx.store.dispatch('bot_index/fetchLike')
      await ctx.store.dispatch('bot_index/fetchTag')
      ctx.$setLikeData(ctx.store.getters['bot_index/getNew'].results)
      ctx.$setLikeData(ctx.store.getters['bot_index/getLike'].results)
    } catch (err) {
      ctx.error({statusCode: 400})
    }
  },
  head () {
    return {
      title: 'Discordボットリスト',
      description: 'ディスコードボット掲示板です。ディス速には便利なボットや面白いボットがたくさん掲載されています。ディス速であなたのサーバーにぴったりのDiscordボットをみつけよう！',
      meta: [
        { hid: 'description', name: 'description', content: 'ディスコードボットリストです。ディス速には便利なボットや面白いボットがたくさん掲載されています。ディス速であなたのサーバーにぴったりのDiscordボットをみつけよう！' },
        { hid: 'og:url', property: 'og:url', content: 'https://dissoku.net/bot' },
        { hid: 'og:title', property: 'og:title', content: 'Discordボットリスト - ディスコード速報 | Discordサーバー・友達募集・ボット掲示板' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:description', property: 'og:description', content: 'ディスコードボットリストです。ディス速には便利なボットや面白いボットがたくさん掲載されています。ディス速であなたのサーバーにぴったりのDiscordボットをみつけよう！' },
        { hid: 'og:image', property: 'og:image', content: 'https://dissoku.net/discordchan.webp' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'ディスコード速報' },
        { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      ]
    }
  }
}
</script>

<style scoped>
.tag-link{
  text-decoration:none;
}
.tag-link:hover{
  text-decoration: underline;
}
</style>