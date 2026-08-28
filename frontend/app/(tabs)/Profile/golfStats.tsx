import { Image } from 'expo-image';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import { useState } from 'react';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { GlassView } from 'expo-glass-effect'
import * as ImagePicker from 'expo-image-picker';


export default function HomeScreen() {

const [imageUri, setImageUri] = useState<string | null>(null);

const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert('Permission to access gallery is required');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if(!result.canceled) {
    setImageUri(result.assets[0].uri);
  }
};

const defaultBackground = require('@/assets/images/golfbackground.jpg')

  return (
    <ParallaxScrollView
      headerBackgroundColor="#07bbf2"
      backgroundColor="#f6f8f5"
      contentBackgroundColor="#f6f6f3"
      headerImage={
        <ImageBackground
        source={imageUri ? { uri: imageUri } : defaultBackground}
        style={backgroundImage.background}
      }>
      <View>
      <Text>Your Custom background</Text>
      <Button title="Pick an Image" onPress={pickImage}/>
      </View>

<GlassView style={glassView.glassPanel} >
        <ThemedText type="title">Profile</ThemedText>
      <View>
          <ThemedText style={glassView.text}>FIR</ThemedText>
          <ThemedText style={glassView.text}>GIR</ThemedText>
          <ThemedText style={glassView.text}>Average Putts</ThemedText>
      </View>
  </GlassView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 260,
    width: 450,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  stats: {
    color: 'black',
    fontWeight: 500,
  }
});

const glassView = StyleSheet.create({
  glassPanel: {
    padding: 20,
    borderRadius: 16,
    // Add standard border/shadow to enhance the glass rim effect
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  text: { color: '#060606' }
});

const backgroundImage = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Optional dark overlay
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
});