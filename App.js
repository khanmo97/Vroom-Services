import React, { Component } from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import * as firebase from "firebase";
const firebaseConfig = {
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
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Service from "./Screens/Service";
import Profile from "./Screens/Profile";
import EditProfile from "./Screens/EditProfile"
import Search from "./Screens/Search";
import Comments from "./Screens/Comments";
import Main from "./Screens/Main";
import SaveServiceImages from "./Screens/SaveServiceImages";

import Spinner from 'react-native-loading-spinner-overlay';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from "redux";
import rootReducer from './Redux/Reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from "react-native-vector-icons/Ionicons";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const LoginStack = createStackNavigator();
const SignupStack = createStackNavigator();


const LoginStackScreen = ({navigation}) => (
	<LoginStack.Navigator>
		<LoginStack.Screen
			name = "Login"
			component = {Login}
			options={{title: 'Login'}}
			backgroundColor = '#003f5c'
		/>
	</LoginStack.Navigator>
);


const SignupStackScreen = ({navigation}) => (
	<SignupStack.Navigator>
		<SignupStack.Screen
			name = "Signup"
			component = {Signup}
			options={{title: 'Signup'}}
			backgroundColor = '#003f5c'
		/>
	</SignupStack.Navigator>
);

export class App extends Component {
	constructor(props) {
		super()
		this.state = {
			loaded: false,
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				this.setState({
					loggedIn: false,
					loaded: true
				})
			}
			else
			{
				this.setState({
					loggedIn: true,
					loaded: true
				})
				//firebase.auth().signOut().then(()=> console.log("user signed out now?"));
			}
		})
	}
	render() {
		const {loggedIn, loaded} = this.state;
		if (!loaded) {
			return (
				<View style={{flex: 1, justifyContent: 'center'}}>
					<Spinner
						visible={loaded}
						textContent={'Analyzing Tweets...'}
					/>
				</View>
			)
		}
		console.log(this.state);
		if (!loggedIn)
		{
			return (
				<NavigationContainer>
					<Drawer.Navigator initialRouteName="Landing">
						<Drawer.Screen name="Signup" component={SignupStackScreen}/>
						<Drawer.Screen name="Login" component={LoginStackScreen}/>
					</Drawer.Navigator>
				</NavigationContainer>
			);
		}

		return (
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Main">
						<Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
						<Stack.Screen name="SaveServiceImages" component={SaveServiceImages} />
						<Stack.Screen name="Service" component={Service} />
						<Stack.Screen name="Comments" component={Comments} />
						<Stack.Screen name="Search" component={Search} />
						<Stack.Screen name="Home" component={Home} />
						<Stack.Screen name="EditProfile" component={EditProfile} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		)
	}
}

export default App;

const styles = StyleSheet.create({
	spinnerTextStyle: {
		color: '#FFF'
	}
});
