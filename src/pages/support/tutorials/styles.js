import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		// paddingLeft: 10,
		// paddingRight: 10,
		paddingTop: 10
	},
	tutorialsTitle: {
		fontWeight: "bold",
		fontSize: 22,
		lineHeight: 27,
		color: "#000000",
		textAlign: "center",
		borderBottomWidth: 1,
		borderColor: "#E5E5E5",
		paddingBottom: 20,
		marginTop: 6
	},
	tutorialsVideoBox: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
		paddingHorizontal: 10
	},
	tutorialsVideoImage: {
		position: "relative",
		borderWidth: 1,
		borderColor: "#E0E0E0"
	},
	tutorialsVideoTime: {
		position: "absolute",
		bottom: 5,
		right: 5,
		backgroundColor: "#000",
		color: "#fff",
		fontWeight: "500",
		fontSize: 12,
		lineHeight: 15,
		paddingHorizontal: 3,
		paddingVertical: 1,
		borderRadius: 2,
		overflow: "hidden"
	},
	tutorialsVideo: {
		maxWidth: 150,
		height: 100,
		resizeMode: "contain"
	},
	tutorialsvideoText: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		fontStyle: "normal",
		paddingLeft: 20,
		width: "60%",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	}
});