<template>
  <v-card
    dark
    elevation="3"
    :color="$getgendercolor(profile.gender)"
  >
    <v-list-item
      three-line
      class="pa-0"
    >
      <v-list-item-avatar
        size="80"
        tile
        class="avatar-link mt-0 ml-0 rounded-tl"
        style="background-color:#7289DA;"
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
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <nuxt-link
            :to="'/friend/user/' + profile.uid"
            style="color:aliceblue;text-decoration: none;"
            class="title font-weight-bold float-left ml-5 text-wrap"
          >
            {{ profile.extra_data.username }}
          </nuxt-link>
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-btn
            small
            :ripple="false"
            class="ml-5 float-left"
            @click="$writeclipboard(profile.extra_data.username+'#'+profile.extra_data.discriminator);snackbar = true"
          >
            {{ profile.extra_data.username }}#{{ profile.extra_data.discriminator }}
          </v-btn>
          <v-snackbar
            v-model="snackbar"
          >
            {{ text }}
          </v-snackbar>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="pt-0 pb-1">
      <v-list-item-content>
        <div>
          <span
            v-for="(tag, index) in profile.tags"
            :key="index"
            class="mr-1 mb-1 float-left"
            style="display: inline-block"
          >
            <ProfileTagBtn
              :name="tag.name"
              small="true"
              :categoryid="tag.category"
            />
          </span>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-card-text
      height="100%"
      class="profile-card__inner_text"
    >
      <div
        style="white-space:pre-wrap;"
        v-text="profile.message"
      />
    </v-card-text>
    <v-card-actions
      class="my-0"
      style="height:2rem;background-color:#1E1E1E;"
    >
      <v-spacer />
      <v-subheader
        v-if="profile.upped_ago"
        class="text-caption pa-0 ml-1"
        v-text="profile.upped_ago"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {
    ProfileTagBtn: () => import('@/components/btns/ProfileTagBtn.vue')
  },
  props: ['profile'],
  data() {
    return {
      snackbar: false,
      text: `コピーしました！`
    }
  }
}
</script>

<style scoped>

.profile-card__inner_text {
  padding: 10px 20px;
  text-align: left;
  max-height: 20rem;
  font-size: medium;
  font-weight: bold;
  overflow: auto;
  text-overflow: ellipsis;
  background-color: #1E1E1E;
}

::-webkit-scrollbar{
  width: 8px;
}
::-webkit-scrollbar-track{
  display: none;
}
::-webkit-scrollbar-thumb{
  background: #202225;
  border-radius: 8px;
  box-shadow: none;
}

.avatar-link {
  cursor:pointer;
}

</style>
