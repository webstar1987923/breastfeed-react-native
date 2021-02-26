import {
	LOADING_START,
	LOADING_SUCCESSFUL,
	LOADING_ERROR,
	GET_CURRENT_SCREEN,
} from "../actions/commonActions";

const initialState = {
	isLoading: false,
	hasLoadingFailed: false,
	loadingError: null,
	currentScreen: null,
};

const commonReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING_START:
			return { isLoading: true, hasLoadingFailed: false, loadingError: null };
		case LOADING_SUCCESSFUL:
			return { isLoading: false, hasLoadingFailed: false, loadingError: null };
		case LOADING_ERROR:
			return { isLoading: false, hasLoadingFailed: true, loadingError: action.error };
		case GET_CURRENT_SCREEN:
			return { ...state, currentScreen: action.payload };
		default:
			return state;
	}
};

export default commonReducer;