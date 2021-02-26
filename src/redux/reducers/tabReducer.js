import {
	SET_ACTIVE_TAB_NAME
} from "../actions/tabAction";

const initialState = {
	activeTab: 'Dashboard'
};

const tabReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACTIVE_TAB_NAME: {
			return {
				activeTab: action.payload
			};
		}
		default:
			return state;
	}
};

export default tabReducer;
