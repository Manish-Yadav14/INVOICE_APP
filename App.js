import React from 'react';
import { SafeAreaView ,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InvoiceForm from './InvoiceForm.js';
import Homescreen from './components/Homescreen.js';
import Signup from './components/Signup.js'
import Login from './components/Login.js';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LOGIN"  
        screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="LOGIN" component={Login} />
        <Stack.Screen name="Home" component={Homescreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',  // Background color for the app
    justifyContent: 'center',  // Center the content
    alignItems: 'center',  // Align content in the center
  },
});

export default App;