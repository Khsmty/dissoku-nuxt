<template>
  <v-container
    style="height:100%;"
    class="py-12 my-12"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        xl="8"
      >
        <h1>プライバシーポリシー</h1>
        <p>最終更新日: 2021/08/30</p>

        <div style="text-align:left;">
          <v-list color="#36393F">
            <p>ディスコード速報運営 (以下、「当運営」といいます。) は、このウェブサイトと Discord ボット「ディス速#2894」上で提供するサービス (以下、「本サービス」といいます。) における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー (以下、「本ポリシー」といいます。) を定めます。</p>

            <v-list-item>
              <v-list-item-subtitle>第1条 (個人情報の収集)</v-list-item-subtitle>
            </v-list-item>

            <p>当運営は、ユーザーが利用登録をする際に Discord のユーザー名, ユーザー ID, アバター画像等の情報を収集します。</p>

            <v-list-item>
              <v-list-item-subtitle>第2条 (個人情報を収集・利用する目的)</v-list-item-subtitle>
            </v-list-item>

            <p>当運営が個人情報を収集・利用する目的は、以下のとおりです。</p>

            <ul>
              <li>当運営サービスの提供・運営のため</li>
              <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
              <li class="bottom-margin">
                上記の利用目的に付随する目的
              </li>
            </ul>

            <v-list-item>
              <v-list-item-subtitle>第3条 (利用目的の変更)</v-list-item-subtitle>
            </v-list-item>

            <p>当運営は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。</p>
            <p>利用目的の変更を行った場合には、変更後の目的について、当運営所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。</p>

            <v-list-item>
              <v-list-item-subtitle>第4条 (プライバシーポリシーの変更)</v-list-item-subtitle>
            </v-list-item>

            <p>本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。</p>
            <p>当運営が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。</p>
          </v-list>
        </div>
        <v-subheader class="float-right pb-12 mb-12">
          以上
        </v-subheader>
      </v-col>
    </v-row>
    <Footer />
  </v-container>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  components:{
    Footer
  },
  head () {
    return {
      title: 'プライバシーポリシー'
    }
  }
}
</script>

<style scoped>
ul .bottom-margin {
  margin-bottom: 16px;
}
</style>