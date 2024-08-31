import React from "react";
import { StyleSheet,TouchableOpacity,Text,View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Icon } from "react-native-vector-icons/Icon";
export default function FlatButton({text,c,onPress,iconname,iconcolor}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button,{backgroundColor:c,borderRadius:8}]}>
                {/* if (iconname){
                } */}
                <Icon name={iconname} size={60} color={iconcolor} />
            
            <Text style={styles.buttonText} >{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button:{
        borderRadius:20,
        // paddingVertical:14,
        // paddingHorizontal:10,
        backgroundColor:'#00ABE7',
        marginTop:5,
        marginBottom:5,
    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        textTransform:"capitalize",
        fontSize:16,
        textAlign:'center',
        
    }

})