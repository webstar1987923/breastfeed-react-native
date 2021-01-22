import axios from "axios";
import Config from "react-native-config";
import { store } from "../store";
import { getDeviceUniqueId } from "../../utils/native";

export function getUnauthenticatedInstance() {
	return axios.create({
		baseURL: Config.API_URL,
		headers: {
			"device-id": getDeviceUniqueId()
		},
		timeout: parseInt(Config.REQUEST_TIMEOUT)
	});
}

export function getAuthenticatedInstance() {
	return axios.create({
		baseURL: Config.API_URL,
		headers: {
			"Authorization": store.getState().authReducer.user.token,
			"device-id": getDeviceUniqueId()
		},
		timeout: parseInt(Config.REQUEST_TIMEOUT)
	});
}
