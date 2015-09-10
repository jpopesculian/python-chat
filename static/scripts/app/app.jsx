import ReactDOM from 'react-dom'
import router from './router'

function bootstrapper(element = null, cb = () => {}) {
  ReactDOM.render(router, element, cb)
}

export default bootstrapper
