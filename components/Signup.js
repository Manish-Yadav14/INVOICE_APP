import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import FlatButton from "../FlatButton";
const Signup = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully");
      navigation.replace('Home')
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={{flex:1,justifyContent:'center',alignContent:'center',width:'60%',alignSelf:'center'}}>
      <Text>Signup</Text>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, margin: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, margin: 10, padding: 8 }}
      />
      <FlatButton text="Already a user? Login" c="#edede9" color='#00b4d8' onPress={()=>navigation.replace("Login")}/>
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default Signup;