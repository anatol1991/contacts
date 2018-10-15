import Contacts from 'react-native-contacts';
import { Alert, Linking, PermissionsAndroid } from 'react-native'

export const openSettings = () => {
  Linking.openURL('app-settings:');
};

const permissionAction = Alert.alert(
  'Warning',
  'In order to access this application, you need to enable acces to your contacts list.',
  [{
    text: 'Grant Access',
    onPress: () => {
      openSettings();
    }
  }]
);

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
      permissionAction
    }
  })
};

export const requestAndroidPermission = async() => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts Permission',
        'message': 'This application requires access to your contacts list'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Contacts.getAll((err, contacts) => {
        if(err) throw err;
      })
    } else {
      permissionAction
    }
  } catch (err) {
    console.warn(err)
  }
}