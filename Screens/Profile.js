import React from 'react';
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

function serviceView(services) {
	if (services) {
		return <Text style={{alignSelf: 'center'}}>No services posted yet.</Text>
	}
	else {
		return <Carousel data={services}/>
	}
}

function ProfileScreen(props) {
	const { currentUser, services} = props;
	console.log("See if the profile has the current user and its servicess")
	console.log({currentUser, services});
	const myCustomShare = async() => {
		const shareOptions = {
			message: 'Wtf is going on',
			url: files.appLogo
		}

		try {
			const ShareResponse = await Share.open(shareOptions);
			console.log(JSON.stringify(ShareResponse));
		} catch(error) {
			console.log('Error =>', error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>

			<View style={styles.userInfoSection}>
				<View style={{flexDirection: 'row', marginTop: 15}}>
					<Avatar.Image
						source={{uri: 'https://images.unsplash.com/photo-1579912891113-77a92510a9b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80'}}
						size={80}
					/>
					<View style={{marginLeft: 20}}>
						<Title style={[styles.title, {marginTop:15, marginBottom: 5}]}>{currentUser.name}</Title>
						<Caption style={styles.caption}>{currentUser.email}</Caption>
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
					<Text style={{color:"#777777", marginLeft: 20}}>{currentUser.phone}</Text>
				</View>
				<View style={styles.row}>
					<Icon name="email" color="#777777" size={20}/>
					<Text style={{color:"#777777", marginLeft: 20}}>{currentUser.email}</Text>
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
					<Text style={styles.menuItemText}>Your Posted Services</Text>
				</View>
				<View>
					<View>
						{serviceView(services)}
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
