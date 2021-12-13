<template>
  <v-container
    class="py-12"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
        lg="10"
        xl="9"
      >
        <v-alert
          border="left"
          colored-border
          type="error"
          style="background-color:#1E1E1E;"
        >
          <p
            class="red--text darken-1 ma-5 text-h4 font-weight-bold"
            color="red darken-1"
            style="text-align: left;"
          >
            ボット通報
          </p>
          <p
            class="title text-h6 my-5 ml-6 font-weight-bold"
            style="text-align: left;"
          >
            {{ name }}
          </p>
          <v-form ref="report_form">
            <p style="text-align: left;">
              該当する項目を選択してください
            </p>
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
                  :label="options[1]"
                />
                <v-checkbox
                  v-model="check"
                  hide-details
                  :rules="checkrules.concat(checkvalrules)"
                  value="2"
                  multiple
                  class="mx-2"
                  :label="options[2]"
                />
                <v-checkbox
                  v-model="check"
                  hide-details
                  :rules="checkrules.concat(checkvalrules)"
                  value="3"
                  multiple
                  class="mx-2"
                  :label="options[3]"
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
                  :label="options[4]"
                />
                <v-checkbox
                  v-model="check"
                  :rules="checkrules.concat(checkvalrules)"
                  multiple
                  value="5"
                  class="mx-2"
                  :label="options[5]"
                />
              </v-col>
            </v-row>
            <v-textarea
              v-model="report_text"
              label="詳しい内容"
              counter
              maxlength="200"
            />
          </v-form>
          <v-row justify="center">
            <v-btn
              class="ma-5 red darken-3"
              x-large
              @click="submit"
            >
              送信する
            </v-btn>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
    <Loading :is-loading="isLoading" />
    <v-dialog
      v-model="dialogcomp"
      max-width="290"
    >
      <v-card max-width="800">
        <v-card-title class="headline" />
        <v-card-text
          v-if="ok"
          class="red--text"
        >
          完了しました<br>ご協力ありがとうございます
        </v-card-text>
        <v-card-text
          v-else
          class="red--text"
        >
          失敗しました...<br>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

export default {
  components: {
    Loading: () => import('@/components/Loading.vue'),
  },
  data () {
    return {
      valid:        true,
      data:        [],
      name:        '',
      check:        [],
      report_text:    '',
      options:      {},
      ok:          false,
      isLoading:      false,
      dialogcomp:      false,
      checkrules:      [v=>v.length > 0 || '最低一つは選択してください'],
      checkvalrules:    [v=>v.filter((x) => { return ["1","2","3","4","5"].indexOf(x) != -1 }).length === v.length || "不正な値です"]
    }
  },
  head () {
    return {
      title: '通報',
    }
  },
  async mounted ()
  {
    if(!this.$store.state.auth.loggedIn)
    {
      this.$nuxt.error({statusCode: 400})
    }
    try
    {
      this.data  = await this.$axios.$get(`/api/bots/${this.$route.params.id}`)
      this.name = `${this.data.name}#${this.data.discriminator}`
      this.options = this.$botreport_option
    }
    catch(err)
    {
      this.$nuxt.error({statusCode: 400})
    }
  },
  methods :{
    async submit ()
    {
      if(!this.$refs.report_form.validate()) return
      this.isLoading  = true
      this.ok      = true
      let data = {
        "bot":    this.$route.params.id,
        "reason":    this.check,
        "reason_text":  this.report_text
      }
      try {
        await this.$axios.$post('/api/botreports/',data)
      }
      catch(err) {
        this.ok=false
      }
      await this.$sleep(1000)
      this.isLoading  = false
      this.dialogcomp  = true
    }
  }
}
</script>
