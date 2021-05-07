import Services from "src/services/services";
import * as commonActions from "./commonActions";
import { showAPIErrorAlert } from "../../utils/native";

export const DASHBOARD_LISTING_START = "DASHBOARD_LISTING_START";
export const DASHBOARD_LISTING_SUCCESS = "DASHBOARD_LISTING_SUCCESS";
export const DASHBOARD_LISTING_FAILURE = "DASHBOARD_LISTING_FAILURE";

export const DashboardListingStart = () => ({
	type: DASHBOARD_LISTING_START
});

export const DashboardListingSuccess = (data) => ({
	type: DASHBOARD_LISTING_SUCCESS,
	data
});
export const DashboardListingFailure = (data) => ({
	type: DASHBOARD_LISTING_FAILURE,
	data
});

export function handleDashboard(data) {
	return (dispatch) => {
		dispatch(commonActions.loadingStart());
		dispatch(DashboardListingStart());
		Services.handleDashboard(data).then(function(response) {
			console.log("handleDashboard", response.data);
			dispatch(DashboardListingSuccess(response.data));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			// console.log("error", error);
			dispatch(commonActions.loadingEnd());
			dispatch(DashboardListingFailure(error));
			// showAPIErrorAlert(error);
		});
	};
}