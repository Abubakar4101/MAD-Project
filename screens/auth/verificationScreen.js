import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ActivityIndicator, Platform, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { Text } from '../../components/commonText';
import { Overlay } from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';
import Logo from '../../assets/images/app_icon.png'; // Import your logo component

const VerificationScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {renderHeader()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={styles.scrollViewContent}
        >
          {verificationInfo()}
          {checkEmailText()}
        </ScrollView>
        {loadingDialog()}
      </View>
    </View>
  );

  function loadingDialog() {
    return (
      <Overlay isVisible={isLoading} overlayStyle={styles.dialogStyle}>
        <ActivityIndicator
          color={Colors.primaryColor}
          style={{
            alignSelf: 'center',
            transform: [{ scale: Platform.OS === 'ios' ? 1.5 : 2.0 }],
          }}
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding + 5.0,
            textAlign: 'center',
            ...Fonts.blackColor16Regular,
          }}
        >
          Sending verification email...
        </Text>
      </Overlay>
    );
  }

  function checkEmailText() {
    return (
      <Text
        style={{
          ...Fonts.grayColor16Regular,
          marginVertical: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
          textAlign: 'center',
        }}
      >
        Please check your email for the verification link. If you didn't receive the email, please ensure to check your spam folder.
      </Text>
    );
  }

  function verificationInfo() {
    return (
      <Text
        style={{
          ...Fonts.grayColor16Regular,
          marginVertical: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
          textAlign: 'center',
        }}
      >
        Verification Email Sent
      </Text>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <MaterialIcons
          name="keyboard-backspace"
          size={26}
          color={Colors.blackColor}
          style={styles.backIcon}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Logo style={styles.logo} />
        <Text style={CommonStyles.headerTextStyle}>Verification</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding * 2.0,
  },
  backIcon: {
    position: 'absolute',
    zIndex: 100,
  },
  logo: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    marginRight: Sizes.fixPadding,
  },
  dialogStyle: {
    width: '85%',
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 2.5,
    paddingTop: Sizes.fixPadding * 3.0,
    elevation: 3.0,
  },
});

export default VerificationScreen;
