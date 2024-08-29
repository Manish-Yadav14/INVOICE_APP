import React from 'react';
import { SafeAreaView ,StyleSheet} from 'react-native';
import InvoiceForm from './InvoiceForm.js';
// import InvoiceForm from './temp.js';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <InvoiceForm/>
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