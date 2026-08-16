import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text } from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
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
      <Text style={styles.label}>Select Framework Language</Text>
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
