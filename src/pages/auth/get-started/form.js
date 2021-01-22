import React from "react";
import { View, Image, Picker, Text, TouchableOpacity, Keyboard } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Images } from "src/assets/images";
import TextInput from "src/components/TextInput";
import ButtonComponent from "src/components/ButtonComponent";
import { isEmpty } from "src/utils/native";
import { translate } from "src/locales/i18n";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import styles from "./styles";

class GetStartedForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: "Baby 1",
			DOB: "",
			selectedHeight: "",
			selectedWeight: "",
            isDatePickerVisible: false,
            value: "August 22, 2020"
		};
	}

    isValid = () => {
    	const { fullName, DOB } = this.state;

    	if(isEmpty(fullName) || isEmpty(DOB)) {
    		return false;
    	}

    	this.setState({ validateInput: false, });

    	return true;
    }

    onSubmit = () => {
    	const { submitForm } = this.props;
    	const { fullName, DOB, selectedHeight, selectedWeight } = this.state;

    	/* REQUIRED FIELDS VALIDATION */
    	if(this.isValid() === false) {
    		this.setState({ validateInput: true });
    		return true;
    	}

    	const data = {
    		fullName: fullName,
    		DOB: DOB,
    		selectedHeight: selectedHeight,
    		selectedWeight: selectedWeight
    	};

    	submitForm(data);
    }

    resetForm = () => {
    	this.setState({ fullName: "", DOB: "", selectedHeight: "", selectedWeight: "", validateInput: false });
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
    	const { validateInput, fullName, DOB, selectedHeight, selectedWeight, isDatePickerVisible, value } = this.state;
    	return (
    		<View style={styles.formContainer}>
    			<Image
		source={Images.authScreen.imagePlaceholder}
    				style={styles.imagePlaceholder}
	/>
		<TextInput
		style={styles.textInputContainer}
    				textLabelBackground="#E8BC7D"
		value={fullName}
    				placeholder={translate("signupScreen.fullNamePlaceholder")}
		isInvalid={(validateInput && isEmpty(fullName))}
    				returnKeyType="next"
		onChangeText={(value) => {
    					this.setState({ fullName: value });
    				}}
        textLabelColor="#fff"
	/>
		<View style={styles.pickerInputContainer}>
            <Text
                style={[styles.pickerLabel, { backgroundColor: "#E8BC7D", color: "#fff" }]}
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
	<Text style={[styles.pickerLabel, { backgroundColor: "#E8BC7D" }]}>Height</Text>
	<View style={styles.picker}>
    					<Picker
			selectedValue={selectedHeight}
    						style={styles.pickerInput}
			onValueChange={(itemValue, itemIndex) => {
    							this.setState({ selectedHeight: itemValue });
    						}}
		>
    						<Picker.Item label="10 inches" value="10" />
			<Picker.Item label="10.5 inches" value="10.5" />
			<Picker.Item label="11 inches" value="11" />
			<Picker.Item label="11.5 inches" value="11.5" />
			<Picker.Item label="12 inches" value="12" />
			<Picker.Item label="12.5 inches" value="12.5" />
			<Picker.Item label="13 inches" value="13" />
    						<Picker.Item label="13.5 inches" value="13.5" />
		</Picker>
    					<MaterialIcon style={styles.pickerIcon}>keyboard_arrow_down</MaterialIcon>
    				</View>
    			</View>
    			<View style={styles.pickerInputContainer}>
		<Text style={[styles.pickerLabel, { backgroundColor: "#E8BC7D" }]}>Weight</Text>
		<View style={styles.picker}>
	<Picker
	selectedValue={selectedWeight}
    						style={styles.pickerInput}
	onValueChange={(itemValue, itemIndex) => {
    							this.setState({ selectedWeight: itemValue });
    						}}
    					>
	<Picker.Item label="0 lb 0 oz" value="0" />
	<Picker.Item label="1 lb 1 oz" value="1" />
	<Picker.Item label="2 lb 2 oz" value="2" />
	<Picker.Item label="3 lb 3 oz" value="3" />
    						<Picker.Item label="4 lb 4 oz" value="4" />
    						<Picker.Item label="5 lb 5 oz" value="5" />
    						<Picker.Item label="6 lb 6 oz" value="6" />
    						<Picker.Item label="7 lb 7 oz" value="7" />
    					</Picker>
    					<MaterialIcon style={styles.pickerIcon}>keyboard_arrow_down</MaterialIcon>
        </View>
 </View>

		<TouchableOpacity style={styles.addAnother}>
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
