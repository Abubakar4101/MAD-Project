import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  Colors,
  CommonStyles,
  Fonts,
  Sizes,
  screenWidth,
} from '../../constants/styles';
import {Text} from '../../components/commonText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Overlay} from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {useCandidateContext} from '../../context/candidateProvider';

const requirementsList = [
  'Collaborate with cross-functional teams to design, develop, and maintain mobile applications using React Native.',
  'Identify and fix bugs and performance bottlenecks.',
  'Work closely with the product team to understand requirements and provide technical solutions.',
];

const ChatbotPopup = ({onClose}) => {
  const {candidateData} = useCandidateContext();
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: 'Hello! How can I help you prepare for your job interview?',
      isBot: true,
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const scrollViewRef = useRef();
  const genAI = new GoogleGenerativeAI(
    'AIzaSyA2asrrbHrBS62ETYhBFyndG1svdOoZLEk',
  );

  const handleSend = async () => {
    setLoading(true);
    
    if (userInput.trim() === '') {
      return;
    }

    const newUserMessage = {
      id: chatMessages.length + 1,
      text: userInput,
      isBot: false,
    };
    chatMessages.push(newUserMessage);
    console.log(chatMessages)
    setUserInput('');

    try {
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});
      const result = await model.generateContent(userInput);
      const response = await result.response;
      const botMessage = {
        id: chatMessages.length + 1,
        text: response.text(),
        isBot: true,
      };
      chatMessages.push(botMessage);
      setLoading(false);
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({animated: true});
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay
      isVisible={true}
      onBackdropPress={onClose}
      overlayStyle={styles.overlayStyle}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }
          style={styles.chatContainer}>
          {chatMessages.map(message => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isBot
                  ? styles.botMessageContainer
                  : styles.userMessageContainer,
              ]}>
              {message.isBot ? (
                <Image
                  source={require('../../assets/images/app_icon.png')}
                  style={styles.avatar}
                />
              ) : null}
              <View
                style={[
                  message.isBot ? styles.botMessage : styles.userMessage,
                  {maxWidth: screenWidth * 0.6},
                ]}>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
              {!message.isBot ? (
                <Image
                  source={{uri: candidateData.profilePic}}
                  style={styles.avatar}
                />
              ) : null}
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            value={userInput}
            onChangeText={text => setUserInput(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            {loading ? (
              <ActivityIndicator size="small" color={Colors.whiteColor} />
            ) : (
              <Ionicons name="send" size={20} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
};

const ChatbotButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 50,
        right: 16,
        backgroundColor: Colors.primaryColor,
        borderRadius: 50,
        padding: 15,
      }}
      onPress={onPress}>
      <Ionicons name="chatbox" size={30} color="white" />
    </TouchableOpacity>
  );
};

