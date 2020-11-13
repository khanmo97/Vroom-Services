import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import Carousel from "./Carousel";

import firebase from 'firebase';
require('firebase/firestore');

export default function Search(props) {
	const [users, setUsers] = useState([])

	const fetchUsers = (search) => {
		firebase.firestore()
			.collection('users')
			.where('name', '>=', search)
			.get()
			.then((snapshot) => {
				let users = snapshot.docs.map(doc => {
					const data = doc.data();
					const id = doc.id;
					return { id, ...data }
				});
				setUsers(users);
			})
	}
	return (
		<View style={{marginTop: 50}}>
			<TextInput
				placeholder="Type Here..."
				onChangeText={(search) => fetchUsers(search)} />
			<FlatList
				numColumns={1}
				horizontal={false}
				data={users}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.button}
						onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
						<Icon name = "account-box"/>
						<Text style={{marginHorizontal: 10}}>{item.name}</Text>
					</TouchableOpacity>

				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#DDDDDD",
		padding: 10,
		flexDirection: 'row'
	},

})
