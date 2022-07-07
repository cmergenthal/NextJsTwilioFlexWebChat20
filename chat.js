import React from 'react';
import * as FlexWebChat from "@twilio/flex-webchat-ui";

import {appConfig} from './assets/webchat-appConfig';

class Chat extends React.Component {

render() {
  Twilio.FlexWebChat.createWebChat(appConfig).then(webchat => {
    const { manager } = webchat;
    
//Posting question from preengagement form as users first chat message
    Twilio.FlexWebChat.Actions.on("afterStartEngagement", (payload) => {
        const { question } = payload.formData;
        if (!question)
            return;

        const { channelSid } = manager.store.getState().flex.session;
        manager
            .chatClient.getChannelBySid(channelSid)
            .then(channel => channel.sendMessage(question));
    });
// Changing the Welcome message
    manager.strings.WelcomeMessage = "New text for welcome message";

// Render WebChat
   webchat.init();
  });
  return null;
}
}

export default Chat;