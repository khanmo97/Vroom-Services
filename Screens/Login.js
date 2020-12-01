import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
	TouchableOpacity,
    View,
    Button,
    ImageBackground,
} from "react-native";
import * as firebase from "firebase";


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
				<View style={styles.button}>
					<Button title="Login" onPress={this.handleLogin} />
				</View>
				<View style={styles.button}>
					<Button
						title="Don't have an account? Sign Up"
						onPress={() => this.props.navigation.navigate("Signup")}
					/>
				</View>
				<View style={styles.button}>
					<Button title="Forgot Password?" onPress={() => this.props.navigation.navigate("ForgotPassword")}/>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff"
	},
	textInput: {
		height: 40,
		width: "90%",
		borderColor: "gray",
		borderWidth: 1,
		marginTop: 8
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
	button: {
		textAlign: 'center',
		marginVertical: 8,
		backgroundColor: '#ffffff',
		marginLeft: 70,
		marginRight: 70,
	},
});
