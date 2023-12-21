import {View, ScrollView} from 'react-native';
import React from 'react';
import {Colors, CommonStyles, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from '../../components/commonText';
import MyStatusBar from '../../components/myStatusBar';

const termsOfUseList = [
  'Lorem ipsum dolor sit amet, consectetur adipiscingelit. Semper quis non, convallis leo sit. Dui ac at consectetur risus phasellus consectetur at elementum placerat.',
  'Sapien diam ac elementum auctor. Sed ut at diam miin viverra. Curabitur dui morbi phasellus nec adipiscinorci ultrices dignissim. Dictum nulla viverra fermentuvel. Accumsan consequat sapien semper tellus nulla tellus cras volutpat.',
  'Lorem ipsum dolor sit amet, consectetur adipiscingelit. Semper quis non, convallis leo sit.',
];

const companyPoliciesList = [
  'Lorem ipsum dolor sit amet, consectetur adipiscingelit. Semper quis non, convallis leo sit. Dui ac at consectetur risus phasellus consectetur at elementum placerat.',
  'Sapien diam ac elementum auctor. Sed ut at diam miin viverra. Curabitur dui morbi phasellus nec adipiscinorci ultrices dignissim. Dictum nulla viverra fermentuvel. Accumsan consequat sapien semper tellus nulla tellus cras volutpat.',
  'Lorem ipsum dolor sit amet, consectetur adipiscingelit. Semper quis non, convallis leo sit.',
];

const TermsAndConditionScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
          {termsOfUseInfo()}
          {companyPolicyInfo()}
        </ScrollView>
      </View>
    </View>
  );

  function companyPolicyInfo() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 3.0,
        }}>
        <Text style={{...Fonts.blackColor19SemiBold}}>Company Policy</Text>
        {companyPoliciesList.map((item, index) => (
          <Text
            key={`${index}`}
            style={{
              ...Fonts.grayColor16Regular,
              marginTop: Sizes.fixPadding + 5.0,
            }}>
            {item}
          </Text>
        ))}
      </View>
    );
  }

  function termsOfUseInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding - 5.0,
        }}>
        <Text style={{...Fonts.blackColor19SemiBold}}>Terms of Use</Text>
        {termsOfUseList.map((item, index) => (
          <Text
            key={`${index}`}
            style={{
              ...Fonts.grayColor16Regular,
              marginTop: Sizes.fixPadding + 5.0,
            }}>
            {item}
          </Text>
        ))}
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
        <Text style={CommonStyles.headerTextStyle}>Terms & Conditions</Text>
      </View>
    );
  }
};

export default TermsAndConditionScreen;
