import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Constants from 'expo';
import * as firebase from "firebase";


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

const [services, setServices] = useState([]);


export default class Home extends React.Component {


	_isMounted = false;
	state = {
		location: null,
		errorMessage: null
	}

	componentDidMount() {
		this._isMounted = false;
	}


	componentWillUnmount() {
		this.isMounted = true;
		this._getLocation().then(data =>
		{
			if (this.isMounted) this.setState(data);
		});
		return () => {this.isMounted = false};
	}

    // get device permissions to get device location
    // save location
    _getLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== "granted") {
            this.setState({
                errorMessage: "Permission Not Granted",
            });
        }

		let location = await Location.getCurrentPositionAsync({});

		this.setState({
			location
		});
	};

	render () {
		return (
			<View style={styles.container}>
				<Text>{JSON.stringify(this.state.location)}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'slategray',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
