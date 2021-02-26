import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from "react-native";
import { List, ListItem, Left, Right, Button } from "native-base";
import * as authActions from "src/redux/actions/authActions";
import ButtonComponent from "src/components/ButtonComponent";
import * as breastfeedActions from "src/redux/actions/breastfeedActions";
import { Images } from "src/assets/images";
import { isEmptyObject } from "src/utils/native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { getActiveBaby } from "src/redux/selectors";
import moment from "moment";
import styles from "../styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";




const SetAlarmComponent = ({isOpen, onClose, onValueSelect}) => {

	const [isDateTimeOpen, setDateTimeModal] = useState(false);

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isOpen}
			onRequestClose={() => {
				onClose()
			}}
		>
			<View style={styles.setModalCentered}>
				<View style={styles.setModalView}>
					<View style={styles.setModalHeader}>
						<Text style={styles.cancelText} onPress={() => onClose()}>Cancel</Text>
						<Text style={styles.setModalTitle}>Breastfeed alarm</Text>
						<Text style={styles.saveText} onPress={() => onClose()}>Save</Text>
					</View>
					<View style={styles.setModalBody}>
						<Text style={styles.startsText} onPress={() => setDateTimeModal(true)}>Starts</Text>
						<Text style={styles.startsText}>{onValueSelect}</Text>
					</View>
					<DateTimePickerModal
						isVisible={isDateTimeOpen}
						mode="datetime"
						onConfirm={(value) => {
							console.log("value", value);
							setDateTimeModal(false);
						}}
						onCancel={() => {
							setDateTimeModal(false);
						}}
					/>
				</View>
				
			</View>
		</Modal>
	)
}


