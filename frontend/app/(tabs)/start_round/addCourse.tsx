import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function AddCourse() {
    const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24 }}>Add your course below</Text>

        <TouchableOpacity style={addCourseBackBtn.button} onPress={() => navigation.goBack()}>
            <Text style={addCourseBackBtn.buttonText}>Go Back</Text>
        </TouchableOpacity>
    </View>
  );
}

const addCourseBackBtn = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#f32715', padding: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
})