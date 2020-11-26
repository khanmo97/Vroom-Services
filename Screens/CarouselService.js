//@flow

import React, {useEffect, useState} from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	Dimensions,
	ScrollView
} from 'react-native';
import {TouchableRipple} from "react-native-paper";
import * as firebase from "firebase";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height} = Dimensions.get('window');


const CarouselService = ({item, navigation}) => {

		console.log("The item has this stuff ", item)
		console.log("Tthe item id is ", item.id)
		const [iconName, setIconName] = useState("heart-outline")

	useEffect(() => {
		fetchFavorites().then(snapshot => {
			if (!snapshot.empty) {
				setIconName('heart');
			}
		});
	}, [])

	function fetchFavorites() {
		return firebase.firestore()
			.collection("UserFavorites")
			.doc(firebase.auth().currentUser.uid)
			.collection('FavoritesSuid')
			.where("suid", "==", item.id)
			.get();
	}

	return (
		<View style = {styles.cardView}>
			<TouchableRipple >
			<Image style= {styles.image} source={{uri: item.downloadURL}}/>
			</TouchableRipple>
			<View style={styles.favorite}>
				<TouchableRipple onPress={() => {
					if(iconName === "heart-outline")
					{
						firebase.firestore()
							.collection("UserFavorites")
							.doc(firebase.auth().currentUser.uid)
							.collection('FavoritesSuid')
							.add({
								suid: item.id
							}).then(r => {setIconName("heart")});
					}
					else {
						fetchFavorites().then(snapshot => {
							snapshot.forEach(snap => snap.ref.delete());
							setIconName("heart-outline");
						});
					}
				}}>
						<Icon name={iconName} color="#FF6347" size={25}/>
				</TouchableRipple>
			</View>

			<View style={styles.price}>
				<Text style={styles.itemTitle}>
					$10
				</Text>
			</View>
			<View style={styles.textView}>
				<ScrollView>
					<Text style={styles.itemTitle}>{item.title}</Text>
					<Text style={styles.itemDescription}>{item.description}</Text>
				</ScrollView>
			</View>
		</View>
	)
}

export default CarouselService;

const styles = StyleSheet.create({
	cardView:{
		flex: 1,
		width: width - 20,
		height: height / 3,
		backgroundColor: 'white',
		margin: 10,
		borderRadius: 10,
		shadowColor: '#000000',
		shadowOffset: {width: 0.5, height: 0.5},
		shadowOpacity: 0.5,
		shadowRadius: 3,
		elevation: 5
	},
	price: {
		position: 'absolute',
		top: 10,
		margin: 10,
		right: 5
	},
	favorite: {
		position: 'absolute',
		top: 10,
		margin: 10,
		left: 5
	},
	itemTitle: {
		color: '#cde2e7',
		fontSize: 30,
		elevation: 5,
		fontWeight: 'bold'
	},
	textView: {
		position: 'absolute',
		bottom: 10,
		margin: 10,
		left: 5
	},
	image: {
		height: height / 3,
		borderRadius: 10
	},
	itemDescription: {
		color: 'white',
		fontSize: 12,
		shadowColor: '#000',
		shadowOffset: {width: 0.8, height: 0.9},
		shadowOpacity: 1,
		shadowRadius: 3,
		elevation: 5
	}

})
