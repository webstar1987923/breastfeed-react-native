import Services from "src/services/services";
import * as commonActions from "./commonActions";
import { showAPIErrorAlert, showAlert } from "../../utils/native";

export const FETCH_STATISTICS_LIST_FETHCING = "FETCH_STATISTICS_LIST_FETHCING";
export const FETCH_STATISTICS_LIST_SUCCESS = "FETCH_STATISTICS_LIST_SUCCESS";
export const FETCH_STATISTICS_LIST_FAILED = "FETCH_STATISTICS_LIST_FAILED";

export function getStatisticsList(data) {
	console.log(data);
	return (dispatch) => {
		dispatch(commonActions.loadingStart());
		// dispatch(GrowthListingStart());
		dispatch({
			type: FETCH_STATISTICS_LIST_FETHCING
		});
		Services.getStatisticsListing(data).then(function(response) {
			console.log("getStatisticsList", response.data);
			if(!response.data.error) {
				dispatch({
					type: FETCH_STATISTICS_LIST_SUCCESS,
					data: response.data.result
				});
			} else {
				dispatch({
					type: FETCH_STATISTICS_LIST_FAILED
				});
			}
			// dispatch(GrowthListingSuccess(response.data));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			console.log("error", error);
			dispatch(commonActions.loadingEnd());
			// dispatch(GrowthListingFailure(error));
			dispatch({
				type: FETCH_STATISTICS_LIST_FAILED
			});
			showAPIErrorAlert(error);
		});
	};
}