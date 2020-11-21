import React, {useEffect, useState} from 'react';
import { Text, TextInput, View } from 'react-native';

import * as firebase from "firebase";
require('firebase/firestore')
import { connect } from "react-redux";


function EditProfileScreen(props) {

	const [user, setUser] = useState(null);

	useEffect(() => {
		const {currentUser} = props;
		if (props.route.params.uid === firebase.auth().currentUser.uid) {
			setUser(currentUser);
		}
	})


	return (
		<View>
			<Text>Hello</Text>
			<TextInput>{user.name}</TextInput>
		</View>
	)

}

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
})

export default connect(mapStateToProps, null)(EditProfileScreen)
