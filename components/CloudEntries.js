// SavedEntries.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs,doc,deleteDoc} from "firebase/firestore";
import { db,auth } from "../firebase";
import InvoiceForm from "../InvoiceForm"
import { SafeAreaView } from 'react-native-safe-area-context';

const CloudEntries = ({navigation}) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getCloudData();
  },[]);

  const getUserID = () => {
    const user = auth.currentUser;
    return user ? user.uid : null; // Return user ID if user is logged in
  };


  const editEntry = async (entry) => {
    const existingEntries =
        JSON.parse(await AsyncStorage.getItem("entries")) || [];

      const isPresent = existingEntries.some(
        (val) =>
          val.fileName === entry.fileName
      );
      if (isPresent){
        Alert.alert("File Already Exists");
        return ;
      }
      const updatedEntries = [...existingEntries, entry];
      await AsyncStorage.setItem("entries", JSON.stringify(updatedEntries));
      Alert.alert("Entry Added To Directory Successfully!");

      // navigation.navigate('InvoiceForm', { entry });
  };


  const deleteEntry = async (id) => {
    const userID = getUserID();
    if (!userID) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    try {
      await deleteDoc(doc(db, `users/${userID}/invoices`, id));
      Alert.alert("Success", "Invoice deleted successfully.");
      setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      Alert.alert("Error", "Failed to delete invoice.");
    }
  };

  // const getCloudData = async ()=>{
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "invoices"));
  //     const invoicesList = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setInvoices(invoicesList);
  //   } catch (error) {
  //     console.error("Error fetching invoices: ", error);
  //     Alert.alert("Error", "Failed to fetch invoices.");
  //   }
  //   // await addDoc(collection(db, "invoices"), {
  //   //   item
  //   // });
  //   // Alert.alert("Success", "Invoice added successfully.");
  // }

  const getCloudData = async () => {
    const userID = getUserID();
    if (!userID) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, `users/${userID}/invoices`));
      const invoicesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvoices(invoicesList);
    } catch (error) {
      console.error("Error fetching invoices: ", error);
      Alert.alert("Error", "Failed to fetch invoices.");
    }
  };

  console.log(invoices);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Cloud Data</Text>
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.entry}>
              <Text style={styles.text}>FileName: {item.fileName}</Text>
              <Text style={styles.text}>Date: {item.date}</Text>
              <Text style={styles.text}>Total: {item.total}</Text>
              <Button title="Edit" onPress={() => editEntry(item)} />
              <View style={{ margin: 5 }} />
              <Button title="Delete" onPress={() => deleteEntry(item.id)} />
            </View>
          )}
        />
        <Button title="Get From Cloud" onPress={() => getCloudData()} />
      </View>
    </SafeAreaView>
  );


  // return (
  //   <SafeAreaView style={styles.container}>
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Cloud Data</Text>

  //     <FlatList
  //       data={invoices}
  //       keyExtractor={(item, id) => id.toString()}
  //       renderItem={({ item }) => (
  //         <View style={styles.entry}>
  //           <Text>FileName: {item.item.fileName}</Text>
  //           <Text>Date: {item.item.date}</Text>
  //           <Text>Total: {item.item.total}</Text>
  //           <Button title="Edit" onPress={() => editEntry(item.item)} />
  //           <View style={{margin:5}}/>
  //           <Button title="Delete" onPress={() => deleteEntry(item.id)} />
  //           <View style={{margin:5}}/>
  //         </View>
  //       )}
  //       />

  //       <Button title="Get From Cloud" onPress={() => getCloudData()} />
  //   </View>
  //   </SafeAreaView>

  // );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '450', marginBottom: 16, textAlign: 'center' },
  entry: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 },
  text:{fontSize:23,fontWeight:'300'}
});

export default CloudEntries;