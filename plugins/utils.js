const loadupdatemeta = (query) => {
  let data      = {}
  let page_str     = query.page != 1 ? '(' + query.page + 'ページ目)' : ''
  data.head_title    = 'Discordサーバー一覧です！' + page_str
  data.description  = 'Discordサーバーの一覧' + page_str +'です。新しいサーバーや人気なサーバーで気の合う友達がきっと見つかります！Apexやマインクラフトなどのタグ、お好きなキーワードでの検索もできます'
  return data
}

const loadserversmeta = (params, query) => {
  let data      = {}
  let title_arr    = {'member': '人気順', 'like': 'いいね順', 'rank': 'アクティブランキング'}
  let page_str     = query.page != 1 ? '(' + query.page + 'ページ目)' : ''
  data.head_title    = title_arr[params.order] + 'のDiscordサーバー一覧' +  page_str + 'です！'
  if (params.order == 'rank') {
    data.description  = 'アクティブなDiscordサーバーランキングです。たくさんおしゃべりしたい方は活発なサーバーからお気に入りのサーバーを見つけましょう！\
                Apexやマインクラフトなどのタグ、お好きなキーワードでの検索もできます。'
  }
  else {
    data.description  = title_arr[params.order] + 'のDiscordサーバー一覧' + page_str +'です。新しいサーバーや人気なサーバーで気の合う友達がきっと見つかります！Apexやマインクラフトなどのタグ、お好きなキーワードでの検索もできます。'
  }
  return data
}

const loadtagmeta = (params, query) => {
  let data      = {}
  let page_str     = query.page != 1 ? '(' + query.page + 'ページ目)' : ''
  data.head_title    = '「' + params.order + '」のDiscordサーバー一覧' + page_str + 'です！'
  data.description  = params.order + 'のサーバー一覧' + page_str + 'です。Apex・マインクラフト・雑談・相談などのタグで検索して自分にぴったりのサーバー・友達を見つけましょう！'
  return data
}

const loadsearchmeta = query => {
  let data      = {}
  let page_str     = query.page != 1 ? '(' + query.page + 'ページ目)' : ''
  data.head_title    = '「' + query.q + '」のサーバー検索結果' + page_str
  data.description  = '「' + query.q + '」のサーバー検索結果' + page_str + 'です。検索であなたにぴったりのサーバー・友達を見つけましょう！'
  return data
}

const loadprofiletagmeta = (params, query) => {
  let data      = {}
  let page_str     = query.page != 1 ? '(' + query.page + 'ページ目)' : ''
  data.head_title    = '「' + params.order + '」のDiscordフレンド募集一覧' + page_str
  data.description  = params.order + 'のDiscordフレンド募集ー一覧' + page_str + 'です。同じゲームが好きなフレンド募集やチャット友達の募集が掲載されています！\
  性別も分かるのであなたにピッタリの友達がきっと見つかりますよ！Discordのフレンド探しに是非ご利用ください!'
  return data
}

const loadbottagmeta = (params, query) => {
  let data      = {}
  let page_str     = query.page != 1 ? '(' + query.page + 'ページ目)' : ''
  data.head_title    = '「' + params.name + '」のDiscordボットリスト' + page_str
  data.description  = params.name + 'のDiscordボットリスト' + page_str + 'です。ディス速にはDiscordサーバーに導入すると便利・面白いDiscordボットが\
  たくさん掲載されています！あなたのサーバーにぴったりのボットがきっと見つかりますよ！Discordのボット探しはディス速を是非ご利用ください'
  return data
}


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getavatar = (id, avatar) => 'https://cdn.discordapp.com/avatars/' + id + '/' + avatar + '.png'

const writeclipboard = text => navigator.clipboard.writeText(text)

const isURL = str => {
  let url
  try {
    url = new URL(str)
  }
  catch (_) {
    return false
  }
  return url.protocol === "https:"
}

const statusColor = status => {
  if (status == 1) {
    return "green"
  }
  return "red"
}

const statusText = status => {
  if (status == true) {
    return "online"
  }
  return "offline"
}

const noImage = element => {
  element.target.src = '/discord.webp'
}

const getTagColor = id => {
  if (id==1) return "#41B883"
  if (id==2) return "#7E8CC8"
  if (id==3) return "#C8817E"
  if (id==4) return "#11998e"
  if (id==5) return "#C87E92"
  if (id==6) return "#B77EC8"
  if (id==7) return "#7EB9C8"
  return "#41B883"
}

export default (ctx, inject) => {
  const setLikeData = (results) => {
    results.forEach(element => {
      ctx.store.commit(`like/add`, element)
    })
  }
  const getgendercolor = gender => {
    if (gender === ctx.$gender_none) return '#237A57'
    if (gender === ctx.$gender_man) return '#7F7FD5'
    if (gender === ctx.$gender_woman) return '#C779D0'
    return ''
  }
  inject('loadupdatemeta', loadupdatemeta)
  inject('loadserversmeta', loadserversmeta)
  inject('loadtagmeta', loadtagmeta)
  inject('loadsearchmeta', loadsearchmeta)
  inject('sleep', sleep)
  inject('getavatar', getavatar)
  inject('getgendercolor', getgendercolor)
  inject('writeclipboard', writeclipboard)
  inject('loadprofiletagmeta', loadprofiletagmeta)
  inject('loadbottagmeta', loadbottagmeta)
  inject('isURL', isURL)
  inject('statusColor', statusColor)
  inject('statusText', statusText)
  inject('noImage', noImage)
  inject('getTagColor', getTagColor)
  inject('setLikeData', setLikeData)
}