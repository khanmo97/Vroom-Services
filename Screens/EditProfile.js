import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, Button, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from "firebase";
require('firebase/firestore')
import { connect } from "react-redux";


function EditProfileScreen(props) {


	const [userName, setUserName] = useState(null);
	const [userPhone, setUserPhone] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [businessName, setBusinesName] = useState(null);
	const {currentUser} = props;



	useEffect(() => {
		if (props.route.params.uid === firebase.auth().currentUser.uid) {
			if (userPhone === null)
				setUserPhone(currentUser.phone)
			else
				setUserPhone(userPhone)
			console.log("The useEffect currentUser.name ", currentUser.name)
		}
	})

	const updateUserInfo = () => {
		// console.log("Do i  get in here,", userPhone)
		firebase.firestore()
			.collection('users')
			.doc(firebase.auth().currentUser.uid)
			.update({
				phone: userPhone.toString(),
				email: userEmail.toString()
			})
			.then(() => {
				console.log('User updated!');
			})
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.userInfoSection}>
				<View style={styles.row}>
					<Icon name = "phone" size={20} style={{marginTop: 10}}/>
					<TextInput placeholder={"Phone number"} style={styles.menuItemText} onChangeText={userPhone => setUserPhone(userPhone)}>
						{currentUser.phone}
					</TextInput>
				</View>
				<View style={styles.row}>
					<Icon name = "email" size={20} style={{marginTop: 10}}/>
					<TextInput placeholder={"Email"} style={styles.menuItemText} onChangeText={userEmail => setUserEmail(userEmail)}>
						{currentUser.email}
					</TextInput>
				</View>
				<TouchableOpacity>
					{/*<Icon name="save" color="#777777" size={20}/>*/}
					<Button title="Save" onPress={() => updateUserInfo()} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)

}

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
})

export default connect(mapStateToProps, null)(EditProfileScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	userInfoSection: {
		marginTop: 10,
		paddingHorizontal: 30,
		marginBottom: 25
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	row: {
		flexDirection: 'row',
		marginBottom: 10
	},
	menuWrapper: {
		marginTop: 10
	},
	menuItem: {
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 30
	},
	menuItemText: {
		color: '#777777',
		marginLeft: 20,
		fontWeight: '600',
		fontSize: 16,
		lineHeight: 26,
	},
})
