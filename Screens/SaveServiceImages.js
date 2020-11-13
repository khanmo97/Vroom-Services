//@flow
import React, {useState} from 'react';
import { View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase';
import {Colors, IconButton} from "react-native-paper";
import NumberFormat from 'react-number-format';

require("firebase/firestore");
require("firebase/firebase-storage")

export default function SaveServiceImages( props) {
	const [description, setDescription ] = useState("");
	const [serviceName, setServiceName] = useState("");
	const [title, setTitle] = useState("");
	var NumberFormat = require('react-number-format');

	// let servicesOffered = firebase.firestore().collection('Services').get()
	// 	.then(snapshot => {
	// 		snapshot
	// 			.docs
	// 			.forEach(doc=>{
	// 				console.log(JSON.parse(doc._document.data.toString()))
	// 			});
	// 	});

	const uploadPhoto = async () => {
		const imageUri = props.route.params.photo;
		const response = await fetch(imageUri);
		const blob = await response.blob();
		try {
			const completed = () => {
				toDo.snapshot.ref.getDownloadURL().then((snapshot) => {
					saveServiceData(snapshot)
				});
			}
			const todoErr = (e) => {
				console.log(e);
			}
			const toDo = firebase.storage().ref().child(`servicePhotos/${firebase.auth().currentUser.uid}/${Math.random().toString(20)}`).put(blob);
			toDo.on("state_changed", undefined, todoErr, completed);
		} catch (e) {
			console.log("ERRORS OUT");
			console.log(e);
		}
	}

	const saveServiceData = (downloadURL) => {
		console.log("Service name is "+serviceName);
		firebase.firestore()
			.collection('Services')
			.doc(firebase.auth().currentUser.uid)
			.collection('serviceName')
			.add({
				downloadURL,
				title,
				description,
				creation: firebase.firestore.FieldValue.serverTimestamp()
			}).then((function () {
				props.navigation.popToTop()
			})).catch(e => console.log(e))
	}

	return (
		<View style={{flex: 1}}>
			<Image source={{uri: props.route.params.photo}}/>
			<TextInput style={styles.service}
				placeholder="Service Name"
				onChangeText={(serviceName) => setServiceName(serviceName)}
			/>
			<TextInput style={styles.service}
				placeholder="Title"
				onChangeText={(title) => setTitle(title)}
			/>
			<TextInput style={styles.description}
				placeholder="Description"
				onChangeText={(description) => setDescription(description)}
			/>
			<IconButton
				style={{alignSelf: 'center'}}
				icon="check"
				color={Colors.red500}
				size={26}
				onPress={() => uploadPhoto()}
			/>
		</View>
	)
}

const styles = {
	service: {
		alignSelf: 'center',
		alignContent: 'center',
		textAlign: 'center',
		fontWeight: 'bold',
		height: 40,
		width: "90%",
		borderColor: "gray",
		borderWidth: .5,
		marginTop: 8
	},
	description: {
		alignSelf: 'center',
		fontWeight: 'bold',
		height: 100,
		width: "90%",
		borderColor: "gray",
		borderWidth: .5,
		marginTop: 8
	}
}

