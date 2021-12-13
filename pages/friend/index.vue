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
                🤗 Discordフレンド募集
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
                  :to="`/friend/search/tag/${encodeURIComponent(tag.name)}?page=1`" 
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
                {{ cnt }}&nbsp;件掲載中!!
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
            <nuxt-link to="/friend/users?page=1">
              <ContentTitle title="フレンド一覧" />
            </nuxt-link>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <List :list="profiles.results" />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          style="height: 10rem;"
        >
          <v-btn
            nuxt
            outlined
            to="/friend/users?page=1"
            x-large
            color="#7289D9"
          >
            フレンド募集一覧を見る
          </v-btn>
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
export default {
  components: {
    List: () => import('@/components/List.vue'),
    Footer: () => import('@/components/Footer.vue'),
    ContentTitle: () => import('@/components/ContentTitle.vue')
  },
  data () {
    return {
      profiles: this.$store.getters['user_index/getUpdate'],
      tags: this.$store.getters['user_index/getTag'],
      cnt: 0,
    }
  },
  async fetch (ctx) {
    try {
      await Promise.all([
        ctx.store.dispatch('user_index/fetchUpdate'),
        ctx.store.dispatch('user_index/fetchTag')
      ])
    } catch (err) {
      ctx.error({statusCode: 400})
    }
  },
  head () {
    return {
      title: 'Discordフレンド募集',
      description: 'ディスコードフレンド募集一覧です。おしゃべりしたり一緒にゲーム出来る友達を見つけてください！',
      meta: [
        { hid: 'description', name: 'description', content: '暇で一緒にゲームする友達がほしい時おしゃべりしたいときはここでDiscordのフレンドを探してください！あなたにぴったりのフレンドがきっと見つかります。' },
        { hid: 'og:url', property: 'og:url', content: 'https://dissoku.net/' },
        { hid: 'og:title', property: 'og:title', content: 'Discordフレンド募集 - ディスコード速報 | Discordサーバー・友達募集掲示板' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:description', property: 'og:description', content: 'Discordのフレンド募集を探すことが出来ます。' },
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