// @flow
import firebase from 'firebase';
import { USER_STATE_CHANGE, USER_SERVICES_STATE_CHANGE, ALL_USER_SERVICES_STATE_CHANGE} from "../Constants/index";

export function fetchUser() {
	return ((dispatch) => {
		firebase.firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.uid)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
				}
				else {
					console.log('does not exist')
				}
			})
	})
}

export function fetchUserServices() {
	return ((dispatch) => {
		firebase.firestore()
			.collection("Services")
			.doc(firebase.auth().currentUser.uid)
			.collection("serviceName")
			.get()
			.then((snapshot) => {
				let services = snapshot.docs.map(doc => {
					const data = doc.data();
					const id = doc.id;
					return {id, ...data};
				})
				dispatch({ type: USER_SERVICES_STATE_CHANGE, services })
				//console.log("I got in snapshot of fetch user services")
				//console.log("Services below");
				//console.log(services);
				//console.log(snapshot.docs)
			})
	})
}

export function fetchAllServices() {
	return ((dispatch) => {
		firebase.firestore()
			.collection("Services")
			.get()
			.then((snapshot) =>{
				let tryServices = snapshot.docs.map(doc => {
					console.log("fetching shit")
					const data = doc.data();
					const id = doc.id;
					return {id, ...data};
				})
				dispatch({ type: ALL_USER_SERVICES_STATE_CHANGE, allServices })
			})
	})
}
