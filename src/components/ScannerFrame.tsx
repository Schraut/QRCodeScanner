import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ScannerFrame() {
  return (
    <View // this takes up whole screen and centers the square
      style={styles.container}
    >
      <View // main container
        style={{
          height: 300,
          width: 300,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                height: 10,
                width: 30,
                backgroundColor: '#000000',
              }}
            ></View>
            <View
              style={{
                height: 10,
                width: 30,
                backgroundColor: '#000000',
              }}
            ></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                height: 20,
                width: 10,
                backgroundColor: '#000000',
              }}
            ></View>
            <View
              style={{
                height: 20,
                width: 10,
                backgroundColor: '#000000',
              }}
            ></View>
          </View>
        </View>

        {/* <Animated.View style={[{ opacity: fadeAnim }]}> */}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'red',
          }}
        />
        {/* </Animated.View> */}

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                height: 20,
                width: 10,
                backgroundColor: '#000000',
              }}
            ></View>
            <View
              style={{
                height: 20,
                width: 10,
                backgroundColor: '#000000',
              }}
            ></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                height: 10,
                width: 30,
                backgroundColor: '#000000',
              }}
            ></View>
            <View
              style={{
                height: 10,
                width: 30,
                backgroundColor: '#000000',
              }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: '100%',
  },
  flatlistContainer: {
    flex: 1,
    marginTop: 70,
    marginHorizontal: 20,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
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
  top: {},
});
