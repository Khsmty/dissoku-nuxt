<template>
  <v-container
    class="mt-12"
    fluid
    style="color:#7289D9;"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col>
        <h1>Page Not Found</h1>
        <h2>ページが見つかりません</h2>
        <p>
          URLに間違いないか確認し、再度アクセスを試してください。
        </p>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="8"
        xl="2"
      >
        <v-img src="/discordchan2.webp" />
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="8"
        xl="2"
      >
        <v-btn
          color="#7289DA"
          x-large
          nuxt
          to="/"
        >
          TOPに戻る
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head () {
    return {
      title: 'ページが見つかりません'
    }
  }
}
</script>