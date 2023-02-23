import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScannedItem({ data, onPress }) {

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{data}</Text>
        <Pressable style={styles.removeBtn} onPress={onPress}>
          <Text>X</Text>
        </Pressable>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'grey',
    padding: 10
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
  removeBtn: {
    marginRight: 10
  }
});
