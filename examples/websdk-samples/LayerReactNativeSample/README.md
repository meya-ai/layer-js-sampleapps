# React Native chat example using Layer SDK

This is a simple example on how one would use the Layer Web SDK using [React Native](https://facebook.github.io/react-native/) framework.

This is currently only implemented for iOS (not Android).

## Install and build

First follow the setup instructions in the base of this repo. Then copy the files `LayerConfiguration.js` and `IdentityServices.js` from the `common` directory in the base of this repo into the root of the `LayerReactNativeSample` directory.

To install all dependencies use the following command:

    npm install

And also visit the [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) page and follow the instructions for setting up your react-native environment

## Running

From the root of this project run

    react-native run-ios

Or run from Xcode. The app will launch in your simulator.

## WEB SDK Limitations in React Native

Sending files or textual content larger than 2k is not currently supported by the Layer WebSDK when running in React Native.
