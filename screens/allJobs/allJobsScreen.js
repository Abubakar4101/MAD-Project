import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes, screenWidth} from '../../constants/styles';
import {Text} from '../../components/commonText';
import {Snackbar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const jobList = [
  {
    id: '1',
    sourceLogo: require('../../assets/images/jobs/job1.png'),
    jobType: 'UI/UX Designer',
    sourceName: 'Airbnb',
    city: 'California, USA',
    jobTime: 'Full time',
    amountPerMonth: 450,
    inBookmark: true,
  },
  {
    id: '2',
    sourceLogo: require('../../assets/images/jobs/job2.png'),
    jobType: 'Financial Planner',
    sourceName: 'Twitter',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 400,
    inBookmark: false,
  },
  {
    id: '3',
    sourceLogo: require('../../assets/images/jobs/job3.png'),
    jobType: 'Product Manager',
    sourceName: 'Microsoft Crop',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    inBookmark: false,
  },
  {
    id: '4',
    sourceLogo: require('../../assets/images/jobs/job4.png'),
    jobType: 'Automation Trester',
    sourceName: 'Linkedin',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    inBookmark: true,
  },
  {
    id: '5',
    sourceLogo: require('../../assets/images/jobs/job1.png'),
    jobType: 'UI/UX Designer',
    sourceName: 'Airbnb',
    city: 'California, USA',
    jobTime: 'Full time',
    amountPerMonth: 450,
    inBookmark: true,
  },
  {
    id: '6',
    sourceLogo: require('../../assets/images/jobs/job2.png'),
    jobType: 'Financial Planner',
    sourceName: 'Twitter',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 400,
    inBookmark: false,
  },
  {
    id: '7',
    sourceLogo: require('../../assets/images/jobs/job3.png'),
    jobType: 'Product Manager',
    sourceName: 'Microsoft Crop',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    inBookmark: false,
  },
  {
    id: '8',
    sourceLogo: require('../../assets/images/jobs/job4.png'),
    jobType: 'Automation Trester',
    sourceName: 'Linkedin',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    inBookmark: true,
  },
];

const AllJobsScreen = ({navigation}) => {
  const [jobData, setjobData] = useState(jobList);
  const [showSnackBar, setshowSnackBar] = useState(false);
  const [snackBarMsg, setsnackBarMsg] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {allJobs()}
      </View>
      {snackBarInfo()}
    </View>
  );

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
        <Text style={styles.headerTextStyle}>Recommended Jobs</Text>
      </View>
    );
  }

  function snackBarInfo() {
    return (
      <Snackbar
        visible={showSnackBar}
        elevation={0}
        onDismiss={() => setshowSnackBar(false)}
        style={styles.snackBarStyle}>
        <Text style={{...Fonts.whiteColor16Medium}}>{snackBarMsg}</Text>
      </Snackbar>
    );
  }

  function updateJobData({id}) {
    const copyData = jobData;
    const updatedDatat = copyData.map(item => {
      if (item.id === id) {
        setsnackBarMsg(
          item.inBookmark ? 'Removed from Bookmark' : 'Added to Bookmark',
        );
        setshowSnackBar(true);
        return {...item, inBookmark: !item.inBookmark};
      } else {
        return item;
      }
    });
    setjobData(updatedDatat);
  }

  function allJobs() {
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
          <MaterialIcons
            name={item.inBookmark ? 'bookmark' : 'bookmark-border'}
            color={Colors.primaryColor}
            size={24}
            onPress={() => {
              updateJobData({id: item.id});
            }}
          />
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
        data={jobData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: Sizes.fixPadding}}
      />
    );
  }
};

export default AllJobsScreen;

const styles = StyleSheet.create({
  headerTextStyle: {
    ...Fonts.blackColor20Bold,
    textAlign: 'center',
    maxWidth: '80%',
    alignSelf: 'center',
  },
  snackBarStyle: {
    backgroundColor: Colors.grayColor,
    position: 'absolute',
    left: 0.0,
    right: 0.0,
    bottom: 15.0,
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
  },
});
