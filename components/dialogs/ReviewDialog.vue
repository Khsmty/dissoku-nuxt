<template>
  <v-dialog
    v-model="isActive"
    overlay-opacity="0.6"
    overlay-color="#000"
    class="justify-center"
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
        レビュー
      </v-card-title>
      <v-card-subtitle
        class="text-subtitle-1 pb-12"
        style="text-align:left;"
      >
        <p>本当にレビューを投稿しますか？</p>
        <p class="text-subtitle-2">
          <a
            target="_blank"
            href="/terms"
          >利用規約</a>に則ったレビューをお願いします。
        </p>
        <v-rating
          v-model="score"
          length="5"
          size="50"
          color="yellow darken-3"
          class="mb-3"
          readonly
        />
        <div
          style="white-space: pre-wrap;"
          class="text-subtitle-2 text-left white--text"
          v-text="message"
        />
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
          :color="$discord_color"
          @click="func();closeDialog();"
        >
          投稿する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('review_dialog', [
      'message',
      'score',
      'func',
      'isActive'
    ])
  },
  methods: {
    ...mapActions('review_dialog', [
      'closeDialog'
    ])
  }
}
</script>
