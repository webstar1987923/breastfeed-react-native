import Services from "src/services/services";
import * as commonActions from "./commonActions";
import { showAPIErrorAlert } from "../../utils/native";
import { fetchPrevAlarmValue } from "./trackAction";

export const resetAlarmFlag = () => ({
	type: "RESET_ALARM_MSG"
});

export const setAlarmAPI = (data) => {
	// console.log("create baby data", data);
	return (dispatch) => {
		dispatch(commonActions.loadingStart());

		Services.setAlarm(data).then(function(result) {
			console.log(result);
			dispatch({
				type: "SET_ALARM_START"
			});
			dispatch(fetchPrevAlarmValue({
				baby_id: data.baby_id,
				type: data.type
			}));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			console.log(error, "###############");
			showAPIErrorAlert(error);
			dispatch(commonActions.loadingEnd());
		});
	};
};

export const updateAlarmAPI = (data) => {
	return (dispatch) => {
		console.log("called updat alarm api");
		dispatch(commonActions.loadingStart());

		Services.updateAlarm(data).then(function() {
			dispatch({
				type: "SET_ALARM_START"
			});
			dispatch(fetchPrevAlarmValue({
				baby_id: data.baby_id,
				type: data.type
			}));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			console.log(error, "###############");
			showAPIErrorAlert(error);
			dispatch(commonActions.loadingEnd());
		});
	};
};