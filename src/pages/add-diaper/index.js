import React from "react";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";
import { View, Text, ScrollView, Switch, TouchableOpacity, Image, Picker } from "react-native";
import RNPickerSelect from "react-native-picker-select";
// import { Switch } from 'native-base';
// import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import TextInput from "src/components/TextInput";
import ButtonComponent from "src/components/ButtonComponent";
import * as authActions from "src/redux/actions/authActions";
import LanguageSwitcher from "src/components/LanguageSwitcher";
// import { translate } from "src/locales/i18n";
import * as diaperActions from "src/redux/actions/diaperActions";
import { Images } from "src/assets/images";
import { isEmptyObject, showAlert } from "src/utils/native";
import TimePicker from "react-native-24h-timepicker";
import { getActiveBaby } from "src/redux/selectors";
import moment from "moment";
import styles from "./styles";

class AddDiaper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			NotesValue: "",
			// selectedStartTime: "",
			// TimeValue: "",
			time: "9:00 AM",
			selectedFeed: "Both"
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
		if(msg === "ADD_DIAPER_SUCCESS") {
			dispatchClearCard();
			this.setState(() => {
				showAlert("Success", "diaper create successfully.", "", () => {
					navigation.navigate("Track", { activeTab: "Diapers" });
				});
			});
		}
	}

	onCancel() {
		this.TimePicker.close();
	}

	onConfirm(hour, minute) {
		let AMPM = hour < 12 ? "AM" : "PM";
		this.setState({ time: `${hour}:${minute} ${AMPM}` });
		this.TimePicker.close();
	}

	cancelHandler() {
		const { navigation } = this.props;
		navigation.navigate("Track");
	}

	saveHandler() {
		const { time, NotesValue, selectedFeed } = this.state;
		const { dispatchDiaperCreate, activeBaby, navigation: {state : {params}}  } = this.props;


		let date = moment(params.date).format("YYYY-MM-DD");
		let tmp_time = moment().format("hh:mm:ss");
		let date_time = moment(date+' '+tmp_time).format("YYYY-MM-DD HH:mm:ss")


		let timeConvert = time.split(" ")[0];
		const data = {
			babyprofile_id: activeBaby.id,
			start_time: timeConvert,
			type_of_diaper: selectedFeed,
			note: NotesValue,
			created_at: date_time
		};
		if(!isEmptyObject(data)) {
			dispatchDiaperCreate(data);
		}
	}

	getTimeAMPM(data) {
		return moment(data, ["HH:mm"]).format("hh:mm A");
	}

	render() {
		const { NotesValue, time, selectedFeed } = this.state;
		return (
			<View style={styles.container}>
				<Text style={styles.breastfeedTitle}>Add a Diaper</Text>
				<ScrollView style={styles.ScrollView}>
					<View style={styles.startTimePicker}>
						<Text style={[styles.pickerLabel, { backgroundColor: "#fff", color: "#999" }]}>Start Time</Text>
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
					</View>
					<View style={styles.feedPicker}>
						<Text style={[styles.feedLabel, { backgroundColor: "#fff", color: "#999" }]}>Type of Diaper</Text>
						<View style={styles.picker}>
							<RNPickerSelect
								onValueChange={(value) => {
									this.setState({ selectedFeed: value });
								}}
								value={selectedFeed}
								style={{
									inputIOS: {
										height: 60,
										width: "100%",
										color: "#000",
										fontSize: 20,
										lineHeight: 24,
										paddingHorizontal: 12
									},
									inputAndroid: {
										height: 60,
										width: "100%",
										color: "#000",
										fontSize: 20,
										lineHeight: 24,
										paddingHorizontal: 12
									}
								}}
								useNativeAndroidPickerStyle={false}
								Icon={() => <FontAwesomeIcon style={styles.RNPickerIcon} name="caret-down" />}
								placeholder={{
									label: "Select Diaper",
									color: "#999999"
								}}
								items={[
									{ label: "Pee", value: "Pee" },
									{ label: "Poop", value: "Poop" },
									{ label: "Both", value: "Both" },
								]}
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
	card: state.diaperReducer,
	activeBaby: getActiveBaby(state)
});

const mapDispatchToProps = {
	dispatchDiaperCreate: (data) => diaperActions.handleDiaperCreate(data),
	dispatchClearCard: () => diaperActions.clearMsg(),
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDiaper);