import Services from "src/services/services";
import * as commonActions from "./commonActions";
import { showAPIErrorAlert } from "../../utils/native";

export const ADD_PUMP_START = "ADD_PUMP_START";
export const ADD_PUMP_SUCCESS = "ADD_PUMP_SUCCESS";
export const PUMP_LISTING_START = "PUMP_LISTING_START";
export const PUMP_LISTING_SUCCESS = "PUMP_LISTING_SUCCESS";
export const PUMP_LISTING_FAILURE = "PUMP_LISTING_FAILURE";
export const PUMP_DELETE_START = "PUMP_DELETE_START";
export const PUMP_DELETE_SUCCESS = "PUMP_DELETE_SUCCESS";
export const CLEAR_MSG = "CLEAR_MSG";
export const EDIT_GET_DATA_PUMP = "EDIT_GET_DATA_PUMP";
export const EDIT_PUMP_START = "EDIT_PUMP_START";
export const EDIT_PUMP_SUCCESS = "EDIT_PUMP_SUCCESS";

/* LOGIN ACTIONS */
export const addPumpStart = () => ({
	type: ADD_PUMP_START
});

export const addPumpSuccess = (data) => ({
	type: ADD_PUMP_SUCCESS,
	data
});

export const PumpListingStart = () => ({
	type: PUMP_LISTING_START
});

export const PumpListingSuccess = (data) => ({
	type: PUMP_LISTING_SUCCESS,
	data
});
export const PumpListingFailure = (data) => ({
	type: PUMP_LISTING_FAILURE,
	data
});

export const PumpDeleteStart = () => ({
	type: PUMP_DELETE_START
});

export const PumpDeleteSuccess = (data) => ({
	type: PUMP_DELETE_SUCCESS,
	data
});

export const clearMsg = () => ({
	type: CLEAR_MSG
});

export const EditGetDataPump = (data) => ({
	type: EDIT_GET_DATA_PUMP,
	data
});

export const editPumpStart = () => ({
	type: EDIT_PUMP_START
});

export const editPumpSuccess = (data) => ({
	type: EDIT_PUMP_SUCCESS,
	data
});

export function handlePumpCreate(data) {
	console.warn("Create data:::", data);
	return (dispatch, getState) => {
		dispatch(commonActions.loadingStart());
		dispatch(addPumpStart());
		const state = getState();
		let plisting = {};
		plisting.result = [...state.pumpReducer.pumpListing.result];
		Services.handlePumpCreate(data).then(function(response) {
			console.log("Create response", response.data);
			plisting.result.push(response.data.result);
			console.log("plisting", plisting);
			dispatch(commonActions.loadingEnd());
			dispatch(addPumpSuccess(plisting));
		}).catch(function(error) {
			// console.log("error", error);
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}

export function handlePumpListing(data) {
	return (dispatch) => {
		// dispatch(commonActions.loadingStart());
		dispatch(PumpListingStart());
		Services.handlePumpListing(data).then(function(response) {
			// console.log("response", response.data);
			dispatch(PumpListingSuccess(response.data));
			// dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			// console.log("error", error);
			// dispatch(commonActions.loadingEnd());
			dispatch(PumpListingFailure(error.response.data));
			// showAPIErrorAlert(error);
		});
	};
}

export function handlePumpDelete(data) {
	console.warn("data:::", data);
	return (dispatch, getState) => {
		dispatch(commonActions.loadingStart());
		dispatch(PumpDeleteStart());
		const state = getState();
		let plisting = {};
		plisting.result = [...state.pumpReducer.pumpListing.result];
		Services.handlePumpDelete(data).then(function(response)	 {
			console.log("data.pump_id", data.pump_id);
			const dataFilter = plisting.result.filter((el) => el.id !== data.pump_id);
			console.log("dataFilter", dataFilter);
			plisting.result = dataFilter;
			dispatch(commonActions.loadingEnd());
			dispatch(PumpDeleteSuccess(plisting));
		}).catch(function(error) {
			console.log("error", error);
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}

export function handlePumpEdit(data) {
	console.warn("Edit data:::", data);
	return (dispatch, getState) => {
		dispatch(commonActions.loadingStart());
		dispatch(editPumpStart());
		const state = getState();
		let plisting = {};
		plisting.result = [...state.pumpReducer.pumpListing.result];
		Services.handlePumpEdit(data).then(function(response) {
			// console.log("Create response", response.data);
			const dataFilter = [];
			plisting.result.forEach((el) => {
				// console.log("el, data", el , data);
				if(el.id === data.pump_id) {
					el = data;
					el.id = data.pump_id;
				}
				dataFilter.push(el);
				return el;
			});
			// console.log("dataFilter", dataFilter);
			plisting.result = dataFilter;
			dispatch(commonActions.loadingEnd());
			dispatch(editPumpSuccess(plisting));
		}).catch(function(error) {
			// console.log("error", error);
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}