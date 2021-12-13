<template>
  <v-container fluid>
    <v-form
      ref="edit_form"
      :disabled="!!guild.ban_flg || !guild.join_flg"
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
            :to="'/mypage/serverlist'"
            text="サーバー一覧に戻る"
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
            <p><strong class="text-decoration-underline">サーバー編集ページです!</strong></p>
            <p>成人向けコンテンツを含むサーバーの場合<strong class="mx-1">必ずNSFWの設定を行う</strong>ようお願いいたします。</p>
          </v-alert>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        class="pb-12"
      >
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="8"
          xl="6"
        >
          <v-alert
            style="background-color:#2D2D2D;"
            color="#26A69A"
            border="left"
            colored-border
            :class="$vuetify.breakpoint.name != 'xs' ? 'pa-12' : 'pa-6'"
          >
            <v-card-title class="font-weight-bold">
              サーバー編集
            </v-card-title>
            <v-row
              align="center"
              class="mt-5"
            >
              <v-col
                cols="4"
                sm="4"
                md="4"
                lg="4"
                xl="2"
              >
                <v-img
                  v-if="guild.icon"
                  :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`"
                />
                <v-img
                  v-else-if="!guild.icon"
                  src="/discord.webp"
                />
              </v-col>
              <v-col
                cols="12"
                xl="6"
              >
                <h1
                  class="white--text text-h4 font-weight-bold text-decoration-underline"
                  v-text="guild.name"
                />
              </v-col>
              <v-col
                cols="12"
                xl="2"
              >
                <v-btn
                  v-if="guild_url"
                  nuxt
                  :to="guild_url"
                  color="#7289D9"
                  outlined
                >
                  掲載ページを見る
                </v-btn>
              </v-col>
              <v-col
                cols="12"
                xl="10"
                class="my-12"
              >
                <v-combobox
                  v-model="guildtags"
                  :items="tags"
                  :search-input.sync="search"
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
                  v-model="guild.description"
                  color="#7289D9"
                  :rules="desprequired"
                  counter
                  maxlength="1000"
                  height="250"
                  no-resize
                  background-color="#2F3136"
                  type="text"
                  placeholder="テキスト"
                  outlined
                  label="サーバー説明"
                /><br>
              </v-col>
              <v-col
                cols="12"
                xl="10"
              >
                <h3 class="text-left">
                  詳細説明
                </h3>
                <v-subheader>サーバーの詳細説明を入力してください。Markdownが使えます。右にプレビューが表示されます。</v-subheader>
                <Editor
                  v-model="guild.description_detail"
                  style="text-align: left"
                  :emoji="false"
                  :image="false"
                  outline
                /><br>
              </v-col>
              <v-col
                cols="12"
                xl="10"
              >
                <v-switch
                  v-model="guild.display_flg"
                  class="font-weight-bold ma-0 pa-0"
                  hide-details
                  color="#41B883"
                  label="サーバーを公開する"
                  inset
                />
                <v-switch
                  v-model="guild.nsfw_flg"
                  class="font-weight-bold"
                  hide-details
                  color="#41B883"
                  inset
                  label="NSFW(成人向けコンテンツを含むサーバー)"
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
                class="mt-8"
                cols="12"
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
                xl="10"
                class="py-5"
              >
                <v-btn
                  class="float-right"
                  color="red"
                  hide-details
                  @click="openDelDialog"
                >
                  サーバーを削除する
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
import { mdiKeyboardReturn } from '@mdi/js'
import { Editor } from 'vuetify-markdown-editor'

export default {
  components: {
    Editor,
    Loading: () => import('@/components/Loading.vue'),
    MessageDialog: () => import('@/components/dialogs/MessageDialog.vue'),
    SubmitDialog: () => import('@/components/dialogs/SubmitDialog.vue'),
    DelDialog: () => import('@/components/dialogs/DelDialog.vue'),
    BackLink: () => import('@/components/btns/BackLink.vue')
  },
  data () {
    return {
      mdiKeyboardReturn: mdiKeyboardReturn,
      guild:        {
        id: '',
        name: '',
        icon: '',
        display_flg: '',
        description: '',
        description_detail: '',
        nsfw_flg: false,
        tags: '',
      },
      guildtags:      [],
      tags:        [],
      guild_url:      '',
      term:        false,
      search:        '',
      wardcntrules:    [v=>v.filter(tag => tag.length < 21).length == v.length || '20文字以内で入力してください'],
      tagrequired:    [v=>v.length > 0 || '入力してください！'],
      wardrules:      [v=>v.filter(tag => RegExp(/["#$%'\\()*+,./:;<=>@[\]^`{|}~( |　)「」〔〕“”〈〉『』【】＆＊・（）＄＃＠。、？！｀＋￥％＿]/g).test(tag) === false).length == v.length || '使用不可の文字が含まれます(空白・記号)'],
      desprequired:    [v=> !!v || '入力してください!']
    }
  },
  head () {
    return {
      title: 'サーバー編集',
    }
  },
  computed: {
    getcardcls () {
      return this.$vuetify.breakpoint.name == 'xs' ? '' : 'pa-12'
    },
  },
  watch: {
    guildtags (val) {
      val = val.filter(Boolean)
      if (this.guildtags.length != val.length) {
        this.$nextTick(() => this.guildtags = val)
      }
      if (val.length > 5) {
        this.$nextTick(() => this.guildtags.pop())
      }
    },
  },
  created () {
    this.$store.dispatch('dialog/closeDialog')
    this.$store.dispatch('submit_dialog/closeDialog')
    this.$store.dispatch('del_dialog/closeDialog')
  },
  async mounted () {
    try {
      let res_guild    = this.$axios.$get(`/api/guilds/${this.$route.params.guildid}/getmyserver/`)
      let res_all_tags  = this.$axios.$get(`/api/tags/?ordering=name`)
      let guild_data    = await res_guild
      let all_tags    = await res_all_tags
      for (let key in guild_data) {
        if(guild_data[key]) this.guild[key] = guild_data[key]
      }
      if(this.guild.display_flg == true && this.guild.ban_flg != true) {
        this.guild_url = '/server/' + this.guild.id
      }
      this.guild.tags.forEach(value => this.guildtags.push(value.name))
      all_tags.forEach(value => this.tags.push(value.name))
    } catch (err) {
      this.$nuxt.error({statusCode: 400})
    }
  },
  methods :{
    async submit () {
      if(!this.$refs.edit_form.validate()) return
      try {
        this.$store.dispatch('loading/startLoading')
        let param = {
          "description":  this.guild.description,
          "description_detail":  this.guild.description_detail,
          "display_flg":  this.guild.display_flg,
          "tags":      this.guildtags,
          "nsfw_flg":    this.guild.nsfw_flg
        }
        await this.$axios.patch(`/api/guilds/${this.$route.params.guildid}/`, param)
        await this.$sleep(1000)
        this.$store.dispatch('dialog/openDialog', { message: "成功しました！", color:this.$discord_color})
      }
      catch (err) {
        this.$store.dispatch('dialog/openDialog', { message: "失敗しました...<br>管理者に連絡してください。", color:"red"})
      }
      this.$store.dispatch('loading/endLoading')
    },
    async del () {
      try {
        this.$store.dispatch('loading/startLoading')
        await this.$axios.delete(`/api/guilds/${this.$route.params.guildid}?nocache=${new Date().getTime()}`)
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
    validate () {
      if (this.$refs.edit_form.validate()) {
        this.$store.dispatch('submit_dialog/setFunction', this.submit)
        this.$store.dispatch('submit_dialog/openDialog', { title: "サーバー投稿",message: "本当にサーバー内容を投稿しますか？" })
      }
    },
    openDelDialog () {
      this.$store.dispatch('del_dialog/setFunction', this.del)
      this.$store.dispatch('del_dialog/openDialog', { title: "サーバー削除", message: "本当にサーバーを削除しますか？" })
    }
  }
}
</script>

<style scoped>
.back-link:before {
  content: "←";
  padding-left: .4em;
  text-align: center;
}
</style>
