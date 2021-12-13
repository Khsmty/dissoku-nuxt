<template>
  <div class="text-center">
    <v-pagination
      v-if="data.count"
      v-model="current"
      class="mb-12 pb-12"
      :length="data.total_pages"
      :total-visible="7"
      light
      color="#7289D9"
      @input="getNumber"
    />
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      current: this.data.current_page
    }
  },
  watch: {
    '$route': function () {
      this.current = Number(this.$route.query.page)
    }
  },
  methods: {
    getNumber(newNumber) {
      let query = Object.assign({}, this.$route.query)
      query.page = newNumber
      this.$router.push({ query })
    }
  }
}
</script>