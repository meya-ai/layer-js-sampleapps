'use strict';

/**
 * Popup an alert instructing the user to save this page as a homescreen link
 */
var isMobileSafari = (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion);
var isAndroid = (/android/i).test(navigator.userAgent);
if ( ('standalone' in navigator && !navigator.standalone && isMobileSafari) || (isAndroid && !matchMedia('(display-mode: standalone)').matches) ) {
  alert('This app will render best if you add app to your home screen and launch it from there.');
}

var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
});

var appId = window.layerSample.appId;

/**
 * Initialize Layer Client with `appId`.
 */
var client = new layer.Client({
  appId: appId
});

/**
 * Client authentication challenge.
 * Sign in to Layer sample identity provider service.
 *
 * See http://static.layer.com/sdk/docs/#!/api/layer.Client
 */
client.once('challenge', function(e) {
  window.layerSample.getIdentityToken(e.nonce, e.callback);
});

window.layerSample.onLogin(function(userId) {
  /**
   * Start authentication
   */
  client.connect(userId);
});

/**
 * validate that the sample data has been properly set up
 */
window.layerSample.validateSetup(client);

/**
 * reference to selected conversation
 */
var conversation = null;

/**
 * Client ready. Initialize controller.
 */
client.once('ready', function() {
  $$('.navbar-inner .title').text(client.user.displayName + '\'s Conversations');

  window.layerUI.init({
    layer: window.layer,
    appId: appId
  });

  var list = document.querySelector('layer-conversations-list');
  list.onConversationSelected = function(evt) {
    conversation = evt.detail.item;
    mainView.router.loadPage('active_conversation.html');
  }

  var presence = document.querySelector('layer-presence');
  presence.item = client.user;
  presence.onPresenceClick = function(evt) {
    if (client.user.status === layer.Identity.STATUS.BUSY) {
      client.user.setStatus(layer.Identity.STATUS.AVAILABLE);
    } else {
      client.user.setStatus(layer.Identity.STATUS.BUSY);
    }
  }
});

/**
 * Called when the new screen is inserted into the DOM.
 * Set the conversation header and setup compose buttons
 */
myApp.onPageBeforeInit('active_conversation', function (page) {
  $$('.conversation-header').text(
    conversation.metadata.conversationName ||
    conversation.participants
    .filter(function(user) {
      return !user.sessionOwner;
    })
    .map(function(user) {
      return user.displayName;
    })
    .join(', ').replace(/(.*),(.*?)/, '$1 and$2')
  );

  var conversationPanel = document.querySelector('layer-conversation-panel');
  conversationPanel.composeButtons = [
    document.createElement('layer-file-upload-button'),
    document.createElement('layer-send-button')
  ];
});

/**
 * Set the conversation after the transition animation for a smoother animation
 */
myApp.onPageAfterAnimation('active_conversation', function (page) {
  var conversationPanel = document.querySelector('layer-conversation-panel');
  conversationPanel.conversation = conversation;
});

/**
 * Create a conversation among the specified participants
 */
var createConversation = function(participants) {
  conversation = client.createConversation({
    participants: participants,
    distinct: participants.length === 1
  });
  mainView.router.loadPage('active_conversation.html');
}

/**
 * Get the list of participants from the IdentitiesListPanel and pass
 * then to the createConversation method. Then clear the selections in the
 * IdentitiesListPanel.
 */
$$('.create-conversation-button').on('click', function () {
  var identitiesList = document.querySelector('layer-identities-list');
  var participants = identitiesList.selectedIdentities;
  if (participants.length) {
    createConversation(participants);
  }
  this.identitiesList.selectedIdentities = [];
});
