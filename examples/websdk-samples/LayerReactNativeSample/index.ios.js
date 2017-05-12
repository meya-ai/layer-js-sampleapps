/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Modal,
  StatusBar
} from 'react-native';

import { Client, Query } from 'layer-websdk/index-react-native.js';

import LayerHelper from './src/layer_helper.js'
import configureStore from './src/store/configureStore';
import { ownerSet } from './src/actions/messenger';
import ChatView from './src/ChatView'
import LoginDialog from './src/LoginDialog'

const appId = LayerHelper.appId;

export default class LayerReactNativeSample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    }

    /**
     * Initialize Layer Client with `appId`
     */
    this.client = new Client({
      appId: appId
    });

    /**
     * Client authentication challenge.
     * Sign in to Layer sample identity provider service.
     *
     * See http://static.layer.com/sdk/docs/#!/api/layer.Client-event-challenge
     */
    this.client.on('challenge', e => {
      LayerHelper.getIdentityToken(e.nonce, e.callback);
    });

    this.client.on('ready', () => {
      this.setState({loggedIn: true});
      this.store.dispatch(ownerSet(this.client.user.toObject()));
      StatusBar.setNetworkActivityIndicatorVisible(false);
    });

    /**
     * Share the client with the middleware layer
     */
    this.store = configureStore(this.client);

    /**
     * validate that the sample data has been properly set up
     */
    LayerHelper.validateSetup(this.client);
  }

  login() {
    /**
    * Start authentication
    */
    StatusBar.setNetworkActivityIndicatorVisible(true);
    this.client.connect();
  }

  render() {
    return (
      <View style={styles.container}>
        <ChatView client={this.client} store={this.store} />

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={!this.state.loggedIn}
        >
          <View style={styles.modalBackground}>
            <LoginDialog onLogin={this.login.bind(this)} />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
});

AppRegistry.registerComponent('LayerReactNativeSample', () => LayerReactNativeSample);
