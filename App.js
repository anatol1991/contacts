import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Linking, TouchableOpacity, Dimensions, PermissionsAndroid} from 'react-native';
import {Provider} from 'react-redux';
import ContactList from './src'
import createStore from './src/config/store';
import {checkPermission} from './src/config/services'

const {height} = Dimensions.get('window');
const store = createStore();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      grant: false
    }
  }

  requestContactsPermission = async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts Permission',
          'message': 'This application requires access to your contacts list'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          grant: true
        })
        console.log("You can use the contacts")
      } else {
        this.setState({
          grant: false
        })
        console.log("Contacts permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async componentDidMount() {
    if(Platform.OS === 'android') {
      await this.requestContactsPermission()
    }
    await checkPermission();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ContactList />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: height/25
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
