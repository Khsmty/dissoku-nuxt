export default function({ $axios , app}) {
  $axios.onRequest((config) => {
    if(typeof app.$cookies.get('auth._token.local') != 'undefined'){
      $axios.defaults.headers.common['Authorization'] = app.$cookies.get('auth._token.local')
    }
    return config
  })
}