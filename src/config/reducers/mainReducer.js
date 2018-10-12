import { contacts } from '../constants'

const ACTION_HANDLERS = {
  [contacts.GET_ALL]: (state, action) => {
    return {
      ...state,
      all: action.payload,
      searching: false
    }
  },
  [contacts.SEARCH]: (state, action) => {
    let newArr = [];
    let newContacts = () => {
      if(!!state.all && state.all.length > 1) {
        state.all.map(item => {
          if(item.phoneNumbers.some(e => e.number.toString().includes(action.payload))) {
            newArr.push(item)
          } else {
            return
          }
        })
      }
    }
    newContacts()
    return {
      ...state,
      all: state.all,
      search: newArr,
      searching: true
    }
  },
  [contacts.CLEAR_SEARCH]: (state, action) => {
    return {
      ...state,
      search: undefined,
      searching: false
    }
  },
  [contacts.GET_ALL_ERROR]: (state, action) => {
    return {
      ...state
    }
  },
  [contacts.SEARCH_ERROR]: (state, action) => {
    return {
      ...state
    }
  },
  [contacts.CLEAR_SEARCH_ERROR]: (state, action) => {
    return {
      ...state
    }
  },
}

const initialState = {};

export default mainReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}