<template>
  <v-container fluid>
    <v-form ref="edit_form">
      <v-row
        justify="center"
        class="pt-5"
      >
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="8"
          xl="6"
        >
          <BackLink
            :to="'/mypage/botlist'"
            text="ボット一覧に戻る"
          />
        </v-col>
      </v-row>
      <v-row
        justify="center"
        class="pt-5"
      >
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="8"
          xl="6"
        >
          <v-alert
            border="left"
            colored-border
            type="warning"
            style="background-color:#2D2D2D;"
            dense
            class="orange--text text-left"
          >
            <p><strong class="text-decoration-underline">ボット編集ページです!</strong></p>
            <p>ボットの所有者のみ編集が可能です。</p>
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="8"
          xl="6"
        >
          <v-alert
            style="background-color:#2D2D2D;"
            :class="$vuetify.breakpoint.name != 'xs' ? 'pa-12' : 'pa-4'"
            color="#26A69A"
            border="left"
            colored-border
          >
            <v-card-title class="font-weight-bold text-decoration-underline text-h5">
              ボット編集
            </v-card-title>
            <v-row
              align="center"
              class="mt-5"
            >
              <v-col
                cols="7"
                sm="2"
                md="2"
                lg="1"
              >
                <v-avatar
                  v-if="bot.avatar"
                  size="100"
                >
                  <v-img :src="$getavatar(bot.id, bot.avatar)" />
                </v-avatar>
                <v-avatar v-else>
                  <v-img src="/discord.webp" />
                </v-avatar>
              </v-col>
              <v-col
                cols="12"
                xl="11"
              >
                <p
                  class="white--text text-h5 font-weight-bold pb-0 mb-0"
                  style="word-break:break-all;"
                >
                  {{ bot.name }}<span class="grey--text">#{{ bot.discriminator }}</span>
                </p>
              </v-col>
              <v-col
                v-if="bot.admin_comment"
                cols="12"
              >
                <v-subheader class="red--text text-decoration-underline">
                  ※申請が却下されました。
                </v-subheader>
                <v-subheader
                  class="red--text"
                  v-text="bot.admin_comment"
                />
              </v-col>
              <v-col
                cols="12"
                xl="8"
                class="mt-12"
              >
                <v-subheader>ボットクライアントID*</v-subheader>
                <p
                  class="float-left ml-4"
                  v-text="bot.id"
                />
              </v-col>
              <v-col
                cols="12"
                xl="10"
                style="width:100%;"
              >
                <v-subheader>ボット招待リンク*</v-subheader>
                <p
                  class="ml-4"
                  style="text-align:left;"
                >
                  <a
                    class="blue--text rel-link text-body-1"
                    target="_blank"
                    :href="bot.invite_link"
                    style="word-break: break-all;"
                  >{{ bot.invite_link }}</a>
                </p>
              </v-col>
              <v-col
                cols="12"
                xl="8"
              >
                <v-subheader>サポートサーバーID</v-subheader>
                <p
                  v-if="bot.support_guild"
                  class="float-left ml-4"
                  v-text="bot.support_guild"
                />
                <p
                  v-else
                  class="ml-4 white--text"
                  style="text-align:left;"
                >
                  設定なし
                </p>
              </v-col>
              <v-col
                cols="12"
                xl="8"
              >
                <v-subheader>サポートサーバー招待リンク</v-subheader>
                <p
                  v-if="bot.support_guild_invite"
                  class="ml-4 white--text"
                  style="text-align:left;"
                >
                  <a
                    class="blue--text rel-link text-body-1"
                    target="_blank"
                    :href="bot.support_guild_invite"
                    style="word-break: break-all;"
                  >{{ bot.support_guild_invite }}</a>
                </p>
                <p
                  v-else
                  class="ml-4 white--text"
                  style="text-align:left;"
                >
                  設定なし
                </p>
              </v-col>
              <v-col
                cols="12"
                xl="10"
              >
                <v-subheader>関連サイトURL</v-subheader>
                <p
                  v-if="bot.website_url"
                  class="ml-4"
                  style="text-align:left;"
                >
                  <a
                    class="blue--text rel-link text-body-1"
                    target="_blank"
                    :href="bot.website_url"
                    style="word-break: break-all;"
                  >{{ bot.website_url }}</a>
                </p>
                <p
                  v-else
                  class="ml-4 white--text"
                  style="text-align:left;"
                >
                  設定なし
                </p>
              </v-col>
              <v-col
                cols="12"
                xl="10"
              >
                <v-subheader>Git</v-subheader>
                <p
                  v-if="bot.git_url"
                  class="ml-4 white--text"
                  style="text-align:left;"
                >
                  <a
                    class="blue--text rel-link text-body-1"
                    target="_blank"
                    :href="bot.git_url"
                    style="word-break: break-all;"
                  >{{ bot.git_url }}</a>
                </p>
                <p
                  v-else
                  class="ml-4 white--text"
                  style="text-align:left;"
                >
                  設定なし
                </p>
              </v-col>
              <v-col
                cols="12"
                xl="10"
                class="my-12"
              >
                <v-combobox
                  v-model="bottags"
                  :items="tags"
                  hide-selected
                  hint="タグは5個まで設定できるよ！"
                  label="タグを選択または作成"
                  multiple
                  persistent-hint
                  small-chips
                  :rules="wardcntrules.concat(wardrules).concat(tagrequired)"
                  color="#7289D9"
                >
                  <template #no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          タグが見つかりません Enterを押してタグを作成しましょう
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
              <v-col
                cols="12"
                xl="10"
              >
                <v-textarea
                  v-model="bot.description"
                  :color="$discord_color"
                  :rules="required"
                  counter
                  maxlength="1000"
                  height="250"
                  no-resize
                  background-color="#2F3136"
                  type="text"
                  placeholder="テキスト"
                  outlined
                  label="ボット説明*"
                /><br>
              </v-col>
              <v-col cols="12">
                <v-switch
                  v-model="bot.display_flg"
                  class="font-weight-bold ma-0 pa-0"
                  hide-details
                  color="#41B883"
                  label="ボットを公開する"
                  inset
                />
                <v-checkbox
                  v-model="term"
                  class="font-weight-bold"
                  hide-details
                  color="#7289D9"
                  style="width:15rem;"
                >
                  <template #label>
                    <div>
                      <v-tooltip>
                        <template #activator="{ on }">
                          <a
                            target="_blank"
                            href="/terms"
                            @click.stop
                            v-on="on"
                          >利用規約</a>
                        </template>
                      </v-tooltip>
                      に同意する
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col
                class="my-8"
                cols="12"
                xl="10"
              >
                <v-btn
                  color="#7289D9"
                  x-large
                  :disabled="!term"
                  hide-details
                  @click="validate"
                >
                  送信する
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
      </v-row>
      <Loading />
      <MessageDialog />
      <SubmitDialog />
    </v-form>
  </v-container>
