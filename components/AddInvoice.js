// AddInvoice.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import the Firestore instance

const AddInvoice = () => {
  // State to manage form fields
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState(""); // For simplicity, let's keep items as a comma-separated string
  const [totalAmount, setTotalAmount] = useState("");

  // Function to add invoice to Firestore
  const handleAddInvoice = async () => {
    if (!customerName || !items || !totalAmount) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    // Convert items to an array of objects (you can further parse it as needed)
    const itemsArray = items.split(",").map((item) => {
      const [name, quantity, price] = item.trim().split(" ");
      return { name, quantity: parseInt(quantity), price: parseFloat(price) };
    });

    try {
      await addDoc(collection(db, "invoices"), {
        customerName,
        date: new Date().toISOString(),
        items: itemsArray,
        totalAmount: parseFloat(totalAmount),
      });
      Alert.alert("Success", "Invoice added successfully.");
      setCustomerName("");
      setItems("");
      setTotalAmount("");
    } catch (error) {
      console.error("Error adding invoice: ", error);
      Alert.alert("Error", "Failed to add invoice.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Invoice</Text>
      <TextInput
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
        style={styles.input}
      />
      <TextInput
        placeholder="Items (e.g., 'ProductA 2 20, ProductB 1 50')"
        value={items}
        onChangeText={setItems}
        style={styles.input}
      />
      <TextInput
        placeholder="Total Amount"
        value={totalAmount}
        onChangeText={setTotalAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Invoice" onPress={handleAddInvoice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddInvoice;
