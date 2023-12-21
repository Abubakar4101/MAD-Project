import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, CommonStyles, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from '../../components/commonText';
import {TextInput} from 'react-native';
import {BottomSheet} from '@rneui/themed';
import MyStatusBar from '../../components/myStatusBar';

const yearsList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const locationsList = [
  'California, USA',
  'Los Angeles, California',
  'San Francisco, California',
  'Chicago, Illinois',
  'Houston, Texas',
  'Philadelphia, Pennsylvania',
  'Boston, Massachusetts',
  'San Diego, California',
  'Bristol, UK',
  'Manchester, UK',
  'Pune, India',
];

const EditAboutScreen = ({navigation}) => {
  const [showYearsSheet, setshowYearsSheet] = useState(false);
  const [selectedExperienceYear, setselectedExperienceYear] = useState(
    yearsList[3],
  );
  const [selectedLocation, setselectedLocation] = useState(locationsList[0]);
  const [showLocationsSheet, setshowLocationsSheet] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
          {aboutInfo()}
          {expercienceInfo()}
          {locationInfo()}
          {saveButton()}
        </ScrollView>
        {yearsSheet()}
        {locationsSheet()}
      </View>
    </View>
  );

  function locationsSheet() {
    return (
      <BottomSheet
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        isVisible={showLocationsSheet}
        onBackdropPress={() => setshowLocationsSheet(false)}>
        <View
          style={{
            backgroundColor: Colors.whiteColor,
            paddingBottom: Sizes.fixPadding,
          }}>
          <Text
            style={{
              ...Fonts.blackColor20Bold,
              textAlign: 'center',
              margin: Sizes.fixPadding * 1.5,
            }}>
            Locations
          </Text>
          {locationsList.map((item, index) => (
            <TouchableOpacity
              key={`${index}`}
              activeOpacity={0.7}
              onPress={() => {
                setselectedLocation(item);
                setshowLocationsSheet(false);
              }}
              style={{
                ...styles.rowSpaceBetween,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding + 2.0,
              }}>
              <Text
                key={`${item}`}
                style={
                  selectedLocation === item
                    ? {...Fonts.primaryColor16Medium}
                    : {...Fonts.grayColor16Regular}
                }>
                {item}
              </Text>
              {selectedLocation === item ? (
                <MaterialIcons
                  name="check"
                  color={Colors.primaryColor}
                  size={20}
                />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    );
  }

  function yearsSheet() {
    return (
      <BottomSheet
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        isVisible={showYearsSheet}
        onBackdropPress={() => setshowYearsSheet(false)}>
        <View
          style={{
            backgroundColor: Colors.whiteColor,
            paddingBottom: Sizes.fixPadding,
          }}>
          <Text
            style={{
              ...Fonts.blackColor20Bold,
              textAlign: 'center',
              margin: Sizes.fixPadding * 1.5,
            }}>
            Experience
          </Text>
          {yearsList.map((item, index) => (
            <TouchableOpacity
              key={`${index}`}
              activeOpacity={0.7}
              onPress={() => {
                setselectedExperienceYear(item);
                setshowYearsSheet(false);
              }}
              style={{
                ...styles.rowSpaceBetween,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding + 2.0,
              }}>
              <Text
                key={`${item}`}
                style={
                  selectedExperienceYear === item
                    ? {...Fonts.primaryColor16Medium}
                    : {...Fonts.grayColor16Regular}
                }>
                {item} Years
              </Text>
              {selectedExperienceYear === item ? (
                <MaterialIcons
                  name="check"
                  color={Colors.primaryColor}
                  size={20}
                />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    );
  }

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.pop();
        }}
        style={{...CommonStyles.buttonStyle, margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.whiteColor18SemiBold}}>Save</Text>
      </TouchableOpacity>
    );
  }

  function locationInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>Location</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setshowLocationsSheet(true)}
          style={{
            ...CommonStyles.textFieldWrapper,
            ...styles.rowSpaceBetween,
          }}>
          <Text style={{...Fonts.blackColor16Medium}}>{selectedLocation}</Text>
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color={Colors.blackColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function expercienceInfo() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>Experience</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setshowYearsSheet(true);
          }}
          style={{
            ...CommonStyles.textFieldWrapper,
            ...styles.rowSpaceBetween,
          }}>
          <Text style={{...Fonts.blackColor16Medium}}>
            {selectedExperienceYear} Years
          </Text>
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color={Colors.blackColor}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function aboutInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding,
        }}>
        <Text style={{...Fonts.grayColor16Regular}}>About</Text>
        <View style={{...CommonStyles.textFieldWrapper}}>
          <TextInput
            placeholder="*You can write about your work of experience or skills. People also talk about their achievements."
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.blackColor14Regular,
              height: Platform.OS == 'ios' ? 120 : null,
            }}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function header() {
    return (
      <View style={{margin: Sizes.fixPadding * 2.0, justifyContent: 'center'}}>
        <MaterialIcons
          name="keyboard-backspace"
          size={26}
          color={Colors.blackColor}
          style={{position: 'absolute', zIndex: 100}}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text style={{...CommonStyles.headerTextStyle}}>Edit About</Text>
      </View>
    );
  }
};

export default EditAboutScreen;

const styles = StyleSheet.create({
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
