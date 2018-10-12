import Contacts from 'react-native-contacts';
import { contacts } from '../constants'

export const getAllContacts = () => async(dispatch) => {
  try {
    Contacts.getAll((error, response) => {
      if (error) throw error;
      dispatch({type: contacts.GET_ALL, payload: response})
    });
  } catch (error) {
    dispatch({type: contacts.GET_ALL_ERROR, payload: error})
  }
}

export const searchContacts = (number) => async(dispatch) => {
  try {
    dispatch({type: contacts.SEARCH, payload: number})
  } catch (error) {
    dispatch({type: contacts.SEARCH_ERROR, payload: error})
  }
}

export const clearSearch = () => async(dispatch) => {
  try {
    dispatch({type: contacts.CLEAR_SEARCH})
  } catch (error) {
    dispatch({type: contacts.CLEAR_SEARCH_ERROR, payload: error})
  }
}