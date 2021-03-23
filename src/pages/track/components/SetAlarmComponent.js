import React, { useState, useEffect } from "react";
import { View, Text, Modal, Switch, Platform } from "react-native";
import { connect } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { showAlert } from "src/utils/native";
import { getActiveBaby } from "src/redux/selectors";
import { resetAlarmFlag, setAlarmAPI, updateAlarmAPI } from "../../../redux/actions/alarmAction";
import styles from "../styles";


const SetAlarmComponent = ({
	isOpen,
	onClose,
	title = "Alarm",
	notificationTitle,
	alarm,
	type,
	// eslint-disable-next-line no-shadow
	resetAlarmFlag,
	// eslint-disable-next-line no-shadow
	setAlarmAPI,
	// eslint-disable-next-line no-shadow
	updateAlarmAPI,
	prevAlarm,
	activeBaby
}) => {
	const [isDateTimeOpen, setDateTimeModal] = useState(false);
	const [isEnabled, setIsEnabled] = useState(false);
	const [date, setDate] = useState(moment());

	useEffect(() => {
		if(alarm.isAdded) {
			resetAlarmFlag();
			onClose();
			if(prevAlarm) {
				showAlert("Success", "Alarm updated successfully", "", () => {});
			} else {
				showAlert("Success", "Alarm added successfully", "", () => {});
			}
		}
		if(prevAlarm) {
			if(prevAlarm.user_datetime) {
				setDate(moment(prevAlarm.user_datetime));
			}
			setIsEnabled(prevAlarm.repeat === "true" ? true : false);
		}

		return () => {
			resetAlarmFlag();
		};
	}, [alarm.isAdded]);

	const saveAlarm = () => {
		if(!date.isAfter(moment())) {
			showAlert("Error", "Date & Time must be greater than current time", "", () => {});
			return;
		}

		if(activeBaby && activeBaby.id) {
			let obj = {
				datetime: new Date(date.toLocaleString()),
				user_datetime: date.format("YYYY-MM-DD HH:mm:ss"),
				repeat: isEnabled.toString(),
				message: notificationTitle,
				type,
				baby_id: activeBaby.id
			};
			console.log("OBJECT FOR CREATE/UPDATE ALARM", obj);
			if(prevAlarm) {
				try {
					// eslint-disable-next-line dot-notation
					obj["alarm_id"] = prevAlarm.id;
					updateAlarmAPI(obj);
				} catch(e) {
					console.log(e);
				}
			} else {
				setAlarmAPI(obj);
			}
		}
	};

	const getTime = () => {
		return moment(date).format("MMMM D, YYYY h:mm A");
	};
	
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isOpen}
			onRequestClose={() => {
				onClose();
			}}
		>
			<View style={styles.setModalCentered}>
				<View style={styles.setModalView}>
					<View style={styles.setModalHeader}>
						<Text style={styles.cancelText} onPress={() => onClose()}>Cancel</Text>
						<Text style={styles.setModalTitle}>{title}</Text>
						<Text style={styles.saveText} onPress={() => saveAlarm()}>Save</Text>
					</View>
					<View style={styles.setModalBody}>
						<Text style={styles.startsText}>Starts</Text>
						<Text style={styles.startsDate} onPress={() => setDateTimeModal(true)}>
							{getTime()}
						</Text>
					</View>
					<View style={styles.setModalFooter}>
						<Text style={styles.repeatText}>Repeat:</Text>
						<Switch
							trackColor={{ false: "#E0E0E0", true: "#E0E0E0" }}
							thumbColor={isEnabled ? "#F3921F" : "#999999"}
							onValueChange={() => setIsEnabled(!isEnabled)}
							value={isEnabled}
						/>
					</View>
					<DateTimePickerModal
						isVisible={isDateTimeOpen}
						display={Platform.OS === "ios" ? "inline" : "default"}
						mode="datetime"
						date={new Date(date.toLocaleString())}
						onConfirm={(value) => {
							setDate(moment(value));
							setDateTimeModal(false);
						}}
						onCancel={() => {
							setDateTimeModal(false);
						}}
					/>
				</View>
			</View>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	alarm: state.alarmReducer,
	activeBaby: getActiveBaby(state),
});

const mapDispatchToProps = {
	resetAlarmFlag,
	setAlarmAPI,
	updateAlarmAPI
};

export default connect(mapStateToProps, mapDispatchToProps)(SetAlarmComponent);
