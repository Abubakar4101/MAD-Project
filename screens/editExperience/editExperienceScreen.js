import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, CommonStyles, Fonts, Sizes} from '../../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from '../../components/commonText';
import {TextInput} from 'react-native';
import MyStatusBar from '../../components/myStatusBar';
import {Calendar} from 'react-native-calendars';
import {Overlay} from '@rneui/themed';
import moment from 'moment';

const EditExperienceScreen = ({navigation}) => {
  const [presentTitle, setpresentTitle] = useState(
    'Sr.UI/UX Designer (Team Lead)',
  );
  const [companyName, setcompanyName] = useState('Infosys Technologies');
  const [pastTitle, setpastTitle] = useState('Jr.UI/UX Designer');
  const [pastCompanyName, setpastCompanyName] = useState('Android');
  const [showEndDateCalendarDialog, setshowEndDateCalendarDialog] =
    useState(false);
  const [dateSelectionFor, setdateSelectionFor] = useState('');
  const [presentEndDate, setpresentEndDate] = useState('');
  const [pastEndDate, setpastEndDate] = useState('Feb 2020');
  const [showStartDateCalendarDialog, setshowStartDateCalendarDialog] =
    useState(false);
  const [presentStartDate, setpresentStartDate] = useState(
    moment().format('MMM YYYY'),
  );
  const [pastStartDate, setpastStartDate] = useState('Oct 2022');
  const [selected, setSelected] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
          {presentInfo()}
          {pastInfo()}
        </ScrollView>
      </View>
      {saveButton()}
      {showEndDateCalendar()}
      {showStartDateCalendar()}
    </View>
  );

  function showStartDateCalendar() {
    return (
      <Overlay
        isVisible={showStartDateCalendarDialog}
        overlayStyle={{width: '85%', borderRadius: Sizes.fixPadding}}
        onBackdropPress={() => setshowStartDateCalendarDialog(false)}>
        <View>
          <Calendar
            monthFormat={`MMMM  yyyy`}
            renderArrow={direction =>
              direction == 'left' ? (
                <MaterialIcons
                  name="arrow-back-ios"
                  color={Colors.grayColor}
                  size={18}
                />
              ) : (
                <MaterialIcons
                  name="arrow-forward-ios"
                  color={Colors.grayColor}
                  size={18}
                />
              )
            }
            maxDate={moment().format('YYYY-MM-DD').toString()}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: Colors.primaryColor,
              },
            }}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            enableSwipeMonths={true}
            onDayPress={day => {
              setSelected(day.dateString);
              if (dateSelectionFor == 'present') {
                setpresentStartDate(moment(day.dateString).format('MMM YYYY'));
              } else {
                setpastStartDate(moment(day.dateString).format('MMM YYYY'));
              }
              setshowStartDateCalendarDialog(false);
            }}
            theme={{
              calendarBackground: Colors.whiteColor,
              textSectionTitleColor: Colors.grayColor,
              monthTextColor: Colors.blackColor,
              textMonthFontFamily: 'SF-Compact-Display-Medium',
              textDayHeaderFontFamily: 'SF-Compact-Display-Medium',
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,
            }}
          />
        </View>
      </Overlay>
    );
  }

  function showEndDateCalendar() {
    return (
      <Overlay
        isVisible={showEndDateCalendarDialog}
        overlayStyle={{width: '85%', borderRadius: Sizes.fixPadding}}
        onBackdropPress={() => setshowEndDateCalendarDialog(false)}>
        <View>
          <Calendar
            monthFormat={`MMMM  yyyy`}
            minDate={
              dateSelectionFor == 'present'
                ? moment().format('YYYY-MM-DD').toString()
                : null
            }
            maxDate={
              dateSelectionFor == 'present'
                ? null
                : moment().format('YYYY-MM-DD').toString()
            }
            renderArrow={direction =>
              direction == 'left' ? (
                <MaterialIcons
                  name="arrow-back-ios"
                  color={Colors.grayColor}
                  size={18}
                />
              ) : (
                <MaterialIcons
                  name="arrow-forward-ios"
                  color={Colors.grayColor}
                  size={18}
                />
              )
            }
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: Colors.primaryColor,
              },
            }}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            enableSwipeMonths={true}
            onDayPress={day => {
              setSelected(day.dateString);
              if (dateSelectionFor == 'present') {
                setpresentEndDate(moment(day.dateString).format('MMM YYYY'));
              } else {
                setpastEndDate(moment(day.dateString).format('MMM YYYY'));
              }
              setshowEndDateCalendarDialog(false);
            }}
            theme={{
              calendarBackground: Colors.whiteColor,
              textSectionTitleColor: Colors.grayColor,
              monthTextColor: Colors.blackColor,
              textMonthFontFamily: 'SF-Compact-Display-Medium',
              textDayHeaderFontFamily: 'SF-Compact-Display-Medium',
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,              
            }}
          />
        </View>
      </Overlay>
    );
  }

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.pop();
        }}
        style={{...CommonStyles.buttonStyle, margin: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.whiteColor18SemiBold}}>Save</Text>
      </TouchableOpacity>
    );
  }

  function pastInfo() {
    return (
      <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.blackColor19SemiBold}}>Past</Text>
        {pastTitleInfo()}
        {pastCompanyNameInfo()}
        {pastStartDateAndEndDateInfo()}
      </View>
    );
  }

  function pastStartDateAndEndDateInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, marginRight: Sizes.fixPadding}}>
          <Text style={{...Fonts.grayColor16Regular}}>Start Date</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setdateSelectionFor('past');
              setshowStartDateCalendarDialog(true);
            }}
            style={{
              ...CommonStyles.textFieldWrapper,
              paddingVertical: Sizes.fixPadding + 5.0,
              ...styles.rowSpaceBetween,
            }}>
            <Text
              numberOfLines={1}
              style={{...Fonts.blackColor16Medium, flex: 1}}>
              {pastStartDate}
            </Text>
            <MaterialCommunityIcons
              name="calendar-minus"
              size={20}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
          <Text style={{...Fonts.grayColor16Regular}}>End Date</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setdateSelectionFor('past');
              setshowEndDateCalendarDialog(true);
            }}
            style={{
              ...CommonStyles.textFieldWrapper,
              paddingVertical: Sizes.fixPadding + 5.0,
              ...styles.rowSpaceBetween,
            }}>
            <Text
              numberOfLines={1}
              style={{...Fonts.blackColor16Medium, flex: 1}}>
              {pastEndDate}
            </Text>
            <MaterialCommunityIcons
              name="calendar-minus"
              size={20}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function pastCompanyNameInfo() {
    return (
      <View>
        <Text style={{...Fonts.grayColor16Regular}}>Company Name</Text>
        <View
          style={{
            ...CommonStyles.textFieldWrapper,
            paddingVertical: Sizes.fixPadding,
          }}>
          <TextInput
            placeholder="Enter Company Name"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            value={pastCompanyName}
            onChangeText={val => setpastCompanyName(val)}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function pastTitleInfo() {
    return (
      <View style={{marginVertical: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>Title</Text>
        <View
          style={{
            ...CommonStyles.textFieldWrapper,
            paddingVertical: Sizes.fixPadding,
          }}>
          <TextInput
            placeholder="Enter Title"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            value={pastTitle}
            onChangeText={val => setpastTitle(val)}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function presentInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding,
        }}>
        <Text style={{...Fonts.blackColor19SemiBold}}>Present</Text>
        {presentTitleInfo()}
        {presentCompanyNameInfo()}
        {presentStartDateAndEndDateInfo()}
      </View>
    );
  }

  function presentStartDateAndEndDateInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, marginRight: Sizes.fixPadding}}>
          <Text style={{...Fonts.grayColor16Regular}}>Start Date</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setdateSelectionFor('present');
              setshowStartDateCalendarDialog(true);
            }}
            style={{
              ...CommonStyles.textFieldWrapper,
              paddingVertical: Sizes.fixPadding + 5.0,
              ...styles.rowSpaceBetween,
            }}>
            <Text
              numberOfLines={1}
              style={{...Fonts.blackColor16Medium, flex: 1}}>
              {presentStartDate}
            </Text>
            <MaterialCommunityIcons
              name="calendar-minus"
              size={20}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginLeft: Sizes.fixPadding}}>
          <Text style={{...Fonts.grayColor16Regular}}>End Date</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setdateSelectionFor('present');
              setshowEndDateCalendarDialog(true);
            }}
            style={{
              ...CommonStyles.textFieldWrapper,
              paddingVertical: Sizes.fixPadding + 5.0,
              ...styles.rowSpaceBetween,
            }}>
            <Text
              numberOfLines={1}
              style={{...Fonts.blackColor16Medium, flex: 1}}>
              {presentEndDate == '' ? 'Present' : presentEndDate}
            </Text>
            {presentEndDate == '' ? null : (
              <MaterialCommunityIcons
                name="calendar-minus"
                size={20}
                color={Colors.primaryColor}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function presentCompanyNameInfo() {
    return (
      <View>
        <Text style={{...Fonts.grayColor16Regular}}>Company Name</Text>
        <View
          style={{
            ...CommonStyles.textFieldWrapper,
            paddingVertical: Sizes.fixPadding,
          }}>
          <TextInput
            placeholder="Enter Company Name"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            value={companyName}
            onChangeText={val => setcompanyName(val)}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function presentTitleInfo() {
    return (
      <View style={{marginVertical: Sizes.fixPadding * 2.0}}>
        <Text style={{...Fonts.grayColor16Regular}}>Title</Text>
        <View
          style={{
            ...CommonStyles.textFieldWrapper,
            paddingVertical: Sizes.fixPadding,
          }}>
          <TextInput
            placeholder="Enter Title"
            placeholderTextColor={Colors.grayColor}
            style={{...Fonts.blackColor16Medium, height: 30.0, padding: 0}}
            value={presentTitle}
            onChangeText={val => setpresentTitle(val)}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function header() {
    return (
      <View style={{...styles.rowSpaceBetween, margin: Sizes.fixPadding * 2.0}}>
        <MaterialIcons
          name="keyboard-backspace"
          size={26}
          color={Colors.blackColor}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text style={{...CommonStyles.headerTextStyle}}>Edit Experience</Text>
        <Feather name="plus-square" size={22} color={Colors.blackColor} />
      </View>
    );
  }
};

export default EditExperienceScreen;

const styles = StyleSheet.create({
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
