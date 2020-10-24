import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Constants from 'expo';
import * as firebase from "firebase";

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
