import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Platform,
  Alert,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors, CommonStyles, Fonts, Sizes } from '../../constants/styles';
import { Text } from '../../components/commonText';
import { useCandidateContext } from '../../context/candidateProvider';
import { useFocusEffect } from '@react-navigation/native';
import MyStatusBar from '../../components/myStatusBar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const LoginScreen = ({ navigation }) => {
  const { setCandidate } = useCandidateContext();

  const [backClickCount, setBackClickCount] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);

  const backAction = () => {
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      });
    } else {
      backClickCount === 1 ? BackHandler.exitApp() : _spring();
      return true;
    }
  };

  const _spring = () => {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        navigation.removeListener('gestureEnd', backAction);
      };
    }, [backAction]),
  );

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      firestore()
      .collection('candidates')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        setCandidate(documentSnapshot.data());
        navigation.push('BottomTabBar');
      });

    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {appIcon()}
          {title()}
          {emailInfo()}
          {passwordInfo()}
          {forgetPasswordText()}
          {loginButton()}
          {orOptions()}
        </ScrollView>
        {dontAccountInfo()}
      </View>
      {exitInfo()}
    </View>
  );

  function appIcon() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: Sizes.fixPadding * 2.5,
        }}
      >
        <Image
          source={require('../../assets/images/app_icon.png')}
          style={{
            width: 100.0,
            height: 100.0,
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  }

  function title() {
    return (
      <Text style={{ ...Fonts.blackColor20Bold, textAlign: 'center' }}>
        Login to{' '}
        <Text style={{ ...styles.appTitleTextStyle }}>
          Career<Text style={{ ...Fonts.pinkColor20Bold }}>Sync</Text>
        </Text>
      </Text>
    );
  }

  function emailInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor16Regular }}>
          Email
          <Text style={{ ...Fonts.redColor15SemiBold }}>*</Text>
        </Text>
        <View style={CommonStyles.textFieldWrapper}>
          <MaterialCommunityIcons
            name="email"
            size={30}
            color={Colors.primaryColor}
          />
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor={Colors.grayColor}
            style={{ ...Fonts.blackColor16Medium, height: 30.0, padding: 0 }}
            cursorColor={Colors.primaryColor}
            value={email}
            onChangeText={(val) => setEmail(val)}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function passwordInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor16Regular }}>
          Password<Text style={{ ...Fonts.redColor15SemiBold }}>*</Text>
        </Text>
        <View
          style={{
            ...CommonStyles.textFieldWrapper,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name="lock"
            size={30}
            color={Colors.primaryColor}
          />
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.blackColor16Medium,
              height: 30.0,
              flex: 1,
              padding: 0,
            }}
            cursorColor={Colors.primaryColor}
            value={password}
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={securePassword}
          />
          <MaterialCommunityIcons
            name={securePassword ? 'eye' : 'eye-off'}
            size={20}
            color={Colors.lightGrayColor}
            onPress={() => {
              setSecurePassword(!securePassword);
            }}
          />
        </View>
      </View>
    );
  }

  function forgetPasswordText() {
    return (
      <Text style={styles.forgetPasswordTextStyle}>Forget password?</Text>
    );
  }

  function loginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleLogin}
        style={{ ...CommonStyles.buttonStyle, margin: Sizes.fixPadding * 2.0 }}
      >
        <Text style={{ ...Fonts.whiteColor18SemiBold }}>Login</Text>
        <MaterialCommunityIcons
          name="login"
          size={30}
          color={Colors.whiteColor}
        />
      </TouchableOpacity>
    );
  }

  function orOptions() {
    return (
      <View style={{ alignItems: 'center', margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor16Medium }}>Or Continue with</Text>
        <View
          style={{
            marginTop: Sizes.fixPadding * 2.5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {socialMediaOptionSort({
            iconName: 'google',
            bgColor: '#DD4F43',
          })}
          {socialMediaOptionSort({
            iconName: 'github',
            bgColor: '#000000',
          })}
        </View>
      </View>
    );
  }

  function socialMediaOptionSort({ iconName, bgColor }) {
    return (
      <View
        style={{
          backgroundColor: bgColor,
          ...styles.socialCircleStyle,
        }}
      >
        <FontAwesome name={iconName} size={30} color={Colors.whiteColor} />
      </View>
    );
  }

  function dontAccountInfo() {
    return (
      <Text
        style={{
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.grayColor16Medium,
          textAlign: 'center',
        }}
      >
        Don’t have an account?
        <Text
          onPress={() => navigation.push('Register')}
          style={{ ...Fonts.primaryColor16Medium }}
        >
          {' '}
          Register now
        </Text>
      </Text>
    );
  }

  function exitInfo() {
    return backClickCount === 1 ? (
      <View style={styles.exitInfoWrapStyle}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Press Back Once Again To Exit!
        </Text>
      </View>
    ) : null;
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  exitInfoWrapStyle: {
    backgroundColor: Colors.grayColor,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameTextStyle: {
    ...Fonts.primaryColor16Bold,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  forgetPasswordTextStyle: {
    ...Fonts.primaryColor16Medium,
    textAlign: 'right',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.primaryColor,
  },
  socialCircleStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 30.0,
    marginHorizontal: Sizes.fixPadding - 3.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
