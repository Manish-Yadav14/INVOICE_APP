// InvoiceForm.js
import React,{ useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Card, List, IconButton } from 'react-native-paper';

const InvoiceForm = () => {
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      items: [{ description: '', quantity: 1, price: 0 }]
    }
  });

  // Use useFieldArray to manage dynamic fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const [descrpt,setDescription]=useState('');
  const [quant,setQuant]=useState('');
  const [prce,setPrice]=useState('');
  const onSubmit = (data) => console.log(data);

  const addItem = async ()  => {
    // setValue(`items[${fields.length}].description`,descrpt)
    // setValue(`items[${fields.length}].quantity`,Number(quant))
    // setValue(`items[${fields.length}].price`,Number(prce))

    append({ description: descrpt, quantity: Number(quant), price: Number(prce) });
    // append({ description: '', quantity: 1, price: 0 });
    setDescription('');
    setQuant('')
    setPrice('')
  };

  const removeItem = (index) => {
    remove(index);
  };
  
  return (
    <ScrollView>
        <View style={styles.container}>
        <Text></Text>
      <Text style={styles.title}>Invoice</Text>
      <Card style={styles.card}>
        <Card.Title title="Invoice Items" />
        {/* Data display */}
        <Card.Content>
          {fields.length > 0 ? (
            fields.map((item, index) => (
              <View key={item.id} style={styles.itemDisplayRow}>
                <Text style={styles.itemText}>{`Description: ${item.description}`}</Text>
                <Text style={styles.itemText}>{`Quantity: ${item.quantity}`}</Text>
                <Text style={styles.itemText}>{`Price: ${item.price}`}</Text>
                {/* Delete Item Button */}
                <IconButton
                  icon="delete"
                  onPress={() => remove(index)}  // Directly call remove from useFieldArray
                />
              </View>
            ))
          ) : (
            <Text>No items added yet.</Text>
          )}
        </Card.Content>
      </Card>
      <Text></Text>
      {/* Data Entry Section */}
      <Card style={styles.card}>
        <Card.Title title="Enter Invoice Details" />
        <Card.Content>
          {/* To Input */}
          <Controller
            control={control}
            name="to"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="To"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {/* From Input */}
          <Controller
            control={control}
            name="from"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="From"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {/* Date Input */}
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Date (e.g., 2024-08-28)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {/* Add Item Section */}
          <Text style={styles.sectionTitle}>Add Item</Text>
          <View style={styles.itemRow}>
            <TextInput
              style={styles.itemInput}
              placeholder="Description"
              value={descrpt}
              onChangeText={(text) => setDescription(text) }
            />
            <Text>  </Text>
            <TextInput
              style={styles.itemInput}
              placeholder="Quantity"
              keyboardType="numeric"
              value={quant}
              onChangeText={(text) => setQuant(text)}
            />
            <Text>  </Text>
            <TextInput
              style={styles.itemInput}
              placeholder="Price"
              keyboardType="numeric"
              value={prce}
              onChangeText={(text) => {
                setPrice(text)
            }}
            />
          </View>
          <Button onPress={addItem} title="Add Item" />
        </Card.Content>
      </Card>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 ,marginBottom:30,},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16,textAlign:'center' },
  sectionTitle:{marginRight:15,padding:10,justifyContent:'center',alignContent:'center'},
  itemRow: { flexDirection: 'row', alignItems: 'center', margin: 10,padding:10, },
  input: { flex: 1, marginRight: 10, borderBottomWidth: 1, padding: 4 },
});

export default InvoiceForm;
