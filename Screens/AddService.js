// @flow
import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { IconButton, Colors} from 'react-native-paper';

export default function AddService({ navigation }) {
	const [hasGalleryPermission, sethasGalleryPermission] = useState(null);
	const [hasCameraPermission, sethasCameraPermission] = useState(null);
	const [cam, setCam] = useState(null);
	const [photo, setPhoto] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const camStatus = await Camera.requestPermissionsAsync();
			sethasCameraPermission(camStatus.status === 'granted');

			const galStatus = await Camera.requestPermissionsAsync();
			sethasGalleryPermission(galStatus.status === 'granted');

		})();
	}, []);

	const takePhoto = async () => {
		if (cam) {
			const photo = await cam.takePictureAsync(null);
			// console.log(photo.uri);
			setPhoto(photo.uri);
		}
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setPhoto(result.uri);
		}
	};

	if (hasCameraPermission === null || hasGalleryPermission === null ) {
		return <View />;
	}
	if (hasCameraPermission === false || hasGalleryPermission === false) {
		return <Text>No access to camera or gallery</Text>;
	}
		return (
			<View style={styles.container}>
				<View style={styles.cameraContainer}>
					<Camera
						ref={ref => setCam(ref)}
						style={styles.fixedRatio}
						type={type}
						ratio={'1:1'}/>
				</View>
				<View style={styles.cameraIcons}>
					<IconButton
						icon="camera-switch"
						color={Colors.red500}
						size={26}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					/>
					<IconButton
						icon="camera"
						color={Colors.red500}
						size={26}
						onPress={() => takePhoto()}
					/>
					<IconButton
						icon="plus"
						color={Colors.red500}
						size={26}
						onPress={() => pickImage()}
					/>
				</View>
				{photo && <Image source={{uri: photo}} style={styles.photoContainer}/> }
				<View style={styles.uploadIcon}>
					<FontAwesome.Button name="upload" onPress={() => navigation.navigate('SaveServiceImages', {photo})}>Upload photo</FontAwesome.Button>
				</View>
			</View>
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	uploadIcon: {
		position: 'absolute',
		alignSelf: 'center',
		marginBottom: 40,
		justifyContent: 'flex-end',
		bottom: 0
	},
	cameraContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	cameraIcons: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginBottom: 80
	},
	fixedRatio: {
		flex: 1,
		aspectRatio: 1
	},
	photoContainer: {
		flex: 1
	}
});


