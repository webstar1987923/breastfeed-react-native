import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		paddingLeft: 10,
		paddingRight: 10,
	},
	articlesImgBox: {
		flexDirection: "row",
		marginTop: 20
	},
	articlesImg: {
		maxWidth: 100,
		height: 100,
		resizeMode: "contain"
	},
	articleContent: {
		paddingLeft: 20,
		flexDirection: "column",
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start"
	},
	articleTitle: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		color: "#000000",
		marginBottom: 0,
		flex: 1
	},
	articledescription: {
		fontSize: 12,
		lineHeight: 14,
		fontWeight: "normal",
		color: "#999999",
		flex: 1,
		marginTop: -18
	}
});