import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Images } from "src/assets/images";
import styles from "./styles";

class ArticlesScreen extends React.Component {

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.articlesImgBox}>
						<Image
							source={Images.Articles.articlesImg}
							style={styles.articlesImg}
						/>
						<View style={styles.articleContent}>
							<Text style={styles.articleTitle}>Breastfeeding Tips Article</Text>
							<Text style={styles.articledescription}>A preview of the article should appear here. The text will span two to four lines long. </Text>
						</View>
					</View>
					<View style={styles.articlesImgBox}>
						<Image
							source={Images.Articles.articlesImg}
							style={styles.articlesImg}
						/>
						<View style={styles.articleContent}>
							<Text style={styles.articleTitle}>Breastfeeding Tips Article</Text>
							<Text style={styles.articledescription}>A preview of the article should appear here. The text will span two to four lines long. </Text>
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}

export default ArticlesScreen;