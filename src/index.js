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
import GetStartedNavigator from "./getStartedNavigator";
import * as commonActions from "./redux/actions/commonActions";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signedIn: props.auth.loggedIn || false,
			isGetStarted: props.auth.isGetStarted || false
		};
	}

	componentDidUpdate(prevProps) {
		const { auth } = this.props;
		if((prevProps.auth.isLoginSuccessful === false && auth.isLoginSuccessful === true) || (prevProps.auth.isLoginSuccessful === true && auth.isLoginSuccessful === false)) {
			this.setState({ signedIn: auth.loggedIn });
		}

		if((prevProps.auth.isGetStarted === false && auth.isGetStarted === true) || (prevProps.auth.isGetStarted === true && auth.isGetStarted === false)) {
			this.setState({ isGetStarted: auth.isGetStarted });
		}

		// if((prevProps.auth.isSignupSuccessful === false && auth.isSignupSuccessful === true) || (prevProps.auth.isSignupSuccessful === true && auth.isSignupSuccessful === false)) {
		// 	this.setState({ signedIn: auth.loggedIn });
		// }
	}

	async componentDidMount() {
		const language = await KeyValueStore.getItem(Keys.LANGUAGE);
		const { i18n } = this.props;

		if(language !== null) {
			i18n.changeLanguage(language);
		}
	}

	getActiveRouteName(navigationState) {
		if(!navigationState) {
			return null;
		}
		const route = navigationState.routes[navigationState.index];
		if(route.routes) {
			return this.getActiveRouteName(route);
		}
		return { route: route.routeName, params: route.params };
	}

	onNavigateStateChange(prevState, currentState) {
		const { dispatchCurrentScreen } = this.props;
		const currentScreen = this.getActiveRouteName(currentState);
		dispatchCurrentScreen(currentScreen.route);
	}

	render() {
		const { signedIn, isGetStarted } = this.state;
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
										{
											isGetStarted ? (
												<HomeNavigator screenProps={{ t, i18n, insets }} onNavigationStateChange={(prevState, currentState) => this.onNavigateStateChange(prevState, currentState)} />
											) : (
												<GetStartedNavigator screenProps={{ t, i18n, insets }} />
											)
										}
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

const mapDispatchToProps = {
	dispatchCurrentScreen: (currentScreen) => commonActions.getCurrentScreen(currentScreen),
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(App));
