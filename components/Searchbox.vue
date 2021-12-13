<template>
  <v-text-field
    v-model="keyword"
    class="px-0 ma-0"
    solo-inverted
    :label="$t('common.search_server')"
    type="text"
    hide-details
    style="min-width:150px;"
    @keyup.enter="submit"
  >
    <template
      id="append-outer"
      #append-outer
      class="pa-0 ma-0"
    >
      <button
        style="width:6rem;height: 3rem;background-color: #2D2D2D;"
        class="search-btn"
        height="3rem"
        width="6rem"
        @click="submit"
      >
        <v-icon class="search-btn-icon">
          {{ mdiMagnify }}
        </v-icon>
      </button>
    </template>
  </v-text-field>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
export default {
  data () {
    return {
      keyword: '',
      mdiMagnify: mdiMagnify
    }
  },
  watchQuery: true,
  mounted () {
    if(this.$route.query.q) {
      this.keyword = this.$route.query.q
    }
  },
  methods: {
      submit () {
        let keyword_arr = this.keyword.replaceAll("　"," ").split(" ").filter(Boolean).map(encodeURIComponent)
        if(keyword_arr.length) {
          this.$router.push('/search/result?q='+keyword_arr.join('+')+'&page=1')
        }
        else {
          this.$router.push('/search')
        }
      }
    }
}
</script>

<style scoped>
  .search-btn{
    border-top-right-radius : 2.8px;
    -webkit-border-top-right-radius: 2.8px;
    border-bottom-right-radius : 2.8px;
    -webkit-border-bottom-right-radius: 2.8px;
    box-shadow: 0 1.5px 0 rgba(0,0,0,0.4);
    outline: 0;

  }
  .search-btn-icon{
    color: #C3C4C6;
  }
  .search-btn:hover .search-btn-icon{
    color: white;
  }
</style>
