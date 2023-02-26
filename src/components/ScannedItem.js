import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScannedItem({ data, onPress }) {
  const [showBtns, setShowBtns] = useState(false);

  const CustomBtn = ({ text, onPress }) => {
    return (
      <Pressable onPress={onPress} style={styles.button} >
        <Text style={styles.btnText}>{text}</Text>
      </Pressable>
    )
  }

  return (
    <Pressable style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.text}>{data}</Text>
      </View>
      {showBtns &&

        <View style={styles.btnContainer}>
          <CustomBtn onPress={onPress} text={"Open Link"} />
          <CustomBtn text={"Save"} />
          <CustomBtn text={"Share"} />
        </View>


      }
    </Pressable>
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
  btnContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnText: {
    color: 'white',
    fontSize: 18
  },
  button: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'blue'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  removeBtn: {
    marginRight: 10
  }
});
