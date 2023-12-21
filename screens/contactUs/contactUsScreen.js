import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, CommonStyles, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from '../../components/commonText';
import MyStatusBar from '../../components/myStatusBar';

const ContactUsScreen = ({navigation}) => {
  const [fullName, setfullName] = useState('Samantha Smith');
  const [email, setemail] = useState('samanthasmith@gmail.com');
  const [message, setmessage] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
          {description()}
          {fullNameInfo()}
          {emailInfo()}
          {messageInfo()}
          {submitButton()}
        </ScrollView>
      </View>
    </View>
  );

  function submitButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.pop();
        }}
        style={{...CommonStyles.buttonStyle, margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.whiteColor18SemiBold}}>Submit</Text>
      </TouchableOpacity>
    );
  }

  function description() {
    return (
      <Text
        style={{
          ...Fonts.grayColor16Regular,
          marginTop: Sizes.fixPadding - 5.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        Leave us a message, we’ll get contact with you as soon as possible.
      </Text>
    );
  }

  function messageInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>Message</Text>
        <View style={{...CommonStyles.textFieldWrapper}}>
          <TextInput
            placeholder="Write here..."
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.blackColor16Medium,
              padding: 0,
              height: Platform.OS == 'ios' ? 90 : null,
            }}
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            value={message}
            onChangeText={val => setmessage(val)}
          />
        </View>
      </View>
    );
  }

  function emailInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>Email Address</Text>
        <View style={CommonStyles.textFieldWrapper}>
          <TextInput
            placeholder="Enter Email Address"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            value={email}
            onChangeText={val => setemail(val)}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function fullNameInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 2.5,
        }}>
        <Text style={{...Fonts.grayColor16Regular}}>Full Name</Text>
        <View style={CommonStyles.textFieldWrapper}>
          <TextInput
            placeholder="Enter Full Name"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            value={fullName}
            onChangeText={val => setfullName(val)}
          />
        </View>
      </View>
    );
  }

  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          justifyContent: 'center',
        }}>
        <MaterialIcons
          name="keyboard-backspace"
          size={26}
          color={Colors.blackColor}
          style={{position: 'absolute', zIndex: 100}}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text style={CommonStyles.headerTextStyle}>Contact Us</Text>
      </View>
    );
  }
};

export default ContactUsScreen;
