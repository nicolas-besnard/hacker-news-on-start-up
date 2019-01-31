import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root.jsx'
import * as serviceWorker from './serviceWorker'

import './style.css'

ReactDOM.render(<Root />, document.getElementById('root'))
serviceWorker.unregister()
