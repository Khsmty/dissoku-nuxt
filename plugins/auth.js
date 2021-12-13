export default function({ $auth }) {
  $auth.onError(() => {
    $auth.logout()
  })
}