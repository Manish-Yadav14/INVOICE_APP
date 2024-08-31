// Signup.js
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Adjust path as necessary

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully");
      // Handle post-registration actions here, like navigation
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View>
      <Text style={{margin:'auto'}}>Signup</Text>
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
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default Signup;
