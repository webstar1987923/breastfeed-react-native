import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import * as authActions from "src/redux/actions/authActions";
import LanguageSwitcher from "src/components/LanguageSwitcher";
import { translate } from "src/locales/i18n";
import styles from "./styles";

class HomeScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps: { i18n, insets } }) => {
		return {
			title: translate("homeScreen.headerTitle"),
			headerRight: (
				<LanguageSwitcher navigation={navigation} i18n={i18n} insets={insets} />
			)
		};
	};

	componentDidMount() {
	}

	logOutHandler() {
		const { dispatchResetAuthState } = this.props;
		dispatchResetAuthState();
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>{translate("homeScreen.title")}</Text>
				<Text onPress={() => { this.logOutHandler(); }}>Logout</Text>
			</View>
		);
	}
}

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(null, mapDispatchToProps)(HomeScreen);