<template>
  <v-container
    fluid
    class="py-12"
    :class="bot.is_ad?'ad-color':'default'"
  >
    <v-row
      justify="center"
      class="pb-12"
    >
      <v-col
        cols="12"
        lg="6"
        xl="5"
      >
        <v-row>
          <v-col>
            <BreadCrumb :breadcrumbs="breadcrumbs" />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
          class="pt-12"
        >
          <v-col
            cols="7"
            sm="3"
            lg="2"
            xl="2"
          >
            <v-img
              v-if="bot.avatar"
              :src="$getavatar(bot.id, bot.avatar)"
            />
            <v-img
              v-else-if="!bot.avatar"
              src="/discord.webp"
            />
          </v-col>
          <v-col
            cols="12"
            lg="10"
            class="pt-8"
          >
            <v-row>
              <v-col>
                <h1 class="float-left text-h4 font-weight-bold title">
                  {{ bot.name }}
                </h1>
              </v-col>
            </v-row>
            <v-row
              justify="center"
              align="center"
            >
              <v-col>
                <v-divider />
                <v-subheader class="white--text float-left text-body-2 pl-0">
                  <span class="mr-4">
                    <v-icon
                      class="mr-2"
                      style="vertical-align:bottom;"
                    >
                      {{ mdiArrowDownBoldBox }}
                    </v-icon>
                    <span>Invite Count</span>
                    <span class="white--text font-weith-bold text-body-1 ml-2">{{ bot.invite_cnt }}</span>
                  </span>
                  <span>
                    <v-icon
                      class="mr-2"
                      style="vertical-align:bottom;"
                      :color="statusColor(bot.online_status)"
                    >
                      {{ mdiHeartPulse }}
                    </v-icon>
                    <span
                      :class="`${statusColor(bot.online_status)}--text`"
                      class="font-weith-bold text-body-1"
                    >{{ statusText(bot.online_status) }}</span>
                  </span>
                </v-subheader>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                class="pt-0"
              >
                <p class="float-left text-caption">
                  タグ
                </p>
                <div style="clear:both;">
                  <span
                    v-for="(tag, index) in bot.tags"
                    :key="index"
                    class="mr-1 mb-1 float-left"
                  >
                    <BotTagBtn
                      :name="tag.name"
                      :categoryid="tag.category"
                    />
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col />
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-btn
              id="bottom-btn__inner"
              rel="nofollow"
              depressed
              target="_blank"
              outlined
              class="join-btn"
              x-large
              :href="`${$app_url}/api/bots/${bot.id}/invite/`"
            >
              招待する
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-card-actions class="float-left">
            <ShareBtns :url="url" />
            <LikeBtn
              :data="bot"
              :islarge="true"
              :type="'bot'"
            />
          </v-card-actions>
        </v-row>
        <v-row>
          <v-card-actions class="float-left">
            <v-subheader class="ml-2 white--text float-left text-body-2 pl-0">
              <a
                v-if="bot.support_guild_invite"
                target="_blank"
                class="rel-link mr-5"
                :href="bot.support_guild_invite"
              >
                <v-icon
                  class="mr-1"
                  style="vertical-align:bottom;"
                  color="blue"
                >
                  {{ mdiCheckBold }}
                </v-icon>
                <span class="blue--text">Support Server</span>
              </a>
              <a
                v-if="bot.website_url"
                target="_blank"
                class="rel-link mr-5"
                :href="bot.website_url"
              >
                <v-icon
                  class="mr-1"
                  style="vertical-align:bottom;"
                  color="blue"
                >
                  {{ mdiApplication }}
                </v-icon>
                <span class="blue--text">Web Site</span>
              </a>
              <a
                v-if="bot.git_url"
                target="_blank"
                class="rel-link mr-5"
                :href="bot.git_url"
              >
                <v-icon
                  class="mr-1"
                  style="vertical-align:bottom;"
                  color="blue"
                >
                  {{ mdiGithub }}
                </v-icon>
                <span class="blue--text">Git</span>
              </a>
            </v-subheader>
          </v-card-actions>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-divider />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-card style="clear: both;">
              <v-card-title class="text-caption">
                ボット説明
              </v-card-title>
              <v-card-text
                class="profile-card__inner_text"
                v-text="bot.description"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-card-actions
              class="my-0"
              style="height:2rem;"
            >
              <v-spacer />
              <v-btn
                text
                large
                class="float-right"
                color="red"
                @click="report()"
              >
                通報する
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-divider class="my-10" />
        <v-row>
          <v-col>
            <p
              class="text-subtitle-1 font-weight-bold float-left mb-1 ml-1"
              style="color: #bdbdbd"
            >
              レビュー投稿
            </p>
          </v-col>
        </v-row>
        <v-row v-if="$store.state.auth.loggedIn && $store.state.auth.user.review_bots.includes($route.params.id)">
          <v-col>
            <p class="font-weight-bold text-h6">
              レビューを投稿済みです
            </p>
          </v-col>
        </v-row>
        <v-form
          v-else-if="$store.state.auth.loggedIn"
          ref="review_form"
        >
          <v-row align-content="center">
            <v-col
              cols="2"
              xl="1"
              class="pt-3"
            >
              <v-img :src="$getavatar($store.state.auth.user.id, $store.state.auth.user.avatar)" />
            </v-col>
            <v-col
              cols="9"
              class="pt-3"
            >
              <div style="text-align: left">
                <v-input
                  :value="score"
                  :rules="scorerequired"
                >
                  <v-rating
                    v-model="score"
                    length="5"
                    size="50"
                    class="mb-3"
                    color="yellow darken-3"
                  />
                </v-input>
              </div>
            </v-col>
          </v-row>
          <v-row
            align-content="center"
            justify="center"
          >
            <v-col
              cols="12"
            >
              <v-textarea
                v-model="message"
                solo
                maxlength="1000"
                counter
                name="review"
                label="レビュー"
                :color="$discord_color"
                :rules="messagerequired.concat(messagemin)"
              />
              <v-btn
                large
                class="float-right"
                :color="$discord_color"
                outlined
                @click="validate();"
              >
                レビューを送信
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-row v-else>
          <v-col>
            <p class="font-weight-bold text-h6">
              ログインしているとレビューを投稿できます！
            </p>
          </v-col>
        </v-row>
        <v-divider
          v-if="bot.review_cnt"
          class="my-10"
        />
        <ReviewHeading
          title="ボットレビュー"
          :score_avg="bot.score_avg"
          :review_cnt="bot.review_cnt"
        />
        <ReviewList type="botreview" />
      </v-col>
    </v-row>
    <Loading />
    <ReviewDialog />
    <ReportBotDialog />
    <MessageDialog />
    <LoginDialog />
  </v-container>
