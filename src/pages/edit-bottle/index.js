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
import * as bottleActions from "src/redux/actions/bottleActions";
import { Images } from "src/assets/images";
import { isEmptyObject, showAlert } from "src/utils/native";
import TimePicker from "react-native-24h-timepicker";
import moment from "moment";
import styles from "./styles";

class EditBottle extends React.Component {
	constructor(props) {
		super(props);
		const { card } = this.props;
		this.state = {
			NotesValue: card.bottleEdit.note,
			// selectedStartTime: "",
			// TimeValue: "",
			time: card.bottleEdit.start_time,
			selectedAmount: card.bottleEdit.amount,
			selectedFeed: card.bottleEdit.type_of_feed,
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
		const { card } = this.props;
		// console.warn("card", card.bottleEdit);
	}

	componentDidUpdate() {
		const { card: { msg }, dispatchClearCard, navigation } = this.props;
		if(msg === "EDIT_BOTTLE_SUCCESS") {
			dispatchClearCard();
			this.setState(() => {
				showAlert("Success", "baby bottle update successfully.", "", () => {
					navigation.navigate("Track", { activeTab: "Bottles" });
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
		const { time, NotesValue, selectedAmount, selectedFeed } = this.state;
		const { card } = this.props;
		const data = {
			bottle_id: card.bottleEdit.id,
			start_time: time,
			type_of_feed: selectedFeed,
			amount: selectedAmount,
			note: NotesValue,
		};
		const { dispatchBottleEdit } = this.props;
		if(!isEmptyObject(data)) {
			dispatchBottleEdit(data);
		}
	}

	getTimeAMPM(data) {
		return moment(data, ["HH:mm"]).format("hh:mm A");
	}

	render() {
		const { NotesValue, time, selectedAmount, selectedFeed } = this.state;
		const { card } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.breastfeedTitle}>Edit a Bottle</Text>
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
						<Text style={[styles.feedLabel, { backgroundColor: "#fff", color: "#999" }]}>Height</Text>
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
									label: "Select Feed",
									color: "#999999"
								}}
								items={[
									{ label: "Breastmilk", value: "Breastmilk" },
									{ label: "Mix", value: "Mix" },
									{ label: "Formula", value: "Formula" },
								]}
							/>
						</View>
					</View>
					<View style={styles.amountPicker}>
						<Text style={[styles.amountLabel, { backgroundColor: "#fff", color: "#999" }]}>Amount</Text>
						<View style={styles.picker}>
							<RNPickerSelect
								onValueChange={(value) => {
									this.setState({ selectedAmount: value });
								}}
								value={selectedAmount}
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
									label: "Select Amount",
									color: "#999999"
								}}
								items={[
									{ label: "1.0 OZ", value: "1.0" },
									{ label: "2.0 OZ", value: "2.0" },
									{ label: "3.0 OZ", value: "3.0" },
									{ label: "4.0 OZ", value: "4.0" },
									{ label: "5.0 OZ", value: "5.0" },
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
	card: state.bottleReducer
});

const mapDispatchToProps = {
	dispatchBottleEdit: (data) => bottleActions.handleBottleEdit(data),
	dispatchClearCard: () => bottleActions.clearMsg(),
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBottle);