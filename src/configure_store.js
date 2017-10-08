import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { loadState, saveState } from './local_storage';
import throttle from 'lodash/throttle';
import { createLogger } from "redux-logger";

export default function configureStore() {
  const middlewares = [thunkMiddleware];

  if (process.env.NODE_ENV !== `production`) {
    middlewares.push(createLogger());
  }

  const store = createStore(rootReducer, loadState(),
    applyMiddleware(
      ...middlewares
    )
  );

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
}
