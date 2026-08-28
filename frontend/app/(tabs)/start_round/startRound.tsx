import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';


import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

import availableCourses from '@/SAMPLE_DATA/avaliableCourses.json';

type AvailableCourseOption = (typeof availableCourses)[number]; 
const courseOptions: AvailableCourseOption[] = availableCourses;

export default function StartRound() {

  const [selectedCourse, setSelectedCourse] = useState<AvailableCourseOption | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedCourse) {
      const message = 'Please select a course.';
      setError(message);
      Alert.alert('Validation error', message);
      return false;
    }

    setError(null);
    return true;
  };

  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const [selected, setSelected] = useState<9 | 18>(18);
  const handleHoles = (holes: 9 | 18) => {
  setSelected(holes);
};

  const navigation = useNavigation();

  return (
    <ParallaxScrollView
      headerBackgroundColor="#185430"
      headerImage={
        <IconSymbol
          size={310}
          color="#f8f9f8"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Game Time!
        </ThemedText>
      </ThemedView>
      <ThemedText>Select a course or add one before starting your round.</ThemedText>
    <View style={[styles.container, styles.addCourseBtn]}>
      <View>
        <Text style={styles.label}>Select Course</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={courseOptions}
          search
          maxHeight={300}
          labelField="courseName"
          valueField="courseName"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.courseName);
            setSelectedCourse(item);
            setError(null);
            setIsFocus(false);
          }}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Pressable
          style={[holeStyles.button, selected === 9 && holeStyles.activeButton]}
          onPress={() => handleHoles(9)}
        >
          <Text style={[holeStyles.text, selected === 9 && holeStyles.activeText]}>9 Holes</Text>
        </Pressable>

        <Pressable
          style={[holeStyles.button, selected === 18 && holeStyles.activeButton]}
          onPress={() => handleHoles(18)}
        >
          <Text style={[holeStyles.text, selected === 18 && holeStyles.activeText]}>18 Holes</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            startRound.button,
            pressed ? startRound.buttonPressed : null,
          ]}
          onPress={() => {
            const isValid = handleSubmit();
            if (!isValid) return;

            (navigation as any).navigate('activeRound', { course: selectedCourse });
          }}
        >
          {({ pressed }) => (
            <Text
              style={[
                startRound.buttonText,
                pressed ? startRound.buttonPressed : null,
              ]}
            >
              Start Round
            </Text>
          )}
        </Pressable>
      </View>

      <Pressable
        style={styles.buttonAC}
        onPress={() => (navigation as any).navigate('addCourse')}
        >
        <Text style={styles.buttonTextAC}>Add Course</Text>
      </Pressable>
    </View>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  errorText: {
    color: '#B00020',
    marginBottom: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  addCourseBtn: {
    justifyContent: 'space-between',
    flex: 1,
  },
    buttonAC: { 
      backgroundColor: '#007AFF', 
      padding: 12, 
      borderRadius: 8, 
      marginTop: 10,
  },
    buttonTextAC: { color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
  },

});

const holeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
    width: '100%',
    maxWidth: 320,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: '#185430',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  activeText: {
    color: '#FFFFFF',
  },
});


const startRound = StyleSheet.create({
  button: { backgroundColor: '#185430', padding: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign:'center'},
  buttonPressed: { opacity: 0.7, color: '#ff0000', fontSize: 20,}
})
