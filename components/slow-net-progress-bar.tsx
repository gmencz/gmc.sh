import Router from 'next/router'
import NProgress from 'nprogress'

let timer: NodeJS.Timeout
let state: 'loading' | 'stop'
const activeRequests = 0
const delay = 300

function load() {
  if (state === 'loading') {
    return
  }

  state = 'loading'

  timer = setTimeout(function () {
    NProgress.start()
  }, delay) // only show progress bar if it takes longer than the delay
}

function stop() {
  if (activeRequests > 0) {
    return
  }

  state = 'stop'

  clearTimeout(timer)
  NProgress.done()
}

Router.events.on('routeChangeStart', load)
Router.events.on('routeChangeComplete', stop)
Router.events.on('routeChangeError', stop)

function SlowNetProgressBar() {
  return null
}

export default SlowNetProgressBar
