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
        <v-row
          justify="center"
          align="center"
        >
          <v-col
            cols="7"
            sm="4"
            md="3"
            class="align-center"
          >
            <v-img
              rel="preload"
              min-height="100"
              src="/discordchan.webp"
              lazy-src="/discordchan-lazy.webp"
            />
          </v-col>
          <v-col
            cols="12"
            sm="9"
            md="6"
          >
            <v-row
              justify="center"
              align="center"
              style="max-width:1000px;"
              class="mx-auto"
            >
              <v-col cols="12">
                <h2
                  :class="$vuetify.breakpoint.name == 'xs' ? 'text-h4' : 'text-h3'"
                  class="title font-weight-bold"
                  style="color:#7289DA;"
                >
                  {{ $t('title') }}
                </h2>
              </v-col>
            </v-row>
            <v-row
              justify="center"
              align="center"
              class="mx-auto"
              style="max-width:1000px;"
            >
              <v-col>
                <h3
                  class="text-body-1 title mx-auto"
                  style="color:#B9BBBE;"
                >
                  <strong class="mx-1">ディス速</strong>は<strong class="mx-1">Discord</strong>の
                  <nuxt-link
                    to="/servers?page=1"
                    class="section-link mr-1"
                  >
                    サーバー
                  </nuxt-link>
                  <nuxt-link
                    to="/friend"
                    class="section-link mx-1"
                  >
                    フレンド
                  </nuxt-link>
                  <nuxt-link
                    to="/bot"
                    class="section-link mx-1"
                  >
                    ボット
                  </nuxt-link>を<br>
                  掲載している<strong class="mx-1">Discord総合掲示板です！</strong><br>
                  <nuxt-link
                    v-if="$store.state.auth.loggedIn"
                    to="/mypage"
                    class="section-link"
                  >
                    ログイン
                  </nuxt-link>
                  <a
                    v-else
                    :href="`${$app_url}/discordlogin/`"
                    class="section-link"
                    @click="$cookies.set('dest', '/mypage');"
                  >
                    ログイン
                  </a>
                  して<strong class="mx-1">サーバー/友達募集/ボット</strong>を<strong class="mx-1">投稿</strong>してください！
                </h3>
              </v-col>
            </v-row>
            <v-row
              justify="center"
              align="center"
              class="mx-auto py-3"
            >
              <v-col cols="12">
                <Searchbox :keyword="keyword" />
              </v-col>
            </v-row>
            <v-row
              justify="center"
              align="center"
              class="mx-auto py-3"
            >
              <v-subheader
                class="text-body-1"
                color="#41B883"
              >
                <strong>人気な</strong><nuxt-link
                  to="/search"
                  class="section-link mx-1"
                >
                  タグ
                </nuxt-link>
              </v-subheader>
            </v-row>
            <v-row
              justify="center"
              align="center"
              style="max-width:1000px;"
              class="mx-auto"
            >
              <v-col cols="12">
                <span
                  v-for="(tag, index) in tags.results"
                  :key="index"
                  class="ma-1"
                  style="display: inline-block;"
                >
                  <GuildTagBtn
                    :name="tag.name"
                    :count="tag.count"
                    :categoryid="tag.category"
                  />
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="7"
            md="3"
          />
        </v-row>
        <v-row justify="center">
          <v-col>
            <h2>
              <v-subheader class="float-right text-h6">
                {{ count }}&nbsp;{{ $t('index.servers_count') }}
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
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <nuxt-link to="/servers">
              <ContentTitle :title="'📖 ' + $t('index.list_servers')" />
            </nuxt-link>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <List :list="update" />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          style="height: 10rem;"
        >
          <v-btn
            nuxt
            outlined
            to="/servers?page=1"
            x-large
            color="#7289D9"
            style="border-width: 1px;"
          >
            更新順一覧を見る
          </v-btn>
        </v-row>
        <v-row
          justify="center"
          class="my-12"
        >
          <v-col>
            <adsbygoogle ad-slot="8984849052" />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <nuxt-link to="/servers/rank?page=1">
              <ContentTitle :title="'👑 ' + $t('index.active_ranking')" />
            </nuxt-link>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <List :list="rank.results" />
          </v-col>
        </v-row>
        <v-row
          class="mb-12"
          justify="center"
        >
          <v-btn
            nuxt
            outlined
            to="/servers/rank?page=1"
            x-large
            color="#7289D9"
          >
            アクティブランキングを見る
          </v-btn>
        </v-row>
        <v-row
          justify="center"
          class="mb-12 pb-12"
        >
          <v-col class="mb-12">
            <adsbygoogle ad-slot="8984849052" />
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
    GuildTagBtn: () => import('@/components/btns/GuildTagBtn.vue'),
    Footer: () => import('@/components/Footer.vue'),
    Searchbox: () => import('@/components/Searchbox.vue'),
    ContentTitle: () => import('@/components/ContentTitle.vue')
  },
  data () {
    return {
      count: this.$store.getters['getUpdate'].count,
      update: this.$store.getters['getUpdate'].results,
      rank: this.$store.getters['getActive'],
      tags: this.$store.getters['getTag'],
      ads: this.$store.getters['getAd'],
      keyword:    '',
    }
  },
  async fetch (ctx) {
    try {
      await Promise.all([
        ctx.store.dispatch('fetchUpdate'),
        ctx.store.dispatch('fetchActive'),
        ctx.store.dispatch('fetchTag')
      ])
      ctx.$setLikeData(ctx.store.getters['getUpdate'].results)
      ctx.$setLikeData(ctx.store.getters['getActive'].results)
    } catch (err) {
      ctx.error({statusCode: 400})
    }
  },
  head () {
    return {
      titleTemplate: null,
      title: 'ディスコード速報 | Discordサーバー・友達募集・ボット掲示板',
    }
  }
}
</script>

<style scoped>
  .section-link {
    color:#40A9F3;
    text-decoration: none;
  }
  .section-link:hover{
    text-decoration: underline;
  }
</style>