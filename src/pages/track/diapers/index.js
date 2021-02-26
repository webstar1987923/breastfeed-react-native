import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from "react-native";
import { List, ListItem, Left, Right } from "native-base";
import * as authActions from "src/redux/actions/authActions";
import ButtonComponent from "src/components/ButtonComponent";
// import LanguageSwitcher from "src/components/LanguageSwitcher";
// import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import { translate } from "src/locales/i18n";
import * as diaperActions from "src/redux/actions/diaperActions";
import { Images } from "src/assets/images";
import { isEmptyObject } from "src/utils/native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { getActiveBaby } from "src/redux/selectors";
import moment from "moment";
import styles from "../styles";

class DiapersCards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: "",
			ViewNoteModal: false
		};
	}

	componentDidMount() {
		const { currentDate, activeBaby } = this.props;
		this.diaperFunction(currentDate, activeBaby);
	}

	componentDidUpdate(prevProps) {
		const { currentDate, activeBaby } = this.props;
		if(currentDate !== prevProps.currentDate || prevProps.activeBaby && activeBaby && prevProps.activeBaby.id !== activeBaby.id) {
			this.diaperFunction(currentDate, activeBaby);
		}
	}

	diaperFunction(currentDate, activeBaby) {
		const { dispatchDiaperListing } = this.props;
		if(activeBaby) {
			const data = {
				babyprofile_id: activeBaby.id,
				date: currentDate,
			};
			dispatchDiaperListing(data);
		}
	}

	redirectToAddEntry() {
		const { navigation } = this.props;
		navigation.navigate("AddDiaper", {date: this.props.currentDate});
	}

	HandleViewNotes(data) {
		console.warn("data", data.note);
		const { ViewNoteModal } = this.state;
		this.setState({ opened: false, ViewNoteModal: data.id });
	}

	HandleDeleteDiaper(key) {
		console.warn("key", key);
		const data = {
			diaper_id: key,
		};
		const { dispatchDiaperDelete, navigation } = this.props;
		if(!isEmptyObject(data)) {
			dispatchDiaperDelete(data);
			this.setState({ opened: false });
			navigation.setParams({ activeTab: "Diapers" });
		}
	}

	HandleEditDiaper(data) {
		console.warn("data", data);
		const { navigation, dispatchEditDiaper } = this.props;
		if(!isEmptyObject(data)) {
			dispatchEditDiaper(data);
		}
		this.setState({
			opened: false,
		});
		navigation.navigate("EditDiaper");
	}

	setViewNoteModal = (visible) => {
		this.setState({ ViewNoteModal: visible });
	}

	convertTime(data) {
		return moment(data, ["HH:mm"]).format("hh:mm A");
	}

	render() {
		const { diaper } = this.props;
		const { ViewNoteModal } = this.state;
		return (
			<View style={styles.trackContainer}>
				<View style={styles.trackTop}>
					<View style={styles.sessionsBox}>
						<View style={styles.sessionsIcon}>
							<Image source={Images.DiapersCards.diaperIcon} />
						</View>
						<Text style={styles.sessionsTitle}>
							{diaper && diaper.diaperListing.result && diaper.diaperListing.result.length}
							{" "}
							Sessions
						</Text>
					</View>
				</View>
				<ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 70 }}>
					{
						diaper.diaperListing.error
							? <Text style={styles.listError}>No diaper sessions yet</Text>
							:							(
								<View style={styles.trackList}>
									{diaper && diaper.diaperListing.result && diaper.diaperListing.result.map((data, key) => {
										return (
											<View style={styles.trackListItem} key={`track${key}`}>
												<Text style={styles.startTime}>{this.convertTime(data.start_time)}</Text>
												<View style={styles.diaper}>
													{(data.type_of_diaper === "Poop")
													&& (
														<View style={styles.diaperItem}>
															<Image
																source={Images.DiapersCards.poopIcon}
																style={styles.DiaperFrame}
															/>
															<Text style={styles.listText}>Poop</Text>
														</View>
													)}
													{(data.type_of_diaper === "Pee")
													&& (
														<View style={styles.diaperItem}>
															<Image
																source={Images.DiapersCards.peeIcon}
																style={styles.DiaperFrame}
															/>
															<Text style={styles.listText}>Pee</Text>
														</View>
													)}
													{(data.type_of_diaper !== "Pee" && data.type_of_diaper !== "Poop")
													&& (
														<View style={styles.diaperItem}>
															<Image
																source={Images.DiapersCards.peepoopIcon}
																style={styles.DiaperFrame}
															/>
															<Text style={styles.listText}>Both</Text>
														</View>
													)}
												</View>
												<View style={styles.trackMenu}>
													<Menu
														opened={this.state.opened === data.id}
														onBackdropPress={() => this.setState({ opened: false })}
													>
														<MenuTrigger onPress={() => this.setState({ opened: data.id })}>
															<Image
																source={Images.DiapersCards.dotsIcon}
																style={styles.dotsIcon}
															/>
														</MenuTrigger>
														<MenuOptions style={styles.menuOptionS}>
															{
																data.note
																	? (
																		<MenuOption style={styles.menuOption} onSelect={() => this.HandleViewNotes(data)}>
																			<Image
																				source={Images.DiapersCards.detailsIcon}
																			/>
																			<Text style={styles.menuOptionText}>View Notes</Text>
																		</MenuOption>
																	)
																	: null
															}
															<MenuOption style={styles.menuOption}>
																<TouchableOpacity style={styles.menuOptionInner} onPress={() => this.HandleEditDiaper(data)}>
																	<Image
																		source={Images.DiapersCards.editIcon}
																	/>
																	<Text style={styles.menuOptionText}>Edit</Text>
																</TouchableOpacity>
															</MenuOption>
															<MenuOption style={styles.menuOption}>
																<TouchableOpacity style={styles.menuOptionInner} onPress={() => this.HandleDeleteDiaper(data.id)}>
																	<Image
																		source={Images.DiapersCards.deleteIcon}
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
					<Image
						source={Images.DiapersCards.plusIcon}
						style={styles.dotsIcon}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	diaper: state.diaperReducer,
	activeBaby: getActiveBaby(state)
});

const mapDispatchToProps = {
	dispatchDiaperListing: (data) => diaperActions.handleDiaperListing(data),
	dispatchDiaperDelete: (data) => diaperActions.handleDiaperDelete(data),
	dispatchEditDiaper: (data) => diaperActions.EditGetDataDiaper(data),
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(mapStateToProps, mapDispatchToProps)(DiapersCards);