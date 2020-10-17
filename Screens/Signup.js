import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { AsyncStorage } from "react-native";
import { CheckBox } from "react-native-elements";
import { Checkbox, Switch } from "react-native-paper";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default class SignUp extends React.Component {
    state = {
        email: "",
        password: "",
        isBusiness: false,
        businessName: "",
        location: null,
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

        // Sign out in case user tries to sign up while signed in
        firebase.auth().signOut();

        // Get users location
        this.getLocation();
    }

    handleSignUp = () => {
        // Check if business switch is toggled and no business name/location is given.
        // Return error if that is the case
        if (
            this.state.isBusiness == true &&
            (this.state.businessName === "" || this.state.location == null)
        ) {
            this.setState({ errorMessage: "Business information missing" });
        } else {
            // create a user with email and password input
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                )
                .then(() => {
                    // If registering as a business add to business document in firestore database
                    if (this.state.isBusiness) {
                        firebase.firestore().collection("businesses").add({
                            UID: firebase.auth().currentUser.uid,
                            BusinessName: this.state.businessName,
                            Location: this.state.location,
                        });
                    }
                })
                .then(() => {
                    this.props.navigation.navigate("Profile");
                })
                .catch((error) =>
                    this.setState({ errorMessage: error.message })
                );
        }
    };

    getLocation = async () => {
        // Location permissions on device
        const { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== "granted") {
            this.setState({
                errorMessage: "Location Permissions not granted",
            });
        } else {
            // Save location as firestore GeoPoint [latitude, longitude]
            const currentPosition = await Location.getCurrentPositionAsync();

            const location = new firebase.firestore.GeoPoint(
                currentPosition.coords.latitude,
                currentPosition.coords.longitude
            );

            this.setState({
                location,
            });
        }
    };

    render() {
        //define input fields for businesses for conditional rendering
        const locString = JSON.stringify(this.state.location);
        const businessNameTextInput = (
            <TextInput
                placeholder="Business Name"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={(businessName) => this.setState({ businessName })}
                value={this.state.businessName}
            />
        );
        const businessAddressTextInput = (
            // TO DO
            // Currently location is automatically retrieved on component mount
            // Only able to take in object with latitude and longitude as location
            // Future work: enable ability to enter an address and convert to lat, long
            //
            // Also allow business to define range willing to travel from location
            <TextInput
                placeholder={locString}
                autoCapitalize="none"
                style={styles.textInput}
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

                <View style={styles.row}>
                    <Switch
                        onValueChange={(isBusiness) =>
                            this.setState({ isBusiness })
                        }
                        value={this.state.isBusiness}
                    />
                    <Text>Toggle if registering as a business</Text>
                </View>

                {this.state.isBusiness ? businessNameTextInput : null}
                {this.state.isBusiness ? businessAddressTextInput : null}

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
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
        height: 40,
        width: "90%",
    },
});
