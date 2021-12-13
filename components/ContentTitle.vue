<template>
  <v-subheader class="pl-0 ml-0 title mt-8 font-weight-bold float-left text-h6 content-ttl white--text">
    {{ title }}
  </v-subheader>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
.content-ttl:hover{
  text-decoration: underline;
}
</style>