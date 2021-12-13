<template>
  <v-footer
    padless
    absolute
    class="mt-12"
  >
    <v-card
      class="flex"
      flat
      tile
      color="#2F3136"
    >
      <v-card-title class="justify-center py-2">
        <nuxt-link
          text
          to="/terms"
          large
          style="text-decoration: none;"
        >
          <v-subheader>{{ $t('footer.terms') }}</v-subheader>
        </nuxt-link>
        <nuxt-link
          text
          to="/privacy"
          large
          style="text-decoration: none;"
        >
          <v-subheader>{{ $t('footer.privacy') }}</v-subheader>
        </nuxt-link>
        <a
          style="text-decoration: none;"
          href="https://discord.gg/Hj5KNY3"
        ><v-subheader>{{ $t('footer.support') }}</v-subheader></a>
        <a
          style="text-decoration: none;"
          href="https://twitter.com/dissokunet"
        ><v-subheader>{{ $t('footer.twitter') }}</v-subheader></a>
      </v-card-title>
      <v-card-text class="py-2 text-center">
        {{ new Date().getFullYear() }} — <strong>{{ $t('title') }}</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
