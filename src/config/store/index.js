import makeRootReducer from '../reducers/';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';

export default (initialState = {}) => {
  const logger = createLogger();
  const middleware = [
    promiseMiddleware,
    thunk,
    logger
  ];
  const enhancers = [];

  let composeEnhancers = compose;

  if(__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if(typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.asyncReducers = {};

  return store
}