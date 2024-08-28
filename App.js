import React from 'react';
import { SafeAreaView } from 'react-native';
import InvoiceForm from './InvoiceForm.js';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <InvoiceForm />
    </SafeAreaView>
  );
};

export default App;