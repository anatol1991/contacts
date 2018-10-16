import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Linking, TouchableOpacity, Dimensions, PermissionsAndroid} from 'react-native';
import {Provider} from 'react-redux';
import ContactList from './src'
import createStore from './src/config/store';
import {checkPermission, requestAndroidPermission, permissionAction} from './src/config/services'

const {height} = Dimensions.get('window');
const store = createStore();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      grant: false
    }
  }

  async componentDidMount() {
    if(Platform.OS === 'android') {
      let request = await requestAndroidPermission();
      while (request === 'denied') {
        request = await requestAndroidPermission();
      }
      request === 'granted' && this.setState({grant: true})
    } else {
      let request = await checkPermission();
      if (request === 'denied' || !request) {
        request = await checkPermission();
      }
      request === 'authorized' && this.setState({grant: true})
    }
  }

  render() {
    return (
      !this.state.grant ?
        <Text onPress={permissionAction} style={styles.permissions}>Accept permissions</Text> :
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
  permissions: {
    textAlign: 'center',
    fontSize: 18,
    color: '#767676',
    marginTop: height/20
  }
});
