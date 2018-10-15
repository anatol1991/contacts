import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Linking, TouchableOpacity, Dimensions, PermissionsAndroid} from 'react-native';
import {Provider} from 'react-redux';
import ContactList from './src'
import createStore from './src/config/store';
import {checkPermission, requestAndroidPermission} from './src/config/services'

const {height} = Dimensions.get('window');
const store = createStore();

export default class App extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    if(Platform.OS === 'android') {
      await requestAndroidPermission()
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
