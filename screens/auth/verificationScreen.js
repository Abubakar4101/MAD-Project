import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
  Text,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors, CommonStyles, Fonts, Sizes} from '../../constants/styles';
import {Overlay} from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useCandidateContext} from '../../context/candidateProvider';

const EmailVerificationScreen = ({navigation, route}) => {
  const {setCandidate} = useCandidateContext();
  const {
    name,
    email,
    mobile,
    password,
    preferredLocation,
    preferredJobType,
    profilePic,
  } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    // Simulate an asynchronous process with setTimeout
    setTimeout(() => {
      checkEmailVerificationStatus();
    }, 2000);
  }, []);

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        // Reload the user data to get the latest email verification status
        await user.reload();

        if (user.emailVerified) {
          console.log('in unsub', user);
          checkEmailVerificationStatus(user);
        } else {
          setIsRefreshing(false);
        }
      } else {
        setIsRefreshing(false);
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [onRefresh]);

  const checkEmailVerificationStatus = async user => {
    console.log(user);
    try {
      await firestore().collection('candidates').doc(user.uid).set({
        name,
        email,
        mobile,
        password,
        preferredLocation,
        preferredJobType,
        profilePic,
      });

      const userData = {
        userID: user.uid,
        name,
        email,
        mobile,
        password,
        preferredLocation,
        preferredJobType,
        profilePic,
      };

      setCandidate(userData);
      navigation.navigate('BottomTabBar');
    } catch (error) {
      console.error('Firestore error:', error.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <MyStatusBar />
      <View style={styles.mainContainer}>
        {renderHeader()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[Colors.primaryColor]}
            />
          }>
          {renderGIF()}
          {renderEnterCodeInfo()}
        </ScrollView>
        {renderLoadingDialog()}
      </View>
    </View>
  );

  function renderGIF() {
    return (
      <View style={styles.gifContainer}>
        <Image
          source={require('../../assets/images/Verification-Email.gif')} // Replace with the actual path to your GIF
          style={styles.gifImage}
        />
      </View>
    );
  }

  function renderLoadingDialog() {
    return (
      <Overlay isVisible={isLoading} overlayStyle={styles.dialogStyle}>
        <ActivityIndicator
          color={Colors.primaryColor}
          size="large"
          style={styles.activityIndicator}
        />
        <Text style={styles.loadingText}>Please wait...</Text>
      </Overlay>
    );
  }

  function renderEnterCodeInfo() {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Please click the verification link in your email to complete the
          verification process.
        </Text>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={styles.backButton}>
          <MaterialIcons
            name="keyboard-backspace"
            size={26}
            color={Colors.blackColor}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Email Verification</Text>
      </View>
    );
  }
};

export default EmailVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  mainContainer: {
    flex: 1,
    margin: Sizes.fixPadding * 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.fixPadding * 2,
  },
  backButton: {
    marginRight: Sizes.fixPadding,
  },
  headerText: {
    ...CommonStyles.headerTextStyle,
    fontSize: 22,
  },
  dialogStyle: {
    width: '85%',
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 2.5,
    paddingTop: Sizes.fixPadding * 3.0,
    elevation: 3.0,
    alignItems: 'center',
  },
  activityIndicator: {
    alignSelf: 'center',
    transform: [{scale: Platform.OS === 'ios' ? 1.5 : 2.0}],
  },
  loadingText: {
    marginTop: Sizes.fixPadding + 5.0,
    textAlign: 'center',
    ...Fonts.blackColor16Regular,
  },
  infoContainer: {
    marginTop: Sizes.fixPadding * 2,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  infoText: {
    ...Fonts.grayColor16Regular,
    textAlign: 'center',
  },
  gifContainer: {
    alignItems: 'center',
    marginBottom: Sizes.fixPadding * 2,
  },
  gifImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'contain',
  },
});
