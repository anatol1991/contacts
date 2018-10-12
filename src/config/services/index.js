import Contacts from 'react-native-contacts';
import { Alert, Linking } from 'react-native'

const openSettings = () => {
  Linking.openURL('app-settings:');
}

export const checkPermission = () => {
  Contacts.checkPermission(async(err, permission) => {
    if (err) throw err;
    if (permission === 'undefined') {
      Contacts.requestPermission((err, permission) => {console.warn("err: ", err, "permission: ", permission)});
    }
    if (permission === 'authorized') {
      Contacts.getAll((err, contacts) => {
        if(err) throw err;
        console.warn("contacts: ", contacts)
      })
    }
    if (permission === 'denied') {
      Alert.alert('Warning', 'In order to access this application, you need to enable acces to your contacts list.', [
        {
          text: 'Grant Access',
          onPress: () => {
            this.openSettings();
          }
        }
      ])
    }
  })
}