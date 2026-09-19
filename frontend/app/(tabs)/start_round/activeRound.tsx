import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import React, {useState} from 'react';

import availableCourses from '@/SAMPLE_DATA/avaliableCourses.json';

type AvailableCourseOption = (typeof availableCourses)[number];
type ActiveRoundRouteParams = {
  course?: AvailableCourseOption;
};

type YesNoSelection = 'yes' | 'no' | null;

// Function to handle onChange and data collection
// add to Next Hole button
function statCollection () {

}

export default function ActiveRound() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, ActiveRoundRouteParams>, string>>();
    const selectedCourse = route.params?.course;

    const [numPutts, setNumPutts] = useState(0);
    const [score, setScore] = useState(0);

    const [firSelection, setFirSelection] = useState<YesNoSelection>(null);
    const [girSelection, setGirSelection] = useState<YesNoSelection>(null);
    const changeCounter = (
      setValue: React.Dispatch<React.SetStateAction<number>>,
      delta: number
    ) => {
      setValue((prevValue) => Math.max(0, prevValue + delta));
    };

    const renderYesNoToggle = (
      value: YesNoSelection,
      onChange: (selection: Exclude<YesNoSelection, null>) => void
    ) => (
      <View style={statCollectionStyle.toggleContainer}>
        <Pressable
          style={[
            statCollectionStyle.toggleButton,
            value === 'yes' && statCollectionStyle.toggleButtonActive,
          ]}
          onPress={() => onChange('yes')}
        >
          <Text
            style={[
              statCollectionStyle.toggleButtonText,
              value === 'yes' && statCollectionStyle.toggleButtonTextActive,
            ]}
          >
            Yes
          </Text>
        </Pressable>
        <Pressable
          style={[
            statCollectionStyle.toggleButton,
            value === 'no' && statCollectionStyle.toggleButtonActive,
          ]}
          onPress={() => onChange('no')}
        >
          <Text
            style={[
              statCollectionStyle.toggleButtonText,
              value === 'no' && statCollectionStyle.toggleButtonTextActive,
            ]}
          >
            No
          </Text>
        </Pressable>
      </View>
    );

    const renderStepper = (
      value: number,
      onDecrement: () => void,
      onIncrement: () => void
    ) => (
      <View style={statCollectionStyle.stepperContainer}>
        <Pressable style={statCollectionStyle.stepperButton} onPress={onDecrement}>
          <Text style={statCollectionStyle.stepperSymbol}>-</Text>
        </Pressable>
        <View style={statCollectionStyle.stepperValueWrapper}>
          <Text style={statCollectionStyle.stepperValue}>{value}</Text>
        </View>
        <Pressable style={statCollectionStyle.stepperButton} onPress={onIncrement}>
          <Text style={statCollectionStyle.stepperSymbol}>+</Text>
        </Pressable>
      </View>
    );

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', paddingTop: 85 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontFamily: 'ui-monospace', borderWidth: 3, borderColor: 'black', borderRadius: 20, padding: 10 }}>
          {selectedCourse ? selectedCourse.courseName : 'No course selected'}
        </Text>

        {selectedCourse ? (
          <View style={{ marginTop: 12, alignItems: 'center' }}>
            <Text style={{ fontSize:16 }}>Par: {selectedCourse.tees[0]?.par}</Text>
            <Text style={{ fontSize: 16 }}>Tees: {selectedCourse.tees[0]?.color}</Text>
            <Text style={{ fontSize: 16 }}>Rating: {selectedCourse.tees[0]?.rating}</Text>
            <Text style={{ fontSize: 16 }}> Slope: {selectedCourse.tees[0]?.slope}</Text>
          </View>
        ) : null}
      </View>

        {selectedCourse ? (
  <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
    <Text style={{ fontSize: 26 }}>Hole: {selectedCourse.holes[0]?.holeNumber} Par: {selectedCourse.holes[0]?.par}</Text>

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 220, marginVertical: 10 }}>
      <Text style={statCollectionStyle.button}>FIR</Text>
      {renderYesNoToggle(firSelection, setFirSelection)}
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 220, marginVertical: 10 }}>
      <Text style={statCollectionStyle.button}>GIR</Text>
      {renderYesNoToggle(girSelection, setGirSelection)}
    </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 220, marginVertical: 10 }}>
      <Text style={statCollectionStyle.button}># of Putts</Text>
      {renderStepper(
        numPutts,
        () => changeCounter(setNumPutts, -1),
        () => changeCounter(setNumPutts, 1)
      )}
    </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 220, marginVertical: 10 }}>
      <Text style={statCollectionStyle.button}>Score</Text>
      {renderStepper(
        score,
        () => changeCounter(setScore, -1),
        () => changeCounter(setScore, 1)
      )}
    </View>

    <Pressable style={nextButton.button}>
      <Text style={nextButton.buttonText}>Next Hole</Text>
    </Pressable>
  </View>
) : null}

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity style={addCourseBackBtn.button} onPress={() => navigation.goBack()}>
          <Text style={addCourseBackBtn.buttonText}>Exit Round</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const addCourseBackBtn = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#f32715', padding: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
})

const nextButton = StyleSheet.create ({
    button: { fontWeight:600, backgroundColor: '#185430', padding: 12, borderRadius: 8, marginTop: 100},
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold'}
})

const statCollectionStyle = StyleSheet.create ({
    button: {fontSize: 16, backgroundColor:'#185430', padding:12, borderRadius: 8, color: '#fff',margin: 10},
    toggleContainer: {
      flexDirection: 'row',
      backgroundColor: '#d4d4d8',
      borderRadius: 12,
      padding: 4,
      gap: 4,
    },
    toggleButton: {
      minWidth: 48,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: 'transparent',
    },
    toggleButtonActive: {
      backgroundColor: '#185430',
    },
    toggleButtonText: {
      color: '#374151',
      fontSize: 15,
      fontWeight: '600',
    },
    toggleButtonTextActive: {
      color: '#fff',
    },
    stepperContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#d4d4d8',
      borderRadius: 12,
      padding: 4,
      gap: 4,
    },
    stepperButton: {
      width: 36,
      height: 36,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#185430',
    },
    stepperSymbol: {
      color: '#fff',
      fontSize: 22,
      fontWeight: '700',
      lineHeight: 24,
    },
    stepperValueWrapper: {
      minWidth: 42,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
    },
    stepperValue: {
      color: '#1f2937',
      fontSize: 18,
      fontWeight: '700',
    }
})