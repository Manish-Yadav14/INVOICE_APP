// components/CustomHeader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const CustomHeader = () => {
  const navigation = useNavigation(); // Get the navigation object

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); // Navigate to login screen after logout
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.header}>
      <Button 
        onPress={handleLogout} 
        labelStyle={styles.logoutButtonText} // Set the label style to increase font size
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 35,
    right: 5,
    zIndex: 1, // Ensures the button is always on top
  },
  logoutButton: {
    // Additional styles for the button itself, if needed
  },
  logoutButtonText: {
    fontSize: 18, // Increase the font size to 20 or any size you prefer
  },
});

export default CustomHeader;
