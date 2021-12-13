<template>
  <v-avatar
    tile
    class="avatar-link ma-0"
    :title="profile.extra_data.username"
    @click="$router.push('/friend/user/' + profile.uid)"
  >
    <v-img
      v-if="profile.extra_data.avatar"
      :src="$getavatar(profile.uid, profile.extra_data.avatar)"
    />
    <v-img
      v-else-if="!profile.icon"
      src="/discord.webp"
    />
  </v-avatar>
</template>

<script>
export default {
  props: ['profile']
}
</script>

<style scoped>
.avatar-link {
  cursor:pointer;
}
</style>
