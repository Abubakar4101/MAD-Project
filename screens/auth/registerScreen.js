import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors, CommonStyles, Fonts, Sizes} from '../../constants/styles';
import {Text} from '../../components/commonText';
import MyStatusBar from '../../components/myStatusBar';
import auth from '@react-native-firebase/auth';
import {BottomSheet} from '@rneui/themed';
import ImagePicker from 'react-native-image-crop-picker';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [preferredLocation, setPreferredLocation] = useState('');
  const [preferredJobType, setPreferredJobType] = useState('');
  const [showProfilePicChangeSheet, setshowProfilePicChangeSheet] =
    useState(false);

  const [profilePicUri, setProfilePicUri] = useState(null);

  const selectProfilePic = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (image) {
        setProfilePicUri(image.path);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  const registerUser = async () => {
    try {
      const userCredential = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          auth().currentUser.sendEmailVerification();
        });
      // const user = userCredential.user;

      // const reference = storage().ref(`profile_pics/${user.uid}`);
      // await reference.putFile(profilePicUri);
      // const downloadURL = await reference.getDownloadURL();

      navigation.push('Verification', {
        name,
        email,
        mobile,
        password,
        preferredLocation,
        preferredJobType,
        profilePic:
          'https://firebasestorage.googleapis.com/v0/b/mad-project-f657b.appspot.com/o/profile_pics%2FiyNx93eAqoV73ZmVUmXNWb4zY7P2?alt=media&token=a88da987-7e49-4a0e-8e4f-d0281493f236',
      });
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
          {profilePic()}
          {nameInfo()}
          {emailInfo()}
          {mobileInfo()}
          {passwordInfo()}
          {preferredLocationInfo()}
          {preferredJobTypeInfo()}
          {registerButton()}
        </ScrollView>
        {changeProfilePicSheet()}
        {alreadyAccountInfo()}
      </View>
    </View>
  );

  function alreadyAccountInfo() {
    return (
      <Text
        style={{
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.grayColor16Medium,
          textAlign: 'center',
        }}>
        Already have an account?
        <Text
          onPress={() => {
            navigation.push('Login');
          }}
          style={{...Fonts.primaryColor16Medium}}>
          {' '}
          Login now
        </Text>
      </Text>
    );
  }

  function registerButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={registerUser}
        style={{...CommonStyles.buttonStyle, margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.whiteColor18SemiBold}}>Register</Text>
      </TouchableOpacity>
    );
  }

  function profilePic() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          alignSelf: 'center',
        }}>
        <Image
          source={
            profilePicUri
              ? {uri: profilePicUri}
              : require('../../assets/images/users/user1.jpeg')
          }
          style={styles.profilePicStyle}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setshowProfilePicChangeSheet(true);
          }}
          style={styles.picChangeIconWrapStyle}>
          <MaterialIcons
            name="camera-alt"
            size={14}
            color={Colors.whiteColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function changeProfilePicSheet() {
    return (
      <BottomSheet
        scrollViewProps={{
          scrollEnabled: false,
          showsVerticalScrollIndicator: false,
        }}
        isVisible={showProfilePicChangeSheet}
        onBackdropPress={() => setshowProfilePicChangeSheet(false)}>
        <View
          style={{
            backgroundColor: Colors.whiteColor,
            paddingVertical: Sizes.fixPadding * 2.0,
          }}>
          <Text style={styles.sheetHeaderStyle}>Change Profile Photo</Text>
          <View style={styles.sheetDivider} />
          <Text
            onPress={() => {
              setProfilePicUri(null);
              setshowProfilePicChangeSheet(false);
            }}
            style={{
              ...Fonts.redColor16Regular,
              textAlign: 'center',
            }}>
            Remove Current Photo
          </Text>
          <View style={styles.sheetDivider} />
          <Text
            onPress={async () => {
              setshowProfilePicChangeSheet(false);
              await selectProfilePic();
            }}
            style={{
              ...Fonts.blackColor16Regular,
              textAlign: 'center',
            }}>
            Take Photo
          </Text>
          <View style={styles.sheetDivider} />
          <Text
            onPress={() => {
              setshowProfilePicChangeSheet(false);
              selectProfilePic();
            }}
            style={{
              ...Fonts.blackColor16Regular,
              textAlign: 'center',
            }}>
            Choose From Library
          </Text>
        </View>
      </BottomSheet>
    );
  }

  function passwordInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
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
            onChangeText={val => setPassword(val)}
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

  function mobileInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>
          Mobile Number<Text style={{...Fonts.redColor15SemiBold}}>*</Text>
        </Text>
        <View style={CommonStyles.textFieldWrapper}>
          <TextInput
            placeholder="Enter Mobile Number*"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            value={mobile}
            onChangeText={val => setMobile(val)}
            keyboardType="number-pad"
          />
        </View>
      </View>
    );
  }

  function emailInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>
          Email<Text style={{...Fonts.redColor15SemiBold}}>*</Text>
        </Text>
        <View style={CommonStyles.textFieldWrapper}>
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            value={email}
            onChangeText={val => setEmail(val)}
            keyboardType="email-address"
          />
        </View>
      </View>
    );
  }

  function nameInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding + 5.0,
        }}>
        <Text style={{...Fonts.grayColor16Regular}}>
          Name<Text style={{...Fonts.redColor15SemiBold}}>*</Text>
        </Text>
        <View style={CommonStyles.textFieldWrapper}>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            value={name}
            onChangeText={val => setName(val)}
          />
        </View>
      </View>
    );
  }

  function preferredLocationInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>
          Preferred Job Location
          <Text style={{...Fonts.redColor15SemiBold}}>*</Text>
        </Text>
        <View style={CommonStyles.textFieldWrapper}>
          <TextInput
            placeholder="Enter Preferred Job Location"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            value={preferredLocation}
            onChangeText={val => setPreferredLocation(val)}
          />
        </View>
      </View>
    );
  }

  function preferredJobTypeInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>
          Preferred Job Type<Text style={{...Fonts.redColor15SemiBold}}>*</Text>
        </Text>
        <View style={CommonStyles.textFieldWrapper}>
          <TextInput
            placeholder="Enter Preferred Job Type"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            value={preferredJobType}
            onChangeText={val => setPreferredJobType(val)}
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
        <Text style={CommonStyles.headerTextStyle}>Register Account</Text>
      </View>
    );
  }
};

export default RegisterScreen;

const styles = StyleSheet.create({
  sheetHeaderStyle: {
    ...Fonts.blackColor20Bold,
    textAlign: 'center',
    marginBottom: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  sheetDivider: {
    backgroundColor: Colors.lightGrayColor,
    height: 1.0,
    marginVertical: Sizes.fixPadding + 5.0,
  },
  picChangeIconWrapStyle: {
    width: 32.0,
    height: 32.0,
    borderRadius: 16.0,
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.whiteColor,
    borderWidth: 3.0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -10.0,
    right: 0,
  },
  profilePicStyle: {
    width: 100.0,
    height: 100.0,
    borderRadius: 50.0,
    overflow: 'hidden',
  },
});
