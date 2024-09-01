// Login.js
import React, { useState,useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 
import FlatButton from "../FlatButton";
import { onAuthStateChanged } from "firebase/auth";

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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
        <Text style={ {fontSize: 32,fontWeight: 'bold', color: '#333',marginBottom: 10,marginLeft:110}}>Login</Text>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{width:280, borderWidth: 1, margin: 10, padding: 8,overflow:'hidden',borderRadius:8 }}
        />
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{width:280, borderWidth: 1, margin: 10, padding: 8,overflow:'hidden',borderRadius:8 }}
        />
  
        <Button title="Login" onPress={handleLogin} />
        <Text>  </Text>
        <FlatButton text="Not A USER? SIGN UP" c="#edede9" color='#00b4d8' onPress={()=>navigation.replace("SignUp")}/>
      </View>
    );

 
};

export default Login;