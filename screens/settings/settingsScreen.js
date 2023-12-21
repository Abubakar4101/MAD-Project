import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, CommonStyles, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from '../../components/commonText';
import {Overlay} from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';

const SettingsScreen = ({navigation}) => {
  const [showLogoutDialog, setshowLogoutDialog] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: Sizes.fixPadding}}>
          {settingOption({
            iconName: 'person',
            boxColor: '#FFEBEE',
            iconColor: '#E57373',
            option: 'Edit Profile',
            onPress: () => {
              navigation.push('EditProfile');
            },
          })}
          {settingOption({
            iconName: 'notifications',
            boxColor: '#EDE7F6',
            iconColor: '#9575CD',
            option: 'Notifications',
            onPress: () => {
              navigation.push('Notifications');
            },
          })}
          {settingOption({
            iconName: 'article',
            boxColor: '#E3F2FD',
            iconColor: '#64B5F6',
            option: 'Applied Jobs',
            onPress: () => {
              navigation.push('AppliedJobs');
            },
          })}
          {settingOption({
            iconName: 'share',
            boxColor: '#E0F2F1',
            iconColor: '#4DB6AC',
            option: 'Share App',
            onPress: () => {},
          })}
          {settingOption({
            iconName: 'headset',
            boxColor: '#FFF8E1',
            iconColor: '#FFD54F',
            option: 'Contact Us',
            onPress: () => {
              navigation.push('ContactUs');
            },
          })}
          {settingOption({
            iconName: 'insert-drive-file',
            boxColor: '#FBE9E7',
            iconColor: '#FF8A65',
            option: 'Terms & Conditions',
            onPress: () => {
              navigation.push('TermsAndCondition');
            },
          })}
          {settingOption({
            iconName: 'logout',
            boxColor: '#FCE4EC',
            iconColor: '#F06292',
            option: 'Logout',
            onPress: () => {
              setshowLogoutDialog(true);
            },
          })}
        </ScrollView>
      </View>
      {logoutDialog()}
    </View>
  );

  function logoutDialog() {
    return (
      <Overlay
        isVisible={showLogoutDialog}
        overlayStyle={styles.dialogStyle}
        onBackdropPress={() => {
          setshowLogoutDialog(false);
        }}>
        <Text
          style={{
            ...Fonts.blackColor18Medium,
            margin: Sizes.fixPadding * 2.0,
            textAlign: 'center',
          }}>
          Are you sure to want to logout?
        </Text>
        <View style={styles.dialogButtonWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setshowLogoutDialog(false);
            }}
            style={{
              ...styles.cancelLogoutButtonStyle,
              marginRight: Sizes.fixPadding - 9.0,
            }}>
            <Text style={{...Fonts.whiteColor18SemiBold}}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setshowLogoutDialog(false);
              navigation.push('Login');
            }}
            style={{
              ...styles.cancelLogoutButtonStyle,
              marginLeft: Sizes.fixPadding - 9.0,
            }}>
            <Text
              style={{
                ...Fonts.whiteColor18SemiBold,
                marginLeft: Sizes.fixPadding * 2.0,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }

  function settingOption({iconName, boxColor, iconColor, option, onPress}) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.optionWrapStyle}>
        <View
          style={{
            ...styles.optionIconWrapStyle,
            backgroundColor: boxColor,
          }}>
          <MaterialIcons name={iconName} size={22} color={iconColor} />
        </View>
        <Text
          style={{
            flex: 1,
            ...Fonts.blackColor16Medium,
            marginLeft: Sizes.fixPadding + 5.0,
          }}>
          {option}
        </Text>
      </TouchableOpacity>
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
        <Text style={CommonStyles.headerTextStyle}>Settings</Text>
      </View>
    );
  }
};

export default SettingsScreen;

const styles = StyleSheet.create({
  optionWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.fixPadding * 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  optionIconWrapStyle: {
    width: 34.0,
    height: 34.0,
    borderRadius: Sizes.fixPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogStyle: {
    width: '85%',
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: 0,
    overflow: 'hidden',
    elevation: 3.0,
  },
  dialogButtonWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelLogoutButtonStyle: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.fixPadding + 2.0,
  },
});
