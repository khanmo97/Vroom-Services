//@flow
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, Animated} from "react-native";

import CarouselService from './CarouselService';

const {width, height} = Dimensions.get('window');

const Carousel = ({data = [], }) => {

		return (
			<View>
				<FlatList data={data}
					keyExtractor={(item, index) => 'key' + index}
					horizontal
					pagingEnabled
					scrollEnabled
					sanpToAlignment='center'
					scrollEventThrottle={16}
					decelerationRate={"fast"}
					showsHorizontalScrollIndicator={false}
					renderItem={ ({item}) =>{
						return <CarouselService item = {item}/>
					}}
				/>
			</View>
		)

}

export default Carousel;
