import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={() => navigation.navigate('QRCodeScannerScreen')} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 8 }}>
        <Text style={{ color: 'white' }}>Start Scanning</Text>
      </Pressable>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
