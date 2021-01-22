import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, Switch, TouchableOpacity, ScrollView } from "react-native";
import { Images } from "src/assets/images";
import * as authActions from "src/redux/actions/authActions";
// import LanguageSwitcher from "src/components/LanguageSwitcher";
import ButtonComponent from "src/components/ButtonComponent";
// import { translate } from "src/locales/i18n";
import { RadioGroup, RadioButton } from "../../components/radio";
import styles from "./styles";

class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bottlesisEnabled: true,
			breastfeedisEnabled: true,
			pumpisEnabled: true
		};
	}

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

	componentDidMount() {
	}

	logOutHandler() {
		const { dispatchResetAuthState } = this.props;
		dispatchResetAuthState();
	}

	breastfeedtoggleSwitch() {
		const { breastfeedisEnabled } = this.state;
		this.setState({
			breastfeedisEnabled: !breastfeedisEnabled
		});
	}

	pumptoggleSwitch() {
		const { pumpisEnabled } = this.state;
		this.setState({
			pumpisEnabled: !pumpisEnabled
		});
	}

	bottlestoggleSwitch() {
		const { bottlesisEnabled } = this.state;
		this.setState({
			bottlesisEnabled: !bottlesisEnabled
		});
	}

	unitsradioSelect() {
		this.setState({
		});
	}

	changePasswordHandler() {
		const { navigation } = this.props;
		navigation.navigate("ChangePassword");
	}

	render() {
		const { bottlesisEnabled, breastfeedisEnabled, pumpisEnabled } = this.state;
		return (
			<View style={styles.container}>
				<ScrollView style={styles.scrollView}>
					<Text style={styles.settingsTitle}>Settings</Text>
					<View style={styles.settingsEmail}>
						<Text style={styles.settingsLabel}>Email</Text>
						<Text style={styles.settingsEmailID}>example@email.com</Text>
					</View>
					<View style={styles.changePassword}>
						<Text style={styles.changepasswordLabel} onPress={() => this.changePasswordHandler()}>Change Password</Text>
					</View>
					<View style={styles.babyAdd}>
						<View style={styles.babyTitleIcon}>
							<Image
								source={Images.Settings.babyaddIcon}
								style={styles.babyaddIcon}
							/>
							<Text style={styles.babyTitle}>Baby 1</Text>
						</View>
						<Image
							source={Images.Settings.editpencilIcon}
							style={styles.editpencilIcon}
						/>
					</View>
					<View style={styles.babyAdd}>
						<View style={styles.babyTitleIcon}>
							<Image
								source={Images.Settings.babyaddoneIcon}
								style={styles.babyaddIcon}
							/>
							<Text style={styles.babyTitle}>Baby 2</Text>
						</View>
						<Image
							source={Images.Settings.editpencilIcon}
							style={styles.editpencilIcon}
						/>
					</View>
					<View style={styles.babyaddplusIcon}>
						<Image
							source={Images.Settings.addbabyIcon}
							style={styles.addbabyIcon}
						/>
						<Text style={styles.anotherBaby}>Add Another Baby</Text>
					</View>
					<View style={styles.unitsBox}>
						<Text style={styles.unitsTitle}>Units</Text>
						<RadioGroup
							size={16}
							thickness={1}
							selectedIndex={0}
							style={styles.unitRadioGroup}
							color="#F3921F"
							onSelect={(index, value) => this.unitsradioSelect(index, value)}
						>
							<RadioButton
								style={styles.unitRadioButton}
								value="US"
								color="#F3921F"
							>
								<Text style={styles.unitRadiotitle}>U.S.</Text>
							</RadioButton>
							<RadioButton
								style={styles.unitRadioButton}
								value="metric"
								color="#F3921F"
							>
								<Text style={styles.unitRadiotitle}>Metric</Text>
							</RadioButton>
						</RadioGroup>
					</View>
					<View style={styles.notificationBox}>
						<Text style={styles.notificationTitle}>Notifications</Text>
						<View style={styles.notificationList}>
							<View style={styles.notificationDetails}>
								<View style={styles.notificationchekbox}>
									<Text style={styles.notificationlistTitle}>Breastfeed</Text>
									<Text style={styles.notificationlistText}>Alerts for upcoming breastfeeding sessions</Text>
								</View>
								<TouchableOpacity onPress={() => this.breastfeedtoggleSwitch()} style={styles.switchToggle}>
									<Text style={styles.checkIcon}>
										{breastfeedisEnabled
											? (
												<Image
													source={Images.Settings.settingCheckicon}
													style={styles.checkIcon}
												/>
											)
											: ""}
									</Text>
									<Switch
										trackColor={{ false: "#E0E0E0", true: "#E0E0E0" }}
										thumbColor={breastfeedisEnabled ? "#F3921F" : "#999999"}
										onValueChange={() => this.breastfeedtoggleSwitch()}
										value={breastfeedisEnabled}
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.notificationDetails}>
								<View style={styles.notificationchekbox}>
									<Text style={styles.notificationlistTitle}>Pump</Text>
									<Text style={styles.notificationlistText}>Alerts for upcoming pumping sessions</Text>
								</View>
								<TouchableOpacity onPress={() => this.pumptoggleSwitch()} style={styles.switchToggle}>
									<Text style={styles.checkIcon}>
										{pumpisEnabled
											? (
												<Image
													source={Images.Settings.settingCheckicon}
													style={styles.checkIcon}
												/>
											)
											: ""}
									</Text>
									<Switch
										trackColor={{ false: "#E0E0E0", true: "#E0E0E0" }}
										thumbColor={pumpisEnabled ? "#F3921F" : "#999999"}
										onValueChange={() => this.pumptoggleSwitch()}
										value={pumpisEnabled}
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.notificationDetails}>
								<View style={styles.notificationchekbox}>
									<Text style={styles.notificationlistTitle}>Bottles</Text>
									<Text style={styles.notificationlistText}>Alerts for upcoming bottlefeeding sessions</Text>
								</View>
								<TouchableOpacity onPress={() => this.bottlestoggleSwitch()} style={styles.switchToggle}>
									<Text style={styles.checkIcon}>
										{bottlesisEnabled
											? (
												<Image
													source={Images.Settings.settingCheckicon}
													style={styles.checkIcon}
												/>
											)
											: ""}
									</Text>
									<Switch
										trackColor={{ false: "#E0E0E0", true: "#E0E0E0" }}
										thumbColor={bottlesisEnabled ? "#F3921F" : "#999999"}
										onValueChange={() => this.bottlestoggleSwitch()}
										value={bottlesisEnabled}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
				<View>
					<ButtonComponent
						style={styles.buttonContainer}
						buttonStyle={styles.logoutbuttonStyle}
						buttonText="Logout"
						buttonClicked={() => this.logOutHandler()}
					/>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(null, mapDispatchToProps)(SettingsScreen);