import Services from "src/services/services";
import * as commonActions from "./commonActions";
import { showAPIErrorAlert } from "../../utils/native";

export const ADD_GROWTH_START = "ADD_GROWTH_START";
export const ADD_GROWTH_SUCCESS = "ADD_GROWTH_SUCCESS";
export const GROWTH_LISTING_START = "GROWTH_LISTING_START";
export const GROWTH_LISTING_SUCCESS = "GROWTH_LISTING_SUCCESS";
export const GROWTH_LISTING_FAILURE = "GROWTH_LISTING_FAILURE";
export const CLEAR_MSG = "CLEAR_MSG";

/* LOGIN ACTIONS */
export const addGrowthStart = () => ({
	type: ADD_GROWTH_START
});

export const addGrowthSuccess = (data) => ({
	type: ADD_GROWTH_SUCCESS,
	data
});

export const GrowthListingStart = () => ({
	type: GROWTH_LISTING_START
});

export const GrowthListingSuccess = (data) => ({
	type: GROWTH_LISTING_SUCCESS,
	data
});

export const GrowthListingFailure = (data) => ({
	type: GROWTH_LISTING_FAILURE,
	data
});

export const clearMsg = () => ({
	type: CLEAR_MSG
});

export function handleGrowthCreate(data) {
	console.warn("Create data:::", data);
	return (dispatch, getState) => {
		dispatch(commonActions.loadingStart());
		dispatch(addGrowthStart());
		// const state = getState();
		// let plisting = {}
		// console.log("State", state);
		// plisting.result = [...state.growthReducer.growthListing.result];
		// console.log("plisting", plisting);
		Services.handleGrowthCreate(data).then(function(response) {
			// console.log("Create response", response.data);

			if(response.data.result.error) {
				showAPIErrorAlert(error);
				dispatch(commonActions.loadingEnd());
				return;
				
			}
			// plisting.result.push(response.data.result);
			// console.log("plisting", plisting);
			
			dispatch(addGrowthSuccess(response.data.result));
			dispatch(commonActions.loadingEnd());
			// dispatch(addGrowthSuccess());
		}).catch(function(error) {
			// console.log("error", error);
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}

export function handleGrowthListing(data) {
	return (dispatch) => {
		dispatch(commonActions.loadingStart());
		console.log(data);
		dispatch(GrowthListingStart());
		Services.handleGrowthListing(data).then(function(response) {
			console.log("growth response", response.data);
			if(response.data.result.error) {
				// dispatch(GrowthListingSuccess(response.data));
				// dispatch(GrowthListingFailure(response));
				dispatch(commonActions.loadingEnd());	
			}
			dispatch(GrowthListingSuccess(response.data));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			// console.log("ERRERERERE", error);
			console.log("error", error.response);
			dispatch(commonActions.loadingEnd());
			// dispatch(GrowthListingFailure(error));
			dispatch(GrowthListingFailure(error.response.data));
			// if(error && error.response) {
			// 	showAPIErrorAlert(error.response);
			// 	return
			// }
			showAPIErrorAlert(error);
		});
	};
}