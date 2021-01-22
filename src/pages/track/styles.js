import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		padding: 15,
		flex: 1
	},
	trackTitle: {
		color: "#000000",
		fontWeight: "bold",
		fontSize: 22,
		textAlign: "center",
	},
	tabBarUnderlineStyle: {
		borderBottomWidth: 0,
		backgroundColor: "#F5821F",
		paddingLeft: 0,
		paddingRight: 0,
		height: 2,
		marginLeft: 0,
		marginRight: 0,
	},
	tabStyle: {
		borderBottomWidth: 0,
		backgroundColor: "#fff",
		height: "auto",
		paddingLeft: 0,
		paddingRight: 0,
		marginTop: 0,
		marginLeft: 0,
		marginRight: 0,
	},
	activeTabStyle: {
		borderWidth: 0,
		backgroundColor: "#fff",
		color: "#fff",
		marginTop: 0,
		height: "auto",
		paddingLeft: 0,
		paddingRight: 0,
		paddingHorizontal: 0,
		marginLeft: 0,
		marginRight: 0,
	},
	tabTextStyle: {
		backgroundColor: "transparent",
		textAlign: "center",
		fontWeight: "400",
		paddingVertical: 0,
		paddingLeft: 0,
		paddingRight: 0,
		borderRadius: 0,
		color: "#000",
		fontSize: 18,
		marginLeft: 0,
		marginRight: 0,
	},
	activeTextStyle: {
		color: "#000",
		backgroundColor: "transparent",
		textAlign: "center",
		fontWeight: "bold",
		paddingVertical: 0,
		paddingHorizontal: 0,
		paddingLeft: 0,
		paddingRight: 0,
		borderRadius: 0,
		fontSize: 18,
		borderWidth: 0,
		marginLeft: 0,
		marginRight: 0,
	},
	prevArrow: {
		marginTop: 13,
		paddingRight: 51
	},
	nextArrow: {
		marginTop: 13,
		paddingLeft: 51
	},
	TrackHeader: {
		borderBottomColor: "#E0E0E0",
		borderBottomWidth: 1,
		paddingBottom: 20,
		flexDirection: "row",
		justifyContent: "center"
	},
	Disable: {
		opacity: 0.3
	}
});