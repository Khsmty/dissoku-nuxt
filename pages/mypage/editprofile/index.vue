<template>
  <v-container>
    <v-form ref="editprofile">
      <v-row
        justify="center"
        class="pt-5"
      >
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="9"
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
            <p><strong class="text-decoration-underline">プロフィール設定ページです!</strong></p>
            <p>※コチラは<strong class="mx-1">プロフィールページ</strong>になります。<br>サーバー投稿を希望の方は<strong class="mx-1">サーバー投稿方法</strong>をご覧ください!</p>
            <p>あなたの<strong class="mx-1">ユーザ名・性別・タグ・フレンド募集メッセージ</strong>はフレンド一覧に表示されます。</p>
            <p>あなたの<strong class="mx-1">プロフィールページ</strong>が作成されます。</p>
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="9"
          xl="6"
          class="pb-12"
        >
          <v-alert
            style="background-color:#2D2D2D;"
            :class="$vuetify.breakpoint.name != 'xs' ? 'pa-12' : 'pa-4'"
            color="#26A69A"
            border="left"
            colored-border
          >
            <v-row class="pt-5">
              <v-col
                class="pb-0 mb-0"
                cols="12"
                xl="2"
              >
                <h2
                  v-if="db_display_flg"
                  class="title font-weight-bold blue--text pl-5"
                  style="text-align:left"
                >
                  掲載中
                </h2>
                <h2
                  v-else-if="!db_display_flg"
                  class="title font-weight-bold red--text pl-5"
                  style="text-align:left"
                >
                  未掲載
                </h2>
              </v-col>
              <v-col xl="3">
                <v-btn
                  v-if="db_display_flg && diff_day(user.upped_at)"
                  color="#41B883"
                  outlined
                  @click="upprofile"
                >
                  表示順をアップする！
                </v-btn>
                <v-btn
                  v-else-if="db_display_flg && user.upped_at"
                  disabled
                  color="#41B883"
                  outlined
                >
                  <Countdown :date="user.upped_at" />後にUP出来ます
                </v-btn>
              </v-col>
              <v-col
                cols="12"
                xl="5"
              >
                <v-btn
                  v-if="db_display_flg && user.uid"
                  nuxt
                  :to="'/friend/user/' + user.uid"
                  color="#7289D9"
                  outlined
                >
                  あなたのページを見る
                </v-btn>
              </v-col>
            </v-row>
            <v-row
              align="center"
              height="30rem"
            >
              <v-col
                cols="7"
                sm="2"
                md="2"
                lg="1"
                xl="1"
              >
                <v-avatar
                  v-if="$store.state.auth.user.avatar"
                  size="100"
                >
                  <v-img :src="$getavatar($store.state.auth.user.id, $store.state.auth.user.avatar)" />
                </v-avatar>
                <v-avatar v-else>
                  <v-img src="/discord.webp" />
                </v-avatar>
              </v-col>
              <v-col
                cols="11"
                xl="8"
              >
                <p class="white--text text-h5 font-weight-bold pb-0 mb-0 ml-12 pl-12 float-left">
                  {{ $store.state.auth.user.username }}<span class="grey--text">#{{ $store.state.auth.user.discriminator }}</span>
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-radio-group v-model="user.gender">
                  <template #label>
                    <div>あなたの性別</div>
                  </template><br>
                  <v-radio
                    style="width:10rem;"
                    label="表示しない"
                    :color="$getgendercolor($gender_none)"
                    :value="$gender_none"
                  />
                  <v-radio
                    style="width:10rem;"
                    label="男性"
                    :color="$getgendercolor($gender_man)"
                    :value="$gender_man"
                  />
                  <v-radio
                    style="width:10rem;"
                    label="女性"
                    :color="$getgendercolor($gender_woman)"
                    :value="$gender_woman"
                  />
                </v-radio-group>
              </v-col>
              <v-col
                cols="12"
                xl="8"
              >
                <v-combobox
                  v-model="usertags"
                  :items="tags"
                  :search-input.sync="search"
                  hide-selected
                  hint="プロフィールに関するタグを5個まで設定してください"
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
                          タグが見つかりません&nbsp;Enterを押してタグを作成しましょう
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
              <v-col
                cols="12"
                xl="8"
                class="mt-12"
              >
                <v-textarea
                  v-model="user.message"
                  color="#7289D9"
                  :rules="usermessage"
                  counter
                  maxlength="500"
                  height="250"
                  no-resize
                  background-color="#2F3136"
                  type="text"
                  placeholder="テキスト"
                  outlined
                  label="フレンド募集メッセージ"
                /><br>
              </v-col>
              <v-col
                cols="12"
                xl="8"
                class="mt-12"
              >
                <v-textarea
                  v-model="user.profile"
                  color="#7289D9"
                  counter
                  maxlength="500"
                  height="250"
                  no-resize
                  background-color="#2F3136"
                  type="text"
                  placeholder="ユーザーページに表示されます(書かなくてもOK！)"
                  outlined
                  label="プロフィール"
                /><br>
              </v-col>
              <v-col
                cols="10"
                xl="6"
              >
                <v-switch
                  v-model="user.display_flg"
                  class="font-weight-bold ma-0 pa-0"
                  hide-details
                  color="#41B883"
                  label="プロフィールを公開する"
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
                cols="10"
                class="ma-auto my-12"
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
              <v-col
                cols="10"
                class="ma-auto my-10"
              >
                <v-btn
                  class="float-right"
                  color="red"
                  hide-details
                  @click="openDelDialog()"
                >
                  プロフィールを削除する
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
      </v-row>
      <Loading />
      <MessageDialog />
      <SubmitDialog />
      <DelDialog />
    </v-form>
  </v-container>
