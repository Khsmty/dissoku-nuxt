<template>
  <v-row v-if="reviews.results.length">
    <v-col>
      <v-row
        v-for="(review, index) in reviews.results"
        :key="index"
        style="clear:left;"
      >
        <v-col cols="12">
          <v-card
            outlined
            color="transparent"
            style="border:1px;"
            cols="2"
            xl="1"
          >
            <v-list-item class="pl-0">
              <v-list-item-avatar
                size="80"
                tile
                class="mt-0 ml-0 rounded"
              >
                <v-img
                  :src="$getavatar(review.extra_data.id, review.extra_data.avatar)"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <v-rating
                    length="5"
                    size="45"
                    class="float-left"
                    :value="review.score"
                    color="yellow darken-3"
                    readonly
                  />
                </v-list-item-title>
                <v-list-item-subtitle>
                  <p
                    class="float-left pl-3 font-weight-bold"
                  >
                    {{ review.extra_data.username }}#{{ review.extra_data.discriminator }}
                  </p>
                  <p class="float-left pl-12">
                    {{ review.created_ago }}
                  </p>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text
              ref="reviewText"
              style="text-align:left;white-space: pre-wrap;"
              class="font-weight-bold pl-0 white--text"
              :class="{'review-card__text-close': !isCloseArr[index]}"
              v-text="review.message"
            />
            <v-card-actions>
              <v-spacer />
              <v-btn
                v-show="!!checkHeightOver[index]"
                text
                class="mr-5"
                @click="isCloseArr.splice(index, 1, !isCloseArr[index])"
              >
                {{ !isCloseArr[index] ? 'もっと読む': '閉じる' }}
              </v-btn>
              <LikeBtn
                :data="{ id: review.id }"
                :type="type"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="reviews.results.length && reviews.current_page != reviews.total_pages">
        <v-col>
          <v-btn
            text
            @click="moreReview(reviews.next.replace($app_url, ''))"
          >
            もっと見る
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    LikeBtn : () => import('@/components/btns/LikeBtn.vue'),
  },
  props: ["type"],
  data () {
    return {
      reviews: this.$store.getters[this.$storePath[this.type]['get']](this.$route.params.id),
      isCloseArr: [],
      checkHeightOver: []
    }
  },
  mounted () {
    this.checkisClosed()
  },
  methods: {
    checkisClosed () {
      if (this.$refs.reviewText === void 0) return
      this.$refs.reviewText.forEach((ele, index) => {
        this.isCloseArr.splice(index, 1, !!this.isCloseArr[index])
        this.checkHeightOver.splice(index, 1, ele.clientHeight > 120)
      })
    },
    async moreReview(url) {
      try {
        await this.$store.dispatch(this.$storePath[this.type]['more'], {id:this.$route.params.id, url:url})
        await this.$setLikeData(this.$store.getters[this.$storePath[this.type]['get']](this.$route.params.id).results)
        this.reviews=this.$store.getters[this.$storePath[this.type]['get']](this.$route.params.id)
        this.$nextTick(() => {
          this.checkisClosed()
        })
      } catch (err) {
        // pass
      }
    },
  }
}
</script>

<style scoped>
.review-card__text-close {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  max-height: 7.8rem;
}
</style>