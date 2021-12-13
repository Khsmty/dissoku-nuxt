<template>
  <v-container
    style="background-color:#2F3136;"
    dark
    fluid
    color="#2F3136"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        lg="10"
        xl="9"
      >
        <nuxt-link
          text
          :to="localePath('/')"
          large
          class="float-left"
          style="text-decoration: none;"
        >
          <h1 class="grey--text text-body-1 title font-weight-bold pt-4">
            {{ $t('short_title') }}
          </h1>
        </nuxt-link>
        <div
          v-if="$store.state.auth.loggedIn"
          class="float-right"
        >
          <v-menu
            offset-y
            transition="scale-transition"
          >
            <template #activator="{on}">
              <button v-on="on">
                <v-avatar
                  v-if="$store.state.auth.user.avatar"
                  style="background-color:#7289DA;"
                >
                  <v-img :src="$getavatar($store.state.auth.user.id, $store.state.auth.user.avatar)" />
                </v-avatar>
                <v-avatar v-else>
                  <v-img src="/discord.webp" />
                </v-avatar>
              </button>
            </template>
            <v-list color="#2F3136">
              <v-list-item
                color="#ADADAD"
                nuxt
                :to="localePath('/mypage')"
              >
                <v-icon color="#ADADAD">
                  {{ mdiCog }}
                </v-icon>
                <v-list-item-title><v-subheader>{{ $t('header.mypage') }}</v-subheader></v-list-item-title>
              </v-list-item>
              <v-list-item @click="$auth.logout();">
                <v-icon color="#ADADAD">
                  {{ mdiLogout }}
                </v-icon>
                <v-list-item-title>
                  <v-subheader class="red--text">
                    {{ $t('header.logout') }}
                  </v-subheader>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div
          v-else
          class="float-right pt-0 mt-0"
        >
          <v-btn
            style="text-transform: none"
            height="55"
            color="#5964F2"
            :href="`${app_url}/discordlogin/`"
            rel="nofollow"
            @click="$cookies.set('dest', $route.path);"
          >
            <v-icon large>
              {{ mdiDiscord }}
            </v-icon>
            <span class="ml-2 font-weight-bold">Login</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row
      v-if="$store.state.auth.loggedIn && $route.path.split(&quot;/&quot;)[1]==&quot;mypage&quot;"
      style="height:5rem;"
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        lg="10"
        xl="9"
        class="py-0"
      >
        <v-subheader class="pl-2 text-h6 font-weight-bold">
          <span class="mr-8 white--text">
            <v-icon
              small
              class="pb-1"
            >
              {{ mdiCog }}
            </v-icon>
            マイページ</span>
          <span class="white--text">{{ $store.state.auth.user.username }}</span>#
          <span>{{ $store.state.auth.user.discriminator }}</span>
        </v-subheader>
      </v-col>
    </v-row>
    <v-row
      v-if="$route.path.split(&quot;/&quot;)[1]==&quot;mypage&quot;"
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        lg="10"
        xl="9"
        class="py-0"
      >
        <v-subheader class="pl-2">
          <BackLink
            :to="'/'"
            text="掲示板に戻る"
          />
        </v-subheader>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      class="pb-0"
    >
      <v-col
        cols="12"
        lg="10"
        xl="9"
        class="pb-0"
      >
        <v-tabs
          optional
          background-color="#2F3136"
          :ripple="false"
          color="white"
          class="pb-0 mb-0"
        >
          <v-tab
            v-for="(v, index) in getmenu"
            :key="index"
            exact-active-class="exact-active"
            class="mr-5 px-0"
            nuxt
            exact
            :to="v.to"
            active-class="vtab-active"
            :ripple="false"
          >
            <span class="font-weight-bold mx-0 px-0 text-body-2">
              {{ v.name }}
            </span>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mdiCompass, mdiHumanGreeting, mdiCog, mdiLogout, mdiDiscord } from '@mdi/js'
export default {
  components: {
    BackLink: () => import('@/components/btns/BackLink.vue')
  },
  data () {
    return {
      app_url: process.env.DISSOKUAPP_URL,
      mdiCompass: mdiCompass,
      mdiHumanGreeting: mdiHumanGreeting,
      mdiCog: mdiCog,
      mdiLogout: mdiLogout,
      mdiDiscord: mdiDiscord,
      drawer: false,
      menus: {
        top: {
          name: this.$t('common.server'),
          to: this.localePath('/')
        },
        serverlist: {
          name: this.$t('common.friend'),
          to: this.localePath('/friend')
        },
        bot: {
          name: this.$t('common.bot'),
          to: this.localePath('/bot')
        }
      },
      mypagemenus: {
        top: {
          name: `投稿方法`,
          to: "/mypage"
        },
        serverlist: {
          name: `サーバー一覧`,
          to: "/mypage/serverlist"
        },
        profile: {
          name: `プロフィール`,
          to: "/mypage/editprofile"
        },
        bot: {
          name: "ボット",
          to: "/mypage/botlist"
        }
      }
    }
  },
  computed: {
    getmenu () {
      if(this.$route.path.split("/")[1]=="mypage") return this.mypagemenus
      return this.menus
    },
  }
}
</script>


<style scoped>
.clearText {
  text-indent:100%;
  white-space:nowrap;
  overflow:hidden;
}
.vtab-active {
  color: whitesmoke;
}
.v-tab::before {
  color: white;
  background-color: #2F3136;
  opacity: 0;
}
.theme--dark.v-tabs .v-tab--active::before {
  color: white;
  opacity: 0;
}
.v-tabs {
  transition: 0;
}
.v-tab{
  min-width: 0px;
}
</style>

<style>
.v-slide-group__prev, .v-slide-group__prev--disabled {
  display: none !important;
}
.v-tabs-slider-wrapper {
  transition: none;
}
</style>