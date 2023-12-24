import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes, screenWidth} from '../../constants/styles';
import {Text} from '../../components/commonText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {BottomSheet} from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';
import {useCandidateContext} from '../../context/candidateProvider';

const profileWebsites = [
  'https://dribble.com/samanthasmith-85r66s4g9',
  'https://behance.net/samanthasmith',
];

const skillsList = [
  require('../../assets/images/icons/adobe_logo.png'),
  require('../../assets/images/icons/adobexd_logo.png'),
  require('../../assets/images/icons/photoshop_logo.png'),
  require('../../assets/images/icons/figma_logo.png'),
];

const workExperiencesList = [
  {
    id: '1',
    serviceLogo: require('../../assets/images/jobs/job6.png'),
    post: 'Sr. UI/UX Designer (Team Lead)',
    serviceProvider: 'Infosys Technologies',
    experience: '2019 Dec - Present (2y, 4m)',
  },
  {
    id: '2',
    serviceLogo: require('../../assets/images/jobs/job5.png'),
    post: 'Jr. UI/UX Designer',
    serviceProvider: 'Android',
    experience: '2018 Aug - 2019 Dec  (1y, 6m)',
  },
];

const ProfileScreen = ({navigation}) => {
  const {candidateData} = useCandidateContext();

  const [readMore, setreadMore] = useState(false);
  const [showProfilePicChangeSheet, setshowProfilePicChangeSheet] =
    useState(false);
  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          {profileImage()}
          {contactInfo()}
          {divider()}
          {aboutInfo()}
          {divider()}
          {skillsInfo()}
          {divider()}
          {workExperienceInfo()}
          {divider()}
          {educationInfo()}
        </ScrollView>
      </View>
      {changeProfilePicSheet()}
    </View>
  );

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
              setshowProfilePicChangeSheet(false);
            }}
            style={{...Fonts.redColor16Regular, textAlign: 'center'}}>
            Remove Current Photo
          </Text>
          <View style={styles.sheetDivider} />
          <Text
            onPress={() => {
              setshowProfilePicChangeSheet(false);
            }}
            style={{...Fonts.blackColor16Regular, textAlign: 'center'}}>
            Take Photo
          </Text>
          <View style={styles.sheetDivider} />
          <Text
            onPress={() => {
              setshowProfilePicChangeSheet(false);
            }}
            style={{...Fonts.blackColor16Regular, textAlign: 'center'}}>
            Choose From Library
          </Text>
        </View>
      </BottomSheet>
    );
  }

  function educationInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <View
          style={{
            ...styles.rowSpaceBetween,
            marginBottom: Sizes.fixPadding + 2.0,
          }}>
          <Text style={{...Fonts.blackColor19SemiBold}}>Education</Text>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={20}
            color={Colors.grayColor}
            onPress={() => {
              navigation.push('EditEducation');
            }}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/university1.png')}
            style={styles.universityImageStyle}
          />
          <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
            <Text style={{...Fonts.blackColor17SemiBold}}>
              University of South California
            </Text>
            <Text
              style={{
                ...Fonts.grayColor15Regular,
                marginTop: Sizes.fixPadding - 7.0,
              }}>
              Bachelor of Information Technology
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function workExperienceInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <View style={{...styles.rowSpaceBetween}}>
          <Text style={{...Fonts.blackColor19SemiBold}}>Work Experience</Text>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={20}
            color={Colors.grayColor}
            onPress={() => {
              navigation.push('EditExperience');
            }}
          />
        </View>
        {workExperiencesList.map(item => (
          <View
            key={`${item.id}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: Sizes.fixPadding * 1.5,
            }}>
            <Image source={item.serviceLogo} style={styles.sourceLogoStyle} />
            <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
              <Text numberOfLines={1} style={{...Fonts.blackColor17SemiBold}}>
                {item.post}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.grayColor15Regular,
                  marginVertical: Sizes.fixPadding - 7.0,
                }}>
                {item.serviceProvider}
              </Text>
              <Text numberOfLines={1} style={{...Fonts.grayColor14Regular}}>
                {item.experience}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }

  function skillsInfo() {
    const renderItem = ({item}) => (
      <Image source={item} style={styles.skillsPltImage} />
    );
    return (
      <View>
        <View
          style={{
            ...styles.rowSpaceBetween,
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding + 2.0,
          }}>
          <Text style={{...Fonts.blackColor19SemiBold}}>Skills</Text>
          <Feather
            name="plus-square"
            size={20}
            color={Colors.grayColor}
            onPress={() => {
              navigation.push('AddSkills');
            }}
          />
        </View>
        <FlatList
          horizontal
          data={skillsList}
          keyExtractor={index => `${index}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: Sizes.fixPadding}}
        />
      </View>
    );
  }

  function aboutInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <View style={{...styles.rowSpaceBetween}}>
          <Text style={{...Fonts.blackColor19SemiBold}}>About Me</Text>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={20}
            color={Colors.grayColor}
            onPress={() => navigation.push('EditAbout')}
          />
        </View>
        <View style={{marginVertical: Sizes.fixPadding + 2.0}}>
          <Text
            numberOfLines={readMore ? 0 : 3}
            style={{...Fonts.grayColor15Regular}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sit
            ullamcorper quisque eu sollicitudin rhoncus non augue. Sit magna vel
            magna rhoncus Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Amet sit ullamcorper quisque eu sollicitudin rhoncus non
            augue. Sit magna vel magna rhoncus
          </Text>
          <Text
            onPress={() => setreadMore(!readMore)}
            style={{
              ...Fonts.primaryColor16Medium,
              textAlign: 'right',
              alignSelf: 'flex-end',
            }}>
            {readMore ? 'Show less..' : 'Read more..'}
          </Text>
        </View>
        <View style={{...styles.rowSpaceBetween}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons
              name="business-center"
              size={18}
              color={Colors.grayColor}
            />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor15Medium,
                flex: 1,
                marginHorizontal: Sizes.fixPadding - 5.0,
              }}>
              4+ years experience
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons
              name="location-pin"
              size={17}
              color={Colors.grayColor}
            />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.grayColor15Medium,
                flex: 1,
                marginLeft: Sizes.fixPadding - 5.0,
              }}>
              California, USA
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGrayColor,
          height: 1.0,
          margin: Sizes.fixPadding * 2.0,
        }}
      />
    );
  }

  function contactInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <View
          style={{
            ...styles.rowSpaceBetween,
            marginBottom: Sizes.fixPadding,
          }}>
          <Text style={{...Fonts.blackColor19SemiBold, flex: 1}}>
            Contact Information
          </Text>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={20}
            color={Colors.grayColor}
            onPress={() => {
              navigation.push('EditContactInfo');
            }}
          />
        </View>
        <View>
          <Text style={{...Fonts.blackColor15Medium}}>Email Address</Text>
          <Text
            style={{
              ...Fonts.grayColor15Regular,
              marginTop: Sizes.fixPadding - 7.0,
            }}>
            {candidateData.email}
          </Text>
        </View>
        <View style={{marginVertical: Sizes.fixPadding + 2.0}}>
          <Text style={{...Fonts.blackColor15Medium}}>Mobile Number</Text>
          <Text
            style={{
              ...Fonts.grayColor15Regular,
              marginTop: Sizes.fixPadding - 7.0,
            }}>
            {candidateData.mobile}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              ...Fonts.blackColor15Medium,
              marginBottom: Sizes.fixPadding - 8.0,
            }}>
            Website
          </Text>
          {profileWebsites.map((item, index) => (
            <Text
              key={`${index}`}
              style={{
                ...Fonts.blueColor15Regular,
                marginTop: Sizes.fixPadding - 7.0,
              }}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    );
  }

  function profileImage() {
    return (
      <ImageBackground
        source={{uri: candidateData.profilePic}}
        style={{
          width: screenWidth,
          height: screenWidth - 120,
          marginBottom: Sizes.fixPadding * 3.5,
        }}
        resizeMode="cover">
        <View style={styles.prifileImageOverlay}>
          <View style={styles.rowSpaceBetween}>
            <Text style={{...Fonts.whiteColor20Bold}}>Profile</Text>
            <Ionicons
              name="settings-outline"
              size={22}
              color={Colors.whiteColor}
              onPress={() => {
                navigation.push('Settings');
              }}
            />
          </View>
          <View>
            <Text style={{...Fonts.whiteColor19SemiBold}}>{candidateData.name}</Text>
            <Text
              style={{
                ...Fonts.whiteColor16Medium,
                marginTop: Sizes.fixPadding - 8.0,
              }}>
              {candidateData.preferredJobType}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setshowProfilePicChangeSheet(true);
          }}
          style={styles.changeProfileIconWrapStyle}>
          <Ionicons name="camera" size={15} color={Colors.whiteColor} />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
};

export default ProfileScreen;

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
  universityImageStyle: {
    width: 50.0,
    height: 50.0,
    borderRadius: 10.0,
    overflow: 'hidden',
  },
  sourceLogoStyle: {
    width: screenWidth / 6.0,
    height: 65.0,
    resizeMode: 'contain',
    borderRadius: Sizes.fixPadding,
    overflow: 'hidden',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prifileImageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: Sizes.fixPadding * 2.0,
  },
  changeProfileIconWrapStyle: {
    width: 36.0,
    height: 36.0,
    borderRadius: 18.0,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.whiteColor,
    borderWidth: 3.0,
    position: 'absolute',
    bottom: -18.0,
    right: 20.0,
    zIndex: 1,
  },
  skillsPltImage: {
    width: 36.0,
    height: 36.0,
    resizeMode: 'contain',
    marginHorizontal: Sizes.fixPadding,
  },
});
