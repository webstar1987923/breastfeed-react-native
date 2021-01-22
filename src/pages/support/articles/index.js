import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, ScrollView } from "react-native";
import * as authActions from "src/redux/actions/authActions";
import LanguageSwitcher from "src/components/LanguageSwitcher";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";
import styles from "./styles";

class ArticlesScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps: { i18n, insets } }) => {
		return {
			title: translate("articlesScreen.headerTitle"),
			headerRight: (
				<LanguageSwitcher navigation={navigation} i18n={i18n} insets={insets} />
			)
		};
	};

	componentDidMount() {
	}

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

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(null, mapDispatchToProps)(ArticlesScreen);