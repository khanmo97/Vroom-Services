import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
	ImageBackground,
} from "react-native";
import * as firebase from "firebase";

function Comments() {

	function fetchComments() {
		const stuff = firebase.firestore()
			.collectionGroup("serviceName")
			.where("key", "==", item.key)
			.get()

		console.log("The stuff is ", stuff)
			//.collection("serviceName")
	}

	return (
		<View style={styles.container}>
			<Text>HELLO WORLD</Text>
		</View>
	);
}

export default Comments


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	textInput: {
		height: 40,
		width: "90%",
		borderColor: "gray",
		borderWidth: 1,
		marginTop: 8
	}
});
