<template>
  <v-container
    fluid
    :style="bg_style"
    class="pa-0 ma-0"
  >
    <div id="bg_mask">
      <v-container class="mb-12 py-12">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="10"
            xl="6"
          >
            <v-row justify="center">
              <v-col class="pb-12">
                <BreadCrumb :breadcrumbs="breadcrumbs" />
              </v-col>
            </v-row>
            <v-row
              justify="center"
              align="center"
            >
              <v-col
                cols="7"
                md="4"
                lg="2"
                xl="2"
              >
                <v-img
                  v-if="guild.icon"
                  :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`"
                />
                <v-img
                  v-else-if="!guild.icon"
                  src="/discord.webp"
                />
              </v-col>
              <v-col
                cols="12"
                lg="8"
                xl="8"
              >
                <h1 class="white--text text-h4 font-weight-bold">
                  {{ guild.name }}
                </h1><br>
                <p class="text-caption text--grey-lighten-1">
                  {{ guild.description }}
                </p>
              </v-col>
              <v-col
                lg="2"
                xl="2"
              />
            </v-row>
            <v-row justify="center">
              <v-col>
                <div class="overline">
                  <p class="guild-card__inner_contents-label online">
                    online<span>{{ guild.onlinenum }}</span>
                  </p>
                  <p class="guild-card__inner_contents-label member">
                    member<span>{{ guild.membernum }}</span>
                  </p>
                  <p class="guild-card__inner_contents-label emoji">
                    emoji<span>{{ guild.emojisnum }}</span>
                  </p>
                </div>
                <span
                  v-for="(tag, index) in guild.tags"
                  :key="index"
                  class="ma-1"
                  style="display: inline-block"
                >
                  <GuildTagBtn
                    :name="tag.name"
                    :categoryid="tag.category"
                  />
                </span>
              </v-col>
            </v-row>
            <v-row
              class="my-10 mx-2"
              justify="center"
            >
              <v-col>
                <v-btn
                  id="bottom-btn__inner"
                  rel="nofollow"
                  depressed
                  target="_blank"
                  class="join-btn"
                  outlined
                  x-large
                  :href="`${app_url}/api/guilds/${guild.id}/join`"
                >
                  参加する
                </v-btn>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <v-card-actions class="float-left">
                  <ShareBtns :url="url" />
                  <LikeBtn
                    :data="{id:$route.params.id, type:'guild'}"
                    :islarge="true"
                  />
                </v-card-actions>
                <v-divider style="clear: both" />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <v-card-actions>
                  <div class="text-caption mr-5 font-weight-bold">
                    <v-icon>{{ mdiDiscord }}</v-icon>&nbsp;{{ guild.discord_created_at | moment }}
                  </div>
                  <span class="float-left pr-5">
                    <GemSvg />
                    <div style="display: inline">
                      ×<span class="pl-2">{{ guild.boost_count }}</span>
                    </div>
                  </span>
                  <div
                    v-if="guild.nsfw_flg"
                    class="mr-5"
                  >
                    <v-icon
                      small
                      color="#AA7112"
                      class="mr-1"
                    >
                      {{ mdiAlert }}
                    </v-icon>
                    <span class="font-weight-bold pb-0 mb-0 text-overline">
                      NSFW
                    </span>
                  </div>
                </v-card-actions>
              </v-col>
            </v-row>
            <v-row
              v-if="guild.description_detail"
              align-content="center"
              justify="center"
            >
              <v-col class="pt-3">
                <v-card-text
                  class="guild-card__inner_text text-subtitle-1"
                  v-html="$md.render(guild.description_detail)"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    text
                    large
                    color="red"
                    @click="report()"
                  >
                    通報する
                  </v-btn>
                  <v-subheader
                    v-if="guild.level"
                    class="text-caption"
                  >
                    ActiveLevel.{{ guild.level }}
                  </v-subheader>
                  <v-subheader
                    v-if="guild.upped_ago"
                    class="text-caption pl-0"
                    v-text="guild.upped_ago"
                  />
                </v-card-actions>
              </v-col>
            </v-row>
            <div v-if="guild.users.length">
              <p
                class="text-subtitle-1 font-weight-bold float-left mb-1 ml-1"
                style="color: #bdbdbd"
              >
                サーバーメンバー
              </p>
            </div>
            <v-row
              style="clear:left;"
              class="pt-5"
            >
              <v-col
                v-for="(profile, index) in guild.users"
                :key="index"
                cols="2"
                sm="1"
              >
                <ProfileCardSmall :profile="profile" />
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
            <v-row v-if="$store.state.auth.loggedIn && $store.state.auth.user.review_guilds.includes($route.params.id)">
              <v-col>
                <p class="font-weight-bold text-h6">
                  レビューを投稿済みです
                </p>
              </v-col>
            </v-row>
            <v-form
              v-else-if="$store.state.auth.loggedIn && $store.state.auth.user.guilds.includes($route.params.id)"
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
                  サーバーに参加しているとレビューを投稿できます！
                </p>
              </v-col>
            </v-row>
            <v-divider
              v-if="guild.review_cnt"
              class="my-10"
            />
            <ReviewHeading
              title="サーバーレビュー"
              :score-avg="guild.score_avg"
              :review-cnt="guild.review_cnt"
            />
            <ReviewList type="guildreview" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <Loading />
    <ReviewDialog />
    <MessageDialog />
    <ReportGuildDialog />
    <LoginDialog />
  </v-container>
</template>

<script>
import moment from 'dayjs'
import { mdiDiscord, mdiAlert, mdiHeart} from '@mdi/js'
export default {
  components:{
    GuildTagBtn : () => import('@/components/btns/GuildTagBtn.vue'),
    GemSvg      : () => import('@/components/GemSvg.vue'),
    LikeBtn     : () => import('@/components/btns/LikeBtn.vue'),
    BreadCrumb  : () => import('@/components/Breadcrumb.vue'),
    ProfileCardSmall : () => import('@/components/cards/ProfileCardSmall.vue'),
    ShareBtns   : () => import('@/components/btns/ShareBtns.vue'),
    ReviewHeading: () => import('@/components/ReviewHeading'),
    ReviewList: () => import('@/components/ReviewList'),
    Loading     : () => import('@/components/Loading.vue'),
    ReviewDialog : () => import('@/components/dialogs/ReviewDialog.vue'),
    MessageDialog: () => import('@/components/dialogs/MessageDialog.vue'),
    ReportGuildDialog: () => import('@/components/dialogs/ReportGuildDialog.vue'),
    LoginDialog: () => import('@/components/dialogs/LoginDialog.vue')
  },
  filters: {
    moment: (date) => {
      return moment(date).format("YYYY-MM-DD")
    }
  },
  data () {
    return {
      guild:      this.$store.getters['guild/get'],
      app_url:    process.env.DISSOKUAPP_URL,
      bg_style:    {},
      mdiDiscord:    mdiDiscord,
      mdiAlert:    mdiAlert,
      mdiHeart:    mdiHeart,
      url:      '',
      message:    '',
      score:      0,
      breadcrumbs:  [],
      messagerequired: [v=> v && !!v || '入力してください!'],
      messagemin: [v=> v && v.length>9 || '10文字以上で入力してください'],
      scorerequired: [v=> v && v!==0 || '選択してください!']
    }
  },
  async fetch (ctx) {
    try {
      await ctx.store.dispatch('guild_review/fetch', ctx.params.id)
      await ctx.store.dispatch('guild/fetch', ctx.params.id)
      await ctx.store.dispatch('like/setData', ctx.store.getters['guild/get'])
      ctx.$setLikeData(ctx.store.getters['guild_review/getById'](ctx.params.id).results)
    } catch (err) {
      ctx.error({statusCode: 400})
    }
  },
  head () {
    return this.$getGuildHead(this.guild)
  },
  created () {
    this.initdata(this.$store.getters['guild/get'])
    this.$store.dispatch('reportguild_dialog/closeDialog')
    this.$store.dispatch('review_dialog/closeDialog')
    this.$store.dispatch('dialog/closeDialog')
  },
  methods : {
    async submit () {
      if(!this.$refs.review_form.validate()) return
      try {
        this.$store.dispatch('loading/startLoading')
        let param = {
          "guild": this.$route.params.id,
          "message":  this.message,
          "score":  this.score
        }
        await this.$axios.$post(`/api/guildreviews/`, param)
        await this.$sleep(1000)
        this.$store.dispatch('dialog/openDialog', { message: "成功しました！", color:this.$discord_color})
        location.reload()
      }
      catch (err) {
        this.$store.dispatch('dialog/openDialog', { message: "失敗しました...<br>管理者に連絡してください。", color:"red"})
      }
      this.$store.dispatch('loading/endLoading')
    },
    validate () {
      if (!this.$refs.review_form.validate()) return
      this.$store.dispatch('review_dialog/setFunction', this.submit)
      this.$store.dispatch('review_dialog/openDialog', { message: this.message, score:this.score })
    },
    report () {
      if (this.$store.state.auth.loggedIn) {
        this.$store.dispatch('reportguild_dialog/openDialog', this.guild)
      } else {
        this.$store.dispatch('login_dialog/openDialog')
      }
    },
    initdata (guild) {
      this.bg_style = {
        width: "100%",
        height: "100%",
        position: "static",
        background: guild.icon ? `url(https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png)` : "",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
      }
      this.url = `https://dissoku.net/server/${guild.id}`
      this.breadcrumbs= this.$getGuildBread(guild)
    }
  }
}
</script>

<style scoped>
#bg_mask {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}
.guild-card__inner_contents-label {
  display: inline-block;
  padding: 2px 0 2px 5px;
  margin-bottom: 0;
  border-radius: 4px;
  line-height: initial;
  overflow: hidden;
  letter-spacing: normal;
}
.guild-card__inner_contents-label span {
  padding: 2px 10px;
  margin-left: 5px;
  font-weight: bold;
}
.guild-card__inner_contents-label,
.online,
.member,
.emoji {
  color: white;
  background: #7289d9;
}
.guild-card__inner_contents-label.online span {
  background: #4070de;
}
.guild-card__inner_contents-label.member span {
  background: #af76f2;
}

.guild-card__inner_contents-label.emoji span {
  background: #43b581;
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
  color: #43B581;
  transition: 0.4s;
}
#bottom-btn__inner:hover {
  background-color: #43B581 !important;
  opacity: 1;
  box-shadow: none;
  text-decoration: none;
  transition: .3;
  color: #fff;
  border-radius: 10px;
  transition: 0.4s;
  border-color: #43B581 !important;
}

.guild-card__inner_text {
  padding: 2rem;
  background-color: rgba(128,128,128,0.5);
  word-wrap: break-word;
  text-align: left;
}



</style>
