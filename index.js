/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')

function renderFile(name) {
  const filename = path.join(__dirname, 'dist', name)

  const exist = fs.existsSync(filename)

  if (!exist) {
    return null
  }

  return fs.readFileSync(filename, 'utf-8')
}

exports.start = async () => {
  await space.emit('page:store', {
    name: 'youtube-theme-settings',
    label: 'Theme settings',
    filename: path.join(__dirname, 'admin', 'settings.vue'),
  })
}

exports.render = async ({ url, headers }) => {
  let file = url

  if (url === '/') {
    file = 'index.html'
  }

  if (url.includes('.js')) {
    headers.set('Content-type', 'text/javascript')
  }

  if (url.includes('.css')) {
    headers.set('Content-type', 'text/css')
  }

  if (url.includes('.svg')) {
    headers.set('Content-type', 'image/svg+xml')
  }

  const content = renderFile(file)

  return content || '404'
}
