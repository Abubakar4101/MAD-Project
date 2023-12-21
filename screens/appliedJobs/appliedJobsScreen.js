import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Text} from '../../components/commonText';
import {
  Sizes,
  Fonts,
  Colors,
  CommonStyles,
  screenWidth,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const appliedAllJobsList = [
  {
    id: '1',
    sourceLogo: require('../../assets/images/jobs/job1.png'),
    jobType: 'UI/UX Designer',
    sourceName: 'Airbnb',
    city: 'California, USA',
    jobTime: 'Full time',
    amountPerMonth: 450,
    shortListed: true,
  },
  {
    id: '2',
    sourceLogo: require('../../assets/images/jobs/job2.png'),
    jobType: 'Financial Planner',
    sourceName: 'Twitter',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 400,
    shortListed: false,
  },
  {
    id: '3',
    sourceLogo: require('../../assets/images/jobs/job3.png'),
    jobType: 'Product Manager',
    sourceName: 'Microsoft Crop',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    shortListed: true,
  },
  {
    id: '4',
    sourceLogo: require('../../assets/images/jobs/job4.png'),
    jobType: 'Automation Trester',
    sourceName: 'Linkedin',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    shortListed: true,
  },
  {
    id: '5',
    sourceLogo: require('../../assets/images/jobs/job1.png'),
    jobType: 'UI/UX Designer',
    sourceName: 'Airbnb',
    city: 'California, USA',
    jobTime: 'Full time',
    amountPerMonth: 450,
    shortListed: true,
  },
  {
    id: '6',
    sourceLogo: require('../../assets/images/jobs/job2.png'),
    jobType: 'Financial Planner',
    sourceName: 'Twitter',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 400,
    shortListed: false,
  },
  {
    id: '7',
    sourceLogo: require('../../assets/images/jobs/job3.png'),
    jobType: 'Product Manager',
    sourceName: 'Microsoft Crop',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    shortListed: true,
  },
  {
    id: '8',
    sourceLogo: require('../../assets/images/jobs/job4.png'),
    jobType: 'Automation Trester',
    sourceName: 'Linkedin',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    shortListed: true,
  },
];

const shortlistedJobsList = [
  {
    id: '1',
    sourceLogo: require('../../assets/images/jobs/job1.png'),
    jobType: 'UI/UX Designer',
    sourceName: 'Airbnb',
    city: 'California, USA',
    jobTime: 'Full time',
    amountPerMonth: 450,
    shortListed: true,
  },
  {
    id: '4',
    sourceLogo: require('../../assets/images/jobs/job4.png'),
    jobType: 'Automation Trester',
    sourceName: 'Linkedin',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    shortListed: true,
  },
  {
    id: '7',
    sourceLogo: require('../../assets/images/jobs/job3.png'),
    jobType: 'Product Manager',
    sourceName: 'Microsoft Crop',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    shortListed: true,
  },
];

const interviewsJobList = [
  {
    id: '1',
    sourceLogo: require('../../assets/images/jobs/job4.png'),
    jobType: 'Automation Trester',
    sourceName: 'Linkedin',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    shortListed: true,
  },
  {
    id: '2',
    sourceLogo: require('../../assets/images/jobs/job1.png'),
    jobType: 'UI/UX Designer',
    sourceName: 'Airbnb',
    city: 'California, USA',
    jobTime: 'Full time',
    amountPerMonth: 450,
    shortListed: true,
  },
];

const AppliedJobsScreen = ({navigation}) => {
  const [selectedJobTypeIndex, setselectedJobTypeIndex] = useState(1);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {jobTypes()}
        {selectedJobTypeIndex == 1
          ? AllTypeJobs()
          : selectedJobTypeIndex == 2
          ? shortlistedJob({data: shortlistedJobsList})
          : shortlistedJob({data: interviewsJobList})}
      </View>
    </View>
  );

  function shortlistedJob({data}) {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.push('JobDetail');
        }}
        style={styles.jobWrapStyle}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Image source={item.sourceLogo} style={styles.sourceLogoStyle} />
          <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
            <Text numberOfLines={1} style={{...Fonts.blackColor18SemiBold}}>
              {item.jobType}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.blackColor15Regular,
                marginBottom: Sizes.fixPadding - 8.0,
                marginTop: Sizes.fixPadding - 5.0,
              }}>
              {item.sourceName}
            </Text>
            <Text numberOfLines={1} style={{...Fonts.grayColor13Regular}}>
              {item.city} • {item.jobTime}
            </Text>
          </View>
        </View>
        <Text style={{...Fonts.primaryColor16SemiBold}}>
          {`$`}
          {item.amountPerMonth}/Mo
        </Text>
      </TouchableOpacity>
    );
    return (
      <FlatList
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        data={data}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function AllTypeJobs() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.push('JobDetail');
        }}
        style={styles.jobWrapStyle}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Image source={item.sourceLogo} style={styles.sourceLogoStyle} />
          <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
            <Text numberOfLines={1} style={{...Fonts.blackColor18SemiBold}}>
              {item.jobType}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.blackColor15Regular,
                marginBottom: Sizes.fixPadding - 8.0,
                marginTop: Sizes.fixPadding - 5.0,
              }}>
              {item.sourceName}
            </Text>
            <Text numberOfLines={1} style={{...Fonts.grayColor13Regular}}>
              {item.city} • {item.jobTime}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 65.0,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <Text
            style={
              item.shortListed
                ? {...Fonts.greenColor15SemiBold}
                : {...Fonts.redColor15SemiBold}
            }>
            {item.shortListed ? 'Shortlisted' : 'Rejected'}
          </Text>
          <Text style={{...Fonts.primaryColor16SemiBold}}>
            {`$`}
            {item.amountPerMonth}/Mo
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        data={appliedAllJobsList}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function jobTypes() {
    return (
      <View style={styles.jobTypesWrapStyle}>
        {jobTypeShort({index: 1, type: 'All'})}
        {jobTypeShort({index: 2, type: 'Shortlisted'})}
        {jobTypeShort({index: 3, type: 'Interview'})}
      </View>
    );
  }

  function jobTypeShort({index, type}) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setselectedJobTypeIndex(index);
        }}
        style={{
          backgroundColor:
            selectedJobTypeIndex === index
              ? Colors.primaryColor
              : Colors.whiteColor,

          ...styles.jobTypeWrapStyle,
        }}>
        <Text
          numberOfLines={1}
          style={
            selectedJobTypeIndex === index
              ? {...Fonts.whiteColor16Medium}
              : {...Fonts.grayColor16Medium}
          }>
          {type}
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
        <Text style={CommonStyles.headerTextStyle}>Applied Jobs</Text>
      </View>
    );
  }
};

export default AppliedJobsScreen;

const styles = StyleSheet.create({
  jobTypesWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 5.0,
  },
  jobTypeWrapStyle: {
    paddingHorizontal: Sizes.fixPadding + 8.0,
    paddingVertical: Sizes.fixPadding - 2.0,
    borderRadius: Sizes.fixPadding * 5.0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobWrapStyle: {
    backgroundColor: 'rgba(105, 105, 105, 0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  sourceLogoStyle: {
    width: screenWidth / 6.0,
    height: 65.0,
    resizeMode: 'contain',
    borderRadius: Sizes.fixPadding,
    overflow: 'hidden',
  },
});
