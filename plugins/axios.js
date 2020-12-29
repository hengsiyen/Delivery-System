export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    const _token = localStorage.getItem(process.env.VUE_APP_TOKEN)
    $axios.setHeader('Authorization', 'Bearer ' + _token)
    $axios.setHeader('Accept', 'application/json')
  })

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
