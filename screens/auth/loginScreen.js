import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors, CommonStyles, Fonts, Sizes} from '../../constants/styles';
import {Text} from '../../components/commonText';
import {useFocusEffect} from '@react-navigation/native';
import MyStatusBar from '../../components/myStatusBar';

const LoginScreen = ({navigation}) => {
  const backAction = () => {
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
      return true;
    }
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

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [securePassword, setsecurePassword] = useState(true);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
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

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={styles.exitInfoWrapStyle}>
        <Text style={{...Fonts.whiteColor14Medium}}>
          Press Back Once Again To Exit!
        </Text>
      </View>
    ) : null;
  }

  function dontAccountInfo() {
    return (
      <Text
        style={{
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.grayColor16Medium,
          textAlign: 'center',
        }}>
        Don’t have an account?
        <Text
          onPress={() => navigation.push('Register')}
          style={{...Fonts.primaryColor16Medium}}>
          {' '}
          Register now
        </Text>
      </Text>
    );
  }

  function orOptions() {
    return (
      <View style={{alignItems: 'center', margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Medium}}>Or Continue with</Text>
        <View
          style={{
            marginTop: Sizes.fixPadding * 2.5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {socialMediaOptionSort({iconName: 'facebook', bgColor: '#3C5A9A'})}
          {socialMediaOptionSort({iconName: 'twitter', bgColor: '#2DAAE1'})}
          {socialMediaOptionSort({
            iconName: 'google-plus',
            bgColor: '#DD4F43',
          })}
        </View>
      </View>
    );
  }

  function socialMediaOptionSort({iconName, bgColor}) {
    return (
      <View
        style={{
          backgroundColor: bgColor,
          ...styles.socialCircleStyle,
        }}>
        <FontAwesome name={iconName} size={16} color={Colors.whiteColor} />
      </View>
    );
  }

  function loginButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.push('Register');
        }}
        style={{...CommonStyles.buttonStyle, margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.whiteColor18SemiBold}}>Login</Text>
      </TouchableOpacity>
    );
  }

  function forgetPasswordText() {
    return <Text style={styles.forgetPasswordTextStyle}>Forget password?</Text>;
  }

  function passwordInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>
          Password<Text style={{...Fonts.redColor15SemiBold}}>*</Text>
        </Text>
        <View
          style={{
            ...CommonStyles.textFieldWrapper,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
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
            onChangeText={val => setpassword(val)}
            secureTextEntry={securePassword}
          />
          <MaterialCommunityIcons
            name={securePassword ? 'eye' : 'eye-off'}
            size={20}
            color={Colors.lightGrayColor}
            onPress={() => {
              setsecurePassword(!securePassword);
            }}
          />
        </View>
      </View>
    );
  }

  function emailInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>
          Email
          <Text style={{...Fonts.redColor15SemiBold}}>*</Text>
        </Text>
        <View style={CommonStyles.textFieldWrapper}>
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            value={email}
            onChangeText={val => setemail(val)}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function title() {
    return (
      <Text style={{...Fonts.blackColor20Bold, textAlign: 'center'}}>
        Login to your Account
      </Text>
    );
  }

  function appIcon() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: Sizes.fixPadding * 2.5,
        }}>
        <Image
          source={require('../../assets/images/app_icon.png')}
          style={{
            width: 50.0,
            height: 50.0,
            resizeMode: 'contain',
          }}
        />
        <Text style={{...styles.appNameTextStyle}}>
          Job
          <Text style={{...Fonts.pinkColor16Bold}}> Finder</Text>
        </Text>
      </View>
    );
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
    textShadowOffset: {width: -1, height: 1},
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
    width: 36.0,
    height: 36.0,
    borderRadius: 18.0,
    marginHorizontal: Sizes.fixPadding - 3.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});