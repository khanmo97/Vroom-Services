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
import { AsyncStorage } from "react-native";
import Profile from "./Profile";

export default class Login extends React.Component {
	state = { email: "", password: "", errorMessage: null };
	handleLogin = () => {
		const { email, password } = this.state;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				// AsyncStorage.setItem("key", "I like to save it.");
				console.log("wtf is loging")
			})
			.catch(error => this.setState({ errorMessage: error.message }));
	};
	render() {
		return (
			<View style={styles.container}>
				{this.state.errorMessage && (
					<Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
				)}
				<TextInput
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="Email"
					onChangeText={email => this.setState({ email })}
					value={this.state.email}
				/>
				<TextInput
					secureTextEntry
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="Password"
					onChangeText={password => this.setState({ password })}
					value={this.state.password}
				/>
				<Button title="Login" onPress={this.handleLogin} />
				<Button
					title="Don't have an account? Sign Up"
					onPress={() => this.props.navigation.navigate("Signup")}
				/>
				<Button title="Forogot Password?" onPress={() => this.props.navigation.navigate("ForgotPassword")}/>
			</View>
		);
	}
}
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
