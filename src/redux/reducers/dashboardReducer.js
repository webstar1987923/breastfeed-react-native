import {
	DASHBOARD_LISTING_START,
	DASHBOARD_LISTING_SUCCESS,
	DASHBOARD_LISTING_FAILURE,
} from "../actions/dashboardActions";

const initialState = {
	dashboardListing: {},
	DashboardListingSuccessful: false,
};

const dashboardReducer = (state = initialState, action) => {
	switch (action.type) {
		case DASHBOARD_LISTING_START:
			return { ...state, DashboardListingSuccessful: false };
		case DASHBOARD_LISTING_SUCCESS:
			return { ...state, DashboardListingSuccessful: true, dashboardListing: action.data };
		case DASHBOARD_LISTING_FAILURE:
			return { ...state, DashboardListingSuccessful: false, dashboardListing: [] };
		default:
			return state;
	}
};

export default dashboardReducer;
