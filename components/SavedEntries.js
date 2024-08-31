// SavedEntries.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc,getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import FlatButton from '../FlatButton.js'

const SavedEntries = ({navigation}) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  });

  const loadEntries = async () => {
    try {
      const savedEntries = JSON.parse(await AsyncStorage.getItem('entries')) || [];
      setEntries(savedEntries);
    } catch (error) {
      console.log('Error loading entries: ', error);
    }
  };
  const editEntry = (entry) => {
    // Navigate to InvoiceForm with entry data as parameters
    navigation.navigate('InvoiceForm', { entry });
  };


  const deleteEntry = async (index) => {
    try {
      const updatedEntries = [...entries];
      updatedEntries.splice(index, 1);
      await AsyncStorage.setItem('entries', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      Alert.alert("Entry deleted successfully!");
    } catch (error) {
      console.log('Error deleting entry: ', error);
    }
  };
  const upload = async (item) => {
    try {
      // Query Firestore for an entry with the same filename
      const q = query(
        collection(db, "invoices"),
        where("item.fileName", "==", item.fileName)
      );
      const querySnapshot = await getDocs(q);

      // Check if the file already exists
      if (!querySnapshot.empty) {
        Alert.alert("Duplicate", "An invoice with the same filename already exists.");
        return; // Stop execution if a duplicate is found
      }
      // Add new document to Firestore if no duplicates are found
      await addDoc(collection(db, "invoices"), {
        item,
      });
      Alert.alert("Success", "Invoice added successfully.");
    } catch (error) {
      console.error("Error uploading invoice: ", error);
      Alert.alert("Error", "Failed to upload the invoice.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Entries</Text>

      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.entry}>
            <Text style={styles.text}>FileName: {item.fileName}</Text>
            <Text style={styles.text}>Date: {item.date}</Text>
            <Text style={styles.text}>Total: {item.total}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <FlatButton text="" c="#E9F0F5" iconname={'pencil'} iconcolor={'orange'} onPress={() => editEntry(item)} />
            <FlatButton text="" c="#E9F0F5" iconname={'trash-can'} iconcolor={'grey'} onPress={() => deleteEntry(index)} />
            <FlatButton text="" c="#E9F0F5" iconname={'cloud-upload'} iconcolor={'#2196F3'} onPress={() => upload(item)}  />

            </View >
          </View>
        )}
        />
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  entry: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8, },
  text:{fontSize:20,fontWeight:'300'}
});

export default SavedEntries;
