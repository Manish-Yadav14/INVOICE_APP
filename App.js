import React from 'react';
import { SafeAreaView ,StyleSheet} from 'react-native';
import InvoiceForm from './InvoiceForm.js';
// import InvoiceForm from './temp.js';

import Signup from './components/Signup.js'
import Login from './components/Login.js';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Signup/>
      <Login/>
    </SafeAreaView>
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