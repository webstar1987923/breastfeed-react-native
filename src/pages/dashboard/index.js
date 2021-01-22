import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, ScrollView } from "react-native";
import * as authActions from "src/redux/actions/authActions";
// import LanguageSwitcher from "src/components/LanguageSwitcher";
import HeaderComponent from "src/components/HeaderComponent";
import { translate } from "src/locales/i18n";
import { Images } from "src/assets/images";
import styles from "./styles";

class dashboardScreen extends React.Component {
	// static navigationOptions = ({ navigation, screenProps: { i18n, insets } }) => {
	// 	return {
	// 		title: translate("dashboardScreen.headerTitle"),
	// 	};
	// };

	static navigationOptions = {
		header: <HeaderComponent />
	}

	componentDidMount() {
	}

	logOutHandler() {
		const { dispatchResetAuthState } = this.props;
		dispatchResetAuthState();
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<Text style={styles.activityTitle}>{translate("dashboardScreen.activityTitle")}</Text>
					<View style={styles.dashboardbox}>
						<View style={styles.dashboardboxHeader}>
							<View>
								<Image
									source={Images.dashboard.diaperingIcon}
									style={styles.dashboardboxImage}
								/>
							</View>
							<View>
								<Text style={styles.dashboardboxTitle}>{translate("dashboardScreen.diaperingTitle")}</Text>
							</View>
						</View>
						<View style={styles.listing}>
							<View>
								<Image
									source={Images.dashboard.peeIcon}
									style={styles.listIcon}
								/>
							</View>
							<View style={styles.mainlistText}>
								<Text style={styles.listTextBold}>{translate("dashboardScreen.peeText")}</Text>
								<Text style={styles.listText}>{translate("dashboardScreen.peeTime")}</Text>
							</View>
						</View>
						<View style={styles.listing}>
							<View>
								<Image
									source={Images.dashboard.poopIcon}
									style={styles.listIcon}
								/>
							</View>
							<View style={styles.mainlistText}>
								<Text style={styles.listTextBold}>{translate("dashboardScreen.poopText")}</Text>
								<Text style={styles.listText}>{translate("dashboardScreen.poopTime")}</Text>
							</View>
						</View>
						<View style={styles.listing}>
							<View>
								<Image
									source={Images.dashboard.bothIcon}
									style={styles.listIcon}
								/>
							</View>
							<View style={styles.mainlistText}>
								<Text style={styles.listTextBold}>{translate("dashboardScreen.bothText")}</Text>
								<Text style={styles.listText}>{translate("dashboardScreen.bothTime")}</Text>
							</View>
						</View>
					</View>
					<View style={styles.dashboardbox}>
						<View style={styles.dashboardboxHeader}>
							<View>
								<Image
									source={Images.dashboard.feedingIcon}
									style={styles.dashboardboxImage}
								/>
							</View>
							<View>
								<Text style={styles.dashboardboxTitle}>{translate("dashboardScreen.feedingTitle")}</Text>
							</View>
						</View>
						<View style={styles.listing}>
							<View>
								<Image
									source={Images.dashboard.breastfedIcon}
									style={styles.listIcon}
								/>
							</View>
							<View style={styles.time_hours}>
								<View style={styles.mainlistText}>
									<Text style={styles.listTextBold}>{translate("dashboardScreen.breastfedText")}</Text>
									<Text style={styles.listText}>{translate("dashboardScreen.breastfedTime")}</Text>
								</View>
								<View style={styles.hours}>
									<Text style={styles.listText}>{translate("dashboardScreen.breastfedHours")}</Text>
								</View>
							</View>
						</View>
						<View style={styles.listing}>
							<View>
								<Image
									source={Images.dashboard.bottlefedIcon}
									style={styles.listIcon}
								/>
							</View>
							<View style={styles.time_hours}>
								<View style={styles.mainlistText}>
									<Text style={styles.listTextBold}>{translate("dashboardScreen.bottlefedText")}</Text>
									<Text style={styles.listText}>{translate("dashboardScreen.bottlefedTime")}</Text>
								</View>
								<View style={styles.hours}>
									<Text style={styles.listText}>{translate("dashboardScreen.bottlefedHours")}</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.dashboardbox}>
						<View style={styles.dashboardboxHeader}>
							<View>
								<Image
									source={Images.dashboard.breastfeedingIcon}
									style={styles.dashboardboxImage}
								/>
							</View>
							<View style={styles.dashboardboxsessionTitle}>
								<Text style={styles.dashboardboxTitle}>{translate("dashboardScreen.breastfeedingTitle")}</Text>
								<Text style={styles.dashboardboxsessionText}>{translate("dashboardScreen.breastfeedingsessionText")}</Text>
							</View>
						</View>
						<View style={styles.listing}>
							<View>
								<Image
									source={Images.dashboard.leftBreastIcon}
									style={styles.listIcon}
								/>
							</View>
							<View style={styles.mainlistText}>
								<Text style={styles.listTextBold}>{translate("dashboardScreen.breastfeedingText")}</Text>
								<Text style={styles.listText}>{translate("dashboardScreen.breastfeedingTime")}</Text>
							</View>
						</View>
						<View style={styles.linechart}>
							<View style={styles.linechartOrange}>
								<View style={styles.linechartPurple} />
							</View>
							<View style={styles.linechartText}>
								<Text style={styles.linechartpurpleText}>{translate("dashboardScreen.linechartLefttext")}</Text>
								<Text style={styles.linechartorangeText}>{translate("dashboardScreen.linechartRighttext")}</Text>
							</View>
							<View style={styles.linechartMiter}>
								<Text style={styles.linecharttextMiter}>{translate("dashboardScreen.linecharttextMiterone")}</Text>
								<Text style={styles.linecharttextboldMiter}>{translate("dashboardScreen.linecharttextMitertwo")}</Text>
								<Text style={styles.linecharttextMiter}>{translate("dashboardScreen.linecharttextMiterthree")}</Text>
							</View>
						</View>
					</View>
					<View style={styles.dashboardbox}>
						<View style={styles.dashboardboxHeader}>
							<View>
								<Image
									source={Images.dashboard.pumpingIcon}
									style={styles.dashboardboxImage}
								/>
							</View>
							<View style={styles.dashboardboxsessionTitle}>
								<Text style={styles.dashboardboxTitle}>{translate("dashboardScreen.pumpingTitle")}</Text>
								<Text style={styles.dashboardboxsessionText}>{translate("dashboardScreen.pumpingsessionText")}</Text>
							</View>
						</View>
						<View style={styles.listing}>
							<View style={styles.pumpingmainlistText}>
								<Text style={styles.listText}>{translate("dashboardScreen.pumpingTime")}</Text>
								<Text style={styles.listText}>{translate("dashboardScreen.pumpingHours")}</Text>
							</View>
						</View>
						<View style={styles.linechart}>
							<View style={styles.linechartOrange}>
								<View style={styles.pumpinglinechartPurple} />
							</View>
							<View style={styles.linechartText}>
								<Text style={styles.linechartpurpleText}>{translate("dashboardScreen.pumpinglinechartLefttext")}</Text>
								<Text style={styles.linechartorangeText}>{translate("dashboardScreen.pumpinglinechartRighttext")}</Text>
							</View>
							<View style={styles.linechartMiter}>
								<Text style={styles.linecharttextMiter}>{translate("dashboardScreen.pumpinglinecharttextMiterone")}</Text>
								<Text style={styles.linecharttextboldMiter}>{translate("dashboardScreen.pumpinglinecharttextMitertwo")}</Text>
								<Text style={styles.linecharttextMiter}>{translate("dashboardScreen.pumpinglinecharttextMiterthree")}</Text>
							</View>
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

export default connect(null, mapDispatchToProps)(dashboardScreen);