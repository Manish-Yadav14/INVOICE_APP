// SavedEntries.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs,doc,deleteDoc} from "firebase/firestore";
import { db } from "../firebase";
import InvoiceForm from "../InvoiceForm"


const FormEntries = ({navigation}) =>{
    const entry = {
        fileName: '',
        to: '',
        from: '',
        date: '',
        items: [],
        total: 0,
      };
    return(
        <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center',}}>
            <Button title='New Form' onPress={()=>{navigation.navigate('NewFiles',{entry})}}></Button>

        </View>
    )
}

export default FormEntries