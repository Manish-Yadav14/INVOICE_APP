import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs,doc,deleteDoc} from "firebase/firestore";
import { db,auth } from "../firebase";
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { Button as LOGOUT } from 'react-native-paper';

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); // Navigate to login screen after logout
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <LOGOUT 
        onPress={handleLogout} 
        labelStyle={styles.logoutButtonText} // Set the label style to increase font size
        style={styles.logoutButton}
      >
        Logout
      </LOGOUT>
        <Text style={styles.title}>Cloud Invoices</Text>
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.entry}>
              <Text style={styles.text}>FileName: {item.fileName}</Text>
              <Text style={styles.text}>Date: {item.date}</Text>
              <Text style={styles.text}>Total: {item.total}</Text>
              <Button title="Add To Directory" onPress={() => editEntry(item)} />
              <View style={{ margin: 5 }} />
              <Button title="Delete" onPress={() => deleteEntry(item.id)} />
            </View>
          )}
        />
        <Button title="Cloud Sync" onPress={() => getCloudData()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10,position:'relative' },
  logoutButton: {
    position: 'absolute',
    top: 0,  // Adjust as needed
    right: 10, // Adjust as needed
    backgroundColor: '#E9F0F5', // Or any other color
    marginTop:30,
  },
  title: { fontSize: 24, fontWeight: '450', marginBottom: 16, textAlign: 'center',paddingTop:10 },
  entry: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 8 },
  text:{fontSize:23,fontWeight:'300'}
});

export default CloudEntries;