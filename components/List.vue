<template>
  <v-row class="mb-12">
    <v-col
      v-for="(content, index) in list"
      :key="index"
      cols="12"
      md="6"
      lg="4"
      xl="4"
    >
      <GuildCard
        v-if="content.content_type==='guild'"
        :guild="content"
      />
      <ProfileCard
        v-if="content.content_type==='user'"
        :profile="content"
      />
      <BotCard
        v-if="content.content_type==='bot'"
        :bot="content"
      />
    </v-col>
  </v-row>
</template>



<script>
export default {
  components:{
    GuildCard: () => import('@/components/cards/GuildCard.vue'),
    ProfileCard: () => import('@/components/cards/ProfileCard.vue'),
    BotCard: () => import('@/components/cards/BotCard.vue'),
  },
  props: ['list']
}
</script>
