import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const OpenAIChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const chatbotRef = useRef(null);

  const handleUserMessage = async (messages) => {
    // Add user's message to the chat
    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, messages)
    );

    try {
      const userMessage = messages[0].text;

      // Make a request to OpenAI API
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: userMessage,
          max_tokens: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
          },
        }
      );

      // Add OpenAI's response to the chat
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [
          { _id: Math.random().toString(), text: response.data.choices[0].text.trim(), createdAt: new Date(), user: { _id: 2, name: 'OpenAI', avatar: 'avatar-url' } },
        ])
      );
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error.message);
      Alert.alert('Error', 'An error occurred while processing your request.');
    }
  };

  return (
    <GiftedChat
      ref={chatbotRef}
      messages={messages}
      onSend={(messages) => handleUserMessage(messages)}
      user={{ _id: 1 }}
      isTyping={true}
    />
  );
};

export default OpenAIChatbot;
