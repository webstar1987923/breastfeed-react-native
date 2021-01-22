import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Images } from "src/assets/images";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: "100%",
		padding: 15
	},
	menuTrigger: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
	babyImage: {
		width: 60,
		height: 60,
		borderRadius: 100
	},
	menuOptionImage: {
		width: 30,
		height: 30,
		borderRadius: 100
	},
	menuOptionItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5E5"
	},
	menuOptionHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	menuOptionHeaderLeft: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	menuOptionName: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		marginLeft: 5
	},
	menuOptionContentItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: 5
	},
	contentItemBold: {
		fontWeight: "bold",
		fontSize: 14,
		lineHeight: 17,
		color: "#000"
	},
	contentItemLight: {
		fontWeight: "500",
		fontSize: 14,
		lineHeight: 17,
		color: "#000"
	},
	settingsText: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 20,
		color: "#999999",
		paddingHorizontal: 10,
		paddingBottom: 5
	}
});

class HeaderComponent extends Component {
	EditProfileHandler() {
		const { navigation } = this.props;
		navigation.navigate("EditProfile");
	}

	SettingsHandler() {
		const { navigation } = this.props;
		navigation.navigate("Settings");
	}

	render() {
		return (
			<View style={styles.header}>
				<View style={styles.headerLogo}>
					<Image
						source={Images.globalScreen.smallLogo}
						style={styles.smallLogo}
					/>
				</View>
				<Menu>
					<MenuTrigger style={styles.menuTrigger}>
						<Image
							source={Images.globalScreen.babyImage}
							style={styles.babyImage}
						/>
						<Image
							source={Images.globalScreen.downVector}
							style={styles.downVector}
						/>
					</MenuTrigger>
					<MenuOptions style={styles.menuOptions}  optionsContainerStyle={{ marginTop: 70, elevation: 10, }}>
						<MenuOption style={styles.menuOption}>
							<View style={styles.menuOptionItem}>
								<View style={styles.menuOptionHeader}>
									<View style={styles.menuOptionHeaderLeft}>
										<Image
											source={Images.globalScreen.babyImage}
											style={styles.menuOptionImage}
										/>
										<Text style={styles.menuOptionName}>Baby 1</Text>
									</View>
									<TouchableOpacity onPress={() => this.EditProfileHandler()}>
										<Image
											source={Images.BreastfeedCards.editIcon}
										/>
									</TouchableOpacity>
								</View>
								<View style={styles.menuOptionContent}>
									<View style={styles.menuOptionContentItem}>
										<Text style={styles.contentItemBold}>Age: </Text>
										<Text style={styles.contentItemLight}>6 months</Text>
									</View>
									<View style={styles.menuOptionContentItem}>
										<Text style={styles.contentItemBold}>Height: </Text>
										<Text style={styles.contentItemLight}>35.9 inches</Text>
									</View>
									<View style={styles.menuOptionContentItem}>
										<Text style={styles.contentItemBold}>Weight: </Text>
										<Text style={styles.contentItemLight}>16.1 lbs</Text>
									</View>
								</View>
							</View>
							<View style={styles.menuOptionItem}>
								<View style={styles.menuOptionHeader}>
									<View style={styles.menuOptionHeaderLeft}>
										<Image
											source={Images.globalScreen.babyImage}
											style={styles.menuOptionImage}
										/>
										<Text style={styles.menuOptionName}>Baby 2</Text>
									</View>
									<TouchableOpacity onPress={() => this.EditProfileHandler()}>
										<Image
											source={Images.BreastfeedCards.editIcon}
										/>
									</TouchableOpacity>
								</View>
								<View style={styles.menuOptionContent}>
									<View style={styles.menuOptionContentItem}>
										<Text style={styles.contentItemBold}>Age: </Text>
										<Text style={styles.contentItemLight}>6 months</Text>
									</View>
									<View style={styles.menuOptionContentItem}>
										<Text style={styles.contentItemBold}>Height: </Text>
										<Text style={styles.contentItemLight}>35.9 inches</Text>
									</View>
									<View style={styles.menuOptionContentItem}>
										<Text style={styles.contentItemBold}>Weight: </Text>
										<Text style={styles.contentItemLight}>16.1 lbs</Text>
									</View>
								</View>
							</View>
						</MenuOption>
						<MenuOption style={styles.menuOption}>
							<TouchableOpacity onPress={() => this.SettingsHandler()}>
								<Text style={styles.settingsText}>Settings</Text>
							</TouchableOpacity>
						</MenuOption>
					</MenuOptions>
				</Menu>
			</View>
		);
	}
}

export default withNavigation(HeaderComponent);