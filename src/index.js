import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import HomeNavigator from "./homeNavigator";
import AuthNavigator from "./authNavigator";
import LoadingIndicator from "./components/LoadingIndicator";
import StatusBar from "./components/StatusBar";
import { Keys, KeyValueStore } from "./utils/KeyValueStore";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signedIn: props.auth.loggedIn || false
			// signedIn: true
		};
	}

	componentDidUpdate(prevProps) {
		const { auth } = this.props;
		if((prevProps.auth.isLoginSuccessful === false && auth.isLoginSuccessful === true) || (prevProps.auth.isLoginSuccessful === true && auth.isLoginSuccessful === false)) {
			this.setState({ signedIn: auth.loggedIn });
		}

		if((prevProps.auth.isSignupSuccessful === false && auth.isSignupSuccessful === true) || (prevProps.auth.isSignupSuccessful === true && auth.isSignupSuccessful === false)) {
			this.setState({ signedIn: auth.loggedIn });
		}
	}

	async componentDidMount() {
		const language = await KeyValueStore.getItem(Keys.LANGUAGE);
		const { i18n } = this.props;

		if(language !== null) {
			i18n.changeLanguage(language);
		}
	}

	render() {
		const { signedIn } = this.state;
		const { common: { isLoading } } = this.props;
		const { t, i18n } = this.props;

		return (
			<View style={{ flex: 1 }}>
				{
					(signedIn) ? (
						<SafeAreaInsetsContext.Consumer>
							{
								(insets) => (
									<React.Fragment>
										<StatusBar barStyle="light" />
										<HomeNavigator screenProps={{ t, i18n, insets }} />
									</React.Fragment>
								)
							}
						</SafeAreaInsetsContext.Consumer>
					) : <AuthNavigator screenProps={{ t, i18n }} />
				}
				{ (isLoading) && <LoadingIndicator isLoading={isLoading} /> }
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	common: state.commonReducer,
	auth: state.authReducer
});

App.propTypes = {
	auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
	common: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default connect(mapStateToProps, null)(withTranslation()(App));
