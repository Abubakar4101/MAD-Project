import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  Colors,
  CommonStyles,
  Fonts,
  Sizes,
  screenWidth,
} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Snackbar} from 'react-native-paper';
import {Text} from '../../components/commonText';
import {BottomSheet} from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';

const searchResultsList = [
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
];

const fieldsList = [
  'All Job',
  'Writer',
  'Management',
  'Arts',
  'Marketing',
  'Programming',
  'Finance',
  'Accounting',
  'Product Designer',
];

const jobTypeList = [
  'All Type',
  'Full Time',
  'Part Time',
  'Freelance',
  'Intership',
  'Contractual',
];

const salaryTypesList = ['All Range', '<$2k', '$2k - $4k', '>$6k'];

const SearchScreen = ({navigation}) => {
  const [searchData, setsearchData] = useState(searchResultsList);
  const [showSnackBar, setshowSnackBar] = useState(false);
  const [snackBarMsg, setsnackBarMsg] = useState('');
  const [showFilterSheet, setshowFilterSheet] = useState(false);
  const [selectedFieldIndex, setselectedFieldIndex] = useState(0);
  const [selectedJobTypeIndex, setselectedJobTypeIndex] = useState(0);
  const [selectedSalaryTypeIndex, setselectedSalaryTypeIndex] = useState(0);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {searchField()}
        {resultTitle()}
        {results()}
      </View>
      {filterSheet()}
      {snackBarInfo()}
    </View>
  );

  function filterSheet() {
    return (
      <BottomSheet
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        isVisible={showFilterSheet}
        onBackdropPress={() => setshowFilterSheet(false)}
        >
        <View style={{backgroundColor: Colors.whiteColor}}>
          <Text
            style={{
              ...Fonts.blackColor20Bold,
              margin: Sizes.fixPadding * 2.0,
              textAlign: 'center',
            }}>
            Filter
          </Text>
          <View style={styles.fieldOfWorkTitleWrapStyle}>
            <Text style={{...Fonts.blackColor19SemiBold}}>Field of Work</Text>
            <Text style={{...Fonts.primaryColor16SemiBold}}>See all</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: Sizes.fixPadding + 5.0,
            }}>
            {fieldsList.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setselectedFieldIndex(index);
                }}
                key={`${index}`}
                style={{
                  ...styles.filterOptionStyle,
                  backgroundColor:
                    selectedFieldIndex === index
                      ? Colors.primaryColor
                      : Colors.whiteColor,
                  borderColor:
                    selectedFieldIndex === index
                      ? Colors.primaryColor
                      : Colors.lightGrayColor,
                }}>
                <Text
                  style={
                    selectedFieldIndex === index
                      ? {...Fonts.whiteColor16Medium}
                      : {...Fonts.grayColor16Regular}
                  }>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text
            style={{
              ...Fonts.blackColor19SemiBold,
              marginHorizontal: Sizes.fixPadding * 2.0,
              marginVertical: Sizes.fixPadding + 5.0,
            }}>
            Type
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: Sizes.fixPadding + 5.0,
            }}>
            {jobTypeList.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setselectedJobTypeIndex(index);
                }}
                key={`${index}`}
                style={{
                  ...styles.filterOptionStyle,
                  backgroundColor:
                    selectedJobTypeIndex === index
                      ? Colors.primaryColor
                      : Colors.whiteColor,
                  borderColor:
                    selectedJobTypeIndex === index
                      ? Colors.primaryColor
                      : Colors.lightGrayColor,
                }}>
                <Text
                  style={
                    selectedJobTypeIndex === index
                      ? {...Fonts.whiteColor16Medium}
                      : {...Fonts.grayColor16Regular}
                  }>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text
            style={{
              ...Fonts.blackColor19SemiBold,
              marginHorizontal: Sizes.fixPadding * 2.0,
              marginVertical: Sizes.fixPadding + 5.0,
            }}>
            Salary
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: Sizes.fixPadding + 5.0,
            }}>
            {salaryTypesList.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setselectedSalaryTypeIndex(index);
                }}
                key={`${index}`}
                style={{
                  ...styles.filterOptionStyle,
                  backgroundColor:
                    selectedSalaryTypeIndex === index
                      ? Colors.primaryColor
                      : Colors.whiteColor,
                  borderColor:
                    selectedSalaryTypeIndex === index
                      ? Colors.primaryColor
                      : Colors.lightGrayColor,
                }}>
                <Text
                  style={
                    selectedSalaryTypeIndex === index
                      ? {...Fonts.whiteColor16Medium}
                      : {...Fonts.grayColor16Regular}
                  }>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: Sizes.fixPadding * 2.0,
            }}>
            <Text
              onPress={() => {
                setshowFilterSheet(false);
              }}
              style={{...Fonts.primaryColor20SemiBold}}>
              Clear
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setshowFilterSheet(false);
              }}
              style={styles.applyButtonStyle}>
              <Text style={{...Fonts.whiteColor18SemiBold}}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
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

  function updateSearch({id}) {
    const copyData = searchData;
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
    setsearchData(updatedDatat);
  }

  function results() {
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
              updateSearch({id: item.id});
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
        data={searchData}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      />
    );
  }

  function resultTitle() {
    return (
      <View style={styles.resultTitleWrapper}>
        <Text style={{...Fonts.blackColor19SemiBold, flex: 1}}>Results</Text>
        <Text style={{...Fonts.primaryColor16SemiBold}}>
          471 <Text style={{...Fonts.primaryColor16Medium}}>founds</Text>
        </Text>
      </View>
    );
  }

  function searchField() {
    return (
      <View style={styles.searchFieldWrapper}>
        <MaterialIcons name="search" color={Colors.grayColor} size={20} />
        <TextInput
          placeholder="Search Here"
          placeholderTextColor={Colors.grayColor}
          style={styles.searchFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
        />
        <MaterialIcons
          name="filter-list"
          color={Colors.grayColor}
          size={22}
          onPress={() => setshowFilterSheet(true)}
        />
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
        <Text style={CommonStyles.headerTextStyle}>Search</Text>
      </View>
    );
  }
};

export default SearchScreen;

const styles = StyleSheet.create({
  headerTextStyle: {
    ...Fonts.blackColor20Bold,
    textAlign: 'center',
    maxWidth: '80%',
    alignSelf: 'center',
  },
  applyButtonStyle: {
    flex: 1,
    marginLeft: Sizes.fixPadding * 2.0,
    ...CommonStyles.buttonStyle,
  },
  jobTypeWrapStyle: {
    paddingHorizontal: Sizes.fixPadding + 8.0,
    paddingVertical: Sizes.fixPadding - 2.0,
    borderRadius: Sizes.fixPadding * 5.0,
    margin: Sizes.fixPadding - 5.0,
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
    overflow: 'hidden',
  },
  searchFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.extraLightGrayColor,
    padding: Sizes.fixPadding + 2.0,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
  },
  searchFieldStyle: {
    ...Fonts.grayColor16Regular,
    flex: 1,
    marginHorizontal: Sizes.fixPadding,
    includeFontPadding: false,
    padding:0
  },
  resultTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding * 2.0,
  },
  filterOptionStyle: {
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding - 5.0,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding * 2.0,
    margin: Sizes.fixPadding - 5.0,
  },
  fieldOfWorkTitleWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
  },
});
