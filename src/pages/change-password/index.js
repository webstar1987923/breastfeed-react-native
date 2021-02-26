import React from "react";
import { View, Text, TouchableOpacity, Image, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInput from "src/components/TextInput";
import { connect } from "react-redux";
import ButtonComponent from "src/components/ButtonComponent";
import { isEmpty } from "src/utils/native";
import { Images } from "src/assets/images";
import * as userAction from "src/redux/actions/userAction";
import { translate } from "src/locales/i18n";
import styles from "./styles";

class ChangePasswordScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps: { } }) => {
		return {
			title: null,
			headerTintColor: "white",
			headerStyle: {
				backgroundColor: "#fff",
				shadowOpacity: 0,
				elevation: 0,
				height: 50,
			},
			headerLeft: (
				<TouchableOpacity onPress={() => { navigation.pop(); }} style={styles.backButton}>
					<Image
						source={Images.Track.prevIcon}
						style={styles.backIcon}
					/>
					<Text style={styles.backText}>Back</Text>
				</TouchableOpacity>
			)
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			isKeyboardShow: false,
			validateInput: false,
			isPasswordInvalid: false,
			iscPasswordInvalid: false,
			isCurrentPasswordInvalid: false,
			passwordErrorMessage: "",
			cPasswordErrorMessage: "",
			currentPasswordErrorMessage: "",
			password: "",
			cpassword: "",
			currentpassword: "",
		};
	}

	componentDidMount() {
		// this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
		// 	this.setState({ isKeyboardShow: true });
		// 	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		// });
		// this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
		// 	this.setState({ isKeyboardShow: false });
		// 	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		// });
	}

	// componentWillUnmount() {
	// 	this.keyboardDidShowListener.remove();
	// 	this.keyboardDidHideListener.remove();
	//    }

    isValidResetPasswordFileds = () => {
    	const { password, cpassword, currentpassword } = this.state;

    	if(isEmpty(password) || isEmpty(cpassword) || isEmpty(currentpassword)) {
    		return false;
    	}

    	this.setState({ currentPasswordErrorMessage: "", passwordErrorMessage: "", cPasswordErrorMessage: "", validateInput: false, isPasswordInvalid: false, iscPasswordInvalid: false, isCurrentPasswordInvalid: false });

    	/* PASSWORD VALIDATION */
    	if(password.length < 4) {
    		this.setState({ passwordErrorMessage: translate("signupScreen.passwordRequired"), isPasswordInvalid: true });
    		return false;
    	}

    	/* CONFIRM PASSWORD VALIDATION */
    	if(password !== cpassword) {
    		this.setState({ cPasswordErrorMessage: translate("formErrorMessage.cPasswordErrorMessage"), iscPasswordInvalid: true });
    		return false;
    	}

    	return true;
    }

    onSubmit() {
    	const { password, currentpassword, cpassword } = this.state;
    	const { dispatchchangePassword } = this.props;

    	/* REQUIRED FIELDS VALIDATION */
    	if(this.isValidResetPasswordFileds() === false) {
    		this.setState({ validateInput: true });
    		return true;
    	}

    	if(this.isValidResetPasswordFileds() === true) {
    		Keyboard.dismiss();
    		// const body = {
    		// 	"password": password,
    		// };
    		// resetPasswordHandler(body);
    		const data = new FormData();
    		data.append("current_password", currentpassword);
    		data.append("new_password", password);
    		data.append("confirm_password", cpassword);
    		dispatchchangePassword(data);
    	}
    }

    render() {
    	const { isKeyboardShow, currentpassword, password, validateInput, isCurrentPasswordInvalid, currentPasswordErrorMessage, isPasswordInvalid, passwordErrorMessage, cpassword, iscPasswordInvalid, cPasswordErrorMessage } = this.state;
    	return (
	<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: isKeyboardShow ? 0.5 : 1 }}>
	<View style={styles.container}>
	<Text style={styles.title}>Change Password</Text>
	<View style={styles.formContainer}>
	<TextInput
	textLabelBackground="#fff"
	textLabelColor="#999999"
	inputStyle={styles.inputStyle}
	style={styles.textInputContainer}
	value={currentpassword}
	placeholder="Current Password"
	secureTextEntry={true}
	isInvalid={(validateInput && isEmpty(currentpassword)) || isCurrentPasswordInvalid}
	errorMessage={currentPasswordErrorMessage}
	returnKeyType="next"
	onChangeText={(value) => {
    							this.setState({ currentpassword: value });
    						}}
    					/>
	<TextInput
	textLabelBackground="#fff"
	textLabelColor="#999999"
	inputStyle={styles.inputStyle}
	style={styles.textInputContainer}
	value={password}
	placeholder="New Password"
	secureTextEntry={true}
	isInvalid={(validateInput && isEmpty(password)) || isPasswordInvalid}
	errorMessage={passwordErrorMessage}
	returnKeyType="next"
	onChangeText={(value) => {
    							this.setState({ password: value });
    						}}
    					/>
	<TextInput
	textLabelBackground="#fff"
	textLabelColor="#999999"
	inputStyle={styles.inputStyle}
	style={styles.textInputContainer}
	value={cpassword}
	placeholder={translate("signupScreen.cPaswordPlaceholder")}
	secureTextEntry={true}
	isInvalid={(validateInput && isEmpty(cpassword)) || iscPasswordInvalid}
	errorMessage={cPasswordErrorMessage}
	returnKeyType="done"
	onChangeText={(value) => {
    							this.setState({ cpassword: value });
    						}}
	onSubmitEditing={() => this.onSubmit()}
    					/>
	<ButtonComponent
	buttonClicked={() => this.onSubmit()}
	style={styles.buttonContainer}
	buttonStyle={styles.buttonStyle}
	buttonTextStyle={styles.buttonTextStyle}
	buttonText="Update Password"
    					/>
    				</View>
    			</View>
    		</KeyboardAwareScrollView>
    	);
    }
}
const mapDispatchToProps = {
	dispatchchangePassword: (data) => userAction.changePassword(data),
};

export default connect(null, mapDispatchToProps)(ChangePasswordScreen);