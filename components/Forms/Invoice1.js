import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  
} from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Card, List, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage for saving entries
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import Dialog from "react-native-dialog";
import FlatButton from "../../FlatButton";
import SavedEntries from "../SavedEntries";


const Invoice1 = ({ route, navigation }) => {
  const { entry } = route.params || {};
  const { control, handleSubmit, setValue, getValues,reset } = useForm({
    items: [{ description: "", price: 0 }],
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "items",
  });
  useEffect(() => {
    if (entry) {
      setValue("to", entry.to || "");
      setValue("from", entry.from || "");
      setValue("date", entry.date || "");
      replace(entry.items || []);
      setFileName(entry.fileName || "");
    } else {
      reset({
        to: "",
        from: "",
        date: "",
        items: [{ description: "", price: 0 }],
      });
      setFileName('');
    }
    console.log("Loaded");
  }, []);

  const [descrpt, setDescription] = useState("");
  const [prce, setPrice] = useState("");
  const [invoiceData, setInvoiceData] = useState({});
  const [visible, setVisible] = useState(false);
  const [fileName, setFileName] = useState('');

  const showDialog = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  const onSubmit = (data) => console.log(data);

  const addItem = async () => {
    if (descrpt === "" || prce === "") {
      Alert.alert("Kindly Fill The Fields");
      return;
    }
    append({ description: descrpt, price: Number(prce) });
    setDescription("");
    setPrice("");
  };

  const removeItem = (index) => {
    remove(index);
  };

  const calcTotal = (fields) => {
    let total = 0;
    fields.forEach((item) => {
      total += item.price;
    });
    return total > 0 ? total : "";
  };

  // Function to save entry
  const saveEntry = async () => {
    const dataToSave = {
      fileName:fileName,
      to: getValues("to"),
      from: getValues("from"),
      date: getValues("date"),
      items: fields,
      total: calcTotal(fields),
    };
    try {
      const existingEntries =
        JSON.parse(await AsyncStorage.getItem("entries")) || [];

      const isPresent = existingEntries.some(
        (entry) =>
          entry.fileName === dataToSave.fileName
      );
      if (isPresent) {
        existingEntries.some((entry) => {
          if (
            entry.fileName=== dataToSave.fileName 
          ) {
            entry.items = dataToSave.items;
            entry.total = dataToSave.total;
            Alert.alert("Entry saved successfully!");
          }
        });
      } else {
        Alert.alert("Please Save As First");
      }
      await AsyncStorage.setItem("entries", JSON.stringify(existingEntries));
      setInvoiceData(dataToSave);
    } catch (error) {
      console.log("Error saving entry: ", error);
    }
  };

  const saveAsEntry = async () => {
    setVisible(false);
    const dataToSave = {
      fileName:fileName,
      to: getValues("to"),
      from: getValues("from"),
      date: getValues("date"),
      items: fields,
      total: calcTotal(fields),
    };
    try {
      const existingEntries =
        JSON.parse(await AsyncStorage.getItem("entries")) || [];

        const isPresent = existingEntries.some(
          (entry) =>
            entry.fileName === dataToSave.fileName
        );

        if (isPresent){
          Alert.alert("Filename Already Exists");
          return;
        }

      const updatedEntries = [...existingEntries, dataToSave];
      await AsyncStorage.setItem("entries", JSON.stringify(updatedEntries));


      Alert.alert("New Entry saved successfully!");
      setInvoiceData(dataToSave);
    } catch (error) {
      console.log("Error saving entry: ", error);
    }
  };
  const html = `
  <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }

        .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }

        .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .company-info {
            margin: 0;
        }

        .invoice-table {
            width: 100%;
            border-collapse: collapse;
        }

        .invoice-table th, .invoice-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        .invoice-table th {
            background-color: #f4f4f4;
        }

        .invoice-table tfoot {
            font-weight: bold;
        }

        .cell-header {
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="invoice-container">
        <h1>Invoice: ${fileName}</h1>
        <div class="invoice-header">
            <div class="company-info">
                <p><strong>To: ${getValues("to")}</strong></p>
                <p>From: ${getValues("from")}</p>
                <p>Date: ${getValues("date")}</p>
            </div>
        </div>
        <table class="invoice-table">
            <thead>
                <tr>
                    <th class="cell-header">Description</th>
                    <th class="cell-header">Price</th>
                </tr>
            </thead>
            <tbody>
                ${fields.map(item => 
                    `<tr>
                        <td>${item.description}</td>
                        <td>${item.price}</td>
                    </tr>`
                ).join('')}
            </tbody>
        </table>
        <div>
        <h2 display: flex;
            justify-content: space-between;>Total: ${calcTotal(fields)}</h2>
        </div>
        
    </div>
</body>
</html>`;

  let generatePdf = async()=>{
      const file=await printToFileAsync({
        html:html,
        base64:false,
      });
      await shareAsync(file.uri);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>INVOICE</Text>
        {/* To FROM DATE CARD */}
        <Card style={{ padding: 10 }}>
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
                keyboardType="date"
                value={value}
              />
            )}
          />
        </Card>
        <Text></Text>
        {/* Data display */}
        <Card style={{ padding: 5 }}>
          <Card.Title title="Invoice Items" />
          <View
            style={{
              flexDirection: "row",
              marginLeft: 5,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                marginRight: 10,
                borderRightWidth: 1,
                paddingRight: 150,
              }}
            >
              Description
            </Text>
            <Text>Price</Text>
          </View>
          <Card.Content>
            {fields.length > 0 ? (
              fields.map((item, index) => (
                <View key={item.id} style={styles.itemDisplayRow}>
                  <Text style={styles.itemText}>{`${item.description}`}</Text>
                  <Text
                    style={{
                      flex: 1,
                      height: 40,
                      width: 50,
                      margin: 15,
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >{`${item.price}`}</Text>
                  <IconButton icon="delete" onPress={() => remove(index)} />
                </View>
              ))
            ) : (
              <Text>No items added yet.</Text>
            )}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Total</Text>
              <Text>{`${calcTotal(fields)}`}</Text>
            </View>
          </Card.Content>
        </Card>
        <Text></Text>
        {/* Data Entry Section */}
        <Card style={{ padding: 5 }}>
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
              <TextInput
                style={styles.itemInput}
                placeholder="Price"
                keyboardType="numeric"
                value={prce}
                onChangeText={(text) => setPrice(text)}
              />
            </View>
            <Button onPress={addItem} title="Add Item" />
            {/* <FlatButton onPress={addItem} text="Add Item" c="#fb5607" /> */}
          </Card.Content>
        </Card>
        <Text></Text>
        {/* Save Button */}
        <Button title="Save" onPress={saveEntry} />
        <View style={{ margin: 5 }} />
        <Button title="Save AS" onPress={showDialog} />

        {/* Save AS file name dialog */}

        <Dialog.Container visible={visible}>
            <Dialog.Title>Save As</Dialog.Title>
            <Dialog.Description>Enter a name for this file:</Dialog.Description>
            <Dialog.Input
              placeholder="File name"
              onChangeText={setFileName}
              value={fileName}
            />
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Save" onPress={saveAsEntry} />
        </Dialog.Container>
        <View style={{ margin: 5 }} />
        <Button title="Print Pdf" onPress={generatePdf} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, marginBottom: 30, flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    backgroundColor: "#0075F2",
    color: "white",
    borderRadius: 10,
  },
  sectionTitle: {
    marginRight: 15,
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
  },
  input: { flex: 1, marginRight: 10, borderBottomWidth: 1, padding: 4 },
  itemDisplayRow: { flex: 1, flexDirection: "row" },
  itemText: {
    height: 40,
    width: 100,
    margin: 15,
    justifyContent: "center",
    overflow: "hidden",
  },
  itemInput: { height: 40, width: 70, overflow: "hidden" },
});

export default Invoice1;
