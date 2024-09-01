import React from 'react';
import { View, StyleSheet } from 'react-native';
import FlatButton from '../FlatButton';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Button } from 'react-native-paper';

const FormEntries = ({ navigation }) => {
    const entry = {
        fileName: '',
        to: '',
        from: '',
        date: '',
        items: [],
        total: 0,
    };
    const handleLogout = async () => {
        try {
          await signOut(auth);
          navigation.replace('Login'); // Navigate to login screen after logout
        } catch (error) {
          console.error('Error signing out: ', error);
        }
      };

    return (
        
        <View style={styles.container}>
            <Button 
        onPress={handleLogout} 
        labelStyle={styles.logoutButtonText} // Set the label style to increase font size
        style={styles.logoutButton}
      >
        Logout
      </Button>
            <FlatButton text='Invoice 1' c='#00b4d8' color='#FFFFFF' onPress={() => navigation.navigate('NewFiles', { entry })} style={styles.floatingButton} />
            {/* <FlatButton text='Invoice 2' c='#00b4d8' color="#FFFFFF" onPress={() => navigation.navigate('NewFiles', { entry })} style={styles.floatingButton} /> */}
            <FlatButton text='Company Invoice 1' c='#00b4d8' color="#FFFFFF" onPress={() => navigation.navigate('CompanyInvoice', { entry })} style={styles.floatingButton} />
            {/* <FlatButton text='Company Invoice 2' c='#00b4d8' color="#FFFFFF" onPress={() => navigation.navigate('NewFiles', { entry })} style={styles.floatingButton} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative',
    },
    logoutButton: {
        position: 'absolute',
        top: 10,  // Adjust as needed
        right: 10, // Adjust as needed
        backgroundColor: '#E9F0F5', // Or any other color
        marginTop:30,
      },
    floatingButton: {
        marginBottom: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 8,
    },
});

export default FormEntries;
