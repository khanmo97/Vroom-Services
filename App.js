import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from "@react-navigation/stack";

import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBLJ-dDm-yr9YouJny1tf7F5Z4CTgrtgsA",
  authDomain: "vroomwash-f6735.firebaseapp.com",
  databaseURL: "https://vroomwash-f6735.firebaseio.com",
  projectId: "vroomwash-f6735",
  storageBucket: "vroomwash-f6735.appspot.com",
  messagingSenderId: "465276854623",
  appId: "1:465276854623:web:8f9568eda142f82da996ea",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// import the different screens
//import Loading from "./components/Loading";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Service from "./Screens/Service";
import Profile from "./Screens/Profile";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/Ionicons";

// import Otp from "./components/Phone/Otp";

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ServiceStack = createStackNavigator();
const SignupStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1999e3",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: "Home",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={"#1999e3"}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
      backgroundColor="teal"
    />
  </HomeStack.Navigator>
);

const LoginStackScreen = ({ navigation }) => (
  <LoginStack.Navigator>
    <LoginStack.Screen
      name="Login"
      component={Login}
      options={{ title: "Login" }}
      backgroundColor="#003f5c"
    />
  </LoginStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{ title: "Profile" }}
      backgroundColor="#003f5c"
    />
  </ProfileStack.Navigator>
);

const ServiceStackScreen = ({ navigation }) => (
  <ServiceStack.Navigator>
    <ServiceStack.Screen
      name="Service"
      component={Service}
      options={{ title: "Service" }}
      backgroundColor="#003f5c"
    />
  </ServiceStack.Navigator>
);

const SignupStackScreen = ({ navigation }) => (
  <SignupStack.Navigator>
    <SignupStack.Screen
      name="Signup"
      component={Signup}
      options={{ title: "Signup" }}
      backgroundColor="#003f5c"
    />
  </SignupStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        {/* <Drawer.Screen name="Home" component={HomeStackScreen} /> */}
        <Drawer.Screen name="Signup" component={SignupStackScreen} />
        <Drawer.Screen name="Login" component={LoginStackScreen} />
        <Drawer.Screen name="Profile" component={ProfileStackScreen} />
        <Drawer.Screen name="Service" component={ServiceStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
