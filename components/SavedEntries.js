// SavedEntries.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

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
  const upload = async (item)=>{
    await addDoc(collection(db, "invoices"), {
      item
    });
    Alert.alert("Success", "Invoice added successfully.");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Entries</Text>

      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.entry}>
            <Text>FileName: {item.fileName}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Total: {item.total}</Text>
            <Button title="Edit" onPress={() => editEntry(item)} />
            <View style={{margin:5}}/>
            <Button title="Delete" onPress={() => deleteEntry(index)} />
            <View style={{margin:5}}/>
            <Button title="Add To Cloud" onPress={() => upload(item)} />
          </View>
        )}
        />
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  entry: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }
});

export default SavedEntries;
