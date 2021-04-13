import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	trackTitle: {
		color: "#000000",
		fontWeight: "bold",
		fontSize: 22,
		lineHeight: 22,
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
		marginTop: 3,
		paddingRight: 51
	},
	nextArrow: {
		marginTop: 3,
		paddingLeft: 51
	},
	TrackHeader: {
		borderBottomColor: "#E0E0E0",
		borderBottomWidth: 1,
		paddingVertical: 20,
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "center",
	},
	Disable: {
		opacity: 0.3
	},
	trackContainer: {
		paddingTop: 20,
		flex: 1
	},
	trackTop: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 10,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0"
	},
	sessionsBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	sessionsIcon: {
		backgroundColor: "#F3921F",
		width: 40,
		height: 40,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10
	},
	sessionsTitle: {
		fontWeight: "500",
		fontSize: 18,
		lineHeight: 22,
		textTransform: "uppercase",
		color: "#999999"
	},
	setAlarm: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	setAlarmTitle: {
		fontWeight: "500",
		fontSize: 18,
		lineHeight: 22,
		textTransform: "uppercase",
		color: "#F3921F",
		marginLeft: 5
	},
	trackListItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
	},
	startTime: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 19,
		color: "#000",
		width: 72
	},
	breastUnits: {
		width: 110,
	},
	leftBreast: {
		flexDirection: "row",
		alignItems: "center",
	},
	rightBreast: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5
	},
	roundFrame: {
		width: 20,
		height: 20,
		backgroundColor: "#000",
		color: "#fff",
		borderRadius: 10,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		marginRight: 6,
		fontSize: 14,
		lineHeight: 18
	},
	listText: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 19,
		color: "#000",
	},
	totalTime: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 19,
		color: "#000",
		width: 65
	},
	menuTrigger: {
		padding: 5,
		alignItems: "center",
		justifyContent: "center"
	},
	menuOption: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 5,
		padding: 5
	},
	menuOptionInner: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	menuOptionText: {
		marginLeft: 10,
		fontSize: 18,
	},
	menuOptionS: {
		marginTop: 8,
		marginBottom: 8,
		marginHorizontal: 4,
		borderRadius: 0
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)"
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: "95%",
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		padding: 10,
	},
	modalText: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 19,
		color: "#000",
		width: "90%"
	},
	buttonContainer: {
		paddingTop: 20,
		width: "100%",
		justifyContent: "center"
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
		maxWidth: "100%",
		backgroundColor: "#E4B167",
	},
	buttonTextStyle: {
		color: "#fff"
	},
	addButton: {
		position: "absolute",
		bottom: 20,
		right: 15,
		zIndex: 999,
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
	listError: {
		width: "100%",
		fontWeight: "500",
		fontSize: 18,
		lineHeight: 22,
		color: "#999999",
		textAlign: "center",
		paddingVertical: 40
	},
	pumpUnitTextRight: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 19,
		color: "#000",
		marginTop: 10
	},
	pumpUnitTextLeft: {
		fontWeight: "normal",
		fontSize: 16,
		lineHeight: 19,
		color: "#000",
	},
	diaperItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	DiaperFrame: {
		marginRight: 10,
	},
	setModalCentered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)"
	},
	setModalView: {
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: "95%",
	},
	setModalHeader: {
		backgroundColor: "#f5f5f5",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 12,
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#999999"
	},
	cancelText: {
		fontWeight: "normal",
		fontSize: 22,
		lineHeight: 26,
		color: "#F3921F"
	},
	setModalTitle: {
		fontWeight: "500",
		fontSize: 20,
		lineHeight: 24,
		color: "#000"
	},
	saveText: {
		fontWeight: "500",
		fontSize: 22,
		lineHeight: 27,
		color: "#F3921F"
	},
	setModalBody: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 12,
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#999999"
	},
	startsText: {
		fontWeight: "normal",
		fontSize: 22,
		lineHeight: 26,
		color: "#000"
	},
	startsDate: {
		fontWeight: "normal",
		fontSize: 22,
		lineHeight: 26,
		color: "#F3921F"
	},
	setModalFooter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 12,
		paddingVertical: 15,
	},
	repeatText: {
		fontWeight: "normal",
		fontSize: 22,
		lineHeight: 26,
		color: "#000"
	},
});