import React from "react";
import { View, Text, Image } from "react-native";
import { Images } from "src/assets/images";
import LinearGradient from "react-native-linear-gradient";
import ButtonComponent from "src/components/ButtonComponent";
import styles from "./styles";

class PurchasedScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	getStartedHandler = () => {
		const { navigation } = this.props;
		navigation.navigate("GetStarted");
	}

	render() {
		return (
			<LinearGradient style={styles.container} colors={["#E8BC7D", "#E8BC7D"]}>
				<Image
					source={Images.globalScreen.topBG}
					style={styles.topBG}
				/>
				<View style={styles.contentArea}>
					<View style={styles.welcomeContent}>
						<Text style={styles.welcomeText}>Have you ordered a breastpump yet?</Text>
					</View>
					<ButtonComponent
						style={styles.signButtonContainer}
						buttonStyle={styles.buttonStyle}
						buttonTextStyle={styles.buttonTextStyle}
						buttonText="No, I’d Like to order one"
					/>

					<ButtonComponent
						buttonClicked={() => { this.getStartedHandler(); }}
						style={styles.buttonContainer}
						buttonText="Yes, let’s continue"
					/>

				</View>
			</LinearGradient>
		);
	}
}

export default PurchasedScreen;