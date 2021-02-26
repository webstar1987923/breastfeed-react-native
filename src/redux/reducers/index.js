import { combineReducers } from "redux";
import authReducer from "./authReducer";
import breastfeedReducer from "./breastfeedReducer";
import pumpReducer from "./pumpReducer";
import bottleReducer from "./bottleReducer";
import diaperReducer from "./diaperReducer";
import growthReducer from "./growthReducer";
import contactFormReducer from "./contactFormReducer";
import dashboardReducer from "./dashboardReducer";
import commonReducer from "./commonReducer";
import userReducer from "./userReducer";
import createBabyReducer from "./createBabyReducer";
import statisticsReducer from "./statisticsReducer";
import tabReducer from "./tabReducer";

export default combineReducers({
	authReducer,
	commonReducer,
	breastfeedReducer,
	userReducer,
	pumpReducer,
	bottleReducer,
	diaperReducer,
	growthReducer,
	contactFormReducer,
	dashboardReducer,
	createBabyReducer,
	statisticsReducer,
	tabReducer
});
