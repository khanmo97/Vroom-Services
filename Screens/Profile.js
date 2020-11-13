import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {
	Avatar,
	Title,
	Caption,
	Text,
	TouchableRipple
} from "react-native-paper";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux";
import Carousel from "./Carousel";
import * as firebase from "firebase";
import TouchableOpacity from "react-native-web/src/exports/TouchableOpacity";
require('firebase/firestore')
import { useFocusEffect } from '@react-navigation/native';
import {user} from '../Redux/Reducers/user';

function serviceView(services) {
	return <Carousel data={services}/>

}


function ProfileScreen(props) {
	const [userServices, setUserServices] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const { currentUser, services} = props;

		if (props.route.params.uid === firebase.auth().currentUser.uid) {
			setUser(currentUser);
			console.log("WORKS????");
			console.log("SERVIES", services);
			setUserServices(services);
		}
		else {
			firebase.firestore()
				.collection("users")
				.doc(props.route.params.uid)
				.get()
				.then((snapshot) => {
					if (snapshot.exists) {
						setUser(snapshot.data());
					}
					else {
						console.log("Wtf man in profile.js usereffect")
					}
				})
			firebase.firestore()
				.collection("Services")
				.doc(props.route.params.uid)
				.get()
				.then((snapshot) => {
					let services = snapshot.docs.map( doc => {
						const data = doc.data();
						const id = doc.id;
						return { id, ...data}
					})
					setUserServices(services);
				})

		}
	}, [props.route.params.uid])

	if (user === null)
	{
		return <View><Text>No users as of now</Text></View>
	}

	return (
		<SafeAreaView style={styles.container}>

			<View style={styles.userInfoSection}>
				<View style={{flexDirection: 'row', marginTop: 15}}>
					<Avatar.Image
						source={{uri: 'https://images.unsplash.com/photo-1579912891113-77a92510a9b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80'}}
						size={80}
					/>
					<View style={{marginLeft: 20}}>
						<Title style={[styles.title, {marginTop:15, marginBottom: 5}]}>{user.name}</Title>
						<Caption style={styles.caption}>{user.email}</Caption>
					</View>
					<View style={{marginLeft: 125, flexDirection: 'row', alignItems: 'left'}}>
						<TouchableRipple onPress={() => {firebase.auth().signOut().then(()=> console.log("user signed out now?"));}}>
							<Icon name="close" color="#777777" size={30}/>
						</TouchableRipple>
					</View>
				</View>
			</View>

			<View style={styles.userInfoSection}>
				<View style={styles.row}>
					<Icon name="map-marker-radius" color="#777777" size={20}/>
					<Text style={{color:"#777777", marginLeft: 20}}>Dallas, TX</Text>
				</View>
				<View style={styles.row}>
					<Icon name="phone" color="#777777" size={20}/>
					<Text style={{color:"#777777", marginLeft: 20}}>{user.phone}</Text>
				</View>
				<View style={styles.row}>
					<Icon name="email" color="#777777" size={20}/>
					<Text style={{color:"#777777", marginLeft: 20}}>{user.email}</Text>
				</View>
			</View>

			<View style={styles.menuWrapper}>
				<TouchableRipple onPress={() => {}}>
					<View style={styles.menuItem}>
						<Icon name="heart-outline" color="#FF6347" size={25}/>
						<Text style={styles.menuItemText}>Your Favorites</Text>
					</View>
				</TouchableRipple>
				<View style={styles.menuItemService}>
					<Icon name="newspaper" color="#FF6347" size={25} style={{alignSelf: 'center'}}/>
					<Text style={styles.menuItemText}>Posted Services</Text>
				</View>
				<View>
					<View>
						{serviceView(userServices)}
					</View>
				</View>
			</View>

		</SafeAreaView>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	services: store.userState.services
})

export default connect(mapStateToProps, null)(ProfileScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	userInfoSection: {
		paddingHorizontal: 30,
		marginBottom: 25
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold'
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
		fontWeight: '500'
	},
	row: {
		flexDirection: 'row',
		marginBottom: 10
	},
	infoBoxWrapper: {
		borderBottomColor: '#cfb639',
		borderBottomWidth: 1,
		borderTopColor: '#c8940a',
		borderTopWidth: 1,
		flexDirection: 'row',
		height: 100
	},
	infoBox: {
		width: '50%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	menuWrapper: {
		marginTop: 10
	},
	menuItem: {
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 30
	},
	menuItemService: {
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 30,
		alignSelf: 'center'
	},
	menuItemText: {
		color: '#777777',
		marginLeft: 20,
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 26,
	},
	menuItemServices: {
		color: '#777777',
		alignSelf: 'center',
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 26,
	}
});
