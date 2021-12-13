<template>
  <v-card
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
      </v-list-item-avatar>
      <v-list-item-content>
        <div
          class="card-title font-weight-bold title pl-5"
          style="text-align:left;"
        >
          <nuxt-link
            :to="'/server/' + guild.id"
            style="color:aliceblue;text-decoration: none;"
            :title="guild.name"
          >
            {{ guild.name }}
          </nuxt-link>
        </div>
        <div class="overline">
          <p class="guild-card__inner_contents-label online ml-5 float-left">
            online<span>{{ guild.onlinenum }}</span>
          </p>
          <p class="guild-card__inner_contents-label member ml-1 float-left">
            member<span>{{ guild.membernum }}</span>
          </p>
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
            v-for="(tag, index) in guild.tags"
            :key="index"
            class="ml-1 mb-1 float-left"
          >
            <GuildTagBtn
              small="true"
              :name="tag.name"
              :categoryid="tag.category"
            />
          </span>
          <BoostChip :guild="guild" />
          <NsfwChip :guild="guild" />
          <NewChip :guild="guild" />
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-card-text
      height="100%"
      class="guild-card__inner_text"
    >
      <div
        style="white-space:pre-wrap;"
        v-text="guild.description"
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
        :href="$app_url + '/api/guilds/' +guild.id+'/join'"
        rel="nofollow"
      >
        参加する
      </v-btn>
    </v-card-actions>
    <v-card-actions
      class="my-0"
      style="height:2rem"
    >
      <v-rating
        v-if="guild.review_cnt"
        class="mb-1"
        :value="guild.score_avg"
        color="yellow darken-3"
        readonly
        half-increments
        size="25"
        dense
      />
      <v-subheader
        v-if="guild.review_cnt"
        class="text-caption ml-1 pa-0"
      >
        {{ guild.review_cnt }} Reviews
      </v-subheader>
      <v-spacer />
      <LikeBtn :data="guild" />
      <v-subheader
        v-if="guild.upped_ago"
        class="text-caption pa-0 ml-1"
        v-text="guild.upped_ago"
      />
    </v-card-actions>
  </v-card>
</template>


<script>
import { mdiAlert , mdiCreation} from '@mdi/js'

export default {
  components: {
    GuildTagBtn: () => import('@/components/btns/GuildTagBtn.vue'),
    LikeBtn    : () => import('@/components/btns/LikeBtn.vue'),
    NsfwChip  : () => import('@/components/btns/NsfwChip.vue'),
    BoostChip  : () => import('@/components/btns/BoostChip.vue'),
    NewChip  : () => import('@/components/btns/NewChip.vue'),
  },
  props: ['guild'],
  data () {
    return {
      mdiAlert: mdiAlert,
      mdiCreation: mdiCreation
    }
  }
}
</script>

<style scoped>
.guild-card__inner_contents-label {
  display: inline-block;
  padding: 2px 0 1px 5px;
  margin-bottom: 0;
  border-radius: 4px;
  line-height: initial;
  overflow: hidden;
  letter-spacing: normal;
}
.guild-card__inner_contents-label span {
  padding: 2px 10px;
  margin-left: 5px;
}
.guild-card__inner_contents-label.online {
  background: #7289D9;
}
.guild-card__inner_contents-label.online span {
  background: #4070DE;
}
.guild-card__inner_contents-label.member {
  background: #7289D9;
}
.guild-card__inner_contents-label.member span {
  background: #AF76F2;
}
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