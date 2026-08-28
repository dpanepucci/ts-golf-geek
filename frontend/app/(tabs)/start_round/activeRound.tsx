import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import availableCourses from '@/SAMPLE_DATA/avaliableCourses.json';

type AvailableCourseOption = (typeof availableCourses)[number];
type ActiveRoundRouteParams = {
  course?: AvailableCourseOption;
};

// Function to handle onChange and data collection
// add to Next Hole button
function statCollection () {

}

export default function ActiveRound() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, ActiveRoundRouteParams>, string>>();
    const selectedCourse = route.params?.course;

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
      <View style={{alignItems:'center'}}>
        <Text style={{ fontSize: 16 }}>Hole: {selectedCourse.holes[0]?.holeNumber} Par: {selectedCourse.holes[0]?.par}</Text>
        <Pressable style={nextButton.button}><Text style={nextButton.buttonText}>Next Hole</Text></Pressable>
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