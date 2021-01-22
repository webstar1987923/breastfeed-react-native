import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { List, ListItem, Left, Right } from "native-base";
import * as authActions from "src/redux/actions/authActions";
// import LanguageSwitcher from "src/components/LanguageSwitcher";
// import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import { translate } from "src/locales/i18n";
import { Images } from "src/assets/images";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import styles from "./styles";

class BreastfeedCards extends React.Component {
	componentDidMount() {
	}

	// hideMenu() {
	// 	menuRef?.hide();
	// }

	// showMenu() {
	// 	menuRef?.show();
	// }

	// onPrcss() {
	// 	showMenu();
	// }

	redirectToAddEntry() {
		const { navigation } = this.props;
		navigation.navigate("AddBreastfeedEntry");
	}

	redirectToEntryDetails() {
		const { navigation } = this.props;
		navigation.navigate("BreastfeedEntryDetails");
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.setsessionMain}>
					<View style={styles.setsessionLeft}>
						<View style={styles.ImageBG}>
							<Image
								source={Images.BreastfeedCards.sessionIcon}
								style={styles.sessionsImage}
							/>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={styles.sessionsTitle}>8 Sessions</Text>
						</View>
					</View>
					<View style={styles.setsessionRight}>
						<View>
							<Image
								source={Images.BreastfeedCards.alarmIcon}
								style={styles.setsessionsImage}
							/>
						</View>
						<View>
							<Text style={styles.setsessionTitle}>set</Text>
						</View>
					</View>
				</View>
				<ScrollView style={styles.scrollView}>
					<View style={styles.alarmList}>
						<List>
							<ListItem style={styles.alarmListItem}>
								<Left style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>6:00 AM</Text>
								</Left>
								<View style={styles.alarmListItemLeftRight}>
									<View style={styles.leftBreast}>
										<Text style={styles.roundFrame}>L</Text>
										<Text style={styles.listText}>Left breast</Text>
									</View>
								</View>
								<View style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>20 minutes</Text>
								</View>
								<Right>
									<Menu>
										<MenuTrigger>
											<Image
												source={Images.BreastfeedCards.dotsIcon}
												style={styles.dotsIcon}
											/>
										</MenuTrigger>
										<MenuOptions style={styles.menuOptionS}>
											<MenuOption style={styles.menuOption} onSelect={() => this.redirectToEntryDetails()}>
												<Image
													source={Images.BreastfeedCards.detailsIcon}
												/>
												<Text style={styles.menuOptionText}>More Details</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.editIcon}
												/>
												<Text style={styles.menuOptionText}>Edit</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.deleteIcon}
												/>
												<Text style={styles.menuOptionText}>Delete</Text>
											</MenuOption>
										</MenuOptions>
									</Menu>
								</Right>
							</ListItem>
							<ListItem style={styles.alarmListItem}>
								<Left style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>8:00 AM</Text>
								</Left>
								<View style={styles.alarmListItemLeftRight}>
									<View style={styles.rightBreast}>
										<Text style={styles.roundFrame}>R</Text>
										<Text style={styles.listText}>Right breast</Text>
									</View>
								</View>
								<View style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>20 minutes</Text>
								</View>
								<Right>
									<Menu>
										<MenuTrigger>
											<Image
												source={Images.BreastfeedCards.dotsIcon}
												style={styles.dotsIcon}
											/>
										</MenuTrigger>
										<MenuOptions style={styles.menuOptionS}>
											<MenuOption style={styles.menuOption} onSelect={() => this.redirectToEntryDetails()}>
												<Image
													source={Images.BreastfeedCards.detailsIcon}
												/>
												<Text style={styles.menuOptionText}>More Details</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.editIcon}
												/>
												<Text style={styles.menuOptionText}>Edit</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.deleteIcon}
												/>
												<Text style={styles.menuOptionText}>Delete</Text>
											</MenuOption>
										</MenuOptions>
									</Menu>
								</Right>
							</ListItem>
							<ListItem style={styles.alarmListItem}>
								<Left style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>6:00 AM</Text>
								</Left>
								<View style={styles.alarmListItemLeftRight}>
									<View style={styles.leftBreast}>
										<Text style={styles.roundFrame}>L</Text>
										<Text style={styles.listText}>Left breast</Text>
									</View>
								</View>
								<View style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>20 minutes</Text>
								</View>
								<Right>
									<Menu>
										<MenuTrigger>
											<Image
												source={Images.BreastfeedCards.dotsIcon}
												style={styles.dotsIcon}
											/>
										</MenuTrigger>
										<MenuOptions style={styles.menuOptionS}>
											<MenuOption style={styles.menuOption} onSelect={() => this.redirectToEntryDetails()}>
												<Image
													source={Images.BreastfeedCards.detailsIcon}
												/>
												<Text style={styles.menuOptionText}>More Details</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.editIcon}
												/>
												<Text style={styles.menuOptionText}>Edit</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.deleteIcon}
												/>
												<Text style={styles.menuOptionText}>Delete</Text>
											</MenuOption>
										</MenuOptions>
									</Menu>
								</Right>
							</ListItem>
							<ListItem style={styles.alarmListItem}>
								<Left style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>6:00 AM</Text>
								</Left>
								<View style={styles.alarmListItemLeftRight}>
									<View style={styles.rightBreast}>
										<Text style={styles.roundFrame}>R</Text>
										<Text style={styles.listText}>Right breast</Text>
									</View>
								</View>
								<View style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>20 minutes</Text>
								</View>
								<Right>
									<Menu>
										<MenuTrigger>
											<Image
												source={Images.BreastfeedCards.dotsIcon}
												style={styles.dotsIcon}
											/>
										</MenuTrigger>
										<MenuOptions style={styles.menuOptionS}>
											<MenuOption style={styles.menuOption} onSelect={() => this.redirectToEntryDetails()}>
												<Image
													source={Images.BreastfeedCards.detailsIcon}
												/>
												<Text style={styles.menuOptionText}>More Details</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.editIcon}
												/>
												<Text style={styles.menuOptionText}>Edit</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.deleteIcon}
												/>
												<Text style={styles.menuOptionText}>Delete</Text>
											</MenuOption>
										</MenuOptions>
									</Menu>
								</Right>
							</ListItem>
							<ListItem style={styles.alarmListItem}>
								<Left style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>6:00 AM</Text>
								</Left>
								<View style={styles.alarmListItemLeftRight}>
									<View style={styles.leftBreast}>
										<Text style={styles.roundFrame}>L</Text>
										<Text style={styles.listText}>Left breast</Text>
									</View>
								</View>
								<View style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>20 minutes</Text>
								</View>
								<Right>
									<Menu>
										<MenuTrigger>
											<Image
												source={Images.BreastfeedCards.dotsIcon}
												style={styles.dotsIcon}
											/>
										</MenuTrigger>
										<MenuOptions style={styles.menuOptionS}>
											<MenuOption style={styles.menuOption} onSelect={() => this.redirectToEntryDetails()}>
												<Image
													source={Images.BreastfeedCards.detailsIcon}
												/>
												<Text style={styles.menuOptionText}>More Details</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.editIcon}
												/>
												<Text style={styles.menuOptionText}>Edit</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.deleteIcon}
												/>
												<Text style={styles.menuOptionText}>Delete</Text>
											</MenuOption>
										</MenuOptions>
									</Menu>
								</Right>
							</ListItem>
							<ListItem style={styles.alarmListItem}>
								<Left style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>6:00 AM</Text>
								</Left>
								<View style={styles.alarmListItemLeftRight}>
									<View style={styles.leftBreast}>
										<Text style={styles.roundFrame}>L</Text>
										<Text style={styles.listText}>Left breast</Text>
									</View>
									<View style={styles.rightBreast}>
										<Text style={styles.roundFrame}>R</Text>
										<Text style={styles.listText}>Right breast</Text>
									</View>
								</View>
								<View style={styles.alarmListItemPadding}>
									<Text style={styles.listText}>20 minutes</Text>
								</View>
								<Right>
									<Menu>
										<MenuTrigger>
											<Image
												source={Images.BreastfeedCards.dotsIcon}
												style={styles.dotsIcon}
											/>
										</MenuTrigger>
										<MenuOptions style={styles.menuOptionS}>
											<MenuOption onSelect={() => this.redirectToEntryDetails()} style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.detailsIcon}
												/>
												<Text style={styles.menuOptionText}>More Details</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.editIcon}
												/>
												<Text style={styles.menuOptionText}>Edit</Text>
											</MenuOption>
											<MenuOption style={styles.menuOption}>
												<Image
													source={Images.BreastfeedCards.deleteIcon}
												/>
												<Text style={styles.menuOptionText}>Delete</Text>
											</MenuOption>
										</MenuOptions>
									</Menu>
								</Right>
							</ListItem>
						</List>
					</View>
				</ScrollView>
				<View style={styles.addBreastfeed}>
					<TouchableOpacity onPress={() => this.redirectToAddEntry()}>
						<View style={styles.addBreastfeedButton}>
							<Image
								source={Images.BreastfeedCards.plusIcon}
								style={styles.dotsIcon}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = {
	dispatchResetAuthState: () => authActions.resetAuthState()
};

export default connect(null, mapDispatchToProps)(BreastfeedCards);