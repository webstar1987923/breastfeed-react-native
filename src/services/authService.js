import * as apiRequest from "src/redux/api";

export default class AuthService {
	static handleLogin = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("api/login", data);
	};

	static handleSignup = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("api/signup", data);
	};

	static handleForgotPassword = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("auth/forgot-password", data);
	};

	static handleVerifyOTP = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("auth/verify-otp", data);
	};

	static handleResetPassword = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("auth/reset-password", data);
	};

	static handleFacebookLogin = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("auth/facebook-authenticate", data);
	};

	static handleLogout = () => {
		const requestInstance = apiRequest.getAuthenticatedInstance();
		return requestInstance.get("user/logout");
	};
}