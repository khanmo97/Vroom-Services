import { USERS_DATA_STATE_CHANGE, USER_SERVICES_STATE_CHANGE, CLEAR_DATA } from "../Constants";
import {stringifyValueWithProperty} from "react-native-web/dist/exports/StyleSheet/compile";

const initialState = {
	users: [],
	usersLoaded: 0,
}

export const users = (state = initialState, action) => {
	switch (action.type) {
		case USERS_DATA_STATE_CHANGE:
			return {
				...state,
				users: [...state.users, action.user]
			}
		case USER_SERVICES_STATE_CHANGE:
			return {
				...state,
				usersLoaded: state.usersLoaded + 1,
				users: state.users.map(user => user.uid === action.uid ?
					{...user, services: action.services} :
					user
				)
			}
		case CLEAR_DATA:
			return {
				users: [],
				usersLoaded: 0
			}
		default:
			return state;
	}
}
