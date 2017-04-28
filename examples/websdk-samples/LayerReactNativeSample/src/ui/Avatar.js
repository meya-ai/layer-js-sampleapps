import React, { Component } from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

export default class Avatar extends Component {

  render() {
    const { user, users } = this.props;

    let usersToRender = user ? [user] : users.filter(item => item.id).slice(-2);

    return (
      <View style={styles.container}>
        {usersToRender.map((user, index) => {
          let imageStyles = (usersToRender.length == 1) ? [styles.avatarImage] : [styles.avatarImageClustered];
          if (index > 0) imageStyles.push({marginLeft: 15, marginTop: -15});
          if (user.avatarUrl) {
            return (
              <Image key={`user_${index}`} style={imageStyles} source={{uri: user.avatarUrl}}></Image>
            )
          } else {
            imageStyles.push(styles.avatarNoImage);
            return (
              <Text key={`user_${index}`} style={imageStyles}>{user.displayName.substring(0,2)}</Text>
            )
          }
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 45
  },
  avatarImage: {
    width: 40,
    height: 40
  },
  avatarImageClustered: {
    width: 30,
    height: 30
  },
  avatarNoImage: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    fontFamily: 'System',
    fontSize: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    textAlign: 'center',
    lineHeight: 38
  }
});
