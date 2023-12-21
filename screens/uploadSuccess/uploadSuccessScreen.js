import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Text} from '../../components/commonText';
import {
  CommonStyles,
  Colors,
  Fonts,
  Sizes,
  screenWidth,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const UploadSuccessScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {serviceProviderInfo()}
              {resumeInfo()}
            </ScrollView>
            <View style={{paddingTop: Sizes.fixPadding}}>
              {successIcon()}
              {successText()}
              {seeAppliedJobButton()}
              {discoverMoreJobButton()}
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  function discoverMoreJobButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.push('BottomTabBar');
        }}
        style={styles.borderButtonStyle}>
        <Text style={{...Fonts.primaryColor18SemiBold}}>
          Discover More Jobs
        </Text>
      </TouchableOpacity>
    );
  }

  function seeAppliedJobButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.push('AppliedJobs');
        }}
        style={{
          ...CommonStyles.buttonStyle,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.whiteColor18SemiBold}}>
          See Applied Jobs List
        </Text>
      </TouchableOpacity>
    );
  }

  function successText() {
    return (
      <View
        style={{
          alignItems: 'center',
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding * 3.0,
        }}>
        <Text style={{...Fonts.blackColor20Bold}}>Successful</Text>
        <Text
          numberOfLines={2}
          style={{
            ...Fonts.grayColor16Regular,
            marginTop: Sizes.fixPadding,
            textAlign: 'center',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          malesuada est commodo eu.
        </Text>
      </View>
    );
  }

  function successIcon() {
    return (
      <Image
        source={require('../../assets/images/icons/success.png')}
        style={styles.successIconStyle}
      />
    );
  }

  function resumeInfo() {
    return (
      <View style={{...styles.card, marginTop: Sizes.fixPadding * 3.0}}>
        <Image
          source={require('../../assets/images/icons/pdf_logo.png')}
          style={{width: 40.0, height: 55.0, resizeMode: 'contain'}}
        />
        <View style={{flex: 1, marginLeft: Sizes.fixPadding * 2.0}}>
          <Text style={{...Fonts.blackColor18Medium}}>
            Resume - Samantha.pdf
          </Text>
          <Text
            style={{
              ...Fonts.grayColor14Medium,
              marginTop: Sizes.fixPadding - 5.0,
            }}>
            500kb
          </Text>
        </View>
      </View>
    );
  }

  function serviceProviderInfo() {
    return (
      <View style={styles.card}>
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
        <Text style={CommonStyles.headerTextStyle}>Job Details</Text>
      </View>
    );
  }
};

export default UploadSuccessScreen;

const styles = StyleSheet.create({
  sourceLogoStyle: {
    width: screenWidth / 6.0,
    height: 65.0,
    resizeMode: 'contain',
    borderRadius: Sizes.fixPadding,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: Colors.extraLightGrayColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
  },
  borderButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.0,
    borderColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 1.8,
    margin: Sizes.fixPadding * 2.0,
  },
  successIconStyle: {
    width: 100.0,
    height: 100.0,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
