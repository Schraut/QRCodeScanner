import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import * as Linking from 'expo-linking';

export const ScannedItemModal = ({ modalVisible, openModal, closeModal, scanned }) => {

  const openLink = () => {
    Linking.openURL(scanned);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Go to link</Text>
            <Pressable onPress={() => openLink()} style={{ marginBottoma: 20 }}>
              <Text style={styles.modalText}>{scanned}</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});
