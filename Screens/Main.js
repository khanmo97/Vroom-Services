// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase'

import { connect } from 'react-redux';
import { bindActionCreators} from "redux";
import { fetchUser, fetchUserServices } from '../Redux/Actions/index';
import Service from './Service';
import Profile from "./Profile";
import AddService from "./AddService";
import Search from "./Search";
import {event} from "react-native-reanimated";

const BottomTab = createBottomTabNavigator();

function businessView(currentUser)
{
	if (currentUser.businessName != undefined)
	{
		return (
			<BottomTab.Screen name = "Add Service" component={AddService}
							  options={{
								  tabBarIcon: ({ color, size }) => (
									  <MaterialCommunityIcons name="plus-network" color={color} size={20}/>
								  )
							  }}
			/>
		)
	}
}

export class Main extends Component {
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchUserServices();
	}

	render() {
		const { currentUser } = this.props;
		console.log("The currrent user is "+currentUser);
		if (currentUser==undefined)
		{
			return(
				<View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
					<Text>Hello, i'm in main</Text>
				</View>
			)
		}
		return(
			<BottomTab.Navigator>

				<BottomTab.Screen name = "Search" component={Search}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="magnify" color={color} size={20}/>
						)
					}}
				/>
				{businessView(currentUser)}
				<BottomTab.Screen name = "Profile" component={Profile}
					listeners={({ navigation }) => ({
						tabPress: event => {
							event.preventDefault();
							navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
						}
					})}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="account-box" color={color} size={20}/>
						)
					}}
				/>
			</BottomTab.Navigator>
		)
	}
}

const mapStToProps = (store) => ({
	currentUser: store.userState.currentUser
})
const mapDisProps = (dispatch) => bindActionCreators({fetchUser, fetchUserServices}, dispatch);

export default connect(mapStToProps, mapDisProps)(Main);
