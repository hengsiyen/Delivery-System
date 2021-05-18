export default ({
  $axios,
  url,
  params,
  filename
}) => {
  return new Promise((resolve, reject) => {
    $axios({
      method: 'POST',
      url,
      params,
      responseType: 'blob'
    }).then(function (response) {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
      })
      const aEle = document.createElement('a') // Create a label
      const href = window.URL.createObjectURL(blob) // Create downloaded link
      aEle.href = href
      aEle.download = filename // File name after download
      document.body.appendChild(aEle)
      aEle.click() // Click to download
      document.body.removeChild(aEle) // Download complete remove element
      window.URL.revokeObjectURL(href) // Release blob object
      resolve(filename)
    }).catch(error => reject(error))
  })
}
