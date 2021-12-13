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
              <p><strong class="text-decoration-underline">ボット申請</strong></p>
              <p>ボットを掲載したい方はこちらから申請してください</p>
              <p>
                承認等の通知のためボット申請者は<a
                  target="_blank"
                  class="blue--text rel-link mx-1"
                  href="https://discord.gg/Hj5KNY3"
                >ディス速運営サーバー</a>に参加してください
              </p>
              <p>承認後のボット情報は申請者のみが編集可能となります</p>
            </v-alert>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-btn
              nuxt
              to="/mypage/botlist/applybot"
              style="width:20rem;"
              x-large
            >
              ボットを申請する
            </v-btn>
          </v-col>
        </v-row>
        <v-subheader v-if="botrequests.length">
          ボット申請一覧
        </v-subheader>
        <v-divider v-if="botrequests.length" />
        <v-row class="py-5">
          <v-col
            v-for="(bot, index) in botrequests"
            :key="index"
            class="pa-0"
            cols="12"
            lg="6"
            xl="6"
          >
            <v-card
              :disabled="bot.status==0||bot.status==3"
              elevation="3"
              class="pa-2 ma-2"
              outlined
              link
              color="#2D2D2D"
              @click="$router.push(`/mypage/botlist/applybot/${bot.bot_id}`)"
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
                    v-if="bot.avatar"
                    :src="$getavatar(bot.bot_id, bot.avatar)"
                  />
                  <v-img
                    v-else-if="!bot.avatar"
                    src="/discord.webp"
                  />
                </v-list-item-avatar>
                <v-list-item-content class="text-left">
                  <span
                    v-if="bot.status==0"
                    class="subtitle-1 red--text font-weight-bold"
                  >審査中です。もう少々お待ち下さい。</span>
                  <span
                    v-else-if="bot.status==2"
                    class="subtitle-1 red--text font-weight-bold"
                  >申請が却下されました。</span>
                  <span
                    v-else-if="bot.status==3"
                    class="subtitle-1 red--text font-weight-bold"
                    style="color:#7289D9"
                  >不正な申請です。</span>
                  <v-list-item-text>
                    <div>
                      <span class=" title white--text font-weight-bold text-h5">{{ bot.name }}</span>
                    </div>
                  </v-list-item-text>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
        <v-subheader v-if="bots.length">
          ボット一覧
        </v-subheader>
        <v-divider v-if="bots.length" />
        <v-row class="py-5">
          <v-col
            v-for="(bot, index) in bots"
            :key="index"
            class="pa-0"
            cols="12"
            lg="6"
            xl="6"
          >
            <v-card
              :disabled="bot.status==0"
              elevation="3"
              class="pa-2 ma-2"
              outlined
              link
              color="#2D2D2D"
              @click="$router.push(`/mypage/botlist/editbot/${bot.id}`)"
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
                    v-if="bot.avatar"
                    :src="$getavatar(bot.id, bot.avatar)"
                  />
                  <v-img
                    v-else-if="!bot.avatar"
                    src="/discord.webp"
                  />
                </v-list-item-avatar>
                <v-list-item-content class="text-left pa-0">
                  <span
                    v-if="bot.ban_flg"
                    class="subtitle-1 red--text font-weight-bold"
                  >通報を受けたまたは不適切な利用が確認されたためブロックされています</span>
                  <span
                    v-else-if="bot.display_flg"
                    class="subtitle-1 blue--text font-weight-bold"
                  >掲載中</span>
                  <span
                    v-else
                    class="subtitle-1 red--text font-weight-bold"
                  >未掲載</span>
                  <div>
                    <span class="title white--text font-weight-bold text-h5">{{ bot.name }}</span>
                  </div>
                  <div
                    class="title"
                    style="color:#FAA61A"
                  >
                    設定されたタグ
                  </div>
                  <span><span
                    v-for="(tag, tagindex) in bot.tags"
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
          <v-col cols="12">
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
      botrequests: [],
      bots: [],
      rate_error: false,
      retry_after: '',
      discord_error: false,
      app_error: false
    }
  },
  head () {
    return {
      title: 'マイページ・ボット一覧',
    }
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
          this.botrequests  = await this.$axios.$get('/api/botrequests/')
          this.bots      = await this.$axios.$get('/api/bots/mybots/')
        }
        catch (err)
        {
          if(err.response.status == 429)
          {
            this.rate_error = true
            this.retry_after = err.response.data
          }
          else if(err.response.status == 520)
          {
            this.discord_error = true
          }
          else
          {
            this.app_error = true
          }
        }
      }
    }
}
</script>