//@flow
import React from 'react';
import { View, Text } from 'react-native';
import Carousel from "./Carousel";
import { connect } from "react-redux";
import firebase from "firebase";


export default function Service(props ) {
	const {allServices} = props;
	return(
		<View>
			<Text>Service</Text>
		</View>)
}
