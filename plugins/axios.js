export default function ({ $axios, redirect, $cookies }) {
  const _token = $cookies.get(process.env.VUE_APP_TOKEN)
  if (_token) {
    $axios.setHeader('Authorization', 'Bearer ' + _token)
    $axios.setHeader('Accept', 'application/json')
  }

  $axios.onResponse((response) => {

  })

  $axios.onResponseError((error) => {
    console.error(error)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/admin/notfound')
    } else if (code === 403) {
      redirect('/admin/unauthorized')
    }
  })
}
