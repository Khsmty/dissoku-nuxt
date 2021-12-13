<template>
  <v-container
    class="mb-12 pb-12"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
        lg="10"
        xl="9"
      >
        <v-row class="pt-5">
          <v-col
            cols="12"
            lg="6"
            xl="6"
          >
            <v-alert
              border="left"
              colored-border
              type="warning"
              style="background-color:#2D2D2D;"
              dense
              class="orange--text text-left"
            >
              <p><strong class="text-decoration-underline">サーバーが表示されない場合</strong></p>
              <p>ユーザトークンの期限が切れている可能性があります。お手数ですが<strong>ログイン</strong>し直してください。</p>
            </v-alert>
          </v-col>
          <v-col
            cols="12"
            xl="6"
          >
            <adsbygoogle ad-slot="2985706475" />
          </v-col>
        </v-row>
        <v-subheader>サーバー一覧</v-subheader>
        <v-divider />
        <v-row class="py-5">
          <v-col
            v-for="(guild, index) in guildlist"
            :key="index"
            class="pa-0"
            cols="12"
            lg="6"
            xl="6"
          >
            <v-card
              elevation="3"
              class="pa-2 ma-2"
              outlined
              link
              color="#2D2D2D"
              @click="$router.push(`/mypage/serverlist/editserver/${guild.id}`)"
            >
              <v-list-item
                three-line
                rounded
              >
                <v-list-item-avatar
                  tile
                  size="80"
                  class="avatar-link guild-card__inner_head-img"
                >
                  <v-img
                    v-if="guild.icon"
                    :src="'https://cdn.discordapp.com/icons/' + guild.id +'/' + guild.icon + '.png'"
                  />
                  <v-img
                    v-else-if="!guild.icon"
                    src="/discord.webp"
                  />
                </v-list-item-avatar>
                <v-list-item-content class="text-left pa-0">
                  <span
                    v-if="guild.ban_flg"
                    class="subtitle-1 red--text font-weight-bold"
                  >通報を受けたまたは不適切な利用が確認されたためブロックされています</span>
                  <span
                    v-else-if="!guild.join_flg"
                    class="subtitle-1 red--text font-weight-bold"
                  >ボットが確認できません&nbsp;/dissoku ci コマンドを実行してください</span>
                  <span
                    v-else-if="guild.display_flg==1 && guild.join_flg==1"
                    class="title font-weight-bold"
                    style="color:#7289D9"
                  >掲載中</span>
                  <span
                    v-else
                    class="title red--text font-weight-bold"
                  >未掲載</span>
                  <div>
                    <span class="title white--text font-weight-bold text-h5">{{ guild.name }}</span>
                  </div>
                  <div
                    class="title"
                    style="color:#FAA61A"
                  >
                    設定されたタグ
                  </div>
                  <span><span
                    v-for="(tag, tagindex) in guild.tags"
                    :key="tagindex"
                    class="tag-name"
                  >{{ tag.name }}&nbsp;</span></span>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col cols="3">
            <v-card
              v-if="rate_error"
              color="#2D2D2D"
              width="30rem"
              class="font-weight-bold red--text"
            >
              Discord APIレート制限を受けています...<br>申し訳ありませんが<br> <span class="red--text">{{ retry_after }}秒</span><br> 後に更新ボタンを押してください。
              <v-img
                class="mx-auto"
                width="10rem"
                src="discordchan2.webp"
              />
            </v-card>
            <v-card
              v-if="discord_error"
              color="#2D2D2D"
              width="30rem"
              class="font-weight-bold pa-6 red--text"
            >
              Discord APIでエラーが発生しました...<br>申し訳ありませんが<br> しばらくしてから更新ボタンを押してください。
              <v-img
                class="mx-auto"
                width="10rem"
                src="discordchan2.webp"
              />
            </v-card>
            <v-card
              v-if="app_error"
              color="#2D2D2D"
              width="30rem"
              class="font-weight-bold pa-6 red--text"
            >
              不明なエラーが発生しました...<br>申し訳ありませんが<br> 管理者に連絡してください。
              <v-img
                class="mx-auto"
                width="10rem"
                src="discordchan2.webp"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      guildlist: [],
      rate_error: false,
      retry_after: '',
      discord_error: false,
      app_error: false
    }
  },
  head () {
    return {
      title: 'マイページ・サーバー一覧',
    }
  },
  computed: {
    margin ()
    {
      if (this.$vuetify.breakpoint.name != 'xs') {
        return 'ma-5'
      }
      return ''
    },
  },
  async mounted ()
  {
    if(!this.$store.state.auth.loggedIn) {
      this.$nuxt.error({statusCode: 400})
    }
    this.getmyserver()
  },
  methods:
    {
      async getmyserver () {
        try {
          let guilds = await this.$axios.$get('/api/guilds/myserver/')
          this.guildlist = guilds
        }
        catch (err) {
          if(err.response.status == 429) {
            this.rate_error = true
            this.retry_after = err.response.data
          }
          else if(err.response.status == 503) {
            this.discord_error = true
          }
          else {
            this.app_error = true
          }
        }
      }
    }
}
</script>