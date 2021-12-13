<template>
  <v-container
    fluid
    class="py-12 px-0"
    style="height:100%;"
  >
    <v-row
      justify="center"
      class="pb-12 mb-12"
    >
      <v-col
        cols="12"
        lg="7"
        xl="7"
      >
        <adsbygoogle ad-slot="2985706475" />
      </v-col>
      <v-col
        cols="12"
        lg="7"
        xl="7"
        class="pb-12"
      >
        <v-btn
          target="_blank"
          color="#7289D9"
          x-large
          :href="`${$app_url}/addbot`"
          @click="$cookies.set('dest', '/mypage');"
        >
          ボットを招待する
        </v-btn>
      </v-col>
      <v-col
        cols="11"
        lg="7"
        xl="7"
      >
        <MyGuildAlert />
      </v-col>
    </v-row>
    <Footer />
  </v-container>
</template>

<script>

export default {
  name: 'MyPage',
  components: {
    Footer: () => import('@/components/Footer.vue'),
    MyGuildAlert: () => import('@/components/MyGuildAlert.vue')
  },
  head () {
    return {
      title: 'マイページ',
    }
  },
  mounted ()
  {
    if(!this.$store.state.auth.loggedIn) {
      this.$nuxt.error({statusCode: 400})
    }
  }

}
</script>
