<template>
  <v-container
    fluid
    class="py-12"
    style="background-color: #2E2E2E;min-height:100vh;"
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
              v-if="profile.extra_data.avatar"
              :src="$getavatar(profile.uid, profile.extra_data.avatar)"
            />
            <v-img
              v-else-if="!profile.icon"
              src="/discord.webp"
            />
          </v-col>
          <v-col
            cols="12"
            lg="10"
            class="pt-8 pl-8"
          >
            <v-row>
              <v-col>
                <h1 class="float-left text-h4 font-weight-bold title">
                  {{ profile.extra_data.username }}
                </h1>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p class="float-left text-caption mt-2">
                  クリックでコピー!
                </p>
                <v-btn
                  class="float-left" 
                  :color="$getgendercolor(profile.gender)"
                  style="clear: both;"
                  @click="$writeclipboard(profile.extra_data.username+'#'+profile.extra_data.discriminator);snackbar = true"
                >
                  {{ profile.extra_data.username }}#{{ profile.extra_data.discriminator }} 
                </v-btn>
                <v-snackbar
                  v-model="snackbar"
                >
                  {{ text }}
                </v-snackbar>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p class="float-left text-caption mt-2">
                  タグ
                </p>
                <div style="clear:both;">
                  <span
                    v-for="(tag, index) in profile.tags"
                    :key="index"
                    class="mr-1 mb-1 float-left"
                  >
                    <ProfileTagBtn
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
        <v-row>
          <v-card-actions class="float-left">
            <ShareBtns :url="url" />
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
                募集メッセージ
              </v-card-title>
              <v-card-text
                class="profile-card__inner_text"
                v-text="profile.message"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row
          v-if="profile.profile"
          justify="center"
        >
          <v-col>
            <v-card style="clear: both;">
              <v-card-title class="text-caption">
                プロフィール
              </v-card-title>
              <v-card-text
                class="profile-card__inner_text"
                v-text="profile.profile"
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
                color="red"
                @click="report()"
              >
                通報する
              </v-btn>
              <v-subheader
                v-if="profile.upped_ago"
                class="text-caption pa-0 ml-2"
                v-text="profile.upped_ago"
              />
            </v-card-actions>
          </v-col>
        </v-row>
        <div v-if="profile.guilds.length">
          <p
            class="text-caption float-left mb-1 ml-1"
            style="color:#bdbdbd;"
          >
            参加サーバー
          </p>
          <v-divider style="clear:left;" />
        </div>
        <v-row
          style="clear:left;"
          class="pt-5"
        >
          <v-col
            v-for="(guild, index) in profile.guilds"
            :key="index"
            cols="2"
            sm="1"
          >
            <GuildCardSmall :guild="guild" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <Loading />
    <MessageDialog />
    <ReportUserDialog />
    <LoginDialog />
  </v-container>
</template>

<script>
export default {
  components: {
    ProfileTagBtn : () => import('@/components/btns/ProfileTagBtn.vue'),
    BreadCrumb  : () => import('@/components/Breadcrumb.vue'),
    GuildCardSmall   : () => import('@/components/cards/GuildCardSmall.vue'),
    ShareBtns   : () => import('@/components/btns/ShareBtns.vue'),
    Loading     : () => import('@/components/Loading.vue'),
    MessageDialog: () => import('@/components/dialogs/MessageDialog.vue'),
    ReportUserDialog: () => import('@/components/dialogs/ReportUserDialog.vue'),
    LoginDialog: () => import('@/components/dialogs/LoginDialog.vue')
  },
  data() {
    return {
      profile: this.$store.getters['user/get'],
      is_report:    false,
      snackbar: false,
      text: `コピーしました！`
    }
  },
  async fetch (ctx) {
    try {
      await ctx.store.dispatch('user/fetch', ctx.params.uid)
      await ctx.store.dispatch('like/setData', ctx.store.getters['user/get'])
    } catch (err) {
      ctx.error({statusCode: 400})
    }
  },
  head () {
    return {
      title: this.profile.extra_data.username,
      meta: [
        { hid: 'description', name: 'description', content: this.profile.message },
        { hid: 'og:url', property: 'og:url', content: `https://dissoku.net/friend/user/${this.profile.uid}` },
        { hid: 'og:title', property: 'og:title', content: this.profile.extra_data.username },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:description', property: 'og:description', content: this.profile.message },
        { hid: 'og:image', property: 'og:image', content: this.profile.extra_data.avatar ? this.$getavatar(this.profile.uid, this.profile.extra_data.avatar) + '?size=256' : 'https://dissoku.net/favicon.ico' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'ディスコード速報' },
        { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      ]
    }
  },
  created () {
    this.initdata(this.$store.getters['user/get'])
    this.$store.dispatch('reportuser_dialog/closeDialog')
    this.$store.dispatch('dialog/closeDialog')
  },
  methods : {
    report () {
      if (this.$store.state.auth.loggedIn) {
        this.$store.dispatch('reportuser_dialog/openDialog', this.profile)
      } else {
        this.$store.dispatch('login_dialog/openDialog')
      }
    },
    initdata (profile) {
      this.url = `https://dissoku.net/friend/user/${profile.uid}`
      this.breadcrumbs = [
        {
          name: 'ディス速',
          path: '/'
        },
        {
          name: 'フレンド募集',
          path: '/friend'
        },
        {
          name: profile.extra_data.username
        }
      ]
    }
  }
}
</script>

<style scoped>

.profile-card__inner_text {
  text-align: left;
  white-space:pre-wrap;
}

::-webkit-scrollbar{
  width: 8px;
}
::-webkit-scrollbar-track{
  display: none;
}
::-webkit-scrollbar-thumb{
  background: #202225;
  border-radius: 8px;
  box-shadow: none;
}

.avatar-link {
  cursor:pointer;
}

</style>
