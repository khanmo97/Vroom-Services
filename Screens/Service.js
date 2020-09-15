import React from 'react';
import {View, ScrollView, StyleSheet, Image, FlatList, Component, Text} from 'react-native';
import {Input, Card, Button, Icon} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import Swiper from 'react-native-swiper';

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		price: '43',
		title: 'First Item',
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		price: '53',
		title: 'Second Item',
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		price: '63',
		title: 'Third Item',
	},
];

export default function Service() {

	function renderService({item})
	{
		return (
		<Card title = {item.title}>
			<Image source={require('../images/carwash.jpg')} style={{width: 350, height: 500}}>
			</Image>
			<Text>{item.price}</Text>
			<Text>{item.description}</Text>
		</Card>
		)
	}
		return (
			<View>
					<FlatList horizontal={true} data={DATA} renderItem={renderService} keyExtractor={item => item.id}/>
			</View>
		);
}
