import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomBtn } from './buttons/CustomBtn';

export type Props = {
  data: string;
  open(): void;
  remove(): void;
  onPress(): void;
};

export const ScannedItem: React.FC<Props> = ({ data, open, remove }) => {
  const [showBtns, setShowBtns] = useState(false);

  return (
    <Pressable onPress={() => setShowBtns(!showBtns)} style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.text}>{data}</Text>
      </View>
      {showBtns &&
        <View style={styles.btnContainer}>
          <CustomBtn onPress={open} text={"Open Link"} />
          {/* <CustomBtn text={"Save"} /> */}
          <CustomBtn onPress={remove} text={"Remove"} />
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  removeBtn: {
    marginRight: 10
  }
});
