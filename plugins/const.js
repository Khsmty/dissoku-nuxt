export default (ctx, inject) => {
  const reportserver_option = [
    '不快なサーバー名・テキスト',
    'サーバー・サーバー掲載ページの不適切利用',
    '誹謗中傷・プライバシーの侵害',
    'Discordの利用規約に違反している',
    'その他'
  ]
  const reportuser_option = [
    '不快なユーザー名・テキスト',
    'フレンド募集・プロフィールページの不適切利用',
    '誹謗中傷・プライバシーの侵害',
    'Discordの利用規約に違反している',
    'その他'
  ]
  const reportbot_option = [
    '不快なボット名・テキスト',
    'ボットページの不適切利用',
    '誹謗中傷・プライバシーの侵害',
    'Discordの利用規約に違反している',
    'その他'
  ]
  const discord_api = "https://discordapp.com/api/"
  const app_url = process.env.DISSOKUAPP_URL
  const gender_none = 1
  const gender_man = 2
  const gender_woman = 3
  const discord_color = "#7289D9"
  const storePath = {
    guildreview: {
      get: 'guild_review/getById',
      more: 'guild_review/more',
    },
    botreview: {
      get: 'bot_review/getById',
      more: 'bot_review/more',
    },
  }
  inject('reportserver_option', reportserver_option)
  inject('reportuser_option', reportuser_option)
  inject('reportbot_option', reportbot_option)
  inject('discord_api', discord_api)
  inject('app_url', app_url)
  inject('gender_none', gender_none)
  inject('gender_man', gender_man)
  inject('gender_woman', gender_woman)
  inject('discord_color', discord_color)
  inject('storePath', storePath)
}