// SavedEntries.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs,doc,deleteDoc} from "firebase/firestore";
import { db } from "../firebase";
import InvoiceForm from "../InvoiceForm"

const CloudEntries = ({navigation}) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getCloudData();
  },[]);


  const editEntry = async (entry) => {
    const existingEntries =
        JSON.parse(await AsyncStorage.getItem("entries")) || [];

      const isPresent = existingEntries.some(
        (entry) =>
          entry.fileName === dataToSave.fileName
      );
      if (isPresent){
        Alert.alert("File Already Exists");
        return ;
      }
    // Navigate to InvoiceForm with entry data as parameters
    await navigation.navigate('InvoiceForm', { entry });
  };


  const deleteEntry = async (id) => {
    try {
      await deleteDoc(doc(db, "invoices", id));
      Alert.alert("Success", "Invoice deleted successfully.");
      setInvoices((prev) => prev.filter((invoice) => invoice.id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
      Alert.alert("Error", "Failed to delete invoice.");
    }
  };

  const getCloudData = async ()=>{
    try {
      const querySnapshot = await getDocs(collection(db, "invoices"));
      const invoicesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvoices(invoicesList);
    } catch (error) {
      console.error("Error fetching invoices: ", error);
      Alert.alert("Error", "Failed to fetch invoices.");
    }
    // await addDoc(collection(db, "invoices"), {
    //   item
    // });
    // Alert.alert("Success", "Invoice added successfully.");
  }
  console.log(invoices);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Entries</Text>

      <FlatList
        data={invoices}
        keyExtractor={(item, id) => id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>FileName: {item.item.fileName}</Text>
            <Text>Date: {item.item.date}</Text>
            <Text>Total: {item.item.total}</Text>
            <Button title="Edit" onPress={() => editEntry(item.item)} />
            <View style={{margin:5}}/>
            <Button title="Delete" onPress={() => deleteEntry(item.id)} />
            <View style={{margin:5}}/>
          </View>
        )}
        />

        <Button title="Get From Cloud" onPress={() => getCloudData()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  entry: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 }
});

export default CloudEntries;
