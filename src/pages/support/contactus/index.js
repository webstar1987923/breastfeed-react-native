import React from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import TextInput from "src/components/TextInput";
import * as authActions from "src/redux/actions/authActions";
import LanguageSwitcher from "src/components/LanguageSwitcher";
import { translate } from "src/locales/i18n";
import styles from "./styles";

class ContactusScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps: { i18n, insets } }) => {
		return {
			title: translate("ContactusScreen.headerTitle"),
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
					<Text style={styles.contactText}>
						If you’re unable to resolve the issue using our videos or troubleshooting guides, please don’t hesitate to contact us.
						{"\n"}
						{"\n"}
						Our Customer Care department is here to to support you. Hygeia customers can be reached by phone at 714-515-7571 extension #2, or if you complete the form below we will contact you. If you need an update about a pump order from Hygeia or A Breast Pump and More, you can
						{" "}
						<Text style={styles.checkStatus}>check your order status here.</Text>
						{"\n"}
						{"\n"}
						Our team operates during the business week, Monday-Friday, and celebrates major U.S. holidays with our families. During that time, we are unable to respond to phone calls or emails. However, if you reach out to us when we’re not here, we promise we’ll get back to you as soon as we return. Please note, we do not ship on weekends.
					</Text>
					<View style={styles.contactForm}>
						<TextInput
							style={styles.textInput}
							inputStyle={styles.inputStyle}
							textLabelColor="#999999"
							textLabelBackground="white"
							placeholder="Name"
						/>
						<TextInput
							style={styles.textInput}
							inputStyle={styles.inputStyle}
							textLabelColor="#999999"
							textLabelBackground="white"
							placeholder="EMail"
						/>
						<TextInput
							style={styles.textInput}
							inputStyle={styles.inputStyle}
							textLabelColor="#999999"
							textLabelBackground="white"
							placeholder="Phone Number"
						/>
						<TextInput
							style={styles.textInput}
							inputStyle={styles.inputStyle}
							textLabelColor="#999999"
							textLabelBackground="white"
							placeholder="Message"
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(null, mapDispatchToProps)(ContactusScreen);