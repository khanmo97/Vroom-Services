import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { AsyncStorage } from "react-native";
import { CheckBox } from "react-native-elements";
import { Checkbox, Switch } from "react-native-paper";

export default class SignUp extends React.Component {
    state = {
        email: "",
        password: "",
        isBusiness: false,
        businessName: "",
        errorMessage: null,
    };

    componentDidMount() {
        //1.
        // const value=AsyncStorage.gettItem("key");
        //if (value !== null){}
        //2.
        // firebase.auth().onAuthStateChanged(user => {
        //   if (user != null) {
        //     console.log("We are authenticated now!");
        //   }
        // });
    }

    handleSignUp = () => {
        // Check if business switch is toggled and no business name is given.
        // Return error if that is the case
        if (this.state.isBusiness == true && this.state.businessName === "") {
            this.setState({ errorMessage: "Business name missing" });
        } else {
            // create a user with email and password input
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                )
                .then(() => this.props.navigation.navigate("Login"))
                .catch((error) =>
                    this.setState({ errorMessage: error.message })
                );
            // If registering as a business add to firestore database
            if (this.state.isBusiness && this.state.BusinessName != "") {
                firebase.firestore().collection("businesses").add({
                    UID: firebase.auth().currentUser.uid,
                    BusinessName: this.state.businessName,
                });
            }
        }
    };
    render() {
        //define text box for business name input for conditional rendering
        const businessBox = (
            <TextInput
                placeholder="Business Name"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={(businessName) => this.setState({ businessName })}
                value={this.state.businessName}
            />
        );
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage && (
                    <Text style={{ color: "red" }}>
                        {this.state.errorMessage}
                    </Text>
                )}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Switch
                        onValueChange={(isBusiness) =>
                            this.setState({ isBusiness })
                        }
                        value={this.state.isBusiness}
                    />
                    <Text>Toggle if registering as a business</Text>
                </View>
                {this.state.isBusiness ? businessBox : null}
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <Button
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate("Login")}
                />
                <Button
                    title="Login via OTP"
                    onPress={() => this.props.navigation.navigate("Otp")}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        height: 40,
        width: "90%",
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 8,
    },
});
