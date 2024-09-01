import React from "react";
import { StyleSheet,TouchableOpacity,Text,View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function FlatButton({text,c,onPress,iconname,iconcolor,color, style1, style2, style3}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button,{backgroundColor:c,borderRadius:25,},style1]}>
            {iconname ? (
                <Icon name={iconname} size={30} color={iconcolor} style={style2} />
            ) : (
                <Text style={[styles.buttonText,{color:color},style3]}>{text}</Text>
            )}
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button:{
        borderRadius:25,
        backgroundColor:'#00ABE7',
        marginTop:5,
        marginBottom:5,
        padding:15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, 
    },
    buttonText:{
        color:'white',
        fontWeight:'300',
        textTransform:"capitalize",
        fontSize:23,
        textAlign:'center',
        
    }

})