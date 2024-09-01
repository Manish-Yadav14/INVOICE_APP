// Login.js
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 
import FlatButton from "../FlatButton";

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      navigation.replace('Home')
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={{flex:1,justifyContent:'center',alignContent:'center',alignSelf:'center'}}>
      <Text>Login</Text>
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
      <FlatButton text="Not A USER? SIGN UP" c="#edede9" color='#00b4d8' onPress={()=>navigation.replace("SignUp")}/>

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;