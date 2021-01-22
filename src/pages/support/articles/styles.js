import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
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
		width: "75%"
	},
	articleTitle: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		color: "#000000",
		marginBottom: 4
	},
	articledescription: {
		fontSize: 12,
		lineHeight: 14,
		fontWeight: "normal",
		color: "#999999",
	}
});