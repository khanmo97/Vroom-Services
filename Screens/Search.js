import React, {useEffect, useState} from 'react'
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
	ImageBackground
} from 'react-native'
import {Icon} from 'react-native-elements'
import Slider from '@react-native-community/slider';
import { connect } from "react-redux";
import * as firebase from "firebase";
import NumericInput from 'react-native-numeric-input'


require('firebase/firestore');

const searchView = () => {

		return (
			<View>
				<ImageBackground source={require('../images/notFound.jpg')} style={styles.backgroundImage} />
			</View>
		)

}

function Search(props) {


	const [user, setUser] = useState(null);
	const [desireDistance, setDesireDistance] = useState(20)
	const [users, setUsers] = useState([])

	useEffect(() => {
		const {currentUser} = props;
		setUser(currentUser);
		console.log("Do i get in useEffect() currentuser", currentUser.location.latitude);
	}, []);

	const getDistance = (lat1, lon1, lat2, lon2) =>
	{
		let p = 0.017453292519943295;
		let c = Math.cos;
		let a = 0.5 - c((lat2 - lat1) * p)/2 +
			c(lat1 * p) * c(lat2 * p) *
			(1 - c((lon2 - lon1) * p))/2;
		let distanceInKm = 12742 * Math.asin(Math.sqrt(a));
		return distanceInKm * 0.621371;

	}

	const fetchUsers = (search) => {
		firebase.firestore()
			.collection('businesses')
			.where('businessName', '>=', search)
			.get()
			.then((snapshot) => {
				let users = snapshot.docs.map(doc => {
					const data = doc.data();
					const id = doc.id;
					console.log("The data is "+data.location.latitude+" and the id is "+ id);
					console.log("The current user location is "+user.location.latitude);
					let distance = getDistance(user.location.latitude, user.location.longitude, data.location.latitude, data.location.longitude)
					console.log(distance);
					if (distance < desireDistance)
					{
						return { id, ...data }
					}
				});
				setUsers(users);
			})
	}
	return (

		<View style={{marginTop: 50}}>
			<TextInput
				placeholder="Type Here..."
				onChangeText={(search) => fetchUsers(search)} />
				<View style={{alignItems: 'center'}}>
					<NumericInput type='up-down' value={desireDistance} onChange={value => setDesireDistance(value)}/>
					<Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Range from your location in miles</Text>
				</View>
			<FlatList
				numColumns={1}
				horizontal={false}
				data={users}
				ListEmptyComponent={searchView}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.button}
									  onPress={() => props.navigation.navigate("Home", {uid: item.id})}>
						<Icon name = "account-box"/>
						<Text style={{marginHorizontal: 10}}>{item.businessName}</Text>
					</TouchableOpacity>

				)}
			/>
		</View>
	)
}

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
})

export default connect(mapStateToProps, null)(Search)

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#DDDDDD",
		padding: 10,
		flexDirection: 'row'
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
		flex: 1
	}

})
