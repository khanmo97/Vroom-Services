import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, ScrollView} from 'react-native';
import {Colors, IconButton} from "react-native-paper";


import firebase from 'firebase';
import Carousel from "./Carousel";

require('firebase/firestore');

export default function Search() {
	const [users, setUsers] = useState([]);
	const [services, setServices] = useState([]);

	const fetchServices = async (search) => {
		const myReviews = firebase.firestore().collectionGroup('serviceName');
		const snapshot = await myReviews.get();
		let services = snapshot.docs.map(doc => {
			console.log(doc.data().title);
			const data = doc.data();
			const id = doc.id;
			return {id, ...data};
		});
		console.log("here are ALL THE FING SERVICES")
		console.log(services)
		setServices(services);
	};

	console.log("am i getting here befgore services log")
	console.log(services)

	const fetchUsers = (search) => {
		firebase.firestore()
			.collection('users')
			.where('name', '>=', search)
			.get()
			.then((snapshot) => {
				let users = snapshot.docs.map(doc => {
					console.log("Wtf hoes")
					console.log(doc.data())
					const data = doc.data();
					const id = doc.id;
					return {id, ...data};
				});
				setUsers(users);
			})
	}

	const serviceView = async (services) => {
		if (services)
		{
			console.log("im in getserviceVewi");
			return <Carousel data={services}/>
		}
		else
		{
			return <View><Text>No services posted</Text></View>
		}
	}

	return(
		// <View style={styles.parent}>
		// 	<View style={styles.child1}></View>
		// 	<View style={styles.child2}></View>
		// </View>
		<ScrollView style={styles.parent}>
			<View style={styles.child1}>
				<View style={styles.searchBar}>
					<IconButton icon="magnify"/>
					<TextInput placeholder="Search" style={styles.textInput} onSubmitEditing={(search) => fetchServices(search)}/>
				</View>
			</View>
			<View style={styles.child2}>
				<Carousel data={services}/>
			</View>
			<View style={styles.child3}>
				<Text>Hello</Text>
			</View>
		</ScrollView>



		// <View>
		// <View style={styles.searchSection}>
		// 		<IconButton icon="magnify" style={styles.searchIcon}/>
		// 		c
		// </View>
		//
		// 	<View style={styles.services}>
		// 		<Text>Hello</Text>
		// 	</View>
		// 	{/*<FlatList*/}
		// 	{/*	numColumns={1}*/}
		// 	{/*	horizontal={false}*/}
		// 	{/*	data={services}*/}
		// 	{/*	renderItem={({item}) => (*/}
		// 	{/*		<Text>{item.title}</Text>*/}
		// 	{/*	)}*/}
		// 	{/*/>*/}
		// </View>

	)
}

const styles = {
	parent: {
		flex: 1,
		flexDirection: 'column',
	},
	child1: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	child2: {
		flex: 4,
	},
	searchBar: {
		flexDirection: 'row',
		marginLeft: 10,
		marginTop: 50
	},
	textInput: {
		height: 40,
		width: "75%",
		borderColor: "gray",
		borderWidth: .7,
		marginTop: 8
	},
	child3: {
		flex: 3,
	}
}
