import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import {
	createSwitchNavigator,
	createStackNavigator,
	createAppContainer
} from "@react-navigation/stack";

import * as firebase from "firebase";
var firebaseConfig = {
	apiKey: "AIzaSyBLJ-dDm-yr9YouJny1tf7F5Z4CTgrtgsA",
	authDomain: "vroomwash-f6735.firebaseapp.com",
	databaseURL: "https://vroomwash-f6735.firebaseio.com",
	projectId: "vroomwash-f6735",
	storageBucket: "vroomwash-f6735.appspot.com",
	messagingSenderId: "465276854623",
	appId: "1:465276854623:web:8f9568eda142f82da996ea"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// import the different screens
//import Loading from "./components/Loading";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Service from "./Screens/Service";
import {NavigationContainer} from "@react-navigation/native";
// import Otp from "./components/Phone/Otp";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{title: 'Login'}}
					backgroundColor = '#003f5c'
				/>
				<Stack.Screen
					name="Signup"
					component={Signup}
					options={{title: 'Signup'}}
					backgroundColor = '#003f5c'
				/>
				<Stack.Screen
					name="Service"
					component={Service}
					options={{title: 'Service'}}
					backgroundColor = 'Teal'
				/>
			</Stack.Navigator>
		</NavigationContainer>
		);

}

