export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.info('Making request to ' + config.url)
  })

  $axios.onResponse((response) => {
    console.log(response.data)
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
