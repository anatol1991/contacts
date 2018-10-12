import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const ContactItem = ({familyName = '', givenName = '', phoneNumbers = [], hasThumbnail = false, thumbnailPath = ''}) => {
  let fullName = givenName + ' ' + familyName;
  let phone = phoneNumbers.length > 0 ? phoneNumbers[0].number : '';
  return (
    <View style={styles.contactItem}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
        {hasThumbnail ?
          <Image
            resizeMode={'contain'}
            source={{uri: thumbnailPath}}
            style={styles.image}/> : <Text style={styles.imagePlaceholder}>{fullName.charAt(0)}</Text>}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
    </View>
  )
}

export default ContactItem;

const styles = StyleSheet.create({
  contactItem: {
    width: width,
    height: height*0.1,
    borderBottomWidth: .8,
    borderBottomColor: '#dfdfdf',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    width: width/5,
    height: height*0.1,
    justifyContent: 'center'
  },
  imageWrapper: {
    width: width/7,
    height: width/7,
    borderRadius: (width/7),
    backgroundColor: '#afafaf',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    transform: [
      {scale: 1.5}
    ]
  },
  imagePlaceholder: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  contentContainer: {
    paddingLeft: width/50,
  },
  fullName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000'
  },
  phone: {
    marginTop: height/100,
    fontSize: 14,
    fontWeight: '500',
    color: '#333'
  }
})