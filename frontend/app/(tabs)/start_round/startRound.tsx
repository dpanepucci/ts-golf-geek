import { StyleSheet, View, Text, Pressable } from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';


import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';


type CourseOption = {
  label: string;
  value:string;
};

const data: CourseOption[] = [
  { label: 'Northstar', value: 'NS' },
  { label: 'Pebble Beach', value: 'PB' },
];


export default function StartRound() {

  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const [selected, setSelected] = useState<9 | 18>(18);
  const handleHoles = (holes: 9 | 18) => {
  setSelected(holes);
};

  const navigation = useNavigation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#185430', dark: '#353636' }}
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
    <View style={styles.container}>
      <Text style={styles.label}>Select Course</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item:CourseOption) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
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
      style={startRound.button}
      onPress={() => (navigation as any).navigate('addCourse')}
      >
        <Text style={startRound.buttonText}>Start Round</Text>
      </Pressable>

      <Pressable
        style={addCourse.button}
        onPress={() => (navigation as any).navigate('addCourse')}
        >
        <Text style={addCourse.buttonText}>Add Course</Text>
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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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

const addCourse = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
})

const startRound = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignContent:'center'},
  button: { backgroundColor: '#185430', padding: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign:'center'}
})
