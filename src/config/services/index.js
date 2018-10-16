import Contacts from 'react-native-contacts';
import { Alert, Linking, PermissionsAndroid } from 'react-native'

export const openSettings = () => {
  Linking.openURL('app-settings:');
};

export const permissionAction = () => Alert.alert(
  'Warning',
  'In order to access this application, you need to enable acces to your contacts list.',
  [{
    text: 'Grant Access',
    onPress: () => {
      openSettings();
    }
  }]
);

export const checkPermission = async() => {
  return new Promise((resolve, reject) => {
    Contacts.checkPermission((error, permission) => {
      if(error) reject(error);
      if(permission === 'undefined') {
        permissionAction()
      } else if (permission === 'denied') {
        permissionAction()
      }
      resolve(permission)
    })
  })
}

export const requestAndroidPermission = async() => {
  try {
    let response = 'denied';
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Permission required',
        'message': 'In order to access this application, you need to grant access to your contacts list'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      response = 'granted'
    } else {
      return 'denied'
    }
    return response
  } catch (err) {
    return 'denied'
  }
}