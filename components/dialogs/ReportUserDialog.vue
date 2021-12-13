<template>
  <v-dialog
    v-model="isActive"
    overlay-opacity="0.6"
    overlay-color="#000"
    class="justify-center"
    max-width="580"
    @click:outside="closeDialog()"
  >
    <v-card
      max-width="800"
      color="#2D2D2D"
    >
      <v-card-title
        class="font-weight-bold headline py-5 pb-7"
        style="text-align:left;"
      >
        ユーザー通報
      </v-card-title>
      <v-card-subtitle
        class="text-subtitle-1"
        style="text-align:left;"
      >
        <p class="white--text font-weight-bold">
          {{ name }}
        </p>
      </v-card-subtitle>
      <v-card-text>
        <v-form ref="report_form">
          <v-row justify="center">
            <v-col
              cols="12"
              xl="6"
            >
              <v-checkbox
                v-model="check"
                hide-details
                :rules="checkrules.concat(checkvalrules)"
                value="1"
                multiple
                class="mx-2"
                :label="$reportuser_option[0]"
              />
              <v-checkbox
                v-model="check"
                hide-details
                :rules="checkrules.concat(checkvalrules)"
                value="2"
                multiple
                class="mx-2"
                :label="$reportuser_option[1]"
              />
              <v-checkbox
                v-model="check"
                hide-details
                :rules="checkrules.concat(checkvalrules)"
                value="3"
                multiple
                class="mx-2"
                :label="$reportuser_option[2]"
              />
            </v-col>
            <v-col
              cols="12"
              xl="6"
            >
              <v-checkbox
                v-model="check"
                hide-details
                :rules="checkrules.concat(checkvalrules)"
                value="4"
                multiple
                class="mx-2"
                :label="$reportuser_option[3]"
              />
              <v-checkbox
                v-model="check"
                :rules="checkrules.concat(checkvalrules)"
                multiple
                value="5"
                class="mx-2"
                :label="$reportuser_option[4]"
              />
            </v-col>
            <v-col>
              <v-textarea
                v-model="report_text"
                label="詳しい内容"
                counter
                maxlength="200"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions
        class="py-3"
        style="background-color:#1E1E1E;"
      >
        <v-spacer />
        <v-btn
          color="white"
          text
          @click="closeDialog"
        >
          やめておく
        </v-btn>
        <v-btn
          class="px-4"
          depressed
          color="red darken-1"
          @click="closeDialog();submit();"
        >
          通報する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      check:        [],
      report_text:    '',
      checkrules:      [v=>v.length > 0 || '最低一つは選択してください'],
      checkvalrules:    [v=>v.filter((x) => { return ["1","2","3","4","5"].indexOf(x) != -1 }).length === v.length || "不正な値です"]
    }
  },
  computed: {
    ...mapState('reportuser_dialog', [
      'name',
      'id',
      'isActive'
    ])
  },
  methods: {
    ...mapActions('reportuser_dialog', [
      'closeDialog'
    ]),
    async submit () {
      if(!this.$refs.report_form.validate()) return
      this.$store.dispatch('loading/startLoading')
      let data = {
        "user":      this.id,
        "reason":    this.check,
        "reason_text":  this.report_text
      }
      try {
        await this.$axios.$post('/api/userreports/',data)
        await this.$sleep(1000)
        this.$store.dispatch('dialog/openDialog', { message: "完了しました<br>ご協力ありがとうございます", color:"red"})
      }
      catch(err) {
         if (err.response.status==409) {
          this.$store.dispatch('dialog/openDialog', { message: "すでに通報済みです", color:"red"})
        } else {
          this.$store.dispatch('dialog/openDialog', { message: "失敗しました...<br>管理者に連絡してください", color:"red"})
        }
      }
      this.$store.dispatch('loading/endLoading')
    }
  }
}
</script>
