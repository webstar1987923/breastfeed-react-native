import { StyleSheet } from "react-native";

export default StyleSheet.create({
	backButton: {
		position: "absolute",
		top: 30,
		left: 30,
		zIndex: 12
	},
	container: {
		flexGrow: 1,
	},
	contentArea: {
		flexGrow: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 40,
	},
	textInputContainer: {
		paddingTop: 0,
		width: "100%"
	},
	buttonContainer: {
		paddingTop: 50,
	},
	buttonStyle: {
		shadowColor: "rgba(0, 0, 0, 0.25)",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		maxWidth: "100%"
	},
	formContainer: {
		width: "100%"
	},
	forgotPassword: {
		marginTop: 35,
		paddingHorizontal: 20,
	},
	forgotPasswordText: {
		fontSize: 14,
		lineHeight: 17,
		color: "#fff",
		textTransform: "uppercase"
	}
});