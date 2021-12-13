<template>
  <v-card
    dark
    elevation="3"
  >
    <v-list-item
      three-line
      style="background-color: #2D2D2D;"
      class="pa-0"
    >
      <v-list-item-avatar
        size="80"
        tile
        class="avatar-link pa-0 ma-0 rounded-tl"
        @click="$router.push('/bot/' + bot.id)"
      >
        <v-img
          v-if="bot.avatar"
          :src="$getavatar(bot.id, bot.avatar)"
        />
        <v-img
          v-else-if="!bot.avatar"
          src="/discord.webp"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <div
          class="card-title font-weight-bold title pl-5"
          style="text-align:left;"
        >
          <nuxt-link
            :to="'/bot/' + bot.id"
            style="color:aliceblue;text-decoration: none;"
            :title="bot.name"
          >
            {{ bot.name }}
          </nuxt-link>
        </div>
        <div class="ml-5">
          <span class="float-left">
            <v-icon>
              {{ mdiArrowDownBoldBox }}
            </v-icon>
            <span class="white--text font-weight-bold text-body-2 ml-2">{{ bot.invite_cnt }}</span>
          </span>
          <span class="ml-3 float-left">
            <v-icon
              class="mr-2"
              :color="$statusColor(bot.online_status)"
            >
              {{ mdiHeartPulse }}
            </v-icon>
            <span
              :class="`${$statusColor(bot.online_status)}--text`"
              class="font-weight-bold text-body-2"
            >{{ $statusText(bot.online_status) }}</span>
          </span>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-list-item
      style="background-color: #2D2D2D;"
      class="pt-0 pb-1"
    >
      <v-list-item-content>
        <div>
          <span
            v-for="(tag, index) in bot.tags"
            :key="index"
            class="ml-1 mb-1 float-left"
          >
            <BotTagBtn
              small="true"
              :name="tag.name"
              :categoryid="tag.category"
            />
          </span>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-card-text
      height="100%"
      class="guild-card__inner_text"
    >
      <div
        style="white-space:pre-wrap;"
        v-text="bot.description"
      />
    </v-card-text>
    <v-card-actions
      class="my-0"
      style="height:4rem"
    >
      <v-btn
        id="bottom-btn__inner"
        depressed
        target="_blank"
        class="join-btn bottom-btn__inner"
        :href="`${$app_url}/api/bots/${bot.id}/invite/`"
        rel="nofollow"
      >
        招待する
      </v-btn>
    </v-card-actions>
    <v-card-actions
      class="my-0"
      style="height:2rem"
    >
      <v-rating
        v-if="bot.review_cnt"
        class="mb-1"
        :value="bot.score_avg"
        color="yellow darken-3"
        readonly
        half-increments
        size="25"
        dense
      />
      <v-subheader
        v-if="bot.review_cnt"
        class="text-caption ml-1 pa-0"
      >
        {{ bot.review_cnt }} Reviews
      </v-subheader>
      <v-spacer />
      <LikeBtn
        :data="bot"
        :type="'bot'"
      />
    </v-card-actions>
  </v-card>
</template>


<script>
import { mdiArrowDownBoldBox, mdiHeartPulse } from '@mdi/js'
export default {
  components: {
    BotTagBtn: () => import('@/components/btns/BotTagBtn.vue'),
    LikeBtn    : () => import('@/components/btns/LikeBtn.vue')
  },
  props: ['bot'],
  data() {
    return {
      mdiArrowDownBoldBox: mdiArrowDownBoldBox,
      mdiHeartPulse: mdiHeartPulse
    }
  }
}
</script>

<style scoped>
#bottom-btn__inner {
  height: 40px !important;
  width: 80%;
  background-color: #2F3136 !important;
  border-radius: 20px;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0;
  transition: .3;
  color: #43B581;
  transition:0.3s;
  margin: auto;
}

#bottom-btn__inner:hover {
  background-color: #43B581 !important;
  opacity: 1;
  box-shadow: none;
  text-decoration: none;
  transition: .3;
  color: #fff;
  border-radius: 10px;
  transition: 0.3s;
}

.guild-card__inner_text {
  padding: 10px 20px;
  text-align: left;
  max-height: 20rem;
  font-weight: bold;
  font-size: medium;
  overflow: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.card-title{
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 4rem;
}
</style>