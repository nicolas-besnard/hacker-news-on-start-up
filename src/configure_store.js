import throttle from 'lodash/throttle'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { loadState, saveState } from './local_storage'
import rootReducer from './reducers'

export default function configureStore() {
  const middlewares = [thunkMiddleware]

  if (process.env.NODE_ENV !== `production`) {
    middlewares.push(createLogger())
  }

  const store = createStore(rootReducer, loadState(),
    applyMiddleware(
      ...middlewares
    )
  )

  store.subscribe(throttle(() => {
    saveState(store.getState())
  }, 1000))

  return store
}
