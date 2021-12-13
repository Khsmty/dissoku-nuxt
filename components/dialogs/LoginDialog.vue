<template>
  <v-dialog
    v-model="isActive"
    overlay-opacity="0.6"
    overlay-color="#000"
    max-width="580"
    @click:outside="closeDialog()"
  >
    <v-card
      max-width="800"
      color="#2D2D2D"
    >
      <v-card-title
        class="font-weight-bold headline py-5 pb-7"
        style="text-align:left;"
      >
        ログイン
      </v-card-title>
      <v-card-subtitle
        class="text-subtitle-1 pb-12"
        style="text-align:left;"
      >
        <p class="text-left">
          通報にはログインが必要です<br>
          ログインしますか？
        </p>
      </v-card-subtitle>
      <v-card-actions
        class="py-3"
        style="background-color:#1E1E1E;"
      >
        <v-spacer />
        <v-btn
          text
          depressed
          color="white"
          @click="closeDialog()"
        >
          やめておく
        </v-btn>
        <v-btn
          class="px-4"
          depressed
          :href="`${$app_url}/discordlogin/`"
          :color="$discord_color"
          @click="closeDialog();$cookies.set('dest', $route.path);"
        >
          ログインする
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('login_dialog', [
      'isActive'
    ])
  },
  methods: {
    ...mapActions('login_dialog', [
      'closeDialog'
    ])
  }
}
</script>
