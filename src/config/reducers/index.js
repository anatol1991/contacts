import {combineReducers} from 'redux';
import mainReducer from './mainReducer'

const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    contacts: mainReducer,
    ...asyncReducers
  })
}

export default makeRootReducer;