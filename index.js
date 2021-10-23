/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')

function renderFile(name) {
  const filename = path.join(__dirname, 'dist', 'client', name)

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
    files: [
      {
        name: 'admin.js',
        type: 'main',
        filename: path.join(__dirname, 'dist', 'admin', 'admin.es.js'),
      },
      {
        name: 'admin.css',
        type: 'css',
        filename: path.join(__dirname, 'dist', 'admin', 'style.css'),
      }
    ],
  })
}

exports.render = async ({ url, response }) => {
  let file = url

  if (url === '/') {
    file = 'index.html'
  }

  if (url.includes('.js')) {
    response.type('text/javascript')
  }

  if (url.includes('.css')) {
    response.type('text/css')
  }

  if (url.includes('.svg')) {
    response.type('image/svg+xml')
  }

  const content = renderFile(file)

  if (!content) {
    return response.status(404).send('Not found')
  }

  return content
}
