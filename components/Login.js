// Login.js
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; // Adjust path as necessary
import InvoiceForm from "../InvoiceForm";
// import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const navigation = useNavigation(); // Access the navigation object

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      navigation.replace('Home')

       // Navigate to the InvoiceForm component
      //  navigation.navigate("InvoiceForm");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View>
      <Text style={{margin:'auto' }}>Login</Text>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{width:280, borderWidth: 1, margin: 10, padding: 8,overflow:'hidden',borderRadius:8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{width:280, borderWidth: 1, margin: 10, padding: 8,overflow:'hidden',borderRadius:8 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;