class BreastfeedCards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: "",
			modalVisible: false,
			ViewNoteModal: false,
			isAlarmModal: false
		};
	}

	componentDidMount() {
		const { currentDate, activeBaby } = this.props;
		this.breastFeed(currentDate, activeBaby);
	}

	componentDidUpdate(prevProps) {
		const { currentDate, activeBaby } = this.props;
		if(currentDate !== prevProps.currentDate || prevProps.activeBaby && activeBaby && prevProps.activeBaby.id !== activeBaby.id) {
			this.breastFeed(currentDate, activeBaby);
		}
	}

	breastFeed(currentDate, activeBaby) {
		const { dispatchBreastfeedListing } = this.props;
		if(activeBaby) {
			const data = {
				babyprofile_id: activeBaby.id,
				date: currentDate,
			};
			dispatchBreastfeedListing(data);
		}
	}

	redirectToAddEntry() {
		const { navigation } = this.props;
		navigation.navigate("AddBreastfeedEntry",  {date: this.props.currentDate});
	}

	HandleViewNotes(data) {
		const { ViewNoteModal } = this.state;
		this.setState({ opened: false, ViewNoteModal: data.id });
	}

	HandleDeleteBreastfeed(key) {
		const data = {
			breastfeed_id: key,
		};
		const { dispatchBreastfeedDelete } = this.props;
		if(!isEmptyObject(data)) {
			dispatchBreastfeedDelete(data);
			this.setState({ opened: false });
		}
	}

	HandleEditBreastfeed(data) {
		const { navigation, dispatchEditBreastfeed } = this.props;
		if(!isEmptyObject(data)) {
			dispatchEditBreastfeed(data);
		}
		this.setState({
			opened: false,
		});
		navigation.navigate("EditBreastfeed", {date: this.props.currentDate});
	}

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	}

	setViewNoteModal = (visible) => {
		this.setState({ ViewNoteModal: visible });
	}

	convertTime(data) {
		return moment(data, ["HH:mm"]).format("hh:mm A");
	}

	convertDataIntoHM(data) {
		// console.log("dasda", data);
		let tmp = data.split(":");

		if(Number(tmp[0]) > 0) {
			if(Number(tmp[1]) > 0) {
				return `${tmp[0]}m ${tmp[1]}s`;
			}
			return `${tmp[0]}m`;
		}
		return `${tmp[1]}s`;
	}

	hasTime(data) {
		// console.log(data);
		let _l = data.split(":");
		if(Number(_l[0]) > 0 || Number(_l[1] > 0)) {
			return true;
		}
		return false;
	}

	render() {
		const { breastfeed } = this.props;
		const { modalVisible, ViewNoteModal, isAlarmModal } = this.state;
		// console.log(this.props);
		return (
			<View style={styles.trackContainer}>
				<SetAlarmComponent 
					isOpen={isAlarmModal}
					onClose={() => {
						this.setState({
							isAlarmModal: false
						})
					}}
					onValueSelect={() => {
						console.log("called")
					}}
				/>
				<View style={styles.trackTop}>
					<View style={styles.sessionsBox}>
						<View style={styles.sessionsIcon}>
							<Image source={Images.BreastfeedCards.sessionIcon} />
						</View>
						<Text style={styles.sessionsTitle}>
							{breastfeed && breastfeed.breastfeedListing.result && breastfeed.breastfeedListing.result.length}
							{" "}
							Sessions
						</Text>
					</View>
					<TouchableOpacity onPress={() => this.setState({isAlarmModal: true})}>
					<View style={styles.setAlarm}>
						
							<Image
								source={Images.BreastfeedCards.alarmIcon}
								style={styles.setAlarmIcon}
							/>
							<Text style={styles.setAlarmTitle}>set</Text>
						
					</View>
					</TouchableOpacity>
				</View>
				<ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 70 }}>
					{
						breastfeed.breastfeedListing.error
							? <Text style={styles.listError}>No breastfeed sessions yet</Text>
							:						(
								<View style={styles.trackList}>
									{breastfeed && breastfeed.breastfeedListing.result && breastfeed.breastfeedListing.result.map((data, key) => {
										{/* console.log("INNERT", data); */}
										return (
											<View style={styles.trackListItem} key={`track${key}`}>
												<Text style={styles.startTime}>{this.convertTime(data.start_time)}</Text>
												<View style={styles.breastUnits}>
													{this.hasTime(data.left_breast)
												&& (
													<View style={styles.leftBreast}>
														<Text style={styles.roundFrame}>L</Text>
														<Text style={styles.listText}>Left breast</Text>
													</View>
												)}
													{this.hasTime(data.right_breast)
												&& (
													<View style={styles.rightBreast}>
														<Text style={styles.roundFrame}>R </Text>
														<Text style={styles.listText}>Right breast</Text>
													</View>
												)}
												</View>
												<Text style={styles.totalTime}>{this.convertDataIntoHM(data.total_time)}</Text>
												<View style={styles.trackMenu}>
													<Menu
														opened={this.state.opened === data.id}
														onBackdropPress={() => this.setState({ opened: false })}
													>
														<MenuTrigger onPress={() => this.setState({ opened: data.id })} style={styles.menuTrigger}>
															<Image
																source={Images.BreastfeedCards.dotsIcon}
																style={styles.dotsIcon}
															/>
														</MenuTrigger>
														<MenuOptions style={styles.menuOptionS}>
															{
																data.note
																	? (
																		<MenuOption style={styles.menuOption} onSelect={() => this.HandleViewNotes(data)}>
																			<Image
																				source={Images.BreastfeedCards.detailsIcon}
																			/>
																			<Text style={styles.menuOptionText}>View Notes</Text>
																		</MenuOption>
																	)
																	: null
															}

															<MenuOption style={styles.menuOption}>
																<TouchableOpacity style={styles.menuOptionInner} onPress={() => this.HandleEditBreastfeed(data)}>
																	<Image
																		source={Images.BreastfeedCards.editIcon}
																	/>
																	<Text style={styles.menuOptionText}>Edit</Text>
																</TouchableOpacity>
															</MenuOption>
															<MenuOption style={styles.menuOption}>
																<TouchableOpacity style={styles.menuOptionInner} onPress={() => this.HandleDeleteBreastfeed(data.id)}>
																	<Image
																		source={Images.BreastfeedCards.deleteIcon}
																	/>
																	<Text style={styles.menuOptionText}>Delete</Text>
																</TouchableOpacity>
															</MenuOption>
														</MenuOptions>
													</Menu>
													<Modal
														animationType="slide"
														transparent={true}
														visible={ViewNoteModal === data.id}
														onRequestClose={() => {
															Alert.alert("Modal has been closed.");
														}}
													>
														<View style={styles.centeredView}>
															<View style={styles.modalView}>
																<Text style={styles.modalText}>{data.note}</Text>
																<TouchableHighlight style={styles.closeModal} onPress={() => { this.setViewNoteModal(!ViewNoteModal); }}>
																	<Image
																		source={Images.globalScreen.closeIcon}
																		style={styles.closeIcon}
																	/>
																</TouchableHighlight>
															</View>
														</View>
													</Modal>
												</View>
											</View>
										);
									})}
								</View>
							)
					}
				</ScrollView>
				<TouchableOpacity style={styles.addButton} onPress={() => this.redirectToAddEntry()}>
					<Image source={Images.BreastfeedCards.plusIcon} />
				</TouchableOpacity>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<TouchableHighlight style={styles.closeModal} onPress={() => { this.setModalVisible(!modalVisible); }}>
								<Image
									source={Images.globalScreen.closeIcon}
									style={styles.closeIcon}
								/>
							</TouchableHighlight>
							<Text style={styles.modalTitle}>Create a baby profile to continue</Text>
							<Text style={styles.modalText}>You need to create a baby profile to start tracking their progress. </Text>
							<ButtonComponent
								// buttonClicked={() => { this.logInHandler(); }}
								style={styles.buttonContainer}
								buttonStyle={styles.buttonStyle}
								buttonTextStyle={styles.buttonTextStyle}
								buttonText="Create Baby Profile"
							/>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	breastfeed: state.breastfeedReducer,
	activeBaby: getActiveBaby(state)
});

const mapDispatchToProps = {
	dispatchBreastfeedListing: (data) => breastfeedActions.handleBreastfeedListing(data),
	dispatchBreastfeedDelete: (data) => breastfeedActions.handleBreastfeedDelete(data),
	dispatchEditBreastfeed: (data) => breastfeedActions.EditGetDataBreastfeed(data),
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(mapStateToProps, mapDispatchToProps)(BreastfeedCards);