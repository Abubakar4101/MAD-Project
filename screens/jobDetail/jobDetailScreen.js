import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  Colors,
  CommonStyles,
  Fonts,
  Sizes,
  screenWidth,
  TextInput
} from '../../constants/styles';
import {Text} from '../../components/commonText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Overlay} from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';

const requirementsList = [
  'Excepteur sint occaecat cupidatat non proident.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
  'Ut enim ad minima veniam, quis nostrum.',
  'At vero eos et accusamus et iusto odio dignissimo.',
  'Lorem ipsum dolor sit amet, consectetur.',
];

const ChatbotPopup = ({ onClose }) => {
  const chatMessages = [
    { id: 1, text: 'Hello! How can I help you today?' },
    { id: 2, text: 'I can provide information about job opportunities.' },
    { id: 3, text: 'Feel free to ask me anything!' },
  ];

  return (
    <Overlay
      isVisible={true} // You can use a state variable to control visibility
      onBackdropPress={onClose}
      overlayStyle={CommonStyles.dialogStyle}
    >
      <View style={{ padding: 20 }}>
        {/* Chat messages */}
        <ScrollView>
          {chatMessages.map((message) => (
            <View
              key={message.id}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: '#e0e0e0',
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text>{message.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input area (if you want to add user input) */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 8,
            }}
            placeholder="Type your message..."
          />
          <TouchableOpacity
            style={{
              marginLeft: 10,
              backgroundColor: '#3498db',
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
};


const ChatbotButton = ({ onPress }) => {
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
      onPress={onPress}
    >
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
        {showChatbot && (
        // Render your chatbot pop-up here
        // You can use a component similar to your uploadResumeDialog
        // and customize it for the chatbot
        <ChatbotPopup onClose={closeChatbot} />
      )}
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper
          habitant nulla mauris. Amet, tincidunt a amet, et aliquam in habitant
          dictum. Quis ac et proin quis.
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
          <Text style={{...Fonts.primaryColor16Medium}}>California, USA</Text>
        </View>
      </View>
    );
  }

  function serviceProviderInfo() {
    return (
      <View style={styles.serviceProviderWrapper}>
        <Image
          source={require('../../assets/images/jobs/job1.png')}
          style={styles.sourceLogoStyle}
        />
        <View style={{flex: 1, marginLeft: Sizes.fixPadding * 2.0}}>
          <Text numberOfLines={1} style={{...Fonts.blackColor20SemiBold}}>
            Sr. UI/UX Designer
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
});
