import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import InvoiceForm from "../InvoiceForm";
import Invoice1 from "./Forms/Invoice1";
import SavedEntries from "./SavedEntries";
import CloudEntries from "./CloudEntries";
import { shadow, Title } from "react-native-paper";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define a stack navigator for each tab
const SavedEntriesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SavedEntries"
        component={SavedEntries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvoiceForm"
        component={InvoiceForm}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const CloudEntriesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CloudEntries"
        component={CloudEntries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvoiceForm"
        component={InvoiceForm}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const NewFilesStack = () => {
  const emptyEntry = {
    fileName: '',
    to: '',
    from: '',
    date: '',
    items: [{ description: "", price: 0 }],
    total: 0,
  };
  console.log("This hit");
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewFiles"
        component={InvoiceForm}
        key={Date.now().toString()}
        initialParams={{ entry: null }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Homescreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          bottom: 25,
          left: 25,
          right: 25,
          borderRadius: 15,
          height: 60,
          width: 340,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    > 
      {/* <Tab.Screen
        name="SAVE"
        component={Invoice1}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/ic_action_save.png")}
              style={{
                top: 5,
                width: 45,
                height: 45,
                resizeMode: "contain",
                elevation: 5,
              }}
            />
          ),
          tabBarLabel: "",
        }}
      /> */}
      <Tab.Screen
        name="ALL FILE"
        component={SavedEntriesStack} // Use the stack for SavedEntries
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/ic_action_folder.png")}
              style={{ top: 5, width: 45, height: 45, resizeMode: "contain" }}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="NEW FILES"
        component={NewFilesStack} // Use the stack for NewFiles
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 5,
              }}
            >
              <Image
                source={require("../assets/ic_action_add_circle.png")}
                style={{
                  top: -8,
                  width: 65,
                  height: 65,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="GET FILES"
        component={CloudEntriesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/ic_action_cloud_download.png") // Active icon
                  : require("../assets/ic_action_cloud_download.png") // Inactive icon
              }
              style={{ top: 5, width: 45, height: 45, resizeMode: "contain" }}
            />
          ),
          tabBarLabel: "",
        }}
      />
      {/* <Tab.Screen
        name="UPLOAD"
        component={InvoiceForm}
        options= {{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/ic_action_cloud_upload.png") // Active icon
                  : require("../assets/ic_action_cloud_upload.png") // Inactive icon
              }
              tintColor={focused ? 'red':'grey'}
              style={{ top: 5, width: 45, height: 45, resizeMode: "contain" }}
            />
          ),
          style: {
            backgroundColor: 'grey',//color you want to change
          },
          tabBarLabel: "",
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Homescreen;
