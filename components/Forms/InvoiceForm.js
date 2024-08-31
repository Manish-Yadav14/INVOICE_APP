// InvoiceForm.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Card, List, IconButton } from 'react-native-paper';

const InvoiceForm = () => {
  const { control, handleSubmit, setValue, getValues } = useForm({
    items: [{ description: '', price: 0 }]
  });

  // Use useFieldArray to manage dynamic fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const [descrpt, setDescription] = useState('');
  const [prce, setPrice] = useState('');
  const onSubmit = (data) => console.log(data);

  const addItem = async () => {
    if (descrpt === '' || prce === '') {
      Alert.alert("Fill The Details First")
      return;
    }
    append({ description: descrpt, price: Number(prce) });
    setDescription('');
    setPrice('')
  };

  const removeItem = (index) => {
    remove(index);
  };
  const calcTotal = (fields) => {
    let total = 0;
    if (fields.length > 0) {
      fields.map((item) => {
        total += item.price;
      })
      return total;
    }
    else return '';
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text></Text>
        <Text style={styles.title}>INVOICE</Text>
        {/* To FROM DATE CARD */}
        <Card>
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
                keyboardType='date'
                value={value}
              />
            )}
          />
          <Text></Text>
        </Card>
        <Text></Text>
        {/* Data display */}
        <Card style={styles.card}>
          <Card.Title title="Invoice Items" />
          <View style={{ flexDirection: 'row', marginLeft: 5, borderWidth: 1, justifyContent: 'center' }}>
            <Text style={{ marginRight: 10, borderRightWidth: 1, paddingRight: 150, }}>Description</Text>
            <Text style={{}}>Price</Text>
          </View>
          <Card.Content>

            {fields.length > 0 ? (
              fields.map((item, index) => (
                <View key={item.id} style={styles.itemDisplayRow}>
                  <Text style={styles.itemText}>{`${item.description}`}</Text>
                  <Text style={{flex:1, height: 40, width: 50, margin: 15, justifyContent: 'center', overflow: 'hidden' }}>{`${item.price}`}</Text>
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

            <View style={{ flex: 1, flexDirection: 'row' ,justifyContent:'space-between'}}>
              <Text style={{ }}>Total</Text>
              <Text style={{  }}>{`${calcTotal(fields)}`}</Text>
            </View>
          </Card.Content>
        </Card>
        <Text></Text>
        {/* Data Entry Section */}
        <Card style={styles.card}>
          <Card.Title title="Enter Invoice Details" />
          <Card.Content>

            {/* Add Item Section */}
            <Text style={styles.sectionTitle}>ADD ITEM</Text>
            <View style={styles.itemRow}>
              <TextInput
                style={styles.itemInput}
                placeholder="Description"
                value={descrpt}
                onChangeText={(text) => setDescription(text)}
              />
              <Text>            </Text>
              {/* <TextInput
              style={styles.itemInput}
              placeholder="Quantity"
              keyboardType="numeric"
              value={quant}
              onChangeText={(text) => setQuant(text)}
            /> */}
              <Text>            </Text>
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
        <Text></Text>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: { padding: 16, marginBottom: 30, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', backgroundColor: '#0075F2', color: 'white', borderRadius: 10 },
  sectionTitle: { marginRight: 15, padding: 10, justifyContent: 'center', alignContent: 'center' },
  itemRow: { flexDirection: 'row', alignItems: 'center', margin: 10, padding: 10, },
  input: { flex: 1, marginRight: 10, borderBottomWidth: 1, padding: 4 },
  itemDisplayRow: { flex:1,flexDirection: 'row' ,},
  itemText: { height: 40, width: 100, margin: 15, justifyContent: 'center', overflow: 'hidden' },
  itemInput: { height: 40, width: 70, overflow: 'hidden' }
});

export default InvoiceForm;
