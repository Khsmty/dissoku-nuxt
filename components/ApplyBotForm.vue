<template>
  <v-container fluid>
    <v-form
      ref="edit_form"
      :disabled="bot.status==3"
    >
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
            <p><strong class="text-decoration-underline">ボット申請ページです!</strong></p>
            <p>ボットの所有者のみ申請が可能です。</p>
            <p>運営が申請を確認します。承認まで少々お待ち下さい！</p>
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
              ボット申請
            </v-card-title>
            <v-row
              align="center"
              class="mt-5"
            >
              <v-col
                v-if="!new_flg"
                cols="4"
                sm="4"
                md="4"
                lg="4"
                xl="2"
              >
                <v-img
                  v-if="bot.avatar"
                  :src="$getavatar(bot.bot_id, bot.avatar)"
                />
                <v-img
                  v-else-if="!bot.avatar"
                  src="/discord.webp"
                />
              </v-col>
              <v-col
                v-if="!new_flg"
                cols="12"
                xl="6"
              >
                <h1
                  class="grey--text text-h4 font-weight-bold"
                  v-text="bot.username"
                />
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
                <v-text-field
                  v-model="bot.bot_id"
                  placeholder="123456789123456789"
                  background-color="#2F3136"
                  outlined
                  :color="$discord_color"
                  maxlength="18"
                  :rules="required.concat(idrule)"
                  :disabled="!new_flg"
                />
              </v-col>
              <v-col
                cols="12"
                xl="10"
              >
                <v-subheader>ボット招待リンク*</v-subheader>
                <v-text-field
                  v-model="bot.invite_link"
                  placeholder="https://"
                  outlined
                  background-color="#2F3136"
                  :color="$discord_color"
                  :rules="required.concat(urlrule)"
                />
              </v-col>
              <v-col
                cols="12"
                xl="8"
              >
                <v-subheader>サポートサーバーID</v-subheader>
                <v-text-field
                  v-model="bot.support_guild"
                  placeholder="123456789123456789"
                  outlined
                  background-color="#2F3136"
                  :color="$discord_color"
                  maxlength="18"
                  :rules="idrule"
                />
              </v-col>
              <v-col
                cols="12"
                xl="8"
              >
                <v-subheader>サポートサーバー招待リンク</v-subheader>
                <v-text-field
                  v-model="bot.support_guild_invite"
                  placeholder="https://"
                  outlined
                  background-color="#2F3136"
                  :color="$discord_color"
                  :rules="urlrule"
                />
              </v-col>
              <v-col
                cols="12"
                xl="10"
              >
                <v-subheader>関連サイトURL</v-subheader>
                <v-text-field
                  v-model="bot.website_url"
                  placeholder="https://"
                  outlined
                  background-color="#2F3136"
                  :color="$discord_color"
                  :rules="urlrule"
                />
              </v-col>
              <v-col
                cols="12"
                xl="10"
              >
                <v-subheader>GitリポジトリURL(オープンソースの場合)</v-subheader>
                <v-text-field
                  v-model="bot.git_url"
                  placeholder="https://"
                  outlined
                  background-color="#2F3136"
                  :color="$discord_color"
                  :rules="urlrule"
                />
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
                  label="ボット説明(詳しい使い方やヘルプコマンドを記入してください)*"
                /><br>
              </v-col>
              <v-col cols="12">
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
        admin_comment: ''
      },
      term:        false,
      new_flg:      true,
      required:      [v => !!v || '入力してください!'],
      idrule:        [v => (!v || /^\d+$/.test(v) )|| '半角数字のみ入力可能です'],
      urlrule:      [v => (!v || this.$isURL(v)) || 'URLの形式で入力してください(https)'],
    }
  },
  head () {
    return {
      title: 'ボット申請',
    }
  },
  created () {
    this.$store.dispatch('submit_dialog/closeDialog')
    this.$store.dispatch('dialog/closeDialog')
  },
  async mounted () {
    try {
      if (this.$route.params.bid) {
        this.bot = await this.$axios.$get(`/api/botrequests/${this.$route.params.bid}/`)
        this.new_flg = false
      }
    } catch (err) {
      this.$nuxt.error({statusCode: 400})
    }
  },
  methods :{
    scopebot (str) {
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
          "bot_id": this.bot.bot_id,
          "invite_link": this.bot.invite_link,
          "description": this.bot.description,
          "support_guild": this.bot.support_guild,
          "support_guild_invite": this.bot.support_guild_invite,
          "website_url": this.bot.website_url,
          "git_url": this.bot.git_url
        }
        if (this.new_flg) {
          await this.$axios.post(`/api/botrequests/`, param)
        }
        else {
          await this.$axios.patch(`/api/botrequests/${this.$route.params.bid}/`, param)
        }
        await this.$sleep(1000)
        this.$store.dispatch('dialog/openDialog', { message: "成功しました！", color: this.$discord_color})
        await this.$sleep(2000)
        this.$router.push('/mypage/botlist')
      } catch (err) {
        let err_msg = "失敗しました...<br>不明なエラーが発生しました。<br>管理者に連絡してください。"
        if (err.response.status == 460) {
          err_msg = "ボット情報が確認できませんでした<br>ボットクライアントIDを確認してください"
        }
        this.$store.dispatch('dialog/openDialog', { message: err_msg, color: "red" })
      }
      this.$store.dispatch('loading/endLoading')
    },
    validate () {
      if (!this.$refs.edit_form.validate()) return
      this.$store.dispatch('submit_dialog/setFunction', this.submit)
      this.$store.dispatch('submit_dialog/openDialog', { title:"ボット申請", message: "ボット内容を送信します。よろしいですか？", color:this.$discord_color })
    }
  },

}
</script>
