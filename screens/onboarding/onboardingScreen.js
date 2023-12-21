import {
  BackHandler,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState, useCallback, createRef } from "react";
import { Colors, Fonts, Sizes, screenWidth } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const dummyText =
  "Lorem ipsum dolor sit amet, consectetur adipiscingelit. Malesuada aliquet ut in ac cursus.";

const onboardingScreenList = [
  {
    id: "1",
    onboardingImage: require("../../assets/images/onboarding/onboarding1.png"),
    onboardingTitle: "Grab The Opportunity",
    onboardingDescription: dummyText,
  },
  {
    id: "2",
    onboardingImage: require("../../assets/images/onboarding/onboarding2.png"),
    onboardingTitle: "Get your Dream Job",
    onboardingDescription: dummyText,
  },
  {
    id: "3",
    onboardingImage: require("../../assets/images/onboarding/onboarding3.png"),
    onboardingTitle: "A Better way to Success",
    onboardingDescription: dummyText,
  },
];

const screenHeight = Dimensions.get("window").height;

const OnboardingScreen = ({ navigation }) => {
  const listRef = createRef();

  const scrollToIndex = ({ index }) => {
    listRef.current.scrollToIndex({ animated: true, index: index });
    setCurrentScreen(index);
  };

  const backAction = () => {
    if (Platform.OS == 'ios') {
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
    }
    return true;
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

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <View style={{ flex: 1 }}>{onboardingScreenContent()}</View>
      {skipNextAndLoginAithIndicator()}
      {exitInfo()}
    </View>
  );

  function skipNextAndLoginAithIndicator() {
    return (
      <View style={styles.skipNextLoginWrapStyle}>
        <Text
          onPress={() => {
            currentScreen !== 2 ? navigation.push("Login") : null;
          }}
          style={{
            ...Fonts.grayColor16Medium,
            color: currentScreen == 2 ? "transparent" : Colors.grayColor,
          }}
        >
          Skip
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {onboardingScreenList.map((item, index) => (
            <View
              key={`${item.id}`}
              style={{
                width: currentScreen == index ? 13.0 : 9.0,
                height: currentScreen == index ? 13.0 : 9.0,
                borderRadius: currentScreen == index ? 6.5 : 4.5,
                backgroundColor:
                  currentScreen == index
                    ? Colors.primaryColor
                    : Colors.lightGrayColor,
                marginHorizontal: Sizes.fixPadding - 5.0,
                opacity: currentScreen == index ? 1 : 0.6,
              }}
            ></View>
          ))}
        </View>
        <Text
          onPress={() => {
            currentScreen == 2
              ? navigation.push("Login")
              : scrollToIndex({ index: currentScreen + 1 });
          }}
          style={{ ...Fonts.primaryColor16Medium }}
        >
          {currentScreen == 2 ? "Login" : "Next"}
        </Text>
      </View>
    );
  }

  function onboardingScreenContent() {
    const renderItem = ({ item }) => {
      return (
        <View style={styles.onboardingContentStyle}>
          <ImageBackground
            source={require("../../assets/images/onboarding_bg.png")}
            style={styles.onboardingImageWrapStyle}
            resizeMode="stretch"
          >
            <Image
              source={item.onboardingImage}
              style={styles.onboardingImageStyle}
            />
          </ImageBackground>
          <View>
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
              <Text
                numberOfLines={1}
                style={{
                  textAlign: "center",
                  ...Fonts.blackColor22Bold,
                  marginBottom: Sizes.fixPadding,
                }}
              >
                {item.onboardingTitle}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  ...Fonts.grayColor16Regular,
                }}
              >
                {item.onboardingDescription}
              </Text>
            </View>
          </View>
        </View>
      );
    };
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={listRef}
          data={onboardingScreenList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          scrollEventThrottle={32}
          pagingEnabled
          onMomentumScrollEnd={onScrollEnd}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  function onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentScreen(pageNum);
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={styles.exitInfoWrapStyle}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Press Back Once Again To Exit!
        </Text>
      </View>
    ) : null;
  }
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  onboardingContentStyle: {
    flex: 1,
    width: screenWidth,
    height: "100%",
    overflow: "hidden",
  },
  onboardingImageWrapStyle: {
    flex: 0.65,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  onboardingImageStyle: {
    width: "100%",
    height: screenHeight / 4.5,
    resizeMode: "contain",
    marginBottom: Sizes.fixPadding * 6.0,
  },
  skipNextLoginWrapStyle: {
    position: "absolute",
    left: 20.0,
    right: 20.0,
    bottom: 30.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exitInfoWrapStyle: {
    backgroundColor: Colors.grayColor,
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});
