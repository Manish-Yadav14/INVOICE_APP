import React from "react";
import { StyleSheet,TouchableOpacity,Text,View } from "react-native";

export default function FlatButton({text,c,onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button,{backgroundColor:c,borderRadius:8}]}>
            <Text style={styles.buttonText} >{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button:{
        borderRadius:20,
        paddingVertical:14,
        paddingHorizontal:10,
        backgroundColor:'#00ABE7',
    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        textTransform:"capitalize",
        fontSize:16,
        textAlign:'center',
        
    }

})