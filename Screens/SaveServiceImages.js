//@flow
import React, {useState} from 'react';
import { View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase';
import {Colors, IconButton} from "react-native-paper";

require("firebase/firestore");
require("firebase/firebase-storage")

export default function SaveServiceImages( props) {
	const [description, setDescription ] = useState("");
	const [servicePrice, setServicePrice] = useState("0");
	const [title, setTitle] = useState("");


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
		firebase.firestore()
			.collection('Services')
			.doc(firebase.auth().currentUser.uid)
			.collection('serviceName')
			.add({
				servicePrice,
				downloadURL,
				title,
				description,
				creation: firebase.firestore.FieldValue.serverTimestamp(),
				key: (firebase.auth().currentUser.uid + '-' + (new Date().getTime()))
			}).then((function () {
				props.navigation.popToTop()
			})).catch(e => console.log(e))
	}

	return (
		<View style={{flex: 1}}>
			<Image source={{uri: props.route.params.photo}}/>
			<TextInput style={styles.service}
				placeholder="Price"
				onChangeText={(servicePrice) => setServicePrice(servicePrice)}
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
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  check: {
    alignSelf: "center",
  },
  checkContainer: {
    width: 34,
    height: 34,
    backgroundColor: Colors.teal100,
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    marginTop: 10,
    borderRadius: 17,
  },
  screen: {
    flex: 1,
    paddingTop: 100,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    width: "100%",
  },
  service: {
    alignSelf: "center",
    alignContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    height: 40,
    width: "90%",
    backgroundColor: "white",
    borderWidth: 0.5,
    marginTop: 10,
  },
  description: {
    alignSelf: "center",
    fontWeight: "bold",
    height: 200,
    width: "90%",
    backgroundColor: "white",
    borderWidth: 0.5,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textContainer: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  text: {
    color: "white",
    fontSize: 15,
  },
};
