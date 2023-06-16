import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export const LinearGradientBackground = () => {
  return (
    <LinearGradient
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
      }}
      colors={['#D5D3DE', '#E3E3E1']} // first color is the left side [leftside, right]
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 1, y: 0.2 }}
    />
  );
};
