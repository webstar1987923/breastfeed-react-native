import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		padding: 15,
	},
	activityTitle: {
		color: "#000000",
		fontWeight: "bold",
		fontSize: 22,
		lineHeight: 27,
		textAlign: "center",
	},
	dashboardbox: {
		marginTop: 15,
		backgroundColor: "#fff",
		padding: 11,
		borderRadius: 5,
		shadowOffset: { width: 10, height: 10, },
		shadowColor: "black",
		shadowOpacity: 1.0,
		elevation: 3,
	},
	dashboardboxHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	dashboardboxImage: {
		marginRight: 9.5,
		maxWidth: 40,
		height: 40,
		resizeMode: "contain",
	},
	dashboardboxTitle: {
		color: "#F3921F",
		fontSize: 20,
		lineHeight: 24,
		fontWeight: "bold",
	},
	listing: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 11,
	},
	listIcon: {
		marginRight: 5,
		maxWidth: 20,
		height: 20,
		resizeMode: "contain",
	},
	mainlistText: {
		flexDirection: "row",
		alignItems: "center",
	},
	pumpingmainlistText: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 1,
	},
	listTextBold: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		color: "#000000",
	},
	listText: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 20,
		color: "#000000",
	},
	time_hours: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 1,
	},
	dashboardboxsessionTitle: {
		flexDirection: "row",
		alignItems: "center",
	},
	dashboardboxsessionText: {
		marginLeft: 10,
		color: "#999999",
		fontSize: 10,
		lineHeight: 14.32,
	},
	linechart: {
		width: "100%",
		paddingLeft: 23,
	},
	linechartOrange: {
		width: "100%",
		height: 5,
		backgroundColor: "#F3921F",
		marginTop: 15,
	},
	linechartPurple: {
		width: "67%",
		height: 5,
		backgroundColor: "#4B2785",
	},
	pumpinglinechartPurple: {
		width: "50%",
		height: 5,
		backgroundColor: "#4B2785",
	},
	linechartText: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 2,
	},
	linechartpurpleText: {
		color: "#4B2785",
		fontSize: 14,
		lineHeight: 17,
		fontWeight: "normal",
	},
	linechartorangeText: {
		color: "#F3921F",
		fontSize: 14,
		lineHeight: 17,
		fontWeight: "normal",
	},
	linechartMiter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 5,
	},
	linecharttextMiter: {
		fontSize: 14,
		lineHeight: 17,
		color: "#000000",
		fontWeight: "normal",
	},
	linecharttextboldMiter: {
		fontSize: 14,
		lineHeight: 17,
		color: "#000000",
		fontWeight: "bold",
	}
});