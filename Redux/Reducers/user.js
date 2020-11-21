//@flow
import {USER_SERVICES_STATE_CHANGE, USER_STATE_CHANGE, CLEAR_DATA} from "../Constants";

const initialState = {
	currentUser: null,
	services: []
}

export const user = (state = initialState, action) => {
	switch (action.type) {
		case USER_STATE_CHANGE:
			return {
				...state,
				currentUser: action.currentUser
			}
		case USER_SERVICES_STATE_CHANGE:
			return {
				...state,
				services: action.services
			}
		case CLEAR_DATA:
			return {
				currentUser: null,
				services: []
			}
		default:
			return state;
	}
}
