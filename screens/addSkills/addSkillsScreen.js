import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Sizes, CommonStyles} from '../../constants/styles';
import {Text} from '../../components/commonText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/myStatusBar';

const recommendedList = [
  {
    id: '1',
    skill: 'Marvel',
    isSelected: false,
  },
  {
    id: '2',
    skill: 'InVision',
    isSelected: false,
  },
  {
    id: '3',
    skill: 'Sketch',
    isSelected: false,
  },
  {
    id: '4',
    skill: 'UX Research',
    isSelected: false,
  },
  {
    id: '5',
    skill: 'Adobe XD',
    isSelected: false,
  },
  {
    id: '6',
    skill: 'Web Design',
    isSelected: false,
  },
  {
    id: '7',
    skill: 'Web Development',
    isSelected: false,
  },
  {
    id: '8',
    skill: 'Content Management',
    isSelected: false,
  },
  {
    id: '9',
    skill: 'Digital Media',
    isSelected: false,
  },
  {
    id: '10',
    skill: 'Usability Testing',
    isSelected: false,
  },
  {
    id: '11',
    skill: 'Marketing',
    isSelected: false,
  },
  {
    id: '12',
    skill: 'Interaction Design',
    isSelected: false,
  },
  {
    id: '13',
    skill: 'Creative Design',
    isSelected: false,
  },
  {
    id: '14',
    skill: 'Product Design',
    isSelected: false,
  },
  {
    id: '15',
    skill: 'ui-ux Research Expert',
    isSelected: false,
  },
  {
    id: '16',
    skill: 'Information Architecture',
    isSelected: false,
  },
  {
    id: '17',
    skill: 'Prototype',
    isSelected: false,
  },
];

const AddSkillsScreen = ({navigation}) => {
  const [search, setsearch] = useState('');
  const [recommended, setrecommended] = useState(recommendedList);

  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {searchField()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
          {recommendedInfo()}
          {saveButton()}
        </ScrollView>
      </View>
    </View>
  );

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.pop()}
        style={{
          ...CommonStyles.buttonStyle,
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{...Fonts.whiteColor18SemiBold}}>Save</Text>
      </TouchableOpacity>
    );
  }

  function updateRecommended({id}) {
    const copyData = recommended;
    const newData = copyData.map(item => {
      if (item.id == id) {
        return {...item, isSelected: !item.isSelected};
      } else {
        return item;
      }
    });
    setrecommended(newData);
  }

  function recommendedInfo() {
    return (
      <View style={{marginVertical: Sizes.fixPadding * 2.0}}>
        <Text
          style={{
            ...Fonts.grayColor16Regular,
            marginBottom: Sizes.fixPadding * 2.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}>
          Recommended skills based off your profile:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: Sizes.fixPadding + 5.0,
          }}>
          {recommended.map(item => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                updateRecommended({id: item.id});
              }}
              key={`${item.id}`}
              style={{
                backgroundColor: item.isSelected
                  ? Colors.primaryColor
                  : Colors.whiteColor,
                borderColor: item.isSelected
                  ? Colors.primaryColor
                  : Colors.lightGrayColor,
                ...styles.skillWrapper,
              }}>
              <Text
                style={
                  item.isSelected
                    ? {...Fonts.whiteColor16Regular}
                    : {...Fonts.grayColor16Regular}
                }>
                {item.skill}
              </Text>
              <MaterialIcons
                name={item.isSelected ? 'check' : 'add'}
                color={item.isSelected ? Colors.whiteColor : Colors.grayColor}
                size={20}
                style={{marginLeft: Sizes.fixPadding - 7.0}}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function searchField() {
    return (
      <View
        style={{
          ...CommonStyles.textFieldWrapper,
          flexDirection: 'row',
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}>
        <MaterialIcons
          name="search"
          color={Colors.grayColor}
          size={24}
          style={{}}
        />
        <TextInput
          placeholder="Search here (ex: Data Analysis)"
          placeholderTextColor={Colors.grayColor}
          style={styles.searchFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          value={search}
          onChangeText={val => setsearch(val)}
        />
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
        <Text style={{...CommonStyles.headerTextStyle}}>Add Skills</Text>
      </View>
    );
  }
};

export default AddSkillsScreen;

const styles = StyleSheet.create({
  skillWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
  },
  searchFieldStyle: {
    ...Fonts.blackColor16Medium,
    flex: 1,
    marginLeft: Sizes.fixPadding,
    padding: 0,
  },
});
