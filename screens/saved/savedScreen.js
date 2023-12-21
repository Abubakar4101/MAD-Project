import {
  StyleSheet,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes, screenWidth} from '../../constants/styles';
import {Text} from '../../components/commonText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Snackbar} from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';

const savedJobsList = [
  {
    key: '1',
    sourceLogo: require('../../assets/images/jobs/job1.png'),
    jobType: 'UI/UX Designer',
    sourceName: 'Airbnb',
    city: 'California, USA',
    jobTime: 'Full time',
    amountPerMonth: 450,
    inBookmark: true,
  },
  {
    key: '2',
    sourceLogo: require('../../assets/images/jobs/job2.png'),
    jobType: 'Financial Planner',
    sourceName: 'Twitter',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 400,
    inBookmark: false,
  },
  {
    key: '3',
    sourceLogo: require('../../assets/images/jobs/job3.png'),
    jobType: 'Product Manager',
    sourceName: 'Microsoft Crop',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    inBookmark: false,
  },
  {
    key: '4',
    sourceLogo: require('../../assets/images/jobs/job4.png'),
    jobType: 'Automation Trester',
    sourceName: 'Linkedin',
    city: 'California, USA',
    jobTime: 'Part time',
    amountPerMonth: 550,
    inBookmark: true,
  },
];

const rowSwipeAnimatedValues = {};

Array(savedJobsList.length + 1)
  .fill('')
  .forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

const SavedScreen = ({navigation}) => {
  const [savedData, setsavedData] = useState(savedJobsList);
  const [showSnackBar, setshowSnackBar] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {savedJobsInfo()}
        {snackBarInfo()}
      </View>
    </View>
  );

  function snackBarInfo() {
    return (
      <Snackbar
        visible={showSnackBar}
        elevation={0}
        onDismiss={() => setshowSnackBar(false)}
        style={styles.snackBarStyle}>
        <Text style={{...Fonts.whiteColor16Medium}}>
          Removed From Saved Jobs
        </Text>
      </Snackbar>
    );
  }

  function header() {
    return (
      <Text
        style={{
          ...Fonts.blackColor20Bold,
          textAlign: 'center',
          margin: Sizes.fixPadding * 2.0,
        }}>
        Saved Jobs
      </Text>
    );
  }

  function savedJobsInfo() {
    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };

    const renderHiddenItem = (data, rowMap) => (
      <View style={{alignItems: 'center', flex: 1}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{...styles.deleteIconWrapStyle, right: 0}}
          onPress={() => deleteRow(rowMap, data.item.key)}>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                      inputRange: [50, 80],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            <View style={styles.deleteCircleStyle}>
              <FontAwesome name="trash" size={25} color={Colors.whiteColor} />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );

    const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...savedData];
      const prevIndex = savedData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setshowSnackBar(true);
      setsavedData(newData);
    };

    const onSwipeValueChange = swipeData => {
      const {key, value} = swipeData;
      rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
      <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.push('JobDetail');
          }}
          style={styles.jobWrapStyle}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Image
              source={data.item.sourceLogo}
              style={styles.sourceLogoStyle}
            />
            <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
              <Text numberOfLines={1} style={{...Fonts.blackColor18SemiBold}}>
                {data.item.jobType}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.blackColor15Regular,
                  marginBottom: Sizes.fixPadding - 8.0,
                  marginTop: Sizes.fixPadding - 5.0,
                }}>
                {data.item.sourceName}
              </Text>
              <Text numberOfLines={1} style={{...Fonts.grayColor13Regular}}>
                {data.item.city} • {data.item.jobTime}
              </Text>
            </View>
          </View>
          <Text
            style={{...Fonts.primaryColor16SemiBold, alignSelf: 'flex-start'}}>
            {`$`}
            {data.item.amountPerMonth}/Mo
          </Text>
        </TouchableOpacity>
      </View>
    );

    return savedData.length == 0 ? (
      noSavedJobInfo()
    ) : (
      <SwipeListView
        data={savedData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-80}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: Sizes.fixPadding}}
      />
    );
  }

  function noSavedJobInfo() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <MaterialCommunityIcons
          name="bookmark-off-outline"
          color={Colors.grayColor}
          size={40}
        />
        <Text
          style={{...Fonts.grayColor19SemiBold, marginTop: Sizes.fixPadding}}>
          No Saved Jobs!
        </Text>
      </View>
    );
  }
};

export default SavedScreen;

const styles = StyleSheet.create({
  snackBarStyle: {
    backgroundColor: Colors.grayColor,
    position: 'absolute',
    left: -10.0,
    right: -10.0,
    bottom: -10.0,
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
  deleteCircleStyle: {
    width: 60.0,
    height: 60.0,
    borderRadius: 30.0,
    backgroundColor: Colors.redColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.redColor,
    shadowOffset: {width: 3, height: 10.0},
    shadowOpacity: 0.2,
    shadowRadius: 5.0,
    elevation: 5.0,
  },
  deleteIconWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: 'flex-start',
    top: 0,
    bottom: 10,
    justifyContent: 'center',
    position: 'absolute',
    width: 80,
  },
});
