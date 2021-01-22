import { StyleSheet, Dimensions } from "react-native";

const dimensions = Dimensions.get("window");

export default StyleSheet.create({
	container: {
		padding: 0,
	},
	addBreastfeed: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: 20
	},
	addBreastfeedButton: {
		width: 50,
		height: 50,
		backgroundColor: "#4B2785",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
		shadowColor: "#4B2785",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5
	},
	scrollView: {
		height: dimensions.height / 2 - 20
	},
	graphTitle: {
		flexDirection: "row",
	},
	graphTitleText: {
		fontSize: 18,
		color: "#000",
		fontWeight: "700"
	},
	graphTitleSelect: {
		fontSize: 18,
		color: "#F3921F",
		fontWeight: "700",
		marginLeft: 5
	},
});