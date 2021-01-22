import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, Keyboard, LayoutAnimation, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Images } from "src/assets/images";
import { isEmptyObject } from "src/utils/native";
import { translate } from "src/locales/i18n";
import * as authActions from "src/redux/actions/authActions";
import LoginForm from "./form";
import styles from "./styles";

class LoginScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props);
		this.state = {
			isKeyboardShow: false
		};
	}

	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
			this.setState({ isKeyboardShow: true });
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		});
		this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
			this.setState({ isKeyboardShow: false });
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		});
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	componentDidUpdate(prevProps) {
		const { auth, navigation } = this.props;
		if(prevProps.auth.isLoginSuccessful === false && auth.isLoginSuccessful === true) {
			navigation.navigate("Home");
			this.loginRef.resetForm();
		}
	}

	fbClicked = (data) => {
		const { dispatchFBLogin } = this.props;
		dispatchFBLogin({ access_token: data.accessToken.toString() });
	}

	googleClicked = () => {
	}

	backHandler = () => {
		const { navigation } = this.props;
		navigation.pop();
	}

	submitForm(values) {
		// const { navigation } = this.props;
		// navigation.navigate("Purchased");
		const { dispatchLogin } = this.props;
		if(!isEmptyObject(values)) {
			dispatchLogin(values);
		}
	}

	forgotPasswordHandler = () => {
		const { navigation } = this.props;
		navigation.navigate("ForgotPassword");
		// console.log("click forgot");
	}

	render() {
		const { isKeyboardShow } = this.state;
		return (
			<LinearGradient style={styles.container} colors={["#F4E0C2", "#E4B166"]}>
				<TouchableOpacity onPress={() => { this.backHandler(); }} style={styles.backButton}>
					<Image
						source={Images.globalScreen.backIcon}
						style={styles.backIcon}
					/>
				</TouchableOpacity>
				<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: isKeyboardShow ? 0.5 : 1 }}>
					<View style={styles.contentArea}>
						<LoginForm
							ref={(ref) => this.loginRef = ref}
							submitForm={(values) => this.submitForm(values)}
						/>
						<View style={styles.forgotPassword}>
							<Text style={styles.forgotPasswordText} onPress={() => { this.forgotPasswordHandler(); }}>
								{translate("loginScreen.forgotPasswordText")}
							</Text>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</LinearGradient>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.authReducer
});

const mapDispatchToProps = {
	dispatchLogin: (data) => authActions.handleLogIn(data),
	dispatchFBLogin: (data) => authActions.handleFBLogIn(data)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
