import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginDialog extends Component {

  constructor(props) {
    super(props);

    this.email = null;
    this.password = null;

    this.state = {
      selectedUserId: 0,
    }
  }

  login() {
    window.layerSample.email = this.email;
    window.layerSample.password = this.password;
    this.props.onLogin();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={{uri: 'http://static.layer.com/logo-only-blue.png'}}
          resizeMode='contain'
        />
        <Text style={styles.welcomeText}>Welcome to Layer Sample App!</Text>

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.email = text}
          value={this.state.text}
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='done'
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.password = text}
          value={this.state.text}
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='done'
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.loginButton}
                          onPress={this.login.bind(this)}
                          activeOpacity={.5}
        >
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 25
  },
  logoImage: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginBottom: 10
  },
  welcomeText: {
    alignSelf: 'center',
    fontFamily: 'System',
    fontSize: 20,
    textAlign: 'center',
    color: '#404F59',
    width: 200,
    marginBottom: 40
  },
  input: {
    height: 30,
    backgroundColor: '#fafbfc',
    borderWidth: 1,
    borderColor: '#e4e9ec',
    borderRadius: 5,
    marginBottom: 10
  },
  inputLabel: {
    fontFamily: 'System',
    fontSize: 14,
    color: '#404F59',
    marginBottom: 5
  },
  loginButton: {
    backgroundColor: '#27A6E1',
    borderRadius: 6,
    paddingVertical: 10,
    marginTop: 40
  },
  loginButtonText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
});
