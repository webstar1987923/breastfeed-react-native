import AuthService from "src/services/authService";
import * as commonActions from "./commonActions";
import { showAPIErrorAlert } from "../../utils/native";
import { getDeviceId } from "../../services/device";
export const LOG_IN_START = "LOG_IN_START";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const RESET_AUTH_STATE = "RESET_AUTH_STATE";
export const SIGN_UP_START = "SIGN_UP_START";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const VERIFY_SIGN_UP_OTP_START = "VERIFY_SIGN_UP_OTP_START";
export const VERIFY_SIGN_UP_OTP_SUCCESS = "VERIFY_SIGN_UP_OTP_SUCCESS";
export const FORGOT_PASSWORD_START = "FORGOT_PASSWORD_START";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const VERIFY_OTP_START = "VERIFY_OTP_START";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const RESET_PASSWORD_START = "RESET_PASSWORD_START";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const FB_LOG_IN_START = "FB_LOG_IN_START";
export const FB_LOG_IN_SUCCESS = "FB_LOG_IN_SUCCESS";
export const GET_STARTED_SUCCESS = "GET_STARTED_SUCCESS";

/* LOGIN ACTIONS */
export const logInStart = () => ({
	type: LOG_IN_START
});

export const logInSuccess = (data) => ({
	type: LOG_IN_SUCCESS,
	data
});

export const resetAuthState = () => ({
	type: RESET_AUTH_STATE
});

/* SIGNUP ACTIONS */
export const signUpStart = () => ({
	type: SIGN_UP_START
});

export const signUpSuccess = (data) => ({
	type: SIGN_UP_SUCCESS,
	data
});

export const verifySignUpOTPStart = () => ({
	type: VERIFY_SIGN_UP_OTP_START
});

export const verifySignUpOTPSuccess = (data) => ({
	type: VERIFY_SIGN_UP_OTP_SUCCESS,
	data
});

/* FORGOT PASSWORD ACTIONS */
export const forgotPasswordStart = () => ({
	type: FORGOT_PASSWORD_START
});

export const forgotPasswordSuccess = (data) => ({
	type: FORGOT_PASSWORD_SUCCESS,
	data
});

export const verifyOTPStart = () => ({
	type: VERIFY_OTP_START
});

export const verifyOTPSuccess = (data) => ({
	type: VERIFY_OTP_SUCCESS,
	data
});

export const resetPasswordStart = () => ({
	type: RESET_PASSWORD_START
});

export const resetPasswordSuccess = (data) => ({
	type: RESET_PASSWORD_SUCCESS,
	data
});

/* FB ACTIONS */
export const fbLogInStart = () => ({
	type: FB_LOG_IN_START
});

export const fbLogInSuccess = (data) => ({
	type: FB_LOG_IN_SUCCESS,
	data
});

export const getStartedSuccess = (data) => ({
	type: GET_STARTED_SUCCESS,
	data,
});

export function handleLogIn(data) {
	return (dispatch) => {
		dispatch(commonActions.loadingStart());
		dispatch(logInStart());
		AuthService.handleLogin(data).then(function(response) {
			console.log("response", response.data);
			dispatch(logInSuccess(response.data));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			console.log("error", error);
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}

export function handleSignUp(data) {
	return (dispatch) => {
		dispatch(commonActions.loadingStart());
		dispatch(signUpStart());
		AuthService.handleSignup(data).then(function(response) {
			// console.log("response", response.data);
			dispatch(signUpSuccess(response.data));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			// console.log("error", error);
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}

export function handleVerifySignUpOTP(data) {
	return (dispatch) => {
		dispatch(commonActions.loadingStart());
		dispatch(verifySignUpOTPStart());
		AuthService.handleSignupVerifyOTP(data).then(function(response) {
			dispatch(verifySignUpOTPSuccess(response.data));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}

export function handleForgotPassword(data) {
	console.log("data", data);
	return (dispatch) => {
		dispatch(commonActions.loadingStart());
		dispatch(forgotPasswordStart());
		AuthService.handleForgotPassword(data).then(function(response) {
			dispatch(forgotPasswordSuccess(response.data));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}

export function handleVerifyOTP(data) {
	return (dispatch) => {
		dispatch(commonActions.loadingStart());
		dispatch(verifyOTPStart());
		AuthService.handleVerifyOTP(data).then(function(response) {
			dispatch(verifyOTPSuccess(response.data));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}

export function handleResetPassword(data) {
	return (dispatch) => {
		dispatch(commonActions.loadingStart());
		dispatch(resetPasswordStart());
		AuthService.handleResetPassword(data).then(function(response) {
			dispatch(resetPasswordSuccess(response.data));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}

export function handleFBLogIn(data) {
	return (dispatch) => {
		dispatch(commonActions.loadingStart());
		dispatch(fbLogInStart());
		AuthService.handleFacebookLogin(data).then(function(response) {
			dispatch(fbLogInSuccess(response.data));
			dispatch(commonActions.loadingEnd());
		}).catch(function(error) {
			dispatch(commonActions.loadingEnd());
			showAPIErrorAlert(error);
		});
	};
}

export function handleLogout() {
	return async(dispatch) => {
		try {
			const deviceId = await getDeviceId();
			dispatch(commonActions.loadingStart());
			// console.log("Caleld logout>>>>");
			AuthService.handleLogout({
				device_id: deviceId
			}).then(function() {
				dispatch(resetAuthState());
				// console.log("Called logout");
				dispatch(commonActions.loadingEnd());
			}).catch(function(error) {
				dispatch(resetAuthState());
				// console.log("LOGOUT ERROR", error);
				dispatch(commonActions.loadingEnd());
			});
		} catch(e) {
			console.log(e);
		}
	};
}
