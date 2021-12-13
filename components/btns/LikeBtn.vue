<template>
  <div>
    <v-tooltip
      bottom
      :disabled="$store.state.auth.loggedIn"
    >
      <template #activator="{ on }">
        <div
          style="display:inline;"
          v-on="on"
        >
          <v-btn
            class="px-0"
            :small="Boolean(!islarge)"
            :large="Boolean(islarge)"
            text
            :disabled="!$store.state.auth.loggedIn"
            @click="togglelike(like)"
          >
            <v-icon
              :small="Boolean(!islarge)"
              :medium="Boolean(islarge)"
              :color="getIconColor()"
            >
              {{ getIconMdi() }}
            </v-icon>
            <span
              :style="`color:${getIconColor()}`"
              class="ml-5"
            >{{ like.count }}</span>
          </v-btn>
        </div>
      </template>
      <span>いいねするにはログインしてください</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mdiHeart, mdiHeartOutline } from '@mdi/js'
export default {
  props: {
    data: {
      type: Object,
    },
    islarge: {
      type: Boolean
    },
    type: {
      type: String,
      default: "guild"
    }
  },
  computed: {
    like() {
      return this.$store.state.like.list.find(ele => (ele.type==this.type && ele.id==this.data.id))
    }
  },
  methods: {
    async togglelike (data) {
      try {
        this.$store.commit(`like/toggle`, data)
        await this.$axios.$post(this.like.url)
      }
      catch {
        // pass
      }
    },
    getIconColor() {
      return this.like.is_like ? "#E91E63" : "grey"
    },
    getIconMdi() {
      return this.like.is_like ? mdiHeart : mdiHeartOutline
    }
  }
}
</script>