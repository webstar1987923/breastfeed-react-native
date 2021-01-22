import React from "react";
import { connect } from "react-redux";
import { isEmptyObject } from "src/utils/native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as authActions from "src/redux/actions/authActions";
import GetStartedForm from "./form";
import styles from "./styles";

class GetStartedScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	submitForm(values) {
		console.log("values", values);
		const { dispatchLogin } = this.props;
		if(!isEmptyObject(values)) {
			dispatchLogin(values);
		}
	}

	render() {
		return (
			<LinearGradient style={styles.container} colors={["#E8BC7D", "#E8BC7D"]}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.contentArea}>
						<View style={styles.getStartedHeader}>
							<Text style={styles.getStartedTitle}>Let’s get started with your baby’s profile.</Text>
							<TouchableOpacity style={styles.skipButton}>
								<Text style={styles.skipButtonText}>Skip for now </Text>
								<MaterialIcon style={styles.skipButtonIcon}>keyboard_backspace</MaterialIcon>
							</TouchableOpacity>
						</View>
						<GetStartedForm
							submitForm={(values) => this.submitForm(values)}
						/>
					</View>
				</ScrollView>
			</LinearGradient>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.authReducer
});

const mapDispatchToProps = {
	dispatchLogin: (data) => authActions.handleLogIn(data)
};

export default connect(mapStateToProps, mapDispatchToProps)(GetStartedScreen);