</template>
<script>

export default {
  components: {
    Loading: () => import('@/components/Loading.vue'),
    MessageDialog: () => import('@/components/dialogs/MessageDialog.vue'),
    SubmitDialog: () => import('@/components/dialogs/SubmitDialog.vue'),
    DelDialog: () => import('@/components/dialogs/DelDialog.vue'),
    Countdown: () => import('@/components/Countdown.vue')
  },
  data () {
    return {
      id:          '',
      tags:        [],
      usertags:      [],
      user:        {
        uid:  '', 
        gender:  '1',
        profile:  '',
        message:  '',
        display_flg:  false,
        ban_flg:  false,
        tags:  [],
        upped_at:  ''
      },
      db_display_flg:    false,
      term:        false,
      search:        '',
      wardcntrules:    [v=> v.filter(tag => tag.length < 21).length == v.length || '20文字以内で入力してください'],
      tagrequired:    [v=> v.length > 0 || '入力してください！'],
      wardrules:      [v=> v.filter(tag => RegExp(/["#$%'\\()*+,./:;<=>@[\]^`{|}~( |　)「」〔〕“”〈〉『』【】＆＊・（）＄＃＠。、？！｀＋￥％＿]/g).test(tag) === false).length == v.length || '使用不可の文字が含まれます(空白・記号)'],
      usermessage:    [v=> !!v || '入力してください!']
    }
  },
  head () {
    return {
      title: 'プロフィール編集',
    }
  },
  watch: {
    usertags (val) {
      val = val.filter(Boolean)
      if (this.usertags.length != val.length) {
        this.$nextTick(() => this.usertags = val)
      }
      if (val.length > 5) {
        this.$nextTick(() => this.usertags.pop())
      }
    },
  },
  created() {
    this.$store.dispatch('dialog/closeDialog')
    this.$store.dispatch('submit_dialog/closeDialog')
    this.$store.dispatch('del_dialog/closeDialog')
  },
  async mounted () {
    try {
      let res_profile    = this.$axios.$get('/api/userprofiles/getmyprofile/')
      let res_all_tags  = this.$axios.$get('/api/usertags/?ordering=name')
      let all_tags    = await res_all_tags
      let profile      = await res_profile
      for (let key in profile) {
        if(profile[key]) this.user[key] = profile[key]
      }
      this.db_display_flg = profile.display_flg
      this.user.tags.forEach(value => this.usertags.push(value.name))
      all_tags.forEach(value => this.tags.push(value.name))
    }
    catch (err) {
      this.$nuxt.error({statusCode: 400})
    }
  },
  methods :{
    async submit () {
      if(!this.$refs.editprofile.validate()) return
      try {
        this.$store.dispatch('loading/startLoading')
        let param = {
          "gender":    this.user.gender,
          "profile":    this.user.profile,
          "message":    this.user.message,
          "tags":      this.usertags,
          "display_flg":  this.user.display_flg
        }
        await this.$axios.put('/api/userprofiles/putprofile/', param)
        await this.$axios.$get('/api/userguild_maps/sync/')
        await this.$sleep(1000)
        this.$store.dispatch('dialog/openDialog', { message: "成功しました！", color:this.$discord_color})
      }
      catch (err) {
        await this.$sleep(1000)
        this.$store.dispatch('dialog/openDialog', { message: "失敗しました...<br>管理者に連絡してください。", color:"red"})
      }
      this.$store.dispatch('loading/endLoading')
      this.db_display_flg = this.user.display_flg
    },
    async del () {
      try {
        this.$store.dispatch('loading/startLoading')
        await this.$axios.delete(`/api/userprofiles/${this.user.uid}/`)
        await this.$sleep(1000)
        this.$store.dispatch('dialog/openDialog', { message: "成功しました！", color:this.$discord_color})
        await this.$sleep(2000)
        this.$router.push('/mypage')
      }
      catch (err) {
        this.$store.dispatch('dialog/openDialog', { message: "失敗しました...<br>管理者に連絡してください。", color:"red"})
      }
      this.$store.dispatch('loading/endLoading')
    },
    async upprofile () {
      try {
        this.$store.dispatch('loading/startLoading')
        await this.$axios.patch('/api/userprofiles/upprofile/')
        await this.$sleep(1000)
        this.$store.dispatch('dialog/openDialog', { message: "成功しました！", color:this.$discord_color})
      }
      catch (err) {
        this.$store.dispatch('dialog/openDialog', { message: "失敗しました...<br>管理者に連絡してください。", color:"red"})
      }
      this.$store.dispatch('loading/endLoading')
      this.user.upped_at = new Date()
    },
    validate () {
      if (!this.$refs.editprofile.validate()) return
      this.$store.dispatch('submit_dialog/setFunction', this.submit)
      this.$store.dispatch('submit_dialog/openDialog', { title: "プロフィール", message: "本当にプロフィール内容を投稿しますか？" })
    },
    openDelDialog () {
      this.$store.dispatch('del_dialog/setFunction', this.del)
      this.$store.dispatch('del_dialog/openDialog', { title: "プロフィール削除", message: "本当にプロフィールを削除しますか？" })
    },
    diff_day (val) {
      let dt = new Date()
      let upped_at = new Date(val)
      let diff = (dt.getTime() - upped_at.getTime())/(1000 * 60 * 60 * 24)
      return diff > 1
    },
  }
}
</script>

<style></style>
