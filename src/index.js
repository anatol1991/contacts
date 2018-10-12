import React from 'react';
import {connect} from 'react-redux';
import {View, FlatList, TextInput, Keyboard, StyleSheet, Text, Dimensions, Platform, BackHandler} from 'react-native';
import Contacts from 'react-native-contacts';
import {getAllContacts, searchContacts, clearSearch} from './config/actions'
import ContactItem from './ContactItem.js';

const {width, height} = Dimensions.get('window');

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padding: 0,
    }
    this.props.getAllContacts();
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardDidHide);
  }

  keyboardDidShow = (event) => {
    this.setState({padding: event.endCoordinates.height, shown: true});
  }

  keyboardDidHide = () => {
    !!this.input && this.input.focus && this.input.focus()
  }

  handleBack = () => {
    this.keyboardDidHide()
    return true;
  }

  componentDidMount() {
    !!this.input && this.input.focus && this.input.focus();
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const {contacts} = this.props;
    const {all, search, searching} = contacts;
    let searchNoResults = !!searching && search.length === 0;
    let searchHasResults = !!searching && search.length > 0;
    let allHasResults = !searching && !!all && all.length > 0;
    return (
      <View style={[styles.wrapper, {paddingBottom: this.state.padding + 46}]}>
        {
          searchNoResults ?
            <Text style={styles.noResults}>No results found</Text> :
            searchHasResults ?
              <FlatList
                keyExtractor={(item) => item.recordID.toString() || timestamp.toString()}
                data={search}
                renderItem={({item}) => <ContactItem {...item}/>} /> :
              allHasResults ?
                <FlatList
                  keyExtractor={(item) => item.recordID.toString() || timestamp.toString()}
                  data={all}
                  renderItem={({item}) => <ContactItem {...item}/>} /> :
                <Text style={styles.noResults}>You have no contacts</Text>
        }

        <TextInput
          autoFocus={true}
          multiline={false}
          onChangeText={(text) => {text.length > 0 ? this.props.searchContacts(text) : this.props.clearSearch()}}
          keyboardAppearance={'dark'}
          underlineColorAndroid={'transparent'}
          placeholder={'Tap number to search a contact'}
          keyboardType={'numeric'}
          style={[styles.input, {bottom: Platform.OS === 'ios' ? this.state.padding-2 : 0}]}
          caretHidden={true}
          ref={input => this.input = input}/>
      </View>
    )
  }
}

const mapDispatchToProps = {
  getAllContacts,
  searchContacts,
  clearSearch
}
const mapStateToProps = (state) => ({
  contacts: state.contacts,
  search: state.contacts.search
})
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: width
  },
  input: {
    paddingVertical: 15,
    paddingLeft: 15,
    alignItems: 'center',
    position: 'absolute',
    fontSize: 16,
    color: '#767676',
    left: 0,
    backgroundColor: '#ededed',
    right: 0,
    width: width
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    color: '#767676',
    marginTop: height/20
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ContactList)