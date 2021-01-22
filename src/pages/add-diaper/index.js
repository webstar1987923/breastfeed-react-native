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

class AddDiaper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			NotesValue: "",
			// selectedStartTime: "",
			// TimeValue: "",
			time: "9:00 AM",
			selectedFeed: ""
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
					<View style={styles.feedPicker}>
						<Text style={[styles.feedLabel, { backgroundColor: "#fff", color: "#999" }]}>Type of Feed</Text>
						<View style={styles.picker}>
							<Picker
								selectedValue={selectedFeed}
								style={styles.pickerInput}
								itemTextStyle={{ fontSize: 20 }}
								onValueChange={(itemValue) => {
									this.setState({ selectedFeed: itemValue });
								}}
							>
								<Picker.Item label="Both" value="Both" />
								<Picker.Item label="Poop" value="Poop" />
								<Picker.Item label="Pee" value="Pee" />
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

export default connect(null, mapDispatchToProps)(AddDiaper);