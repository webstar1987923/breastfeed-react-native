import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, Switch, TouchableOpacity, ScrollView } from "react-native";
import { Images } from "src/assets/images";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
// import LanguageSwitcher from "src/components/LanguageSwitcher";
import ButtonComponent from "src/components/ButtonComponent";
// import { translate } from "src/locales/i18n";
import * as userAction from "src/redux/actions/userAction";
import { isEmptyObject } from "src/utils/native";
import { RadioGroup, RadioButton } from "../../components/radio";
import { setActiveTab } from "../../redux/actions/tabAction";
import { handleLogout } from "../../redux/actions/authActions";
import styles from "./styles";

class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		const { notification } = props.userDetails;
		this.state = {
			bottlesisEnabled: notification.bottle,
			breastfeedisEnabled: notification.breastfeed,
			pumpisEnabled: notification.pump
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
				<TouchableOpacity
					onPress={() => {
						navigation.pop();
				 }}
					style={styles.backButton}
				>
					<Image
						source={Images.Track.prevIcon}
						style={styles.backIcon}
					/>
					<Text style={styles.backText}>Back</Text>
				</TouchableOpacity>
			)
		};
	};

	componentWillUnmount() {
		this.props.dispatchSetActiveTab("Dashboard");
	}

	componentDidMount() {
		const { getUserNotification } = this.props;
		getUserNotification();
	}

	componentDidUpdate(prevProps) {
		const { userDetails, dispatchUserProfileGet } = this.props;
		if(prevProps.userDetails.babyDelete === false && userDetails.babyDelete === true) {
			dispatchUserProfileGet();
		}

		// eslint-disable-next-line prefer-destructuring
		let notification = prevProps.userDetails.notification;
		let newNotification = userDetails.notification;

		if(JSON.stringify(notification) !== JSON.stringify(newNotification)) {
			this.setState({
				bottlesisEnabled: newNotification.bottle,
				breastfeedisEnabled: newNotification.breastfeed,
				pumpisEnabled: newNotification.pump
			});
		}
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

		this.updateNotification({
			notification_type: "breastfeed",
			notification: !breastfeedisEnabled ? "on" : "off"
		});
	}

	pumptoggleSwitch() {
		const { pumpisEnabled } = this.state;
		this.setState({
			pumpisEnabled: !pumpisEnabled
		});

		this.updateNotification({
			notification_type: "pump",
			notification: !pumpisEnabled ? "on" : "off"
		});
	}

	bottlestoggleSwitch() {
		const { bottlesisEnabled } = this.state;
		this.setState({
			bottlesisEnabled: !bottlesisEnabled
		});
		this.updateNotification({
			notification_type: "bottle",
			notification: !bottlesisEnabled ? "on" : "off"
		});
	}

	// eslint-disable-next-line class-methods-use-this
	updateNotification(data) {
		console.log("DATA", data);
		const { updateUserNotification } = this.props;
		updateUserNotification(data);
	}

	unitsradioSelect() {
		this.setState({
		});
	}

	changePasswordHandler() {
		const { navigation } = this.props;
		navigation.navigate("ChangePassword");
	}

	editBabyProfile(data) {
		const { navigation, dispatchEditBaby } = this.props;
		navigation.navigate("EditProfile", { data });
	}

	deleteBady(value) {
		const { dispatchDeleteBaby } = this.props;

		const data = {
			babyprofile_id: value.id
		};

		dispatchDeleteBaby(data);
	}

	RedirectToAddBaby() {
		const { navigation } = this.props;
		navigation.navigate("AddProfile");
	}

	render() {
		const { bottlesisEnabled, breastfeedisEnabled, pumpisEnabled } = this.state;
		const { auth, userDetails } = this.props;
		const { user } = auth;
		const { babyDetails } = userDetails;

		return (
			<View style={styles.container}>
				<ScrollView style={styles.scrollView}>
					<Text style={styles.settingsTitle}>Settings</Text>
					<View style={styles.settingsEmail}>
						<Text style={styles.settingsLabel}>Email</Text>
						<Text style={styles.settingsEmailID}>{user && user.result && user.result.email ? user.result.email : ""}</Text>
					</View>
					<View style={styles.changePassword}>
						<Text style={styles.changepasswordLabel} onPress={() => this.changePasswordHandler()}>Change Password</Text>
					</View>
					{babyDetails.map((el) => {
						return (
							<View style={styles.babyAdd}>
								<View style={styles.babyTitleIcon}>
									{!el.baby_profileupload
										? (
											<Image
												source={Images.Settings.babyaddIcon}
												style={styles.babyaddIcon}
											/>
										) : (
											<Image
												source={{ uri: el.baby_profileupload }}
												style={{ width: 30, height: 30, borderRadius: 80 }}
											/>
										)}
									<Text style={styles.babyTitle}>{el.name}</Text>
								</View>
								<View style={styles.settingsBabyIcon}>
									<TouchableOpacity onPress={() => this.editBabyProfile(el)}>
										<Image
											source={Images.Settings.editpencilIcon}
											style={styles.editpencilIcon}
										/>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => this.deleteBady(el)}>
										<MaterialIcon style={styles.babyDeleteIcon}>delete</MaterialIcon>
									</TouchableOpacity>
								</View>
							</View>
						);
					})}
					<View style={styles.babyaddplusIcon}>
						<Image
							source={Images.Settings.addbabyIcon}
							style={styles.addbabyIcon}
						/>
						<TouchableOpacity onPress={() => this.RedirectToAddBaby()}>
							<Text style={styles.anotherBaby}>Add Another Baby</Text>
						</TouchableOpacity>
					</View>
					{/* <View style={styles.unitsBox}>
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
					</View> */}
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

const mapStateToProps = (state) => ({
	auth: state.authReducer,
	userDetails: state.userReducer
});
const mapDispatchToProps = {
	dispatchResetAuthState: () => handleLogout(),
	dispatchEditBaby: (data) => userAction.EditGetDataBaby(data),
	dispatchDeleteBaby: (data) => userAction.deleteBadyProfile(data),
	dispatchUserProfileGet: () => userAction.getBadyProfile(),
	updateUserNotification: (data) => userAction.updateUserNotification(data),
	getUserNotification: () => userAction.getUserNotification(),
	dispatchSetActiveTab: (data) => setActiveTab(data)
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);