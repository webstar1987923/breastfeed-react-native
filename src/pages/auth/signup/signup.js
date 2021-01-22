import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { Images } from "src/assets/images";
import { isEmptyObject } from "src/utils/native";
import * as authActions from "src/redux/actions/authActions";
import SignupForm from "./form";
import styles from "./styles";

class SignupScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	componentDidUpdate(prevProps) {
		const { auth, navigation } = this.props;
		if(prevProps.auth.isSignupSuccessful === false && auth.isSignupSuccessful === true) {
			navigation.navigate("Home");
			this.signupRef.resetForm();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			isShowDropDown: false,
			enableScrollViewScroll: true,
		};
	}

	fbClicked = () => {
	}

	googleClicked = () => {
	}

	logInHandler = () => {
		const { navigation } = this.props;
		navigation.navigate("Login");
		this.signupRef.resetForm();
	}

	submitForm(values) {
		const { dispatchSignUp } = this.props;
		if(!isEmptyObject(values)) {
			// console.log("values", values);
			dispatchSignUp(values);
		}
	}

	closeDropdown() {
		this.setDropDownValue(false);
		this.onEnableScroll(true);
		Keyboard.dismiss();
	}

	setDropDownValue = (value) => {
		this.setState({ isShowDropDown: value });
	}

	onEnableScroll(value) {
		this.setState({ enableScrollViewScroll: value });
	}

	backHandler = () => {
		const { navigation } = this.props;
		navigation.pop();
	}

	render() {
		const { enableScrollViewScroll, isShowDropDown } = this.state;
		return (
			<LinearGradient style={styles.container} colors={["#F4E0C2", "#E4B166"]}>
				<TouchableOpacity onPress={() => { this.backHandler(); }} style={styles.backButton}>
					<Image
						source={Images.globalScreen.backIcon}
						style={styles.backIcon}
					/>
				</TouchableOpacity>
				<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={isShowDropDown ? "always" : "never"} extraScrollHeight={20} scrollEnabled={enableScrollViewScroll}>
					<TouchableWithoutFeedback onPress={() => { this.closeDropdown(); }}>
						<View style={styles.contentArea}>
							<SignupForm
								ref={(ref) => this.signupRef = ref}
								submitForm={(values) => this.submitForm(values)}
								setDropDownValue={(value) => this.setDropDownValue(value)}
								isShowDropDown={isShowDropDown}
								onEnableScroll={(value) => this.onEnableScroll(value)}
							/>
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAwareScrollView>
			</LinearGradient>
		);
	}
}
const mapStateToProps = (state) => ({
	auth: state.authReducer
});

const mapDispatchToProps = {
	dispatchSignUp: (data) => authActions.handleSignUp(data)
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
