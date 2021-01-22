import React from "react";
import { connect } from "react-redux";
import { View, Text, Picker, ScrollView, Image, TouchableOpacity, Keyboard } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import TextInput from "src/components/TextInput";
import ButtonComponent from "src/components/ButtonComponent";
import * as authActions from "src/redux/actions/authActions";
// import LanguageSwitcher from "src/components/LanguageSwitcher";
import { Images } from "src/assets/images";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
// import { translate } from "src/locales/i18n";
import styles from "./styles";

class EditProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBirthday: "",
			selectedHeight: "",
			selectedWeight: "",
			nameValue: "Name",
			isDatePickerVisible: false,
			value: "Dec 30, 2020"
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

	cancelbuttonClicked() {
		const { navigation } = this.props;
		navigation.navigate("Dashboard");
	}

	savebuttonClicked() {
		const { navigation } = this.props;
		navigation.navigate("Dashboard");
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
		const { selectedBirthday, selectedHeight, selectedWeight, nameValue, isDatePickerVisible, value } = this.state;

		return (
			<View style={styles.container}>
				<ScrollView style={styles.scrollView}>
					<Text style={styles.editprofileTitle}>Edit Baby Profile</Text>
					<View style={styles.editprofileForm}>
						<Menu>
							<MenuTrigger style={styles.MenuuserprofileIcon}>
								<View style={styles.userprofileIcon}>
									<Image
										source={Images.eidtProfile.userprofileIcon}
										style={styles.userprofilebutton}
									/>
									<Image
										source={Images.eidtProfile.cameraIcon}
										style={styles.cameraIcon}
									/>
								</View>
							</MenuTrigger>
							<MenuOptions style={styles.menuOptionS} optionsContainerStyle={{ marginTop: 100, marginLeft: 55, maxWidth: 160, elevation: 10, }}>
								<MenuOption style={styles.menuOption}>
									<Text style={styles.menuOptionText}>Change Photo</Text>
								</MenuOption>
								<MenuOption style={styles.menuOption}>
									<Text style={styles.menuOptionText}>Remove</Text>
								</MenuOption>
							</MenuOptions>
						</Menu>

						<TextInput
							style={styles.textInput}
							inputStyle={styles.inputStyle}
							textLabelColor="#999999"
							onChangeText={(value) => {
								this.setState({ nameValue: value });
							}}
							textLabelBackground="white"
							value={nameValue}
							placeholder="Name"
						/>
						<View style={styles.pickerInputContainer}>
							<Text
								style={[styles.pickerLabel, { backgroundColor: "#fff", color: "#999" }]}
							>
								Birthday
							</Text>
							<View style={styles.picker}>
								<TouchableOpacity
									onPress={() => this.showDatePicker()}
									style={styles.pickerInput}
								>
									<Text style={styles.pickerInput}>
										{Moment(value).format('MMM DD, YYYY')}
									</Text>
								</TouchableOpacity>
								<MaterialIcon style={styles.pickerIcon}>keyboard_arrow_down</MaterialIcon>
								<DateTimePickerModal
									date={value ? new Date(value) : new Date()}
							        isVisible={isDatePickerVisible}
							        mode="date"
							        onConfirm={(date) => this.handleConfirm(date)}
							        onCancel={(date) => this.hideDatePicker(date)}
						      	/>
							</View>
						</View>
						<View style={styles.pickerInputContainer}>
							<Text style={[styles.pickerLabel, { backgroundColor: "#fff", color: "#999" }]}>Height</Text>
							<View style={styles.picker}>
								<Picker
									selectedValue={selectedHeight}
									style={styles.pickerInput}
									onValueChange={(itemValue) => {
										this.setState({ selectedHeight: itemValue });
									}}
								>
									<Picker.Item label="35.9 inches" value="35" />
									<Picker.Item label="45.9 inches" value="45" />
									<Picker.Item label="55.9 inches" value="55" />
									<Picker.Item label="65.9 inches" value="65" />
									<Picker.Item label="75.9 inches" value="75" />
									<Picker.Item label="85.9 inches" value="85" />
									<Picker.Item label="95.9 inches" value="95" />
									<Picker.Item label="105.9 inches" value="105" />
								</Picker>
								<MaterialIcon style={styles.pickerIcon}>keyboard_arrow_down</MaterialIcon>
							</View>
						</View>
						<View style={styles.pickerInputContainer}>
							<Text style={[styles.pickerLabel, { backgroundColor: "#fff", color: "#999" }]}>Weight</Text>
							<View style={styles.picker}>
								<Picker
									selectedValue={selectedWeight}
									style={styles.pickerInput}
									onValueChange={(itemValue) => {
										this.setState({ selectedWeight: itemValue });
									}}
								>
									<Picker.Item label="16.1 lbs" value="16" />
									<Picker.Item label="17.1 lbs" value="17" />
									<Picker.Item label="18.1 lbs" value="18" />
									<Picker.Item label="19.1 lbs" value="19" />
									<Picker.Item label="20.1 lbs" value="20" />
									<Picker.Item label="21.1 lbs" value="21" />
									<Picker.Item label="22.1 lbs" value="22" />
									<Picker.Item label="23.1 lbs" value="23" />
								</Picker>
								<MaterialIcon style={styles.pickerIcon}>keyboard_arrow_down</MaterialIcon>
							</View>
						</View>
					</View>
				</ScrollView>
				<View style={styles.profilebottomButtons}>
					<View style={styles.profilebuttons}>
						<ButtonComponent
							style={styles.buttonContainer}
							buttonStyle={styles.cancelbuttonStyle}
							buttonText="Cancel"
							buttonClicked={() => this.cancelbuttonClicked()}
						/>
					</View>
					<View style={styles.profilebuttons}>
						<ButtonComponent
							style={styles.buttonContainer}
							buttonStyle={styles.savebuttonStyle}
							buttonTextStyle={styles.savebuttontextStyle}
							buttonText="Save"
							buttonClicked={() => this.savebuttonClicked()}
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

export default connect(null, mapDispatchToProps)(EditProfileScreen);