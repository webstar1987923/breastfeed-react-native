import React from "react";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";
import { View, Text, ScrollView, Switch, TouchableOpacity, Image } from "react-native";
// import { Switch } from 'native-base';
// import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import TextInput from "src/components/TextInput";
import ButtonComponent from "src/components/ButtonComponent";
import * as authActions from "src/redux/actions/authActions";
import LanguageSwitcher from "src/components/LanguageSwitcher";
// import { translate } from "src/locales/i18n";
import * as breastfeedActions from "src/redux/actions/breastfeedActions";
import { Images } from "src/assets/images";
import { isEmptyObject, showAlert } from "src/utils/native";
import TimePicker from "react-native-24h-timepicker";
import moment from "moment";
import styles from "./styles";

class AddBreastfeedEntry extends React.Component {
	constructor(props) {
		super(props);
		const { card } = this.props;

		// var getMinutes = card.breastfeedEdit.left_breast.split(":")[0];
		// var minutesToSeconds = getMinutes * 60;
		// var getSeconds = card.breastfeedEdit.left_breast.split(" ",2)[1].split("s",1)[0];
		// var LeftTotalSeconds = parseInt(minutesToSeconds)+parseInt(getSeconds);

		// var getMinutesRight = card.breastfeedEdit.right_breast.split("m",1)[0];
		// var minutesToSecondsRight = getMinutesRight * 60;
		// var getSecondsRight = card.breastfeedEdit.right_breast.split(" ",2)[1].split("s",1)[0];
		// var RightTotalSeconds = parseInt(minutesToSecondsRight)+parseInt(getSecondsRight);

		// var TotalMinutes = parseInt(getMinutes)+parseInt(getMinutesRight);
		// var TotalSeconds = parseInt(getSeconds)+parseInt(getSecondsRight);
		// var TotalTimeMinutes = TotalMinutes;
		// var TotalTimeSeconds = TotalSeconds;

		let tmpLeft = this.checkTimeLen(card.breastfeedEdit.left_breast).split(":");
		let leftTimeCount = `${tmpLeft[0]}m ${tmpLeft[1]}s`;
		let LeftTotalSeconds = parseInt(tmpLeft[0])*60 + parseInt(tmpLeft[1]);
		
		let tmpRight = this.checkTimeLen(card.breastfeedEdit.right_breast).split(":");
		let rightTimeCount = `${tmpRight[0]}m ${tmpRight[1]}s`;
		let RightTotalSeconds = parseInt(tmpRight[0])*60 + parseInt(tmpRight[1]);

		let TotalMinutes = parseInt(tmpLeft[0]) + parseInt(tmpRight[0]);
		let TotalSeconds = parseInt(tmpLeft[1]) + parseInt(tmpRight[1]);
		let TotalTimeMinutes = TotalMinutes;
		let TotalTimeSeconds = TotalSeconds;

		this.state = {
			NotesValue: card.breastfeedEdit.note,
			// // selectedStartTime: "",
			isEnabled: card.breastfeedEdit.manual_entry === "1" ? true : false,
			IsmanualEntry: card.breastfeedEdit.manual_entry === "1" ? true : false,
			IsmanualEntryRight: card.breastfeedEdit.manual_entry === "1" ? true : false,
			// // TimeValue: "",
			time: card.breastfeedEdit.start_time,
			timeCount: leftTimeCount,
			timeCountRight: rightTimeCount,
			isActive: false,
			secondsElapsed: LeftTotalSeconds,
			isActiveRight: false,
			secondsElapsedRight: RightTotalSeconds,
			TotalTimeMinute: TotalTimeMinutes,
			TotalTimeSecond: TotalTimeSeconds,
			ManualTotalTime: "0m 0s",
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

	componentDidUpdate() {
		const { card: { msg }, dispatchClearCard, navigation } = this.props;
		if(msg === "EDIT_BREASTFEED_SUCCESS") {
			dispatchClearCard();
			this.setState(() => {
				showAlert("Success", "baby breastfeed update successfully.", "", () => {
					const resetAction = StackActions.reset({
						index: 1,
						key: undefined,
						actions: [
							NavigationActions.navigate({ routeName: "Track" }),
							NavigationActions.navigate({ routeName: "Track" })
						],
					});
					navigation.dispatch(resetAction);
				});
			});
		}
	}

	getMinutes() {
		const { card } = this.props;
		const { secondsElapsed } = this.state;
		return (`00${Math.floor((secondsElapsed % 3600) / 60)}`).slice(2);
	}

	getSeconds() {
		const { card } = this.props;
		const { secondsElapsed } = this.state;
		return (`00${secondsElapsed % 60}`).slice(2);
	}

	getMinutesRight() {
		const { secondsElapsedRight } = this.state;
		return (`00${Math.floor((secondsElapsedRight % 3600) / 60)}`).slice(2);
	}

	getSecondsRight() {
		const { secondsElapsedRight } = this.state;
		return (`00${secondsElapsedRight % 60}`).slice(2);
	}

	startTime() {
		this.pauseTimeRight();
		this.setState({ isActive: true });

		this.countdown = setInterval(() => {
			this.setState(({ secondsElapsed }) => ({
				secondsElapsed: secondsElapsed + 1
			}));
			this.TotaltimeCalculate();
		}, 1000);
	}

	TotaltimeCalculate() {
		const { secondsElapsed, secondsElapsedRight } = this.state;
		const minuteLeftMatch = (`00${Math.floor((secondsElapsed % 3600) / 60)}`).slice(2);
		const minuteRightMatch = (`00${Math.floor((secondsElapsedRight % 3600) / 60)}`).slice(2);
		const secondsLeftMatch = (`00${secondsElapsed % 60}`).slice(2);
		const secondsRightMatch = (`00${secondsElapsedRight % 60}`).slice(2);
		this.setState({ TotalTimeSecond: parseInt(secondsLeftMatch) + parseInt(secondsRightMatch) });
		this.setState({ TotalTimeMinute: parseInt(minuteLeftMatch) + parseInt(minuteRightMatch) });
	}

	resetTime() {
		clearInterval(this.countdown);
		clearInterval(this.countdownRight);
		this.setState({
			secondsElapsed: 0,
			isActive: false,
			secondsElapsedRight: 0,
			isActiveRight: false,
			TotalTimeSecond: 0,
			TotalTimeMinute: 0,
			timeCount: "0m 0s",
			timeCountRight: "0m 0s",
		});
	}

	pauseTime() {
		clearInterval(this.countdown);
		this.setState({ isActive: false });
	}

	startTimeRight() {
		this.pauseTime();
		this.setState({ isActiveRight: true });

		this.countdownRight = setInterval(() => {
			this.setState(({ secondsElapsedRight }) => ({
				secondsElapsedRight: secondsElapsedRight + 1
			}));
			this.TotaltimeCalculate();
		}, 1000);
	}

	pauseTimeRight() {
		clearInterval(this.countdownRight);
		this.setState({ isActiveRight: false });
	}

	toggleSwitch() {
		clearInterval(this.countdownRight);
		this.setState({ isActiveRight: false });
		clearInterval(this.countdown);
		this.setState({ isActive: false });
		const { isEnabled, IsmanualEntry, IsmanualEntryRight } = this.state;
		this.setState({
			isEnabled: !isEnabled,
			IsmanualEntry: !IsmanualEntry,
			IsmanualEntryRight: !IsmanualEntryRight
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
		this.ManualTotalTimeCal(minute, second);
		this.TimePicker2.close();
	}

	ontimeCountRightCancel() {
		this.TimePicker3.close();
	}

	ontimeCountRightConfirm(minute, second) {
		this.setState({ timeCountRight: `${minute}m ${second}s` });
		// this.ManualTotalTimeCal(minute, second);
		this.TimePicker3.close();
	}

	ManualTotalTimeCal(left, right) {
		let TotalSeconf = 0;
		let TotlaMinur = 0;
		if(left && right) {
			const secons = right.split("s")[0];
			const value = secons.split("m")[1];
			const minutes = right.split("m")[0];
			const seconsLeft = left.split("s")[0];
			const valueLeft = seconsLeft.split("m")[1];
			const minutesLeft = left.split("m")[0];
			TotalSeconf = parseInt(valueLeft) + parseInt(value);
			TotlaMinur = parseInt(minutes) + parseInt(minutesLeft);
		}
		return `${TotlaMinur}:${TotalSeconf}`;
	}

	ManualTotalTimeCalView(left, right) {
		let TotalSeconf = 0;
		let TotlaMinur = 0;
		if(left && right) {
			const secons = right.split("s")[0];
			const value = secons.split("m")[1];
			const minutes = right.split("m")[0];
			const seconsLeft = left.split("s")[0];
			const valueLeft = seconsLeft.split("m")[1];
			const minutesLeft = left.split("m")[0];
			TotalSeconf = parseInt(valueLeft) + parseInt(value);
			TotlaMinur = parseInt(minutes) + parseInt(minutesLeft);
		}
		return `${TotlaMinur}m ${TotalSeconf}s`;
	}

	cancelHandler() {
		const { navigation } = this.props;
		navigation.navigate("Track");
	}

	saveHandler() {
		console.log("CLICK ON SAVE");
		const { time, NotesValue, TotalTimeMinute, TotalTimeSecond, isEnabled, timeCount, timeCountRight } = this.state;
		let startGetLeftBreast = `${this.getMinutes()}:${this.getSeconds()}`;
		let startGetRightBreast = `${this.getMinutesRight()}:${this.getSecondsRight()}`;
		let startGetTotalBreast = `${TotalTimeMinute}:${TotalTimeSecond}`;
		const { card } = this.props;

		const tempLeft = isEnabled ? timeCount.replace("m", "").replace("s", "").split(" ") : startGetLeftBreast.split(":");
		const tempRight = isEnabled ? timeCountRight.replace("m", "").replace("s", "").split(" ") : startGetRightBreast.split(":");

		
		if(Number(tempLeft[0]) == 0 && Number(tempLeft[1]) == 0 && Number(tempRight[0]) == 0 && Number(tempRight[1]) == 0){
			showAlert("Success", "Left/Right breastfeet time must be required.", "", () => {})
			return;
		}


		let timeConvert = time.split(" ")[0];
		let timeCountLeftConvert = timeCount.replace("m", "").replace("s", "").split(" ").join(":");
		let timeCountRightConvert = timeCountRight.replace("m", "").replace("s", "").split(" ").join(":");

		const data = {
			breastfeed_id: card.breastfeedEdit.id,
			start_time: isEnabled ? timeConvert : moment().format("HH:mm"),
			left_breast: isEnabled ? timeCountLeftConvert : this.checkTimeLen(startGetLeftBreast),
			right_breast: isEnabled ? timeCountRightConvert : this.checkTimeLen(startGetRightBreast),
			total_time: isEnabled ? this.ManualTotalTimeCal(timeCount, timeCountRight) : startGetTotalBreast,
			manual_entry: isEnabled ? "1" : "0",
			note: NotesValue
		};

		const { dispatchBreastfeedEdit } = this.props;
		if(!isEmptyObject(data)) {
			dispatchBreastfeedEdit(data);
		}
	}

	getTimeAMPM(data) {
		return moment(data, ["HH:mm"]).format("hh:mm A");
	}

	checkTimeLen(value) {
		let tmp = value.split(":");

		let _l = tmp[0];
		let _r = tmp[1].toString().length === 1 ? `0${tmp[1]}` : tmp[1]; 
		return `${_l}:${_r}`
	}

	render() {
		const { NotesValue, isEnabled, IsmanualEntry, ManualTotalTime, IsmanualEntryRight, time, timeCountRight, timeCount, isActive, secondsElapsed, isActiveRight, secondsElapsedRight, TotalTimeMinute, TotalTimeSecond } = this.state;
		
		let timeCountLeftConvert = timeCount.replace("m", "").replace("s", "").split(" ")
		let timeCountRightConvert = timeCountRight.replace("m", "").replace("s", "").split(" ")

		return (
			<View style={styles.container}>
				<Text style={styles.breastfeedTitle}>Edit a Breastfeed Entry</Text>
				<ScrollView style={styles.ScrollView}>
					<View style={styles.startTimePicker}>
						<Text style={[styles.pickerLabel, { backgroundColor: "#fff", color: "#999" }]}>Start Time</Text>
						{
							isEnabled
								? (
									<View style={styles.picker}>
										<TouchableOpacity
											onPress={() => this.TimePicker.open()}
											style={styles.pickerInput}
										>
											<Text style={styles.pickerInput}>
												{this.getTimeAMPM(time)}
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
								)
								: 								(
									<View style={styles.picker}>
										<TouchableOpacity style={styles.pickerInput}>
											<Text style={styles.pickerInput}>
												{ moment().format("hh:mm A") }
											</Text>
										</TouchableOpacity>
									</View>
								)
						}
					</View>
					<View style={styles.manualEntryMain}>
						<View style={styles.manualEentry}>
							<TouchableOpacity onPress={() => this.toggleSwitch()} style={styles.switchToggle}>
								<Text style={styles.checkIcon}>
									{isEnabled
										? (
											<Image
												source={Images.AddBreastfeedEntry.checkIcon}
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
										<TouchableOpacity style={styles.TimeStart} onPress={isActive ? () => this.pauseTime() : () => this.startTime()}>
											{isActive === false && secondsElapsed === 0 && (
												<View style={styles.TimeStart}>
													<Text style={styles.playText}>Start</Text>
													<FontAwesomeIcon style={styles.playIcon} name="caret-right" />
												</View>
											)}
											{isActive === true && (
												<View style={styles.TimeStart}>
													<Text style={styles.playText}>Pause</Text>
													<FontAwesomeIcon style={styles.pauseIcon} name="pause" />
												</View>
											)}
											{isActive === false && secondsElapsed > 0 && (
												<View style={styles.TimeStart}>
													<Text style={styles.playText}>Resume</Text>
													<FontAwesomeIcon style={styles.playIcon} name="caret-right" />
												</View>
											)}
										</TouchableOpacity>
									)
										: (<Text style={styles.emptyText} />)
								}
								{
									IsmanualEntry === false ? (
										<Text style={styles.timeCountText}>
											{this.getMinutes()}
											m
											{" "}
											{this.getSeconds()}
											s
										</Text>
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
													selectedHour={timeCountLeftConvert[0] || "0"}
													selectedMinute={timeCountLeftConvert[1] || "0"}
													maxMinute="60"
													maxHour="60"
													onCancel={() => this.ontimeCountCancel()}
													onConfirm={(minute, second) => this.ontimeCountConfirm(minute, second)}
												/>
											</View>
										)
								}
							</View>
							{
								IsmanualEntry === false ? (
									<View style={styles.MiddleTimeCount}>
										<Text style={styles.timeTitle}>Total Time</Text>
										<Text style={styles.timeCountText}>
											{TotalTimeMinute}
											m
											{" "}
											{TotalTimeSecond}
											s
										</Text>
									</View>
								)
									: (
										<View style={styles.MiddleTimeCount}>
											<Text style={styles.timeTitle}>Total Time</Text>
											<Text style={styles.timeCountText}>{this.ManualTotalTimeCalView(timeCount, timeCountRight)}</Text>
										</View>
									)
							}
							<View style={styles.RightTimeCount}>
								<Text style={styles.timeTitle}>Right</Text>
								{
									IsmanualEntryRight === false ? (
										<TouchableOpacity style={styles.TimeStart} onPress={isActiveRight ? () => this.pauseTimeRight() : () => this.startTimeRight()}>
											{isActiveRight === false && secondsElapsedRight === 0 && (
												<View style={styles.TimeStart}>
													<Text style={styles.playText}>Start</Text>
													<FontAwesomeIcon style={styles.playIcon} name="caret-right" />
												</View>
											)}
											{isActiveRight === true && (
												<View style={styles.TimeStart}>
													<Text style={styles.playText}>Pause</Text>
													<FontAwesomeIcon style={styles.pauseIcon} name="pause" />
												</View>
											)}
											{isActiveRight === false && secondsElapsedRight > 0 && (
												<View style={styles.TimeStart}>
													<Text style={styles.playText}>Resume</Text>
													<FontAwesomeIcon style={styles.playIcon} name="caret-right" />
												</View>
											)}
										</TouchableOpacity>
									)
										: (<Text style={styles.emptyText} />)
								}
								{
									IsmanualEntryRight === false ? (
										<Text style={styles.timeCountText}>
											{this.getMinutesRight()}
											m
											{" "}
											{this.getSecondsRight()}
											s
										</Text>
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
													selectedHour={timeCountRightConvert[0] || "0"}
													selectedMinute={timeCountRightConvert[1] || "0"}
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
								buttonClicked={() => this.resetTime()}
							/>
						</View>
					</View>
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

const mapStateToProps = (state) => ({
	card: state.breastfeedReducer
});

const mapDispatchToProps = {
	dispatchBreastfeedEdit: (data) => breastfeedActions.handleBreastfeedEdit(data),
	dispatchResetAuthState: () => authActions.resetAuthState(),
	dispatchClearCard: () => breastfeedActions.clearMsg()
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBreastfeedEntry);