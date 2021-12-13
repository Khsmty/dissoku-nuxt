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
            <BreadCrumb :breadcrumbs="breadcrumbs" />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <v-subheader class="pl-0">
              <h1>
                <span class="text-h5 font-weight-bold text-decoration-underline mr-1">{{ title }}</span>
                <span class="text-h6">タグのついたDiscordフレンド募集</span>
              </h1>
            </v-subheader>
          </v-col>
        </v-row>
        <Count
          :data="profile"
          type="profile"
        />
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
            <List :list="profile.results" />
          </v-col>
        </v-row>
        <Pagination :data="profile" />
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
    Count: () => import('@/components/Count.vue'),
    Pagination: () => import('@/components/btns/Pagination.vue'),
    Footer: () => import('@/components/Footer.vue'),
    BreadCrumb  : () => import('@/components/Breadcrumb.vue')
  },
  async asyncData ({app, $axios, params, query, error})
  {
    try
    {
      let data    = {}
      let res_profile = $axios.$get(`/api/userprofiles/?tags__name=${encodeURIComponent(params.order)}&ordering=-upped_at&page=${query.page}`)
      data.meta_data  = app.$loadprofiletagmeta(params, query)
      data.profile  = await res_profile
      data.breadcrumbs= [
        {
          name: 'ディス速',
          path: '/'
        },
        {
          name: 'フレンド募集',
          path: '/friend'
        },
        {
          name: 'タグ「'+params.order+'」のついている募集一覧'
        }
      ]
      return data
    }
    catch(err)
    {
      error({statusCode: 400})
    }
  },
  data () {
    return {
      profile:    [],
      title:    this.$route.params.order,
      meta_data:  {}
    }
  },
  head () {
    return {
      title: this.meta_data.head_title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta_data.description}
      ]
    }
  },
  watchQuery: true
}
</script>
