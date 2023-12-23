import {BackHandler, Image, StyleSheet, View, Platform} from 'react-native';
import React, {useCallback} from 'react';
import {Colors, Fonts, Sizes, screenWidth} from '../constants/styles';
import {useFocusEffect} from '@react-navigation/native';
import MyStatusBar from '../components/myStatusBar';
import {Text} from '../components/commonText';

const SplashScreen = ({navigation}) => {
  const backAction = () => {
    if (Platform.OS === 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      BackHandler.exitApp();
      return true;
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        navigation.removeListener('gestureEnd', backAction);
      };
    }, [backAction]),
  );

  setTimeout(() => {
    navigation.push('Onboadring');
  }, 2000);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('../assets/images/app_icon.png')}
          style={{
            width: screenWidth / 4.5,
            height: screenWidth / 4.5,
            resizeMode: 'contain',
          }}
        />
        <Text style={{...styles.appTitleTextStyle}}>
          Career
          <Text style={{...Fonts.pinkColor20Bold}}>Sync</Text>
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  appTitleTextStyle: {
    ...Fonts.primaryColor20Bold,
    marginTop: Sizes.fixPadding - 5.0,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
});
