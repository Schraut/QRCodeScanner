import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScannedItemScreen({ navigation, route }) {
  const { scannedQRCode, scannedType } = route.params;

  return (
    <View style={styles.container}>

      <Text style={styles.text}>Scanned Items</Text>
      <Text>Scanned qr code = {scannedQRCode}</Text>

      {/* <Text>Scanned type = {scannedType}</Text> */}
      <Pressable onPress={() => navigation.goBack()}>
        <Text>Scan Again</Text>
      </Pressable>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});
