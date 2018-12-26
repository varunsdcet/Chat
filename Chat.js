import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Backend from "./Backend.js";
import { GiftedChat } from "react-native-gifted-chat";
import DeviceInfo from 'react-native-device-info';

type Props = {};
export default class Chat extends Component<Props> {
  state = {
    messages: []
  };

  componentWillMount() {}
  render() {

    return (
    <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          Backend.sendMessage(message);
        }}
        user={{
          _id: DeviceInfo.getUniqueID(),
          name: 'ccccc'
        }}
      />
    );
  }


  componentDidMount() {
    Backend.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        };
      });
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }
}

