<template>
  <v-avatar
    tile
    class="avatar-link ma-0"
    :title="guild.name"
    @click="$router.push('/server/' + guild.id)"
  >
    <v-img
      v-if="guild.icon"
      :src="'https://cdn.discordapp.com/icons/' + guild.id +'/' + guild.icon + '.png'"
    />
    <v-img
      v-else-if="!guild.icon"
      src="/discord.webp"
    />
  </v-avatar>
</template>


<script>
export default {
  props: ['guild']
}
</script>

<style scoped>
  .avatar-link {
    cursor:pointer;
  }
</style>
