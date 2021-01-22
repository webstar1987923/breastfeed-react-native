import React from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, Switch, TouchableOpacity, Image, Picker, Keyboard } from "react-native";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import styles from "./styles";

class AddGrowth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			NotesValue: "",
			// selectedStartTime: "",
			// TimeValue: "",
			time: "Dec 30, 2020",
			selectedAmount: "",
			selectedFeed: "",
			isDatePickerVisible: false,
			value: "Dec 30, 2020"
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
		const { navigation } = this.props;
		navigation.navigate("Track");
	}

	showDatePicker() {
		console.log('A date has been picked: ');
		this.setState({ isDatePickerVisible: true });
		Keyboard.dismiss();
	};

	hideDatePicker(date) {
		this.setState({ isDatePickerVisible: false });
		this.setState({ value: Moment(date).format('MMM DD, YYYY') });
	};

	handleConfirm(date) {
		this.hideDatePicker();
		this.setState({ value: Moment(date).format('MMM DD, YYYY') });
	};

	render() {
		const { NotesValue, time, selectedAmount, selectedFeed, isDatePickerVisible, value } = this.state;
		return (
			<View style={styles.container}>
				<Text style={styles.breastfeedTitle}>Add a Growth Entry</Text>
				<ScrollView style={styles.ScrollView}>
					<View style={styles.startTimePicker}>
						<Text style={[styles.pickerLabel, { backgroundColor: "#fff", color: "#999" }]}>Date</Text>
						<View style={styles.picker}>
							<TouchableOpacity
								onPress={() => this.showDatePicker()}
								style={styles.pickerInput}
							>
								<Text style={styles.pickerInput}>
									{Moment(value).format('MMM DD, YYYY')}
								</Text>
							</TouchableOpacity>
							<FontAwesomeIcon style={styles.pickerIcon} name="caret-down" />
							<DateTimePickerModal
								date={value ? new Date(value) : new Date()}
						        isVisible={isDatePickerVisible}
						        mode="date"
						        onConfirm={(date) => this.handleConfirm(date)}
						        onCancel={(date) => this.hideDatePicker(date)}
					      	/>
						</View>
					</View>
					<View style={styles.feedPicker}>
						<Text style={[styles.feedLabel, { backgroundColor: "#fff", color: "#999" }]}>Height</Text>
						<View style={styles.picker}>
							<Picker
								selectedValue={selectedFeed}
								style={styles.pickerInput}
								itemTextStyle={{fontSize: 20}}
								onValueChange={(itemValue) => {
									this.setState({ selectedFeed: itemValue });
								}}
							>
								<Picker.Item label="28 in" value="28" />
								<Picker.Item label="30 in" value="30" />
								<Picker.Item label="38 in" value="38" />
							</Picker>
							<FontAwesomeIcon style={styles.pickerIcon} name="caret-down" />
						</View>
					</View>
					<View style={styles.amountPicker}>
						<Text style={[styles.amountLabel, { backgroundColor: "#fff", color: "#999" }]}>Weight</Text>
						<View style={styles.picker}>
							<Picker
								selectedValue={selectedAmount}
								style={styles.pickerInput}
								onValueChange={(itemValue) => {
									this.setState({ selectedAmount: itemValue });
								}}
							>
								<Picker.Item label="31.4 lbs" value="22" />
								<Picker.Item label="31.5 lbs" value="23" />
								<Picker.Item label="32.4 lbs" value="24" />
								<Picker.Item label="33.4 lbs" value="25" />
							</Picker>
							<FontAwesomeIcon style={styles.pickerIcon} name="caret-down" />
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

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(null, mapDispatchToProps)(AddGrowth);