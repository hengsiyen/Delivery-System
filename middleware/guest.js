export default function ({ store, redirect }) {
  if (process.client && store.state.user.data === null) {
    const _token = localStorage.getItem(process.env.VUE_APP_TOKEN)
    if (_token) {
      return redirect('/admin')
    }
  }
  return redirect()
}
