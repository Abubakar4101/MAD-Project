import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Colors, Fonts, Sizes, screenWidth} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Text} from '../../components/commonText';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {useCandidateContext} from '../../context/candidateProvider';
import {Snackbar} from 'react-native-paper';
import MyStatusBar from '../../components/myStatusBar';
import axios from 'axios';

const apiUrl = 'https://jsearch.p.rapidapi.com/search';
const genAI = new GoogleGenerativeAI('AIzaSyA2asrrbHrBS62ETYhBFyndG1svdOoZLEk');

const headers = {
  'X-RapidAPI-Key': 'b1eacdb883mshe12d9f17d4df75ep16f091jsn038f41c0be55',
  'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
};

const HomeScreen = ({navigation}) => {
  const {candidateData} = useCandidateContext();

  const [selectedJobTypeIndex, setselectedJobTypeIndex] = useState(0);
  const [selectedJobType, setselectedJobType] = useState(
    candidateData.preferredJobType,
  );
  const [jobData, setjobData] = useState([]);
  const [showSnackBar, setshowSnackBar] = useState(false);
  const [snackBarMsg, setsnackBarMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [jobsTypesList, setJobsTypesList] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchJobData(candidateData.preferredJobType);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchJobData(candidateData.preferredJobType);
  }, [onRefresh]);

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const model = genAI.getGenerativeModel({model: 'gemini-pro'});

        const prompt = `I am building a job seeker app. I have to show the related job categories based on preferred job titles. You have to give me the 5 categories of ${candidateData.preferredJobType} in this format: "<category1>", "<category2>", "<category3>", "<category4>", "<category5>". Note: just write the categories, no numbering, Because from this I want to initailize the array.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jobTypes = text.split(',').map(item => item.trim());
        const updatedJobTypes = [candidateData.preferredJobType, ...jobTypes];
        setJobsTypesList(updatedJobTypes);
      } catch (error) {
        console.error('Error fetching job types:', error);
      }
    };

    fetchJobTypes();
  }, []);

  const fetchJobData = async JobType => {
    try {
      setIsLoading(true);
      const response = await axios.get(apiUrl, {
        params: {
          query: JobType,
          page: '3',
          num_pages: '1',
        },
        headers: headers,
      });
      setjobData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setjobData([]);
      setIsLoading(false);
    }
  };

  const updateJobData = ({id}) => {
    const updatedData = jobData.map(item => {
      if (item.job_id === id) {
        setsnackBarMsg(
          item.job_apply_is_direct
            ? 'Removed from Bookmark'
            : 'Added to Bookmark',
        );
        setshowSnackBar(true);
        return {
          ...item,
          job_apply_is_direct: !item.job_apply_is_direct,
        };
      } else {
        return item;
      }
    });
    setjobData(updatedData);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {header()}
          {searchField()}
          {banner()}
          {jobRecommendationTitle()}
          {jobTypesInfo()}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.push('JobDetail');
                }}
                style={styles.jobWrapStyle}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Image
                    source={require('../../assets/images/icons/react.png')}
                    style={styles.sourceLogoStyle}
                  />
                  <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
                    <Text
                      numberOfLines={1}
                      style={{...Fonts.blackColor18SemiBold}}>
                      Web App Developer
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.blackColor15Regular,
                        marginBottom: Sizes.fixPadding - 8.0,
                        marginTop: Sizes.fixPadding - 5.0,
                      }}>
                     Jacobs
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{...Fonts.grayColor13Regular}}>
                      FULLTIME
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
                    name='bookmark-border'
                    color={Colors.primaryColor}
                    size={24}
                    onPress={() => {
                      updateJobData({id: '123'});
                    }}
                  />
                  <Text style={{...Fonts.primaryColor16SemiBold}}>
                    Salary TBD
                  </Text>
                </View>
              </TouchableOpacity>
              <FlatList
                keyExtractor={item => item.job_id}
                data={jobData}
                scrollEnabled={false}
                renderItem={({item}) =>
                  item.employer_logo && (
                    <TouchableOpacity
                      key={item.job_id}
                      activeOpacity={0.7}
                      onPress={() => {
                        navigation.push('JobDetail');
                      }}
                      style={styles.jobWrapStyle}>
                      <View style={{flexDirection: 'row', flex: 1}}>
                        <Image
                          source={{uri: item.employer_logo}}
                          style={styles.sourceLogoStyle}
                        />
                        <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
                          <Text
                            numberOfLines={1}
                            style={{...Fonts.blackColor18SemiBold}}>
                            {item.job_title}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{
                              ...Fonts.blackColor15Regular,
                              marginBottom: Sizes.fixPadding - 8.0,
                              marginTop: Sizes.fixPadding - 5.0,
                            }}>
                            {item.employer_name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{...Fonts.grayColor13Regular}}>
                            {item.job_city}, {item.job_state} •{' '}
                            {item.job_employment_type}
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
                          name={
                            item.job_apply_is_direct
                              ? 'bookmark'
                              : 'bookmark-border'
                          }
                          color={Colors.primaryColor}
                          size={24}
                          onPress={() => {
                            updateJobData({id: item.job_id});
                          }}
                        />
                        <Text style={{...Fonts.primaryColor16SemiBold}}>
                          {item.job_min_salary
                            ? `$${item.job_min_salary}`
                            : 'Salary TBD'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
              />
            </>
          )}
        </ScrollView>
      </View>
      {snackBarInfo()}
    </View>
  );

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

  function jobTypesInfo() {
    const renderItem = ({item, index}) => (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setselectedJobTypeIndex(index);
          setselectedJobType(item);
          fetchJobData(item);
        }}
        style={{
          backgroundColor:
            selectedJobTypeIndex === index
              ? Colors.primaryColor
              : Colors.whiteColor,
          ...styles.jobTypeWrapStyle,
        }}>
        <Text
          style={
            selectedJobTypeIndex === index
              ? {...Fonts.whiteColor16Medium}
              : {...Fonts.grayColor16Medium}
          }>
          {item}
        </Text>
      </TouchableOpacity>
    );
    return (
      <View>
        <FlatList
          data={jobsTypesList}
          keyExtractor={(_, index) => `${index}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: Sizes.fixPadding + 5.0}}
        />
      </View>
    );
  }

  function jobRecommendationTitle() {
    return (
      <View style={styles.jobRecommendationTitleWrapper}>
        <Text
          numberOfLines={1}
          style={{...Fonts.blackColor19SemiBold, flex: 1}}>
          Job Recommendation
        </Text>
        <Text
          onPress={() => {
            navigation.push('AllJobs');
          }}
          style={{...Fonts.primaryColor16SemiBold}}>
          See all
        </Text>
      </View>
    );
  }

  function banner() {
    return (
      <View style={styles.bannerWrapStyle}>
        <View style={styles.bannerDetailWrapStyle}>
          <Text numberOfLines={2} style={{...Fonts.whiteColor20SemiBold}}>
            How to find a{`\n`}perfect job for you
          </Text>
          <View style={styles.readMoreButtonStyle}>
            <Text style={{...Fonts.whiteColor16Medium}}>Read more</Text>
          </View>
        </View>
        <Image
          source={require('../../assets/images/users/user2.png')}
          style={styles.bannerImageStyle}
        />
      </View>
    );
  }

  function searchField() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.push('Search');
        }}
        style={styles.searchFieldWrapeStyle}>
        <MaterialIcons name="search" color={Colors.grayColor} size={20} />
        <Text
          style={{
            ...Fonts.grayColor16Regular,
            marginHorizontal: Sizes.fixPadding,
            flex: 1,
          }}>
          Search here
        </Text>
        <MaterialCommunityIcons
          name="filter-variant"
          color={Colors.grayColor}
          size={20}
        />
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Image
            source={{uri: candidateData.profilePic}}
            style={styles.userCircleImage}
          />
          <View
            style={{
              marginLeft: Sizes.fixPadding + 5.0,
              marginRight: Sizes.fixPadding,
              flex: 1,
            }}>
            <Text numberOfLines={1} style={{...Fonts.blackColor20Bold}}>
              Hello, {candidateData?.name || 'Guest'}!
            </Text>
            <Text
              style={{
                ...Fonts.grayColor16Regular,
                marginTop: Sizes.fixPadding - 5.0,
              }}>
              Good Morning
            </Text>
          </View>
        </View>
        <View>
          <Feather
            name="bell"
            size={24}
            color={Colors.blackColor}
            onPress={() => {
              navigation.push('Notifications');
            }}
          />
          <View style={styles.notificationBedgeStyle}></View>
        </View>
      </View>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  userCircleImage: {
    width: 56.0,
    height: 56.0,
    borderRadius: 28.0,
    resizeMode: 'cover',
  },
  searchFieldWrapeStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.extraLightGrayColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    borderRadius: Sizes.fixPadding,
  },
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding * 2.0,
  },
  notificationBedgeStyle: {
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
    borderColor: Colors.whiteColor,
    borderWidth: 1.0,
    position: 'absolute',
    backgroundColor: Colors.redColor,
    right: 3,
    top: 2,
  },
  readMoreButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding - 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding * 5.0,
    marginTop: Sizes.fixPadding * 2.0,
  },
  bannerWrapStyle: {
    backgroundColor: Colors.pinkColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 3.0,
    elevation: 3.0,
    shadowColor: Colors.pinkColor,
    shadowOffset: {width: 0, height: 15},
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  bannerDetailWrapStyle: {
    flex: 1,
    alignItems: 'flex-start',
    padding: Sizes.fixPadding * 2.5,
    paddingRight: Sizes.fixPadding,
  },
  bannerImageStyle: {
    height: '100%',
    width: screenWidth / 3.0,
    resizeMode: 'cover',
    marginRight: Sizes.fixPadding,
    overflow: 'hidden',
  },
  jobRecommendationTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.fixPadding * 2.0,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
