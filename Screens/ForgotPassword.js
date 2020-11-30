import {
	View,
	SafeAreaView,
	TextInput,
	StyleSheet,
	Button,
	Alert,
	ImageBackground, Text
} from "react-native"
import React from "react";
import * as firebase from "firebase";

const image = {uri: "https://images.unsplash.com/photo-1588610389315-d7985ec2c6d0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2096&q=80"};

export default class SignUp extends React.Component {

	state = {email: "", errorMessage: ""}

	handleResetPassword = () => {
		const {email} = this.state;

		firebase.auth().sendPasswordResetEmail(email).then(() => {
			Alert.alert("Password reset link has been sent to "+email);
		}).catch(() => {Alert.alert("The user does not exist")})
	}

	render()
	{
		return(
			<SafeAreaView style={styles.container}>
				<ImageBackground source={require('../images/lock.jpg')} style={styles.image}>
				<View style={styles.emailHolder}>
					<TextInput
						style={styles.textInput}
						autoCapitalize="none"
						placeholder="Email for password reset link"
						onChangeText={email => this.setState({ email })}
						value={this.state.email}
					/>

				</View>
				<View style={styles.button}>
					<Button
						title="Submit"
						onPress={this.handleResetPassword}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title="Don't have an account? Sign Up"
						onPress={() => this.props.navigation.navigate("Signup")}
					/>
				</View>
					<View style={styles.footer}>
						<Text>Image credits: https://unsplash.com/photos/bqGBbLq_yfc</Text>
						<Text>Author: John Salvino</Text>
					</View>
				</ImageBackground>
			</SafeAreaView>
			)

	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	emailHolder: {
		marginTop: 50,
	},
	textInput: {
		height: 40,
		width: "90%",
		borderColor: "transparent",
		borderWidth: 1,
		marginTop: 8,
		fontWeight: 'bold'
	},
	button: {
		marginTop: 10,
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
	footer: {
		width: '100%',
		height: 50,
		backgroundColor: '#b88972',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
	}
});
