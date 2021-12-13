<template>
  <div class="text-wrap">
    <v-alert
      border="left"
      color="#2D2D2D"
      class="text-left"
    >
      <span class="white--text text-decoration-underline">サーバー投稿方法</span><br>
      <ol
        color="#2D2D2D"
        class="text-wrap text-left"
      >
        <li>
          投稿したいサーバーにBOTを招待してください。<br>
        </li>
        <v-divider />
        <li>
          招待を作成したいテキストチャンネルに
          <v-btn
            text
            class="font-weight-bold text-decoration-underline"
            style="color:#7289D9;text-transform: none;"
            @click="$writeclipboard('/dissoku ci');snackbar = true"
          >
            /dissoku ci
          </v-btn>を入力してください。
          （<v-btn
            text
            class="font-weight-bold text-decoration-underline"
            style="color:#7289D9;text-transform: none;"
            @click="$writeclipboard('/dissoku ci');snackbar = true"
          >
            /dissoku ci
          </v-btn> <span style="color:#7289D9">チャンネル名</span><span class="text-body-2">でチャンネル指定も出来ます。</span>）<br>
        </li>
        <v-divider />
        <li>
          コマンドを打つとサーバー一覧に表示されます。<br>サーバーの説明とタグを編集して投稿してみましょう！<br>
        </li>
        <v-divider />
        <li>
          投稿したら<v-btn
            text
            class="text-wrap font-weight-bold text-decoration-underline"
            style="color:#43B581;text-transform: none;"
            @click="$writeclipboard('/dissoku up');snackbar = true"
          >
            /dissoku up
          </v-btn>コマンドで表示順を上にしてください！<br>
        </li>
      </ol>
    </v-alert>
    <v-alert
      border="left"
      colored-border
      type="warning"
      style="background-color:#2D2D2D;"
      dense
      class="orange--text text-left"
    >
      <span class="text-decoration-underline">お知らせ</span><br>
      <strong>コマンドが<span class="mx-2">スラッシュコマンド</span>に変更されました！</strong>
      <v-divider />
      <ul>
        <li>チャンネルの「スラッシュコマンドの使用」を有効にしてください</li>
        <li>アプリは最新版を使用してください</li>
        <li>「入力しながら絵文字、メンション、マークダウン構文をプレビューします」を有効にしてください</li>
      </ul>
    </v-alert>
    <v-alert
      border="left"
      colored-border
      type="error"
      style="background-color:#2D2D2D;"
      dense
      class="red--text text-left"
    >
      ※あなたが管理者以上の権限でないサーバーは一覧に表示されません。<br>
      <v-divider />
      ※BOTが <strong>メッセージを読む 招待を作成する 埋め込みリンク</strong> の権限を持つことを確認してください。<br>
      <v-divider />
      ※<strong>招待リンク</strong>が無効となっている場合があります。<strong>投稿したサーバーの招待が無効</strong>になっていないか確認お願いいたします。<br>
      無効となっていた場合<v-btn
        text
        class="font-weight-bold text-decoration-underline"
        style="color:#7289D9;text-transform: none;"
        @click="$writeclipboard('/dissoku ci');snackbar = true"
      >
        /dissoku ci
      </v-btn>コマンドで
      再度招待を作成してください。
    </v-alert>
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      text: `コピーしました！`
    }
  }
}
</script>

<style scoped>
li{
  margin: 0.5rem 0;
}
</style>