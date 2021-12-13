<template>
  <v-dialog
    v-model="isActive"
    max-width="580"
    @click:outside="closeDialog()"
  >
    <v-card color="#2D2D2D">
      <v-card-text
        class="py-8"
        style="background-color:#1E1E1E;"
        :style="{color:color}"
        v-html="message"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('dialog', [
      'message',
      'color',
      'isActive'
    ])
  },
  methods: {
    ...mapActions('dialog', [
      'closeDialog'
    ])
  }
}
</script>
