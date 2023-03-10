import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Props = {
  text: string;
  onPress(): void;
};

export const CustomBtn = ({ text, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btnText: {
    color: 'white',
    fontSize: 18
  },
  button: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'blue'
  },
});
