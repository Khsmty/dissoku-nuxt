<template>
  <Loading :is-loading="isLoading" />
</template>

<script>
export default {
  components: {
    Loading: () => import('@/components/Loading.vue'),
  },
  data () {
    return {
      isLoading:  true,
      code:    '',
    }
  },
  async mounted () {
    try {
      if (this.$route.query.error) {
        this.$router.push('/')
      }
      let token = await this.$axios.$get('/gettoken/?code='+this.$route.query.code)
      this.getjwt(token)
    }
    catch (err) {
      this.$nuxt.error({statusCode: 400})
    }
  },
  methods :{
    async getjwt(res) {
      try {
        let data = {
          "access_token": res.access_token,"code": this.$route.query.code
        }
        let jwt = await this.$axios.$post('/rest-auth/discord/',data)
        this.$auth.setUserToken(jwt.token)
        this.$auth.fetchUser()
        try {
          await this.$axios.$get('/api/userguild_maps/sync/')
        } catch {
          // pass
        }
        window.location.href = this.$cookies.get('dest')
      }
      catch {
        this.$nuxt.error({statusCode: 400})
      }
    }
  }
}
</script>