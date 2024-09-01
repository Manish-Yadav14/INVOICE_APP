import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import InvoiceForm from "../InvoiceForm";
import SavedEntries from "./SavedEntries";
import CloudEntries from "./CloudEntries";
import FormEntries from "./FormEntries";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
    fileName: "",
    to: "",
    from: "",
    date: "",
    items: [{ description: "", price: 0 }],
    total: 0,
  };
  console.log("This hit");
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FormEntries"
        component={FormEntries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewFiles"
        component={InvoiceForm}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Homescreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="NEW FILES"
      screenOptions={{
        tabBarStyle: {
          bottom: 25,
          left: 25,
          right: 25,
          borderRadius: 15,
          height: 60,
          width: 340,
        },

        detachPreviousScreen: true,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="ALL FILE"
        component={SavedEntriesStack}
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
        component={NewFilesStack}
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
              source={require("../assets/ic_action_cloud_download.png")}
              style={{ top: 5, width: 45, height: 45, resizeMode: "contain" }}
            />
          ),
          tabBarLabel: "",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Homescreen;