const JobDetailScreen = ({navigation}) => {
  const [showUploadDialog, setshowUploadDialog] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  function openChatbot() {
    setShowChatbot(true);
  }

  function closeChatbot() {
    setShowChatbot(false);
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {serviceProviderInfo()}
          {jonInfo()}
          {divider()}
          {jonDescription()}
          {divider()}
          {requirementsInfo()}
          {applyButton()}
        </ScrollView>
        {uploadResumeDialog()}
        {showChatbot && <ChatbotPopup onClose={closeChatbot} />}
        <ChatbotButton onPress={openChatbot} />
      </View>
    </View>
  );

  function uploadResumeDialog() {
    return (
      <Overlay
        isVisible={showUploadDialog}
        onBackdropPress={() => setshowUploadDialog(false)}
        overlayStyle={CommonStyles.dialogStyle}>
        <View style={{margin: Sizes.fixPadding * 2.0}}>
          <Text
            style={{
              ...Fonts.blackColor20Bold,
              textAlign: 'center',
              marginBottom: Sizes.fixPadding,
            }}>
            Upload Resume/CV
          </Text>
          <Text style={{...Fonts.grayColor16Regular, textAlign: 'center'}}>
            Upload your CV or Resume to apply for the job vacancy.
          </Text>
          <View style={styles.dragFileBox}>
            <Ionicons
              name="share"
              size={30}
              color={Colors.primaryColor}
              style={{marginBottom: Sizes.fixPadding - 5.0}}
            />
            <Text
              style={{
                ...Fonts.blackColor14Regular,
                marginVertical: Sizes.fixPadding - 5.0,
              }}>
              Drag & Drop your file here
            </Text>
            <Text style={{...Fonts.blackColor14Regular}}>OR</Text>
            <View
              style={{
                ...CommonStyles.buttonStyle,
                ...styles.browseFileButton,
              }}>
              <Text style={{...Fonts.whiteColor16Medium}}>Browse Files</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setshowUploadDialog(false), navigation.push('UploadSuccess');
            }}
            style={{...CommonStyles.buttonStyle, marginTop: Sizes.fixPadding}}>
            <Text style={{...Fonts.whiteColor18SemiBold}}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }

  function applyButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setshowUploadDialog(true);
        }}
        style={{
          ...CommonStyles.buttonStyle,
          margin: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.whiteColor18SemiBold}}>Apply Now</Text>
      </TouchableOpacity>
    );
  }

  function requirementsInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            ...Fonts.blackColor19SemiBold,
            marginBottom: Sizes.fixPadding,
          }}>
          Requirements
        </Text>
        {requirementsList.map((item, index) => (
          <View
            key={`${index}`}
            style={{flexDirection: 'row', marginBottom: Sizes.fixPadding}}>
            <View style={styles.bulletStyle} />
            <Text style={{...Fonts.grayColor16Regular, flex: 1}}>{item}</Text>
          </View>
        ))}
      </View>
    );
  }

  function jonDescription() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor19SemiBold}}>Job Descriptions</Text>
        <Text
          style={{
            ...Fonts.grayColor16Regular,
            textAlign: 'justify',
            marginTop: Sizes.fixPadding,
          }}>
          Exquisite Technologies is seeking a skilled React Native Developer to join our dynamic team. As a React Native Developer, you will be responsible for developing and maintaining high-quality mobile applications for both iOS and Android platforms. The ideal candidate should have a solid understanding of mobile application development, React Native framework, and a passion for creating innovative and user-friendly mobile experiences.
        </Text>
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          height: 1.0,
          backgroundColor: Colors.lightGrayColor,
          margin: Sizes.fixPadding * 2.0,
        }}></View>
    );
  }

  function jonInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <View style={{...styles.rowSpaceBetween}}>
          <Text style={{...Fonts.grayColor16Regular, flex: 1}}>Salary</Text>
          <Text style={{...Fonts.primaryColor16Medium}}>$450/Mo</Text>
        </View>
        <View
          style={{
            ...styles.rowSpaceBetween,
            marginVertical: Sizes.fixPadding + 2.0,
          }}>
          <Text style={{...Fonts.grayColor16Regular, flex: 1}}>Type</Text>
          <Text style={{...Fonts.primaryColor16Medium}}>Full Time</Text>
        </View>
        <View style={{...styles.rowSpaceBetween}}>
          <Text style={{...Fonts.grayColor16Regular, flex: 1}}>Location</Text>
          <Text style={{...Fonts.primaryColor16Medium}}>Lahore, Pk</Text>
        </View>
      </View>
    );
  }

  function serviceProviderInfo() {
    return (
      <View style={styles.serviceProviderWrapper}>
        <Image
          source={require('../../assets/images/icons/react.png')}
          style={styles.sourceLogoStyle}
        />
        <View style={{flex: 1, marginLeft: Sizes.fixPadding * 2.0}}>
          <Text numberOfLines={1} style={{...Fonts.blackColor20SemiBold}}>
            React Native Developer
          </Text>
          <Text
            style={{
              ...Fonts.grayColor15Medium,
              marginTop: Sizes.fixPadding - 5.0,
            }}>
            Aribnb
          </Text>
        </View>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="keyboard-backspace"
          size={26}
          color={Colors.blackColor}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text
          style={{...Fonts.blackColor20Bold, flex: 0.9, textAlign: 'center'}}>
          Job Details
        </Text>
        <MaterialIcons name="share" size={22} color={Colors.blackColor} />
      </View>
    );
  }
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding * 2.0,
  },
  sourceLogoStyle: {
    width: screenWidth / 6.0,
    height: 65.0,
    resizeMode: 'contain',
    borderRadius: Sizes.fixPadding,
    overflow: 'hidden',
  },
  serviceProviderWrapper: {
    backgroundColor: Colors.extraLightGrayColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
  },
  bulletStyle: {
    width: 6.0,
    height: 6.0,
    borderRadius: 3.0,
    backgroundColor: Colors.grayColor,
    marginTop: Sizes.fixPadding - 3.0,
    marginRight: Sizes.fixPadding,
  },
  dragFileBox: {
    backgroundColor: Colors.lightPrimaryColor,
    borderRadius: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    padding: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  browseFileButton: {
    borderRadius: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding - 2.0,
    paddingHorizontal: Sizes.fixPadding + 8.0,
    marginTop: Sizes.fixPadding + 5.0,
  },
  overlayStyle: {
    padding: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding,
  },
  container: {
    flex: 1,
    width: screenWidth * 0.8,
    maxHeight: screenWidth * 1.2,
  },
  chatContainer: {
    flex: 1,
    width: screenWidth * 0.8,
    maxHeight: 600,
  },

  messageText: {
    color: 'white',
    fontSize: Fonts.medium,
    flexWrap: 'wrap',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  botMessage: {
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding * 1.2,
    borderRadius: Sizes.fixPadding,
  },
  userMessage: {
    backgroundColor: Colors.pinkColor,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
  },
  userMessageContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Sizes.fixPadding,
  },
  input: {
    flex: 1,
    color: Colors.blackColor,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
  },
  sendButton: {
    backgroundColor: Colors.primaryColor,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