</template>

<script>
import { mdiArrowDownBoldBox, mdiHeartPulse, mdiGithub, mdiCheckBold, mdiApplication} from '@mdi/js'
export default {
  components: {
    BotTagBtn : () => import('@/components/btns/BotTagBtn.vue'),
    BreadCrumb  : () => import('@/components/Breadcrumb.vue'),
    ShareBtns   : () => import('@/components/btns/ShareBtns.vue'),
    LikeBtn     : () => import('@/components/btns/LikeBtn.vue'),
    ReportBotDialog: () => import('@/components/dialogs/ReportBotDialog.vue'),
    ReviewDialog : () => import('@/components/dialogs/ReviewDialog.vue'),
    MessageDialog: () => import('@/components/dialogs/MessageDialog.vue'),
    LoginDialog: () => import('@/components/dialogs/LoginDialog.vue')
  },
  data() {
    return {
      bot: this.$store.getters['bot/getById'](this.$route.params.id),
      reviews: this.$store.getters['bot_review/getById'](this.$route.params.id),
      snackbar: false,
      message:    '',
      score:      0,
      messagerequired: [v=> v && !!v || '入力してください!'],
      messagemin: [v=> v && v.length>9 || '10文字以上で入力してください'],
      scorerequired: [v=> v && v!==0 || '選択してください!'],
      mdiArrowDownBoldBox: mdiArrowDownBoldBox,
      mdiHeartPulse: mdiHeartPulse,
      mdiGithub: mdiGithub,
      mdiCheckBold: mdiCheckBold,
      mdiApplication: mdiApplication
    }
  },
  async fetch (ctx) {
    try {
      await ctx.store.dispatch('bot_review/fetch', ctx.params.id)
      await ctx.store.dispatch('bot/fetch', ctx.params.id)
      await ctx.store.dispatch('like/setData', ctx.store.getters['bot/getById'](ctx.params.id))
      ctx.$setLikeData(ctx.store.getters['bot_review/getById'](ctx.params.id).results)
    } catch (err) {
      ctx.error({statusCode: 400})
    }
  },
  head () {
    return {
      title: this.bot.name,
      meta: [
        { hid: 'description', name: 'description', content: this.bot.description },
        { hid: 'og:url', property: 'og:url', content: `https://dissoku.net/bot/${this.bot.id}` },
        { hid: 'og:title', property: 'og:title', content: this.bot.name },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:description', property: 'og:description', content: this.bot.description },
        { hid: 'og:image', property: 'og:image', content: this.bot.avatar ? this.$getavatar(this.bot.id, this.bot.avatar) + '?size=256' : 'https://dissoku.net/favicon.ico' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'ディスコード速報' },
        { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      ]
    }
  },
  created () {
    this.initdata(this.$store.getters['bot/getById'](this.$route.params.id))
    this.$store.dispatch('reportbot_dialog/closeDialog')
    this.$store.dispatch('review_dialog/closeDialog')
    this.$store.dispatch('dialog/closeDialog')
  },
  methods: {
    statusColor(status) {
      if (status == 1) {
        return "green"
      }
      return "red"
    },
    statusText(status) {
      if (status == true) {
        return "online"
      }
      return "offline"
    },
    async submit () {
      if(!this.$refs.review_form.validate()) return
      try {
        this.$store.dispatch('loading/startLoading')
        let param = {
          "bot": this.$route.params.id,
          "message":  this.message,
          "score":  this.score
        }
        await this.$axios.$post(`/api/botreviews/`, param)
        await this.$sleep(1000)
        this.$store.dispatch('dialog/openDialog', { message: "成功しました！", color:this.$discord_color})
        location.reload()
      }
      catch (err) {
        this.$store.dispatch('dialog/openDialog', { message: "失敗しました...<br>管理者に連絡してください。", color:"red"})
      }
      this.$store.dispatch('loading/endLoading')
    },
    report () {
      if (this.$store.state.auth.loggedIn) {
        this.$store.dispatch('reportbot_dialog/openDialog', this.bot)
      } else {
        this.$store.dispatch('login_dialog/openDialog')
      }
    },
    validate () {
      if (!this.$refs.review_form.validate()) return
      this.$store.dispatch('review_dialog/setFunction', this.submit)
      this.$store.dispatch('review_dialog/openDialog', { message: this.message, score:this.score })
    },
    initdata (bot) {
      this.url = `https://dissoku.net/bot/${bot.id}`
      this.breadcrumbs= [{ name: 'ディス速', path: '/' }, { name: 'ボットリスト', path: '/bot' }, { name: bot.name }]
    }
  }
}
</script>

<style scoped>

.profile-card__inner_text {
  text-align: left;
  white-space:pre-wrap;
}


#bottom-btn__inner {
  height: 75px !important;
  width: 100%;
  border-radius: 20px;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0;
  transition: .3;
  color: #7892DA;
  transition: 0.4s;
}
#bottom-btn__inner:hover {
  background-color: #7892DA !important;
  opacity: 1;
  box-shadow: none;
  text-decoration: none;
  transition: .3;
  color: white;
  border-radius: 10px;
  transition: 0.4s;
  border-color: #2E2E2E !important;
}
.default {
  background-color: #2E2E2E;
}
.ad-color {
  background-color: #2C272E;
}

</style>
