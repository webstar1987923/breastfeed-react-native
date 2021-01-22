import {
	LOADING_START,
	LOADING_SUCCESSFUL,
	LOADING_ERROR
} from "../actions/commonActions";

const initialState = {
	isLoading: false,
	hasLoadingFailed: false,
	loadingError: null
};

const commonReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING_START:
			return { isLoading: true, hasLoadingFailed: false, loadingError: null };
		case LOADING_SUCCESSFUL:
			return { isLoading: false, hasLoadingFailed: false, loadingError: null };
		case LOADING_ERROR:
			return { isLoading: false, hasLoadingFailed: true, loadingError: action.error };
		default:
			return state;
	}
};

export default commonReducer;