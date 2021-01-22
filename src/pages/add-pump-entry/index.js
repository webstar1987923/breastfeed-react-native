import React from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, Switch, TouchableOpacity, Image, Picker } from "react-native";
// import { Switch } from 'native-base';
// import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import TextInput from "src/components/TextInput";
import ButtonComponent from "src/components/ButtonComponent";
import * as authActions from "src/redux/actions/authActions";
import LanguageSwitcher from "src/components/LanguageSwitcher";
// import { translate } from "src/locales/i18n";
import { Images } from "src/assets/images";
import TimePicker from "react-native-24h-timepicker";
import styles from "./styles";

class AddPumpEntry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			NotesValue: "",
			// selectedStartTime: "",
			isEnabled: false,
			IsmanualEntry: false,
			// TimeValue: "",
			time: "9:00 AM",
			timeCount: "0m 0s",
			timeCountRight: "0m 0s",
			selectedAmount: "",
			selectedAmountSec: ""
		};
	}

	static navigationOptions = ({ navigation, screenProps: { i18n, insets } }) => {
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

	toggleSwitch() {
		const { isEnabled, IsmanualEntry } = this.state;
		this.setState({
			isEnabled: !isEnabled,
			IsmanualEntry: !IsmanualEntry
		});
	}

	onCancel() {
		this.TimePicker.close();
	}

	onConfirm(hour, minute) {
		let AMPM = hour < 12 ? "AM" : "PM";
		this.setState({ time: `${hour}:${minute} ${AMPM}` });
		this.TimePicker.close();
	}

	ontimeCountCancel() {
		this.TimePicker2.close();
	}

	ontimeCountConfirm(minute, second) {
		this.setState({ timeCount: `${minute}m ${second}s` });
		this.TimePicker2.close();
	}

	ontimeCountRightCancel() {
		this.TimePicker3.close();
	}

	ontimeCountRightConfirm(minute, second) {
		this.setState({ timeCountRight: `${minute}m ${second}s` });
		this.TimePicker3.close();
	}

	cancelHandler() {
		const { navigation } = this.props;
		navigation.navigate("Track");
	}

	saveHandler() {
		const { navigation } = this.props;
		navigation.navigate("Track");
	}

	render() {
		const { NotesValue, isEnabled, IsmanualEntry, selectedAmount, selectedAmountSec, time, timeCountRight, timeCount } = this.state;
		return (
			<View style={styles.container}>
				<Text style={styles.breastfeedTitle}>Add a Pump Entry</Text>
				<ScrollView style={styles.ScrollView}>
					<View style={styles.startTimePicker}>
						<Text style={[styles.pickerLabel, { backgroundColor: "#fff", color: "#999" }]}>Start Time</Text>
						<View style={styles.picker}>
							<TouchableOpacity
								onPress={() => this.TimePicker.open()}
								style={styles.pickerInput}
							>
								<Text style={styles.pickerInput}>
									{time}
								</Text>
							</TouchableOpacity>
							<FontAwesomeIcon style={styles.pickerIcon} name="caret-down" />
							<TimePicker
								ref={(ref) => {
									this.TimePicker = ref;
								}}
								selectedHour="9"
								selectedMinute="00"
								onCancel={() => this.onCancel()}
								onConfirm={(hour, minute,) => this.onConfirm(hour, minute)}
							/>
						</View>
					</View>
					<View style={styles.manualEntryMain}>
						<View style={styles.manualEentry}>
							<TouchableOpacity onPress={() => this.toggleSwitch()} style={styles.switchToggle}>
								<Text style={styles.checkIcon}>
									{isEnabled
										? (
											<Image
												source={Images.AddPumpEntry.checkIcon}
												style={styles.checkIcon}
											/>
										)
										: ""}
								</Text>
								<Switch
									trackColor={{ false: "#E0E0E0", true: "#E0E0E0" }}
									thumbColor={isEnabled ? "#F3921F" : "#999999"}
									onValueChange={() => this.toggleSwitch()}
									value={isEnabled}
								/>
								<View><Text style={styles.manualText}>Manual Entry</Text></View>
							</TouchableOpacity>
						</View>
						<View style={styles.TimeCount}>
							<View style={styles.LeftTimeCount}>
								<Text style={styles.timeTitle}>Left</Text>
								{
									IsmanualEntry === false ? (
										<View style={styles.TimeStart}>
											<Text style={styles.playText}>Start</Text>
											<FontAwesomeIcon style={styles.playIcon} name="caret-right" />
										</View>
									)
										: (<Text style={styles.emptyText} />)
								}
								{
									IsmanualEntry === false ? (
										<Text style={styles.timeCountText}>0m 0s</Text>
									)
										: (
											<View style={styles.timeCount}>
												<TouchableOpacity
													onPress={() => this.TimePicker2.open()}
													style={styles.timeCountText}
												>
													<Text style={styles.timeCountText}>
														{timeCount}
													</Text>
													<FontAwesomeIcon style={styles.timeCountIcon} name="caret-down" />
												</TouchableOpacity>

												<TimePicker
													ref={(ref) => {
														this.TimePicker2 = ref;
													}}
													selectedHour="0"
													selectedMinute="0"
													maxMinute="60"
													maxHour="60"
													onCancel={() => this.ontimeCountCancel()}
													onConfirm={(minute, second) => this.ontimeCountConfirm(minute, second)}
												/>
											</View>
										)
								}
							</View>
							<View style={styles.MiddleTimeCount}>
								<Text style={styles.timeTitle}>Total Time</Text>
								<Text style={styles.timeCountText}>0m 0s</Text>
							</View>
							<View style={styles.RightTimeCount}>
								<Text style={styles.timeTitle}>Right</Text>
								{
									IsmanualEntry === false ? (
										<View style={styles.TimeStart}>
											<Text style={styles.playText}>Pause</Text>
											<FontAwesomeIcon style={styles.pauseIcon} name="pause" />
										</View>
									)
										: (<Text style={styles.emptyText} />)
								}
								{
									IsmanualEntry === false ? (
										<Text style={styles.timeCountText}>0m 0s</Text>
									)
										: (
											<View style={styles.timeCount}>
												<TouchableOpacity
													onPress={() => this.TimePicker3.open()}
													style={styles.timeCountText}
												>
													<Text style={styles.timeCountText}>
														{timeCountRight}
													</Text>
													<FontAwesomeIcon style={styles.timeCountIcon} name="caret-down" />
												</TouchableOpacity>

												<TimePicker
													ref={(ref) => {
														this.TimePicker3 = ref;
													}}
													selectedHour="0"
													selectedMinute="0"
													maxMinute="60"
													maxHour="60"
													onCancel={() => this.ontimeCountRightCancel()}
													onConfirm={(minute, second) => this.ontimeCountRightConfirm(minute, second)}
												/>
											</View>
										)
								}
							</View>
						</View>
						<View style={styles.ClearButton}>
							<ButtonComponent
								style={styles.clearButtonContainer}
								buttonStyle={styles.clearButtonStyle}
								buttonText="Clear"
								buttonTextStyle={{ color: "#fff", fontSize: 16 }}
							/>
						</View>
					</View>
					{
						IsmanualEntry === false ? (
							<Text style={styles.emptyText} />
						)
							: (
								<View style={styles.AmountMain}>
									<View style={styles.amountPicker}>
										<Text style={[styles.amountLabel, { backgroundColor: "#fff", color: "#999" }]}>Amount</Text>
										<View style={styles.picker}>
											<Picker
												selectedValue={selectedAmount}
												style={styles.pickerInput}
												onValueChange={(itemValue) => {
													this.setState({ selectedAmount: itemValue });
												}}
											>
												<Picker.Item label="1.0 OZ" value="22" />
												<Picker.Item label="2.0 OZ" value="23" />
												<Picker.Item label="3.0 OZ" value="24" />
												<Picker.Item label="4.0 OZ" value="25" />
											</Picker>
											<FontAwesomeIcon style={styles.pickerIcon} name="caret-down" />
										</View>
									</View>
									<View style={styles.amountPicker}>
										<Text style={[styles.amountLabel, { backgroundColor: "#fff", color: "#999" }]}>Amount</Text>
										<View style={styles.picker}>
											<Picker
												selectedValue={selectedAmountSec}
												style={styles.pickerInput}
												onValueChange={(itemValue) => {
													this.setState({ selectedAmountSec: itemValue });
												}}
											>
												<Picker.Item label="1.0 OZ" value="22" />
												<Picker.Item label="2.0 OZ" value="23" />
												<Picker.Item label="3.0 OZ" value="24" />
												<Picker.Item label="4.0 OZ" value="25" />
											</Picker>
											<FontAwesomeIcon style={styles.pickerIcon} name="caret-down" />
										</View>
									</View>
								</View>
							)
					}

					<View style={styles.notsInput}>
						<TextInput
							style={styles.textInput}
							inputStyle={styles.inputStyle}
							textLabelColor="#999999"
							onChangeText={(value) => {
								this.setState({ NotesValue: value });
							}}
							textLabelBackground="white"
							value={NotesValue}
							placeholder="Notes"
						/>
					</View>
				</ScrollView>
				<View style={styles.addbreastfeeddmButtons}>
					<View style={styles.addbreastfeedbuttons}>
						<ButtonComponent
							style={styles.buttonContainer}
							buttonStyle={styles.cancelbuttonStyle}
							buttonText="Cancel"
							buttonClicked={() => this.cancelHandler()}
						/>
					</View>
					<View style={styles.addbreastfeedbuttons}>
						<ButtonComponent
							style={styles.buttonContainer}
							buttonStyle={styles.savebuttonStyle}
							buttonText="Save"
							buttonTextStyle={{ color: "#fff" }}
							buttonClicked={() => this.saveHandler()}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(null, mapDispatchToProps)(AddPumpEntry);