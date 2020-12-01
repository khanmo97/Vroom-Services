import React, {useState, useEffect} from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	FlatList,
	Image
} from "react-native";
import * as firebase from "firebase";
import Moment from 'moment';
import {Button, Icon, Overlay} from 'react-native-elements';

function Comments({route}) {
	const {item} = route.params;
	const [comments, setComments] = useState([]);
	const [showAdd, setShowAdd] = useState(false);
	const [commentText, setCommentText] = useState();

	useEffect(() => {
		const unsubscribe = fetchComments();
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		(!showAdd) && setCommentText();
	}, [showAdd]);

	function fetchComments() {
		const unsubscribe = firebase.firestore()
			.collection("Comments")
			.where("serviceNameKey", "==", item.key)
			.onSnapshot((snapshot) => {
				const newComments = snapshot.docs.map((comment) => {
					return {id: comment.id, ...comment.data()};
				});
				setComments(newComments);
			});
		return unsubscribe;
	}

	async function addComment() {
		const userEmail = firebase.auth().currentUser.email;
		await firebase.firestore()
			.collection("Comments")
			.add({
				comment: commentText,
				serviceNameKey: item.key,
				userEmail,
				created: new Date()
			});
		setShowAdd(false);
	}

	function renderComment(item) {
		const {userEmail, created, comment} = item.item;
		const createdDate = Moment(created.toDate()).format('MM/DD/YY hh:mm A');
		return (
			<View style={{borderWidth: 1, borderRadius: 10, padding: 10, borderColor: 'gray', flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
				<Icon name="account-box" size={20}/>
				<View style={{flexDirection: "column"}}>
					<View style={{flexDirection: 'row'}}>
						<Text style={{fontWeight: 'bold', marginRight: 10}}>{userEmail}</Text>
						<View style={{paddingTop: 2}}>
							<Text style={{fontSize: 12, color: 'gray'}}>{createdDate}</Text>
						</View>
					</View>
					<Text>{comment}</Text>
				</View>
			</View>
		);
	}

	const sortedComments = comments.sort((a, b) => b.created.toDate() - a.created.toDate());

	return (
		<View style={styles.container}>
			<View style={{flex: 16}}>
				<FlatList
					data={sortedComments}
					renderItem={renderComment}
				/>
			</View>
			<View style={{flex: 1, width: '90%'}}>
				<Button
					title={"Add Comment"}
					containerViewStyle={{width: '100%'}}
					onPress={() => setShowAdd(true)}
				/>
			</View>
			<Overlay isVisible={showAdd} onBackdropPress={() => setShowAdd(false)} overlayStyle={{width : '90%', height: '80%'}}>
				<Text>Comment:</Text>
				<TextInput
					autoFocus={true}
					value={commentText}
					onChangeText={(text) => setCommentText(text)}
					multiline={true}
					numberOfLines={10}
					style={{height: 300, width: '90%', textAlignVertical: 'top'}}
				/>
				<Button title={"Save Comment"} onPress={addComment} style={{width: '90%', alignSelf: 'center'}} />
			</Overlay>
		</View>
	);
}

export default Comments;


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
