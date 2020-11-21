// @flow
import firebase from 'firebase';
import { USER_STATE_CHANGE, USER_SERVICES_STATE_CHANGE, USERS_DATA_STATE_CHANGE, ALL_USER_SERVICES_STATE_CHANGE, USERS_SERVICES_STATE_CHANGE, CLEAR_DATA} from "../Constants/index";

export function clearData() {
	return ((dispatch) => {
		dispatch({type: CLEAR_DATA})
	})
}


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
					firebase.firestore()
						.collection("businesses")
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
			.orderBy("creation", "asc")
			.get()
			.then((snapshot) => {
				let services = snapshot.docs.map(doc => {
					const data = doc.data();
					const id = doc.id;
					return {id, ...data};
				})
				dispatch({ type: USER_SERVICES_STATE_CHANGE, services })
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


export function fetchUsersData(uid) {
	return ((dispatch, getState) => {
		const found = getState().usersState.users.some(el => el.uid === uid);
		if  (!found)
		{
			firebase.firestore()
				.collection("Services")
				.doc(uid)
				.get()
				.then((snapshot) => {
					if (snapshot.exists) {
						let user = snapshot.data();
						user.uid = snapshot.id;

						dispatch({ type: USERS_DATA_STATE_CHANGE, user});
					}
					else {
						console.log("wtf this user doesnt exist?/")
					}

				})
		}
	})
}

export function fetchUserFollowingServices(uid) {
	return ((dispatch, getState) => {
		firebase.firestore()
			.collection("Services")
			.doc(uid)
			.collection("serviceName")
			.orderBy("creation", "asc")
			.get()
			.then((snapshot) => {

				const uid = snapshot.query.EP.path.segments[1];
				const user = getState().usersState.users.find(el => el.uid === uid);

				let services = snapshot.docs.map(doc => {
					const data = doc.data();
					const id = doc.id;
					return {id, ...data, user};
				})
				dispatch({ type: USERS_SERVICES_STATE_CHANGE, services, uid })
			})
	})
}

