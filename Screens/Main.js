// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { bindActionCreators} from "redux";
import { fetchUser, fetchUserServices } from '../Redux/Actions/index';
import Service from './Service';
import Profile from "./Profile";
import AddService from "./AddService";
import Search from "./Search";

const BottomTab = createBottomTabNavigator();

export class Main extends Component {
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchUserServices();
	}

	render() {
		const { currentUser } = this.props;
		// console.log("The currrent user is "+currentUser.name);
		if (currentUser==undefined)
		{
			return(
				<View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
					<Text>Hello</Text>
				</View>
			)
		}
		return(
			<BottomTab.Navigator>
				<BottomTab.Screen name = "Service" component={Service}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="home" color={color} size={20}/>
						)
					}}
				/>
				<BottomTab.Screen name = "Search" component={Search}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="magnify" color={color} size={20}/>
						)
					}}
				/>
				<BottomTab.Screen name = "Profile" component={Profile}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="account-box" color={color} size={20}/>
						)
					}}
				/>
				<BottomTab.Screen name = "Add Service" component={AddService}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="plus-network" color={color} size={20}/>
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