</template>

<script>

export default {
  components: {
    Loading: () => import('@/components/Loading.vue'),
    MessageDialog: () => import('@/components/dialogs/MessageDialog.vue'),
    SubmitDialog: () => import('@/components/dialogs/SubmitDialog.vue'),
    BackLink: () => import('@/components/btns/BackLink.vue')
  },
  data () {
    return {
      bot: {
        bot_id: '',
        invite_link: '',
        description: '',
        support_guild: '',
        support_guild_invite: '',
        website_url: '',
        tags: [],
        display_flg: false
      },
      bottags:      [],
      tags:        [],
      term:        false,
      new_flg:      true,
      required:      [v => !!v || '入力してください!'],
      wardcntrules:    [v=>v.filter(tag => tag.length < 21).length == v.length || '20文字以内で入力してください'],
      tagrequired:    [v=>v.length > 0 || '入力してください！'],
      wardrules:      [v=>v.filter(tag => RegExp(/["#$%'\\()*+,./:;<=>@[\]^`{|}~( |　)「」〔〕“”〈〉『』【】＆＊・（）＄＃＠。、？！｀＋￥％＿]/g).test(tag) === false).length == v.length || '使用不可の文字が含まれます(空白・記号)'],
    }
  },
  head () {
    return {
      title: 'ボット編集',
    }
  },
  watch: {
    bottags (val) {
      val = val.filter(Boolean)
      if (this.bottags.length != val.length) {
        this.$nextTick(() => this.bottags = val)
      }
      if (val.length > 5) {
        this.$nextTick(() => this.bottags.pop())
      }
    },
  },
  created () {
    this.$store.dispatch('submit_dialog/closeDialog')
    this.$store.dispatch('dialog/closeDialog')
  },
  async mounted () {
    try {
      let bot_data = await this.$axios.$get(`/api/bots/${this.$route.params.bid}/mybot/`)
      let all_tags = await this.$axios.$get(`/api/bottags/?ordering=name`)
      for (let key in bot_data) {
        if(bot_data[key]) this.bot[key] = bot_data[key]
      }
      this.bot.tags.forEach(value => this.bottags.push(value.name))
      all_tags.forEach(value => this.tags.push(value.name))
    }
    catch (err) {
      this.$nuxt.error({statusCode: 400})
    }
  },
  methods :{
    scopebot (str){
      let url
      url = new URL(str)
      let scope = url.searchParams.get('scope')
      return scope.match(/bot/)
    },
    async submit () {
      if(!this.$refs.edit_form.validate()) return
      try {
        this.$store.dispatch('loading/startLoading')
        let param = {
          "description":  this.bot.description,
          "display_flg":  this.bot.display_flg,
          "tags":      this.bottags,
        }
        await this.$axios.patch(`/api/bots/${this.$route.params.bid}/`, param)
        await this.$sleep(1000)
        this.$store.dispatch('dialog/openDialog', { message: "成功しました！", color:this.$discord_color})
      }
      catch (err) {
        let err_msg = "失敗しました...<br>"
        err_msg += err.response.data || '不明なエラーが発生しました。<br>管理者に連絡してください。'
        this.$store.dispatch('dialog/openDialog', { message: err_msg, color: "red"})
      }
      this.$store.dispatch('loading/endLoading')
    },
    validate () {
      if (!this.$refs.edit_form.validate()) return
      this.$store.dispatch('submit_dialog/setFunction', this.submit)
      this.$store.dispatch('submit_dialog/openDialog', { title:"ボット編集", message: "本当にボット内容を投稿しますか。", color:this.$discord_color })
    }
  },

}
</script>

<style scoped>

</style>
