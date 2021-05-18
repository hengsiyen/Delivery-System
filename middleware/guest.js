export default function ({ store, $storage, redirect }) {
  const _token = $storage.getLocalStorage(process.env.VUE_APP_TOKEN)
  if (_token && (store.state && store.state.user && store.state.user.data)) {
    return redirect('/admin')
  }
  return redirect()
}
