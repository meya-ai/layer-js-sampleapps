'use strict'

window.layerSampleConfig = require('../LayerConfiguration.json');
require('../identityServices.js');

console.log('layer_helper.js after require', window.layerSample.appId, window.layerSample.getIdentityToken, window.layerSample.validateSetup, window.layerSample.dateFormat);

let LayerHelper = {
  appId: window.layerSample.appId,
  getIdentityToken: window.layerSample.getIdentityToken.bind(window.layerSample),
  validateSetup: window.layerSample.validateSetup.bind(window.layerSample),
  dateFormat: window.layerSample.dateFormat.bind(window.layerSample)
}

module.exports = LayerHelper;
