import React from "react";
import { View, Image, Picker, Text, TouchableOpacity, Keyboard } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Images } from "src/assets/images";
import TextInput from "src/components/TextInput";
import ButtonComponent from "src/components/ButtonComponent";
import { isEmpty } from "src/utils/native";
import { translate } from "src/locales/i18n";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "react-native-image-picker";
import Moment from "moment";
import styles from "./styles";

class GetStartedForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: "",
			DOB: "",
			selectedHeight: "",
			selectedWeight: "",
			avatarSource: null,
			Babys: [{
				index: 1,
				fullName: "",
				DOB: Moment().format("MMM DD, YYYY"),
				selectedHeight: "",
				selectedWeight: "",
				avatarSource: null,
				selectedWeightErrMsg: "",
				isDatePickerVisible: false,
			}],
			isDatePickerVisible: false,
			value: "August 22, 2020"
		};
	}

	isValid = () => {
		const { Babys } = this.state;

		let ErrorMsg = false;
		Babys.forEach((el) => {
			// console.log(el);
			if(isEmpty(el.fullName)) {
				el.fullNameErrMsg = "Name is required";
				ErrorMsg = false;
			}
			if(isEmpty(el.selectedHeight)) {
				el.selectedHeightErrMsg = "Height is required";
				ErrorMsg = false;
			}
			if(isEmpty(el.avatarSource)) {
				el.avatarSourceErrMsg = "Image is required";
				ErrorMsg = false;
			}
			if(isEmpty(el.selectedWeight)) {
				el.selectedWeightErrMsg = "Weight is requied";
				ErrorMsg = false;
			}
			if(!isEmpty(el.fullName) && !isEmpty(el.selectedHeight) && !isEmpty(el.avatarSource) && !isEmpty(el.selectedWeight)) {
				ErrorMsg = true;
			}
			return el;
		});
		this.setState({ validateInput: false, });

		return ErrorMsg;
	}

	onSubmit = () => {
		const { submitForm } = this.props;
		const { Babys } = this.state;

		if(this.isValid()) {
			console.log("Babys....????", Babys);
			let data = new FormData();
			if(Babys.length > 1) {
				Babys.forEach((el, index) => {
					data.append(`profile[${index}][baby_profileupload]`, {
						name: el.avatarSource.fileName,
						type: el.avatarSource.type,
						uri: el.avatarSource.uri
					});
					data.append(`profile[${index}][name]`, el.fullName);
					data.append(`profile[${index}][birthday]`, el.DOB ? el.DOB : Moment().format("MMM DD, YYYY"));
					data.append(`profile[${index}][height]`, el.selectedHeight);
					data.append(`profile[${index}][weight]`, el.selectedWeight);
				});
			} else {
				data.append("baby_profileupload", {
					name: Babys[0].avatarSource.fileName,
					type: Babys[0].avatarSource.type,
					uri: Babys[0].avatarSource.uri
				});
				data.append("name", Babys[0].fullName);
				data.append("birthday", Babys[0].DOB);
				data.append("height", Babys[0].selectedHeight);
				data.append("weight", Babys[0].selectedWeight);
			}
			submitForm(data);
		}
		/* REQUIRED FIELDS VALIDATION */
		// if (this.isValid() === false) {
		// 	this.setState({ validateInput: true });
		// 	return true;
		// }
	}

	resetForm = () => {
		this.setState({ fullName: "", DOB: "", selectedHeight: "", selectedWeight: "", validateInput: false });
	}

	showDatePicker(value) {
		console.log("A date has been picked: ");
		const { Babys } = this.state;

		const data = Babys.filter((el) => {
			if(el.index === value.index) {
				el.isDatePickerVisible = true;
			}
			return el;
		});
		this.setState({ Babys: data });
		// this.setState({ isDatePickerVisible: true });
		Keyboard.dismiss();
	}

	hideDatePicker(date, value) {
		// this.setState({ isDatePickerVisible: false });
		const { Babys } = this.state;

		const data = Babys.filter((el) => {
			if(el.index === value.index) {
				el.isDatePickerVisible = false;
				el.value = Moment(date).format("MMM DD, YYYY");
			}
			return el;
		});
		this.setState({ Babys: data });
	}

	handleConfirm(date, value) {
		// this.hideDatePicker();
		console.log("date", date);
		const { Babys } = this.state;

		const data = Babys.filter((el) => {
			if(el.index === value.index) {
				el.isDatePickerVisible = false;
				el.DOB = Moment(date).format("MMM DD, YYYY");
			}
			return el;
		});
		this.setState({ Babys: data });
	}

	selectPhotoTapped(value) {
		const options = {
			title: "Select file",
			mediaType: "photo",
		};
		const { Babys } = this.state;

		ImagePicker.launchImageLibrary(options, (response) => {
			if(response.didCancel) {
				console.log("User cancelled image picker");
			} else {
				const data = Babys.filter((el) => {
					if(el.index === value.index) {
						el.avatarSource = response;
					}
					return el;
				});
				this.setState({ Babys: data });
				// this.setState({ avatarSource: response })
			}
		});
	}

	onChangeHeight(text, value) {
		const { Babys } = this.state;

		const data = Babys.filter((el) => {
			if(el.index === value.index) {
				el.selectedHeight = text;
			}
			return el;
		});
		this.setState({ Babys: data });
	}

	onChangeText(text, value) {
		const { Babys } = this.state;

		const data = Babys.filter((el) => {
			if(el.index === value.index) {
				el.fullName = text;
			}
			return el;
		});
		this.setState({ Babys: data });
	}

	onChangeWeight(text, value) {
		const { Babys } = this.state;

		const data = Babys.filter((el) => {
			if(el.index === value.index) {
				el.selectedWeight = text;
			}
			return el;
		});
		this.setState({ Babys: data });
	}

	addOtherBaby() {
		const data = this.state.Babys;
		data.push({
			fullName: "",
			index: this.state.Babys.length + 1,
			DOB: Moment().format("MMM DD, YYYY"),
			selectedHeight: "",
			selectedWeight: "",
			avatarSource: null,
			isDatePickerVisible: false
		});
		this.setState({ Babys: data });
	}

	render() {
		const { validateInput, avatarSource, Babys, fullName, DOB, selectedHeight, selectedWeight, isDatePickerVisible, value } = this.state;
		return (
			<View style={styles.formContainer}>
				{Babys.map((el, index) => {
					return (
						<View style={styles.formContainerInner}>
							<TouchableOpacity onPress={(data) => this.selectPhotoTapped(el)}>
								{el.avatarSource === null
									? (
										<Image
											source={Images.authScreen.imagePlaceholder}
											style={styles.imagePlaceholder}
										/>
									)
									: (
										<Image
											source={{
												uri: el.avatarSource.uri,
												type: "image/jpeg",
												name: el.avatarSource.filename
											}}
											style={{ width: 125, height: 125, borderRadius: 80 }}
										/>
									)}
							</TouchableOpacity>
							{isEmpty(el.avatarSource) && el.avatarSourceErrMsg && <Text style={[styles.error, { textAlign: "center" }]}>{isEmpty(el.avatarSourceErrMsg) ? "" : el.avatarSourceErrMsg}</Text>}
							<TextInput
								style={styles.textInputContainer}
								textLabelBackground="#E8BC7D"
								textLabelColor="#fff"
								value={el.fullName}
								placeholder={translate("signupScreen.fullNamePlaceholder")}
								isInvalid={(el.validateInput && isEmpty(el.fullName))}
								returnKeyType="next"
								onChangeText={(value) => this.onChangeText(value, el)}
								textLabelColor="#fff"
							/>
							{isEmpty(el.fullName) && el.fullNameErrMsg && <Text style={styles.error}>{isEmpty(el.fullNameErrMsg) ? "" : el.fullNameErrMsg}</Text>}
							<View style={styles.pickerInputContainer}>
								<Text
									style={[styles.pickerLabel, { backgroundColor: "#E8BC7D", color: "#fff" }]}
								>
									Birthday
								</Text>
								{el.isDatePickerVisible}
								<View style={styles.picker}>
									<TouchableOpacity
										onPress={() => this.showDatePicker(el)}
										style={styles.pickerInput}
									>
										<Text style={styles.pickerInput}>
											{Moment(el.DOB).format("MMM DD, YYYY")}
										</Text>
									</TouchableOpacity>
									<MaterialIcon style={styles.pickerIcon}>keyboard_arrow_down</MaterialIcon>

									<DateTimePickerModal
										date={el.DOB ? new Date(el.DOB) : new Date()}
										isVisible={el.isDatePickerVisible}
										mode="date"
										onConfirm={(date) => this.handleConfirm(date, el)}
										onCancel={(date) => this.hideDatePicker(date, el)}
										maximumDate={new Date()}
									/>
								</View>
							</View>
							<View style={styles.pickerInputContainer}>
								<Text style={[styles.pickerLabel, { backgroundColor: "#E8BC7D" }]}>Height</Text>
								<View style={styles.picker}>
									<RNPickerSelect
										onValueChange={(value) => this.onChangeHeight(value, el)
											// this.setState({ selectedHeight: itemValue });
										}
										value={el.selectedHeight}
										style={{
											inputIOS: {
												height: 60,
												width: "100%",
												color: "#fff",
												fontSize: 20,
												lineHeight: 24,
												paddingHorizontal: 12
											},
											inputAndroid: {
												height: 60,
												width: "100%",
												color: "#fff",
												fontSize: 20,
												lineHeight: 24,
												paddingHorizontal: 12
											}
										}}
										useNativeAndroidPickerStyle={false}
										Icon={() => <MaterialIcon style={styles.RNPickerIcon}>keyboard_arrow_down</MaterialIcon>}
										placeholder={{
											label: "",
										}}
										items={[
											{ label: "10 inches", value: "10" },
											{ label: "10.5 inches", value: "10.5" },
											{ label: "11 inches", value: "11" },
											{ label: "11.5 inches", value: "11.5" },
											{ label: "12 inches", value: "12" },
											{ label: "12.5 inches", value: "12.5" },
											{ label: "13 inches", value: "13" },
											{ label: "13.5 inches", value: "13.5" },
										]}
									/>
								</View>
								{isEmpty(el.selectedHeight) && el.selectedHeightErrMsg && <Text style={styles.error}>{isEmpty(el.selectedHeightErrMsg) ? "" : el.selectedHeightErrMsg}</Text>}
							</View>
							<View style={styles.pickerInputContainer}>
								<Text style={[styles.pickerLabel, { backgroundColor: "#E8BC7D" }]}>Weight</Text>
								<View style={styles.picker}>
									<RNPickerSelect
										onValueChange={(value) => this.onChangeWeight(value, el)
											// this.setState({ selectedHeight: itemValue });
										}
										value={el.selectedWeight}
										style={{
											inputIOS: {
												height: 60,
												width: "100%",
												color: "#fff",
												fontSize: 20,
												lineHeight: 24,
												paddingHorizontal: 12
											},
											inputAndroid: {
												height: 60,
												width: "100%",
												color: "#fff",
												fontSize: 20,
												lineHeight: 24,
												paddingHorizontal: 12
											}
										}}
										useNativeAndroidPickerStyle={false}
										Icon={() => <MaterialIcon style={styles.RNPickerIcon}>keyboard_arrow_down</MaterialIcon>}
										placeholder={{
											label: "",
										}}
										items={[
											{ label: "0 lb 0 oz", value: "0" },
											{ label: "1 lb 1 oz", value: "1" },
											{ label: "2 lb 2 oz", value: "2" },
											{ label: "3 lb 3 oz", value: "3" },
											{ label: "4 lb 4 oz", value: "4" },
											{ label: "5 lb 5 oz", value: "5" },
											{ label: "6 lb 6 oz", value: "6" },
											{ label: "7 lb 7 oz", value: "7" },
										]}
									/>
								</View>
								{isEmpty(el.selectedWeight) && <Text style={styles.error}>{isEmpty(el.selectedWeightErrMsg) ? "" : el.selectedWeightErrMsg}</Text>}
							</View>
						</View>
					);
				})}

				<TouchableOpacity style={styles.addAnother} onPress={() => this.addOtherBaby()}>
					<MaterialIcon style={styles.addAnotherIcon}>add_circle</MaterialIcon>
					<Text style={styles.addAnotherText}>Add Another Baby</Text>
				</TouchableOpacity>

				<ButtonComponent
					buttonClicked={() => { this.onSubmit(); }}
					style={styles.buttonContainer}
					buttonStyle={styles.buttonStyle}
					buttonText="save"
				/>
			</View>
		);
	}
}

export default GetStartedForm;
