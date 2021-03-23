import {
	BABY_LISTING_START,
	BABY_LISTING_SUCCESS,
	BABY_LISTING_FAIL,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_START,
	EDIT_GET_DATA_BABY,
	DELETE_BABY_START,
	DELETE_BABY_SUCCESS,
	DELETE_BABY_FAILED,
	UPDATE_USER_NOTIFICATION
} from "../actions/userAction";

const initialState = {
	isLoading: false,
	babyDelete: false,
	babyDetails: [],
	loadingError: null,
	isBabyLoaded: false,
	babyEdit: {},
	notification: {
		"breastfeed": true,
		"pump": true,
		"bottle": true
	}
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case BABY_LISTING_START:
			return { ...state, isLoading: true, isBabyLoaded: false, babyDetails: [], loadingError: null };
		case BABY_LISTING_SUCCESS:
			return { ...state, isLoading: false, isBabyLoaded: true, babyDetails: action.data, loadingError: null };
		case BABY_LISTING_FAIL:
			return { ...state, isLoading: false, isBabyLoaded: true, loadingError: action.error };
		case DELETE_BABY_START:
			return { ...state, babyDelete: true };
		case DELETE_BABY_SUCCESS:
			return { ...state, babyDelete: false };
		case DELETE_BABY_FAILED:
			return { ...state, babyDelete: false };
		case EDIT_GET_DATA_BABY:
			return { ...state, babyEdit: action.data };
		case UPDATE_PROFILE_SUCCESS:
			return { ...state, babyDetails: action.data, isLoading: false, loadingError: null };
		case UPDATE_PROFILE_START:
			return { ...state, isLoading: true };
		case UPDATE_USER_NOTIFICATION: {

			let obj = {
				"breastfeed": true,
				"pump": true,
				"bottle": true
			};
			const breastfeed = action.data.find((x) => x.notification_type === "breastfeed");
			if(breastfeed) {
				obj.breastfeed = breastfeed.notification === "on" ? true : false;
			}
			const pump = action.data.find((x) => x.notification_type === "pump");
			if(pump) {
				obj.pump = pump.notification === "on" ? true : false;
			}
			const bottle = action.data.find((x) => x.notification_type === "bottle");
			if(bottle) {
				obj.bottle = bottle.notification === "on" ? true : false;
			}

			return {
				...state,
				notification: obj
			};
		}
		default:
			return state;
	}
};

export default userReducer;