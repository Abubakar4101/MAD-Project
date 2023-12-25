import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, CommonStyles, Sizes, Fonts} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BottomSheet} from '@rneui/themed';
import {Text} from '../../components/commonText';
import MyStatusBar from '../../components/myStatusBar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useCandidateContext} from '../../context/candidateProvider';

const websiteTypesList = ['Personal', 'Company', 'Blog', 'Portfolio', 'Other'];


const EditContactInfoScreen = ({navigation}) => {
  const {candidateData, setCandidate} = useCandidateContext();

  const [email, setemail] = useState(candidateData.email);
  const [mobileNumber, setmobileNumber] = useState(candidateData.mobile);
  const [websites, setwebsites] = useState(candidateData.websites || {
    websiteUrl: '',
    websiteType: '',
  });
  const [showWebsiteTypeSheet, setshowWebsiteTypeSheet] = useState(false);
  const [selectedWebsiteType, setselectedWebsiteType] = useState('');

  function handleSave() {
    firestore()
      .collection('candidates')
      .doc(auth().currentUser.uid)
      .update({
        ...candidateData,
        email: email,
        mobile: mobileNumber,
        websites: websites,
      });

      setCandidate({
      ...candidateData,
      email: email,
      mobile: mobileNumber,
      websites: websites,
    });
    navigation.pop();
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          {emailInfo()}
          {mobileNumberInfo()}
          {websitesInfo()}
        </ScrollView>
        {websiteTypeSheet()}
      </View>
      {saveButton()}
    </View>
  );

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleSave}
        style={{...CommonStyles.buttonStyle, margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.whiteColor18SemiBold}}>Save</Text>
      </TouchableOpacity>
    );
  }

  function updateWebsites({websiteType}) {
    setwebsites(prevWebsites => ({
      ...prevWebsites,
      websiteType: websiteType,
    }));
    setshowWebsiteTypeSheet(false);
  }

  function websiteTypeSheet() {
    return (
      <BottomSheet
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        isVisible={showWebsiteTypeSheet}
        onBackdropPress={() => setshowWebsiteTypeSheet(false)}>
        <View style={{backgroundColor: Colors.whiteColor}}>
          <Text
            style={{
              ...Fonts.blackColor20Bold,
              textAlign: 'center',
              margin: Sizes.fixPadding * 1.5,
            }}>
            Website Type
          </Text>
          {websiteTypesList.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => updateWebsites({websiteType: item})}
              key={`${index}`}
              style={{
                ...styles.rowSpaceBetween,
                marginBottom: Sizes.fixPadding + 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
              }}>
              <Text
                style={
                  selectedWebsiteType === item
                    ? {...Fonts.primaryColor16Medium}
                    : {...Fonts.grayColor16Regular}
                }>
                {item}
              </Text>
              {selectedWebsiteType === item ? (
                <MaterialIcons
                  name="check"
                  color={Colors.primaryColor}
                  size={20}
                />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    );
  }

  function websitesInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <View
          style={{
            ...styles.rowSpaceBetween,
            marginBottom: Sizes.fixPadding + 5.0,
          }}>
          <Text
            numberOfLines={1}
            style={{...Fonts.blackColor18SemiBold, flex: 1}}>
            Website
          </Text>
        </View>
        <View style={{marginBottom: Sizes.fixPadding * 2.0}}>
        <View>
            <View style={styles.rowSpaceBetween}>
              <Text style={{ ...Fonts.grayColor16Regular }}>Website URL</Text>
            </View>
            <View
              style={{
                ...CommonStyles.textFieldWrapper,
                paddingVertical: Sizes.fixPadding,
              }}>
              <TextInput
                placeholder="Enter Website URL"
                placeholderTextColor={Colors.grayColor}
                style={{
                  ...Fonts.blackColor16Medium,
                  height: 30.0,
                  padding: 0,
                }}
                cursorColor={Colors.primaryColor}
                value={websites.websiteUrl}
                onChangeText={(val) =>
                  setwebsites((prevWebsites) => ({
                    ...prevWebsites,
                    websiteUrl: val,
                  }))
                }
                keyboardType="url"
              />
            </View>
          </View>
          <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
            <Text style={{ ...Fonts.grayColor16Regular }}>Website Type</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              placeholder="Select Website Type"
              onPress={() => setshowWebsiteTypeSheet(true)}
              style={{
                ...CommonStyles.textFieldWrapper,
                ...styles.rowSpaceBetween,
              }}>
              <Text
                numberOfLines={1}
                style={{ ...Fonts.blackColor16Medium, flex: 1 }}>
                {websites.websiteType || 'Select Website Type'}
              </Text>
              <MaterialIcons
                name="arrow-drop-down"
                size={24}
                color={Colors.blackColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function mobileNumberInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>Mobile Number</Text>
        <View
          style={{
            ...CommonStyles.textFieldWrapper,
            paddingVertical: Sizes.fixPadding,
          }}>
          <TextInput
            placeholder="Enter Mobile Number"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            cursorColor={Colors.primaryColor}
            value={mobileNumber}
            onChangeText={val => setmobileNumber(val)}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    );
  }

  function emailInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding - 5.0,
        }}>
        <Text style={{...Fonts.grayColor16Regular}}>Email Address</Text>
        <View
          style={{
            ...CommonStyles.textFieldWrapper,
            paddingVertical: Sizes.fixPadding,
          }}>
          <TextInput
            placeholder="Enter Email Address"
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

  function header() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0, justifyContent: 'center'}}>
        <MaterialIcons
          name="keyboard-backspace"
          size={26}
          color={Colors.blackColor}
          style={{position: 'absolute', zIndex: 100}}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text style={{...CommonStyles.headerTextStyle}}>Edit Contact Info</Text>
      </View>
    );
  }
};

export default EditContactInfoScreen;

const styles = StyleSheet.create({
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
